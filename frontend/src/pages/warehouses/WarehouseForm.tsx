import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Save, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import warehouseApi from '../../services/warehouses.api.js';
import workApi from '../../services/works.api.js';
import type { Warehouse } from '../../services/warehouses.service.js';

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

  useEffect(() => {
    const loadWorks = async () => {
      try {
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
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await warehouseApi.update(id, warehouse);
      } else {
        await warehouseApi.create(warehouse as any);
      }
      alert(isEdit ? 'Depósito atualizado!' : 'Depósito criado!');
      navigate('/warehouses');
    } catch (error) {
      alert('Erro ao salvar depósito');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
    </div>
  );
}
