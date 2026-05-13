import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Pencil, Trash2, ArrowLeft, Package, Warehouse, Search } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import warehouseApi from '../../services/warehouses.api';
import type { Warehouse as WarehouseType } from '../../services/warehouses.service';
import toast from 'react-hot-toast';

export function WarehousesList() {
  const { workId } = useParams();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      const data = workId
        ? await warehouseApi.getByWorkId(workId)
        : await warehouseApi.getAll();
      setWarehouses(data);
    } catch (error) {
      toast.error('Erro ao carregar depósitos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, [workId]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este depósito? Todo o estoque vinculado será perdido.')) {
      try {
        await warehouseApi.delete(id);
        setWarehouses(warehouses.filter(w => w.id !== id));
        toast.success('Depósito excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir depósito');
      }
    }
  };

  const filteredWarehouses = warehouses.filter(w =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Nome do Depósito',
      accessor: (w: WarehouseType) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Warehouse size={16} />
          </div>
          <span className="font-semibold text-secondary-900">{w.name}</span>
        </div>
      )
    },
    {
      header: 'Obra Relacionada',
      accessor: (w: any) => (
        <span className="text-secondary-600">{w.work?.name || 'Obra Geral'}</span>
      )
    },
    {
      header: 'Ações',
      accessor: (w: WarehouseType) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/warehouses/${w.id}/stock`)}
            className="p-2 h-auto text-emerald-600 border-secondary-200"
            title="Ver Estoque"
          >
            <Package size={14} />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/warehouses/${w.id}/edit`)}
            className="p-2 h-auto border-secondary-200"
            title="Editar"
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(w.id)}
            className="p-2 h-auto text-red-600 hover:bg-red-50 hover:text-red-700 border-secondary-200"
            title="Excluir"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {workId && (
            <Button variant="outline" onClick={() => navigate('/warehouses')} className="p-2 rounded-full h-auto">
              <ArrowLeft size={18} />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">
              {workId ? 'Depósitos da Obra' : 'Gestão de Depósitos'}
            </h1>
            <p className="text-secondary-500 text-sm">Controle de locais físicos para armazenamento de materiais.</p>
          </div>
        </div>
        <Button onClick={() => navigate(workId ? `/warehouses/new?workId=${workId}` : '/warehouses/new')}>
          <Plus size={18} className="mr-2" /> Novo Depósito
        </Button>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-secondary-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
          placeholder="Buscar depósitos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredWarehouses}
        isLoading={isLoading}
        emptyMessage="Nenhum depósito encontrado."
      />
    </div>
  );
}
