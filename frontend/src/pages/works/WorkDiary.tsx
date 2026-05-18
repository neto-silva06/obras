import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar, Users, Package, ArrowLeft, Plus, Trash2,
  ChevronLeft, ChevronRight, HardHat, DollarSign, LayoutDashboard, Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Card } from '../../components/ui/Card.js';
import { Input } from '../../components/ui/Input.js';
import { Spinner } from '../../components/ui/Spinner.js';
import workDiaryApi from '../../services/work-diary.api.js';
import employeeApi from '../../services/employees.api.js';
import materialApi from '../../services/materials.api.js';
import workApi from '../../services/works.api.js';
import type { WorkDiary as WorkDiaryType, LaborEntry, MaterialUsage } from '../../services/work-diary.service.js';
import type { Employee } from '../../services/employees.service.js';
import type { Material } from '../../services/materials.service.js';
import type { Work } from '../../services/works.service.js';
import toast from 'react-hot-toast';
import { db } from '../../offline/db.js';

export function WorkDiary() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [diary, setDiary] = useState<WorkDiaryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [materialQty, setMaterialQty] = useState(1);
  const [materialPrice, setMaterialPrice] = useState(0);

  const fetchData = async () => {
    if (!workId) return;
    setIsLoading(true);

    // Helper to fetch and ignore errors for offline resilience
    const fetchSafe = async (apiCall: Promise<any>, setter: (data: any) => void) => {
      try {
        const data = await apiCall;
        setter(data);
        return data;
      } catch (err) {
        console.warn('Silent fetch error (likely offline/cached):', err);
        return null;
      }
    };

    try {
      const [workData, employeesData, materialsData, diaryData] = await Promise.all([
        fetchSafe(workApi.getById(workId), setWork),
        fetchSafe(employeeApi.getAll(), setEmployees),
        fetchSafe(materialApi.getAll(), setMaterials),
        fetchSafe(workDiaryApi.getDiary(workId, selectedDate), setDiary)
      ]);

      // Merge with pending operations from syncQueue
      const pendingOps = await db.syncQueue
        .where('status')
        .equals('pending')
        .toArray();

      if (!diaryData) return;
      const enrichedDiary = { ...diaryData };

      // Handle pending labor entries
      pendingOps.forEach((op: any) => {
        if (op.url === '/api/work-diaries/labor' && op.method === 'POST') {
          if (op.data.workDiaryId === diaryData.id) {
            const employee = (employeesData || []).find((e: any) => e.id === op.data.employeeId);
            if (employee && !enrichedDiary.laborEntries.some((le: any) => le.employeeId === employee.id)) {
              enrichedDiary.laborEntries.push({
                id: `offline-${op.id}`,
                workDiaryId: diaryData.id,
                employeeId: employee.id,
                employee: employee,
                cost: employee.dailyRate,
                createdAt: new Date(op.timestamp).toISOString(),
                _isOffline: true
              } as any);
            }
          }
        }

        if (op.url === '/api/work-diaries/material' && op.method === 'POST') {
          if (op.data.workDiaryId === diaryData.id) {
            const material = (materialsData || []).find((m: any) => m.id === op.data.materialId);
            if (material) {
              enrichedDiary.materialUsages.push({
                id: `offline-${op.id}`,
                workDiaryId: diaryData.id,
                materialId: material.id,
                material: material,
                quantity: op.data.quantity,
                unitPrice: op.data.unitPrice,
                createdAt: new Date(op.timestamp).toISOString(),
                _isOffline: true
              } as any);
            }
          }
        }
      });

      setDiary(enrichedDiary);
    } catch (error) {
      toast.error('Erro ao carregar dados do diário');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workId, selectedDate]);

  const handleAddLabor = async () => {
    if (!diary || !selectedEmployee || !workId) return;

    const employee = employees.find((e: any) => e.id === selectedEmployee);
    if (!employee) return;

    // Optimistic UI update
    const tempId = 'temp-' + Date.now();
    const newEntry: LaborEntry = {
      id: tempId,
      workDiaryId: diary.id,
      employeeId: employee.id,
      cost: employee.dailyRate,
      employee: employee
    };

    const previousDiary = { ...diary };
    setDiary({
      ...diary,
      laborEntries: [...diary.laborEntries, newEntry]
    });

    try {
      const response: any = await workDiaryApi.addLabor(diary.id, selectedEmployee);

      if (response._isOffline) {
        const employee = employees.find((e: any) => e.id === selectedEmployee);
        if (employee) {
          const newEntry = {
            id: response.id,
            workDiaryId: diary.id,
            employeeId: employee.id,
            employee: employee,
            cost: employee.dailyRate,
            _isOffline: true
          };
          setDiary(prev => prev ? {
            ...prev,
            laborEntries: [...prev.laborEntries, newEntry as any]
          } : null);
        }
        setSelectedEmployee('');
      } else {
        toast.success('Funcionário registrado');
        setSelectedEmployee('');
        const updatedDiary = await workDiaryApi.getDiary(workId!, selectedDate);
        setDiary(updatedDiary);
      }
    } catch (error) {
      // If error but it was saved offline (202 status in interceptor), we keep the optimistic state
      const isOfflineSuccess = (error as any)?.status === 202;
      if (!isOfflineSuccess) {
          setDiary(previousDiary);
          toast.error('Erro ao registrar funcionário');
      } else {
          setSelectedEmployee('');
      }
    }
  };

  const handleRemoveLabor = async (id: string) => {
    if (!diary) return;

    const previousDiary = { ...diary };
    setDiary({
      ...diary,
      laborEntries: diary.laborEntries.filter((e: any) => e.id !== id)
    });

    try {
      if (id.startsWith('offline-')) {
        const syncId = parseInt(id.replace('offline-', ''));
        await db.syncQueue.delete(syncId);
      } else {
        await workDiaryApi.removeLabor(id);
      }

      setDiary(prev => prev ? {
        ...prev,
        laborEntries: prev.laborEntries.filter((e: any) => e.id !== id)
      } : null);
      toast.success('Registro removido');
    } catch (error) {
      const isOfflineSuccess = (error as any)?.status === 202;
      if (!isOfflineSuccess) {
          setDiary(previousDiary);
          toast.error('Erro ao remover registro');
      }
    }
  };

  const handleAddMaterial = async () => {
    if (!diary || !selectedMaterial || !workId) return;

    const material = materials.find((m: any) => m.id === selectedMaterial);
    if (!material) return;

    // Optimistic UI update
    const tempId = 'temp-' + Date.now();
    const newUsage: MaterialUsage = {
      id: tempId,
      workDiaryId: diary.id,
      materialId: material.id,
      quantity: materialQty,
      unitPrice: materialPrice,
      material: material
    };

    const previousDiary = { ...diary };
    setDiary({
      ...diary,
      materialUsages: [...diary.materialUsages, newUsage]
    });

    try {
      const usageData = {
        workDiaryId: diary.id,
        materialId: selectedMaterial,
        quantity: materialQty,
        unitPrice: materialPrice
      };

      const response: any = await workDiaryApi.addMaterial(usageData);

      if (response._isOffline) {
        const material = materials.find((m: any) => m.id === selectedMaterial);
        if (material) {
          const newUsage = {
            id: response.id,
            workDiaryId: diary.id,
            materialId: material.id,
            material: material,
            quantity: materialQty,
            unitPrice: materialPrice,
            _isOffline: true
          };
          setDiary(prev => prev ? {
            ...prev,
            materialUsages: [...prev.materialUsages, newUsage as any]
          } : null);
        }
        setSelectedMaterial('');
        setMaterialQty(1);
        setMaterialPrice(0);
      } else {
        toast.success('Material registrado');
        setSelectedMaterial('');
        setMaterialQty(1);
        setMaterialPrice(0);
        const updatedDiary = await workDiaryApi.getDiary(workId!, selectedDate);
        setDiary(updatedDiary);
      }
    } catch (error) {
      const isOfflineSuccess = (error as any)?.status === 202;
      if (!isOfflineSuccess) {
          setDiary(previousDiary);
          toast.error('Erro ao registrar material');
      } else {
          setSelectedMaterial('');
          setMaterialQty(1);
          setMaterialPrice(0);
      }
    }
  };

  const handleRemoveMaterial = async (id: string) => {
    if (!diary) return;

    const previousDiary = { ...diary };
    setDiary({
      ...diary,
      materialUsages: diary.materialUsages.filter((m: any) => m.id !== id)
    });

    try {
      if (id.startsWith('offline-')) {
        const syncId = parseInt(id.replace('offline-', ''));
        await db.syncQueue.delete(syncId);
      } else {
        await workDiaryApi.removeMaterial(id);
      }

      setDiary(prev => prev ? {
        ...prev,
        materialUsages: prev.materialUsages.filter((m: any) => m.id !== id)
      } : null);
      toast.success('Registro removido');
    } catch (error) {
      const isOfflineSuccess = (error as any)?.status === 202;
      if (!isOfflineSuccess) {
          setDiary(previousDiary);
          toast.error('Erro ao remover registro');
      }
    }
  };

  const changeDate = (days: number) => {
    const d = new Date(selectedDate + 'T12:00:00');
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  if (isLoading && !work) return <div className="flex justify-center p-12"><Spinner /></div>;

  const totalLabor = diary?.laborEntries.reduce((acc, curr) => acc + curr.cost, 0) || 0;
  const totalMaterials = diary?.materialUsages.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0) || 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Button variant="outline" className="p-1 h-auto" onClick={() => navigate('/works')}>
                <ArrowLeft size={16} />
             </Button>
             <h1 className="text-2xl font-bold text-secondary-900">Diário de Obra: {work?.name}</h1>
          </div>
          <p className="text-secondary-500 text-sm">Registre a presença e consumo de materiais diariamente.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/works/${workId}/report`)}>
            <DollarSign size={18} className="mr-2" /> Relatório de Custos
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={18} className="mr-2" /> Dashboard
          </Button>
        </div>
      </div>

      <Card className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => changeDate(-1)}><ChevronLeft size={20} /></Button>
          <div className="flex items-center gap-2 font-semibold text-lg text-primary-700">
            <Calendar size={20} />
            {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { dateStyle: 'long' })}
          </div>
          <Button variant="outline" onClick={() => changeDate(1)}><ChevronRight size={20} /></Button>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e: any) => setSelectedDate(e.target.value)}
          className="border-secondary-300 rounded-md p-2"
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Board */}
        <Card className="flex flex-col h-full border-t-4 border-t-blue-500">
          <div className="p-4 border-b bg-blue-50 flex items-center justify-between">
            <h2 className="font-bold text-blue-900 flex items-center gap-2">
              <Users size={20} /> Quadro de Presença (Mão de Obra)
            </h2>
            <span className="text-blue-700 font-bold">{diary?.laborEntries.length || 0} Presentes</span>
          </div>

          <div className="p-4 bg-secondary-50 border-b space-y-3">
             <div className="flex gap-2">
                <select
                  className="flex-1 rounded-md border-secondary-300 text-sm"
                  value={selectedEmployee}
                  onChange={(e: any) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Selecionar Funcionário...</option>
                  {employees
                    .filter((emp: any) => !diary?.laborEntries.some((le: any) => le.employeeId === emp.id))
                    .map((emp: any) => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.jobTitle})</option>
                    ))
                  }
                </select>
                <Button onClick={handleAddLabor} disabled={!selectedEmployee}>
                  <Plus size={18} /> Registrar
                </Button>
             </div>
          </div>

          <div className="flex-1 p-0 overflow-auto max-h-[400px]">
             {diary?.laborEntries.length === 0 ? (
               <div className="p-8 text-center text-secondary-400">Ninguém registrado hoje.</div>
             ) : (
               <table className="w-full text-sm">
                 <thead className="bg-secondary-100 text-secondary-600 uppercase text-xs">
                   <tr>
                     <th className="px-4 py-2 text-left">Funcionário</th>
                     <th className="px-4 py-2 text-left">Função</th>
                     <th className="px-4 py-2 text-right">Custo</th>
                     <th className="px-4 py-2 text-center w-10"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {diary?.laborEntries.map((entry: any) => (
                     <tr key={entry.id} className={`hover:bg-blue-50 ${(entry as any)._isOffline ? 'bg-blue-50/50 italic text-secondary-500' : ''}`}>
                       <td className="px-4 py-3 font-medium flex items-center gap-2">
                         {entry.employee.name}
                         {(entry as any)._isOffline && <Clock size={14} className="text-blue-500"  />}
                       </td>
                       <td className="px-4 py-3 text-secondary-500">{entry.employee.jobTitle}</td>
                       <td className="px-4 py-3 text-right">{entry.cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                       <td className="px-4 py-3 text-center">
                         <button onClick={() => handleRemoveLabor(entry.id)} className="text-red-500 hover:text-red-700">
                           <Trash2 size={16} />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
          <div className="p-4 border-t bg-secondary-50 flex justify-between items-center">
            <span className="font-semibold text-secondary-600">Total Mão de Obra:</span>
            <span className="font-bold text-lg text-secondary-900">{totalLabor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </Card>

        {/* Materials Usage */}
        <Card className="flex flex-col h-full border-t-4 border-t-orange-500">
          <div className="p-4 border-b bg-orange-50 flex items-center justify-between">
            <h2 className="font-bold text-orange-900 flex items-center gap-2">
              <Package size={20} /> Materiais Consumidos
            </h2>
            <span className="text-orange-700 font-bold">{diary?.materialUsages.length || 0} Itens</span>
          </div>

          <div className="p-4 bg-secondary-50 border-b space-y-3">
             <div className="grid grid-cols-2 gap-2">
                <select
                  className="col-span-2 rounded-md border-secondary-300 text-sm"
                  value={selectedMaterial}
                  onChange={(e: any) => setSelectedMaterial(e.target.value)}
                >
                  <option value="">Selecionar Material...</option>
                  {materials.map((m: any) => (
                    <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>
                  ))}
                </select>
                <Input
                  type="number"
                  placeholder="Qtd"
                  value={materialQty}
                  onChange={(e: any) => setMaterialQty(parseFloat(e.target.value) || 0)}
                />
                <Input
                  type="number"
                  placeholder="Preço Unit. R$"
                  value={materialPrice}
                  onChange={(e: any) => setMaterialPrice(parseFloat(e.target.value) || 0)}
                />
                <Button className="col-span-2 bg-orange-600 hover:bg-orange-700" onClick={handleAddMaterial} disabled={!selectedMaterial}>
                  <Plus size={18} className="mr-1" /> Adicionar Material
                </Button>
             </div>
          </div>

          <div className="flex-1 p-0 overflow-auto max-h-[400px]">
             {diary?.materialUsages.length === 0 ? (
               <div className="p-8 text-center text-secondary-400">Nenhum material gasto hoje.</div>
             ) : (
               <table className="w-full text-sm">
                 <thead className="bg-secondary-100 text-secondary-600 uppercase text-xs">
                   <tr>
                     <th className="px-4 py-2 text-left">Material</th>
                     <th className="px-4 py-2 text-center">Qtd</th>
                     <th className="px-4 py-2 text-right">Unit.</th>
                     <th className="px-4 py-2 text-right">Total</th>
                     <th className="px-4 py-2 text-center w-10"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {diary?.materialUsages.map((usage: any) => (
                     <tr key={usage.id} className={`hover:bg-orange-50 ${(usage as any)._isOffline ? 'bg-orange-50/50 italic text-secondary-500' : ''}`}>
                       <td className="px-4 py-3 font-medium flex items-center gap-2">
                         {usage.material.name}
                         {(usage as any)._isOffline && <Clock size={14} className="text-orange-500"  />}
                       </td>
                       <td className="px-4 py-3 text-center">{usage.quantity} <span className="text-xs text-secondary-400">{usage.material.unit}</span></td>
                       <td className="px-4 py-3 text-right">{usage.unitPrice.toLocaleString('pt-BR')}</td>
                       <td className="px-4 py-3 text-right">{(usage.quantity * usage.unitPrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                       <td className="px-4 py-3 text-center">
                         <button onClick={() => handleRemoveMaterial(usage.id)} className="text-red-500 hover:text-red-700">
                           <Trash2 size={16} />
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             )}
          </div>
          <div className="p-4 border-t bg-secondary-50 flex justify-between items-center">
            <span className="font-semibold text-secondary-600">Total Materiais:</span>
            <span className="font-bold text-lg text-secondary-900">{totalMaterials.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-secondary-50 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary-200 text-secondary-700 rounded-full">
              <HardHat size={32} />
            </div>
            <div>
              <div className="text-secondary-900 text-sm uppercase tracking-wider font-bold">Custo Total do Dia</div>
              <div className="text-3xl font-black text-secondary-900">{(totalLabor + totalMaterials).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
            </div>
         </div>
         <div className="text-right">
            <div className="text-secondary-900 text-xs italic">Valores calculados em tempo real com base nos registros acima.</div>
         </div>
      </Card>
    </div>
  );
}
