import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, FileText, Download,
  TrendingUp, Users, Package, DollarSign, LayoutDashboard
} from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Card } from '../../components/ui/Card.js';
import { Spinner } from '../../components/ui/Spinner.js';
import workDiaryApi from '../../services/work-diary.api.js';
import workApi from '../../services/works.api.js';
import type { WorkDiary } from '../../services/work-diary.service.js';
import type { Work } from '../../services/works.service.js';
import toast from 'react-hot-toast';

export function WorkCostReport() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  const [diaries, setDiaries] = useState<WorkDiary[]>([]);

  const fetchReport = async () => {
    if (!workId) return;
    setIsLoading(true);
    try {
      const [workData, diariesData] = await Promise.all([
        workApi.getById(workId),
        workDiaryApi.getReport(workId, startDate, endDate)
      ]);
      setWork(workData);
      setDiaries(diariesData);
    } catch (error) {
      toast.error('Erro ao gerar relatório');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [workId, startDate, endDate]);

  const totalLabor = diaries.reduce((acc, d) => acc + d.laborEntries.reduce((a, e) => a + e.cost, 0), 0);
  const totalMaterials = diaries.reduce((acc, d) => acc + d.materialUsages.reduce((a, m) => a + (m.quantity * m.unitPrice), 0), 0);
  const totalCost = totalLabor + totalMaterials;

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateStr: string) => {
    try {
      // Handles both ISO strings and YYYY-MM-DD
      const date = new Date(dateStr + (dateStr.includes('T') ? '' : 'T12:00:00'));
      if (isNaN(date.getTime())) return 'Data Inválida';
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return 'Data Inválida';
    }
  };

  if (isLoading && !work) return <div className="flex justify-center p-12"><Spinner /></div>;

  return (
    <div className="space-y-6 pb-12 print:p-0 print:bg-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Button variant="outline" className="p-1 h-auto" onClick={() => navigate(`/works/${workId}/diary`)}>
                <ArrowLeft size={16} />
             </Button>
             <h1 className="text-2xl font-bold text-secondary-900">Relatório de Custos: {work?.name}</h1>
          </div>
          <p className="text-secondary-500 text-sm">Visão consolidada de gastos por período.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Download size={18} className="mr-2" /> PDF / Imprimir
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={18} className="mr-2" /> Dashboard
          </Button>
        </div>
      </div>

      <Card className="p-4 flex flex-wrap items-center gap-6 print:hidden">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-secondary-600">De:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border-secondary-300 rounded-md p-2 text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-secondary-600">Até:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border-secondary-300 rounded-md p-2 text-sm" />
        </div>
        <Button onClick={fetchReport} className="ml-auto"><Calendar size={18} className="mr-2" /> Atualizar Filtro</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
              <div>
                <p className="text-sm text-secondary-500 font-medium">Mão de Obra</p>
                <p className="text-2xl font-bold text-secondary-900">{totalLabor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
         </Card>
         <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Package size={24} /></div>
              <div>
                <p className="text-sm text-secondary-500 font-medium">Materiais</p>
                <p className="text-2xl font-bold text-secondary-900">{totalMaterials.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
         </Card>
         <Card className="p-6 border-l-4 border-l-green-500 bg-green-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg"><TrendingUp size={24} /></div>
              <div>
                <p className="text-sm text-green-800 font-medium uppercase tracking-wider">Custo Total Acumulado</p>
                <p className="text-2xl font-black text-green-900">{totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              </div>
            </div>
         </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-4 border-b bg-secondary-50 flex justify-between items-center">
           <h3 className="font-bold text-secondary-900 flex items-center gap-2">
             <FileText size={20} /> Detalhamento por Dia
           </h3>
           <span className="text-xs text-secondary-500 italic">Total de {diaries.length} dias registrados no período.</span>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-secondary-100 text-secondary-600 uppercase text-xs font-bold">
               <tr>
                 <th className="px-6 py-3">Data</th>
                 <th className="px-6 py-3">Equipe</th>
                 <th className="px-6 py-3">Custo Mão de Obra</th>
                 <th className="px-6 py-3">Materiais Consumidos</th>
                 <th className="px-6 py-3 text-right">Subtotal</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-secondary-200">
               {diaries.length === 0 ? (
                 <tr><td colSpan={5} className="px-6 py-12 text-center text-secondary-400">Nenhum registro encontrado para este período.</td></tr>
               ) : diaries.map(d => {
                 const dLabor = d.laborEntries.reduce((a, e) => a + e.cost, 0);
                 const dMat = d.materialUsages.reduce((a, m) => a + (m.quantity * m.unitPrice), 0);
                 return (
                   <tr key={d.id} className="hover:bg-secondary-50 transition-colors">
                     <td className="px-6 py-4 font-semibold text-secondary-900">
                       {formatDate(d.date)}
                     </td>
                     <td className="px-6 py-4 text-sm text-secondary-600">
                       {d.laborEntries.length} funcionários
                     </td>
                     <td className="px-6 py-4 text-sm">
                       {dLabor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </td>
                     <td className="px-6 py-4 text-sm">
                       {dMat.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </td>
                     <td className="px-6 py-4 text-right font-bold text-secondary-900">
                       {(dLabor + dMat).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                     </td>
                   </tr>
                 );
               })}
             </tbody>
             {diaries.length > 0 && (
               <tfoot className="bg-secondary-900 text-white font-bold">
                 <tr>
                   <td className="px-6 py-4" colSpan={2}>TOTAL GERAL</td>
                   <td className="px-6 py-4">{totalLabor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                   <td className="px-6 py-4">{totalMaterials.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                   <td className="px-6 py-4 text-right">{totalCost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                 </tr>
               </tfoot>
             )}
           </table>
        </div>
      </Card>

      <div className="hidden print:block mt-12 pt-12 border-t border-secondary-200 text-center text-secondary-400 text-sm">
         Documento gerado automaticamente pelo Sistema de Gerenciamento de Obras em {new Date().toLocaleString('pt-BR')}.
      </div>
    </div>
  );
}
