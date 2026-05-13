import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, HardHat, Search } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import workApi from '../../services/works.api';
import type { Work } from '../../services/works.service';
import toast from 'react-hot-toast';

export function WorksList() {
  const navigate = useNavigate();
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchWorks = async () => {
    try {
      setIsLoading(true);
      const data = await workApi.getAll();
      setWorks(data);
    } catch (error) {
      toast.error('Erro ao carregar obras');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra? Todos os depósitos vinculados também serão removidos.')) {
      try {
        await workApi.delete(id);
        setWorks(works.filter(w => w.id !== id));
        toast.success('Obra excluída com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir obra');
      }
    }
  };

  const filteredWorks = works.filter(work =>
    work.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    work.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'IN_PROGRESS': 'bg-blue-100 text-blue-800',
      'COMPLETED': 'bg-green-100 text-green-800',
      'SUSPENDED': 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      'IN_PROGRESS': 'Em Andamento',
      'COMPLETED': 'Concluída',
      'SUSPENDED': 'Suspensa',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status] || status}
      </span>
    );
  };

  const columns = [
    {
      header: 'Obra',
      accessor: (work: Work) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary-100 flex items-center justify-center text-primary-600">
            <HardHat size={16} />
          </div>
          <span className="font-semibold text-secondary-900">{work.name}</span>
        </div>
      )
    },
    { header: 'Endereço', accessor: 'address' as keyof Work },
    {
      header: 'Status',
      accessor: (work: Work) => getStatusBadge(work.status)
    },
    {
      header: 'Ações',
      accessor: (work: Work) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/works/${work.id}/edit`)}
            className="p-2 h-auto"
            title="Editar"
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(work.id)}
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
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gestão de Obras</h1>
          <p className="text-secondary-500 text-sm">Visualize e gerencie todos os empreendimentos ativos.</p>
        </div>
        <Button onClick={() => navigate('/works/new')}>
          <Plus size={18} className="mr-2" /> Nova Obra
        </Button>
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-secondary-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
          placeholder="Buscar obras por nome ou endereço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredWorks}
        isLoading={isLoading}
        emptyMessage="Nenhuma obra encontrada."
      />
    </div>
  );
}
