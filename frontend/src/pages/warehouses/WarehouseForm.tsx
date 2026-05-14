import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Save, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import warehouseApi from '../../services/warehouses.api.js';
import workApi from '../../services/works.api.js';
import type { Warehouse } from '../../services/warehouses.service.js';
>>>>>>> main

export function WarehouseForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const workIdFromQuery = searchParams.get('workId');
  const navigate = useNavigate();
  const isEdit = !!id;

  const [warehouse, setWarehouse] = useState<Partial<Warehouse>>({
    name: '',
    workId: workIdFromQuery || ''
  });
  const [works, setWorks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [loadingData, setLoadingData] = useState(true);
=======
>>>>>>> main

  useEffect(() => {
    const loadWorks = async () => {
      try {
<<<<<<< HEAD
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
=======
        const data = await workApi.getAll();
        setWorks(data);
      } catch (error) {
        alert('Erro ao carregar obras');
      }
    };
    loadWorks();

    if (isEdit && id) {
      const loadWarehouse = async () => {
        try {
          const data = await warehouseApi.getById(id);
          setWarehouse(data);
        } catch (error) {
          alert('Erro ao carregar depósito');
        }
      };
      loadWarehouse();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
>>>>>>> main
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await warehouseApi.update(id, warehouse);
        toast.success('Depósito atualizado com sucesso!');
      } else {
<<<<<<< HEAD
        await warehouseApi.create(warehouse);
        toast.success('Depósito criado com sucesso!');
=======
        await warehouseApi.create(warehouse as any);
>>>>>>> main
      }
      navigate('/warehouses');
    } catch (error) {
      toast.error('Erro ao salvar depósito. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Depósito' : 'Novo Depósito'}
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} title="Dashboard">
            <LayoutDashboard size={18} />
          </Button>
          <Button variant="ghost" onClick={() => navigate('/warehouses')}>
            <X size={18} />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <FormField
          label="Nome do Depósito"
          name="name"
          value={warehouse.name}
          onChange={(val) => setWarehouse({ ...warehouse, name: val })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Obra Associada</label>
          <select
            className="w-full p-2 border rounded-md"
            value={warehouse.workId}
            onChange={(e) => setWarehouse({ ...warehouse, workId: e.target.value })}
            required
            disabled={!!workIdFromQuery && !isEdit}
          >
            <option value="">Selecione a obra</option>
            {works.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" type="button" onClick={() => navigate('/warehouses')}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            <Save size={18} className="mr-2" /> Salvar
          </Button>
        </div>
      </form>
>>>>>>> main
    </div>
  );
}
