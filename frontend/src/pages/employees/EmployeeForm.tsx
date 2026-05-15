import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Users, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { Card } from '../../components/ui/Card.js';
import employeeApi from '../../services/employees.api.js';
import toast from 'react-hot-toast';

export function EmployeeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    dailyRate: 0,
  });

  useEffect(() => {
    if (isEditing && id) {
      const fetchEmployee = async () => {
        try {
          const data = await employeeApi.getById(id);
          setFormData({
            name: data.name,
            jobTitle: data.jobTitle,
            dailyRate: data.dailyRate,
          });
        } catch (error) {
          toast.error('Erro ao carregar dados do funcionário');
          navigate('/employees');
        }
      };
      fetchEmployee();
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && id) {
        await employeeApi.update(id, formData);
        toast.success('Funcionário atualizado com sucesso');
      } else {
        await employeeApi.create(formData);
        toast.success('Funcionário cadastrado com sucesso');
      }
      navigate('/employees');
    } catch (error) {
      toast.error('Erro ao salvar funcionário');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">
            {isEditing ? 'Editar Funcionário' : 'Novo Funcionário'}
          </h1>
          <p className="text-secondary-500 text-sm">
            {isEditing ? 'Atualize as informações do trabalhador.' : 'Cadastre um novo trabalhador no sistema.'}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/employees')}>
          <ArrowLeft size={18} className="mr-2" /> Voltar
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Cargo / Função"
            placeholder="Ex: Pedreiro, Ajudante, Eletricista"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            required
          />

          <Input
            label="Valor da Diária (R$)"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={formData.dailyRate}
            onChange={(e) => setFormData({ ...formData, dailyRate: parseFloat(e.target.value) || 0 })}
            required
          />

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employees')}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Salvando...' : (
                <>
                  <Save size={18} className="mr-2" />
                  {isEditing ? 'Salvar Alterações' : 'Cadastrar Funcionário'}
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
