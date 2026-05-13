import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import materialApi from '../../services/materials.api';
import type { Material } from '../../services/materials.service';
import toast from 'react-hot-toast';

export function MaterialForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [material, setMaterial] = useState<Partial<Material>>({
    name: '',
    unit: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const loadMaterial = async () => {
        try {
          setIsFetching(true);
          const data = await materialApi.getById(id);
          setMaterial(data);
        } catch (error) {
          toast.error('Erro ao carregar detalhes do material');
          navigate('/materials');
        } finally {
          setIsFetching(false);
        }
      };
      loadMaterial();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await materialApi.update(id, material);
        toast.success('Material atualizado com sucesso!');
      } else {
        await materialApi.create(material);
        toast.success('Material cadastrado com sucesso!');
      }
      navigate('/materials');
    } catch (error) {
      toast.error('Erro ao salvar material. Verifique os campos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/materials')} className="p-2 rounded-full h-auto">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {isEdit ? 'Editar Material' : 'Novo Material'}
          </h1>
          <p className="text-secondary-500 text-sm">
            {isEdit ? 'Atualize as especificações do item.' : 'Cadastre um novo item no catálogo de materiais.'}
          </p>
        </div>
      </div>

      <Card>
        {isFetching ? (
          <div className="py-12 flex justify-center">
            <div className="animate-pulse text-secondary-400">Carregando dados do material...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Nome do Material"
                  placeholder="Ex: Cimento CP-II"
                  value={material.name}
                  onChange={(e) => setMaterial({ ...material, name: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Unidade de Medida"
                placeholder="Ex: KG, UN, M2"
                value={material.unit}
                onChange={(e) => setMaterial({ ...material, unit: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-secondary-700">Descrição/Especificações</label>
              <textarea
                className="px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] bg-white hover:border-secondary-400 transition-colors"
                placeholder="Detalhes sobre o material, marca, tipo..."
                value={material.description}
                onChange={(e) => setMaterial({ ...material, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100">
              <Button variant="outline" type="button" onClick={() => navigate('/materials')}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isLoading}>
                <Save size={18} className="mr-2" />
                {isEdit ? 'Salvar Alterações' : 'Cadastrar Material'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
