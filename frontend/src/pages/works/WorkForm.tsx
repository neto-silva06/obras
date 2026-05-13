import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import workApi from '../../services/works.api';
import type { Work } from '../../services/works.service';
import toast from 'react-hot-toast';

export function WorkForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [work, setWork] = useState<Partial<Work>>({
    name: '',
    address: '',
    description: '',
    status: 'IN_PROGRESS'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const loadWork = async () => {
        try {
          setIsFetching(true);
          const data = await workApi.getById(id);
          setWork(data);
        } catch (error) {
          toast.error('Erro ao carregar detalhes da obra');
          navigate('/works');
        } finally {
          setIsFetching(false);
        }
      };
      loadWork();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await workApi.update(id, work);
        toast.success('Obra atualizada com sucesso!');
      } else {
        await workApi.create(work);
        toast.success('Obra cadastrada com sucesso!');
      }
      navigate('/works');
    } catch (error) {
      toast.error('Erro ao salvar obra. Verifique os campos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/works')} className="p-2 rounded-full h-auto">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {isEdit ? 'Editar Obra' : 'Nova Obra'}
          </h1>
          <p className="text-secondary-500 text-sm">
            {isEdit ? 'Atualize as informações do empreendimento.' : 'Preencha os dados para cadastrar uma nova obra.'}
          </p>
        </div>
      </div>

      <Card>
        {isFetching ? (
          <div className="py-12 flex justify-center">
            <div className="animate-pulse text-secondary-400">Carregando dados da obra...</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nome da Obra"
                placeholder="Ex: Edifício Horizonte"
                value={work.name}
                onChange={(e) => setWork({ ...work, name: e.target.value })}
                required
              />
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-secondary-700">Status</label>
                <select
                  className="px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  value={work.status}
                  onChange={(e) => setWork({ ...work, status: e.target.value })}
                >
                  <option value="IN_PROGRESS">Em Andamento</option>
                  <option value="COMPLETED">Concluída</option>
                  <option value="SUSPENDED">Suspensa</option>
                </select>
              </div>
            </div>

            <Input
              label="Endereço Completo"
              placeholder="Rua, Número, Bairro, Cidade"
              value={work.address}
              onChange={(e) => setWork({ ...work, address: e.target.value })}
              required
            />

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium text-secondary-700">Descrição/Observações</label>
              <textarea
                className="px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px] bg-white hover:border-secondary-400 transition-colors"
                placeholder="Detalhes adicionais sobre a obra..."
                value={work.description}
                onChange={(e) => setWork({ ...work, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-secondary-100">
              <Button variant="outline" type="button" onClick={() => navigate('/works')}>
                Cancelar
              </Button>
              <Button type="submit" isLoading={isLoading}>
                <Save size={18} className="mr-2" />
                {isEdit ? 'Salvar Alterações' : 'Cadastrar Obra'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
