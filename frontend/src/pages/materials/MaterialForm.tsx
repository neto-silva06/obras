import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import materialApi from '../../services/materials.api';
import { Material } from '../../services/materials.service';

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

  useEffect(() => {
    if (isEdit && id) {
      const loadMaterial = async () => {
        try {
          const data = await materialApi.getById(id);
          setMaterial(data);
        } catch (error) {
          alert('Erro ao carregar material');
        }
      };
      loadMaterial();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit && id) {
        await materialApi.update(id, material);
      } else {
        await materialApi.create(material);
      }
      alert(isEdit ? 'Material atualizado!' : 'Material criado!');
      navigate('/materials');
    } catch (error) {
      alert('Erro ao salvar material');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Editar Material' : 'Novo Material'}
        </h1>
        <Button variant="ghost" onClick={() => navigate('/materials')}>
          <X size={18} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <FormField
          label="Nome do Material"
          name="name"
          value={material.name}
          onChange={(val) => setMaterial({ ...material, name: val })}
          required
        />
        <FormField
          label="Unidade de Medida (ex: UN, KG, M)"
          name="unit"
          value={material.unit}
          onChange={(val) => setMaterial({ ...material, unit: val })}
          required
        />
        <FormField
          label="Descrição"
          name="description"
          type="textarea"
          value={material.description}
          onChange={(val) => setMaterial({ ...material, description: val })}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" type="button" onClick={() => navigate('/materials')}>
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
