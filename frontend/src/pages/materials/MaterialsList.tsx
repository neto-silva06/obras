import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Plus, Pencil, Trash2, Package, Search } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import materialApi from '../../services/materials.api';
import type { Material } from '../../services/materials.service';
import toast from 'react-hot-toast';
=======
import { Plus, Pencil, Trash2, Package, LayoutDashboard } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable.js';
import { Button } from '../../components/common/Button.js';
import materialApi from '../../services/materials.api.js';
import type { Material } from '../../services/materials.service.js';
>>>>>>> main

export function MaterialsList() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      const data = await materialApi.getAll();
      setMaterials(data);
    } catch (error) {
      toast.error('Erro ao carregar materiais');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este material do catálogo?')) {
      try {
        await materialApi.delete(id);
        setMaterials(materials.filter(m => m.id !== id));
        toast.success('Material excluído com sucesso');
      } catch (error) {
        toast.error('Erro ao excluir material');
      }
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      header: 'Material',
      accessor: (material: Material) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-orange-100 flex items-center justify-center text-orange-600">
            <Package size={16} />
          </div>
          <span className="font-semibold text-secondary-900">{material.name}</span>
        </div>
      )
    },
    {
      header: 'Unidade',
      accessor: (material: Material) => (
        <span className="px-2 py-1 bg-secondary-100 text-secondary-700 rounded text-xs font-bold">
          {material.unit}
        </span>
      )
    },
    { header: 'Descrição', accessor: (material: Material) => material.description || '-' },
    {
      header: 'Ações',
      accessor: (material: Material) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/materials/${material.id}/stock`)}
            className="p-2 h-auto text-primary-600 border-secondary-200"
            title="Ver Distribuição em Depósitos"
          >
            <Package size={14} />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/materials/${material.id}/edit`)}
            className="p-2 h-auto border-secondary-200"
            title="Editar"
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleDelete(material.id)}
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
<<<<<<< HEAD
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Catálogo de Materiais</h1>
          <p className="text-secondary-500 text-sm">Defina os materiais disponíveis para estoque.</p>
        </div>
        <Button onClick={() => navigate('/materials/new')}>
          <Plus size={18} className="mr-2" /> Novo Material
        </Button>
=======
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
>>>>>>> main
      </div>

      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-secondary-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-all"
          placeholder="Buscar materiais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredMaterials}
        isLoading={isLoading}
        emptyMessage="Nenhum material encontrado no catálogo."
      />
    </div>
  );
}
