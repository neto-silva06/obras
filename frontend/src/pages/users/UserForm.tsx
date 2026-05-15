import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Input } from '../../components/ui/Input.js';
import { Card } from '../../components/ui/Card.js';
import { userService } from '../../services/users.service.js';
import toast from 'react-hot-toast';

export function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER' as 'ADMIN' | 'USER'
  });

  useEffect(() => {
    if (id) {
      async function loadUser() {
        try {
          const users = await userService.getAll();
          const user = users.find(u => u.id === id);
          if (user) {
            setFormData({
              name: user.name,
              email: user.email,
              password: '',
              role: user.role
            });
          }
        } catch (error) {
          toast.error('Erro ao carregar usuário');
        }
      }
      loadUser();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        const updateData: any = { ...formData };
        if (!updateData.password) delete updateData.password;
        await userService.update(id, updateData);
        toast.success('Usuário atualizado com sucesso');
      } else {
        if (!formData.password) {
          toast.error('Senha é obrigatória para novos usuários');
          setLoading(false);
          return;
        }
        await userService.create(formData);
        toast.success('Usuário criado com sucesso');
      }
      navigate('/users');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/users')} className="p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold text-secondary-900">
            {id ? 'Editar Usuário' : 'Novo Usuário'}
          </h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
          <LayoutDashboard size={20} className="mr-2" /> Dashboard
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome Completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label={id ? "Senha (deixe em branco para não alterar)" : "Senha"}
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required={!id}
            minLength={6}
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Papel / Nível de Acesso</label>
            <select
              className="w-full p-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'ADMIN' | 'USER' })}
              required
            >
              <option value="USER">Usuário (Apenas consulta e movimentação)</option>
              <option value="ADMIN">Administrador (Acesso total)</option>
            </select>
          </div>

          <div className="flex justify-end pt-4 border-t border-secondary-100">
            <Button type="submit" isLoading={loading} className="w-full sm:w-auto">
              <Save size={18} className="mr-2" /> Salvar Usuário
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
