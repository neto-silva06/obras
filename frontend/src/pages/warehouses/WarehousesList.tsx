import { Plus, Pencil, Trash2, ArrowLeft, Package } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import warehouseApi from '../../services/warehouses.api';
import { Warehouse } from '../../services/warehouses.service';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export function WarehousesList() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const data = workId
        ? await warehouseApi.getByWorkId(workId)
        : await warehouseApi.getAll();
      setWarehouses(data);
    } catch (error) {
      alert('Erro ao carregar depósitos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [workId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este depósito?')) {
      try {
        await warehouseApi.delete(id);
        await fetchWarehouses();
        alert('Depósito excluído com sucesso');
      } catch (error) {
        alert('Erro ao excluir depósito');
      }
    }
  };

  const columns = [
    { header: 'Nome', accessor: 'name' as keyof Warehouse },
    {
      header: 'Ações',
      accessor: (warehouse: Warehouse) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate(`/warehouses/${warehouse.id}/stock`)}
            className="p-1 text-blue-600 hover:text-blue-700"
            title="Ver Estoque"
          >
            <Package size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(`/warehouses/${warehouse.id}/edit`)}
            className="p-1"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(warehouse.id)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          {workId && (
            <Button variant="ghost" onClick={() => navigate('/warehouses')}>
              <ArrowLeft size={18} className="mr-2" /> Voltar
            </Button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">
            {workId ? 'Depósitos da Obra' : 'Gestão de Depósitos'}
          </h1>
        </div>
        <Button onClick={() => navigate(workId ? `/warehouses/new?workId=${workId}` : '/warehouses/new')}>
          <Plus size={18} className="mr-2" /> Novo Depósito
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={warehouses}
        isLoading={isLoading}
        emptyMessage="Nenhum depósito encontrado."
      />
    </div>
  );
}
