import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import warehouseApi from '../../services/warehouses.api';
import workApi from '../../services/works.api';
import type { Warehouse } from '../../services/warehouses.service';
import type { Work } from '../../services/works.service';
import toast from 'react-hot-toast';

export function WarehouseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = !!id;

  const queryParams = new URLSearchParams(location.search);
  const initialWorkId = queryParams.get('workId');

  const [warehouse, setWarehouse] = useState<Partial<Warehouse>>({
    name: '',
    workId: initialWorkId || ''
  });
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingData(true);
        const worksData = await workApi.getAll();
        setWorks(worksData);

        if (isEdit && id) {
          const warehouseData = await warehouseApi.getById(id);
          setWarehouse(warehouseData);
        }
      } catch (error) {
        toast.error('Erro ao carregar informações');
        navigate('/warehouses');
      } finally {
        setLoadingData(false);
      }
    };
    loadData();
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warehouse.workId) {
      toast.error('Por favor, selecione uma obra para este depósito');
      return;
    }
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await warehouseApi.update(id, warehouse);
        toast.success('Depósito atualizado com sucesso!');
      } else {
        await warehouseApi.create(warehouse);
        toast.success('Depósito criado com sucesso!');
      }
      navigate('/warehouses');
    } catch (error) {
      toast.error('Erro ao salvar depósito. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/warehouses')} className="p-2 rounded-full h-auto">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {isEdit ? 'Editar Depósito' : 'Novo Depósito'}
          </h1>
          <p className="text-secondary-500 text-sm">
            {isEdit ? 'Atualize as informações do local.' : 'Cadastre um novo depósito para uma obra.'}
          </p>
        </div>
      </div>

      <Card>
        {loadingData ? (
          <div className="py-12 flex justify-center">
            <div className="animate-pulse text-secondary-400">Carregando dados...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome do Depósito"
                placeholder="Ex: Canteiro Central, Almoxarifado A"
                value={warehouse.name}
                onChange={(e) => setWarehouse({ ...warehouse, name: e.target.value })}
                required
              />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-secondary-700">Obra Vinculada</label>
                <select
                  className="px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  value={warehouse.workId}
                  onChange={(e) => setWarehouse({ ...warehouse, workId: e.target.value })}
                  required
                >
                  <option value="">Selecione uma obra...</option>
                  {works.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100">
              <Button variant="outline" type="button" onClick={() => navigate('/warehouses')}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isLoading}>
                <Save size={18} className="mr-2" />
                {isEdit ? 'Salvar Alterações' : 'Criar Depósito'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
