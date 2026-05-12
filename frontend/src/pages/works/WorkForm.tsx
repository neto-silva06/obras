import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
import { FormField } from '../../components/common/FormField.js';
import workApi from '../../services/works.api.js';
import type { Work } from '../../services/works.service.js';

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

  useEffect(() => {
    if (isEdit && id) {
      const loadWork = async () => {
        try {
          const data = await workApi.getById(id);
          setWork(data);
        } catch (error) {
          alert('Erro ao carregar obra');
        }
      };
      loadWork();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await workApi.update(id, work);
      } else {
        await workApi.create(work);
      }
      alert(isEdit ? 'Obra atualizada!' : 'Obra criada!');
      navigate('/works');
    } catch (error) {
      alert('Erro ao salvar obra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Obra' : 'Nova Obra'}
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} title="Dashboard">
            <LayoutDashboard size={18} />
          </Button>
          <Button variant="ghost" onClick={() => navigate('/works')}>
            <X size={18} />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <FormField
          label="Nome da Obra"
          name="name"
          value={work.name}
          onChange={(val) => setWork({ ...work, name: val })}
          required
        />
        <FormField
          label="Endereço"
          name="address"
          value={work.address}
          onChange={(val) => setWork({ ...work, address: val })}
          required
        />
        <FormField
          label="Descrição"
          name="description"
          type="textarea"
          value={work.description}
          onChange={(val) => setWork({ ...work, description: val })}
        />
        <FormField
          label="Status"
          name="status"
          type="select"
          options={[
            { label: 'Em Andamento', value: 'IN_PROGRESS' },
            { label: 'Concluída', value: 'COMPLETED' },
            { label: 'Suspensa', value: 'SUSPENDED' },
          ]}
          value={work.status}
          onChange={(val) => setWork({ ...work, status: val })}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" type="button" onClick={() => navigate('/works')}>
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
