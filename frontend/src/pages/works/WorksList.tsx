import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import workApi from '../../services/works.api';
import { Work } from '../../services/works.service';

export function WorksList() {
  const navigate = useNavigate();
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorks = async () => {
    try {
      setIsLoading(true);
      const data = await workApi.getAll();
      setWorks(data);
    } catch (error) {
      alert('Erro ao carregar obras');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        await workApi.delete(id);
        await fetchWorks();
        alert('Obra excluída com sucesso');
      } catch (error) {
        alert('Erro ao excluir obra');
      }
    }
  };

  const columns = [
    { header: 'Nome', accessor: 'name' as keyof Work },
    { header: 'Endereço', accessor: 'address' as keyof Work },
    { header: 'Status', accessor: 'status' as keyof Work },
    {
      header: 'Ações',
      accessor: (work: Work) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate(`/works/${work.id}/edit`)}
            className="p-1"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(work.id)}
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
        <h1 className="text-2xl font-bold text-gray-800">Gestão de Obras</h1>
        <Button onClick={() => navigate('/works/new')}>
          <Plus size={18} className="mr-2" /> Nova Obra
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={works}
        isLoading={isLoading}
        emptyMessage="Nenhuma obra cadastrada."
      />
    </div>
  );
}
