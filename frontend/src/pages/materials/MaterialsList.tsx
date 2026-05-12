import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Package, LayoutDashboard } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import materialApi from '../../services/materials.api.js';
import type { Material } from '../../services/materials.service.js';

export function MaterialsList() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      const data = await materialApi.getAll();
      setMaterials(data);
    } catch (error) {
      alert('Erro ao carregar materiais');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este material?')) {
      try {
        await materialApi.delete(id);
        await fetchMaterials();
        alert('Material excluído com sucesso');
      } catch (error) {
        alert('Erro ao excluir material');
      }
    }
  };

  const columns = [
    { header: 'Nome', accessor: 'name' as keyof Material },
    { header: 'Unidade', accessor: 'unit' as keyof Material },
    { header: 'Descrição', accessor: 'description' as keyof Material },
    {
      header: 'Ações',
      accessor: (material: Material) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => navigate(`/materials/${material.id}/stock`)}
            className="p-1 text-blue-600 hover:text-blue-700"
            title="Ver Distribuição"
          >
            <Package size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate(`/materials/${material.id}/edit`)}
            className="p-1"
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(material.id)}
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
        <h1 className="text-2xl font-bold text-gray-800">Catálogo de Materiais</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard size={18} className="mr-2" /> Dashboard
          </Button>
          <Button onClick={() => navigate('/materials/new')}>
            <Plus size={18} className="mr-2" /> Novo Material
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={materials}
        isLoading={isLoading}
        emptyMessage="Nenhum material cadastrado."
      />
    </div>
  );
}
