import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import warehouseApi from '../../services/warehouses.api.js';
import workApi from '../../services/works.api.js';
import type { Warehouse } from '../../services/warehouses.service.js';
import type { Work } from '../../services/works.service.js';

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
  const [loadingWorks, setLoadingWorks] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingWorks(true);
        const worksData = await workApi.getAll();
        setWorks(worksData);

        if (isEdit && id) {
          const warehouseData = await warehouseApi.getById(id);
          setWarehouse(warehouseData);
        }
      } catch (error) {
        alert('Erro ao carregar dados');
      } finally {
        setLoadingWorks(false);
      }
    };
    loadData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warehouse.workId) {
      alert('Por favor, selecione uma obra');
      return;
    }
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await warehouseApi.update(id, warehouse);
      } else {
        await warehouseApi.create(warehouse);
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
        <Button variant="ghost" onClick={() => navigate('/warehouses')}>
          <X size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <FormField
          label="Nome do Depósito"
          name="name"
          value={warehouse.name}
          onChange={(val) => setWarehouse({ ...warehouse, name: val })}
          required
        />
        <FormField
          label="Obra Vinculada"
          name="workId"
          type="select"
          options={works.map(w => ({ label: w.name, value: w.id }))}
          value={warehouse.workId}
          onChange={(val) => setWarehouse({ ...warehouse, workId: val })}
          required
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" type="button" onClick={() => navigate('/warehouses')}>
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading} disabled={loadingWorks}>
            <Save size={18} className="mr-2" /> Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
