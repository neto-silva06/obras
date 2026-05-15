import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Shield, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Card } from '../../components/ui/Card.js';
import { Spinner } from '../../components/ui/Spinner.js';
import { userService, User } from '../../services/users.service.js';
import toast from 'react-hot-toast';

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      toast.error('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await userService.delete(id);
        toast.success('Usuário excluído com sucesso');
        loadUsers();
      } catch (error) {
        toast.error('Erro ao excluir usuário');
      }
    }
  };

  if (loading) return <div className="p-8 text-center"><Spinner /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Gerenciar Usuários</h1>
          <p className="text-secondary-500">Controle de acesso ao sistema</p>
        </div>
        <div className="flex gap-2">
          <Link to="/users/new">
            <Button>
              <Plus size={18} className="mr-2" /> Novo Usuário
            </Button>
          </Link>
          <Button variant="outline" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
            <LayoutDashboard size={20} className="mr-2" /> Dashboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${user.role === 'ADMIN' ? 'bg-primary-600' : 'bg-slate-400'}`} />

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${user.role === 'ADMIN' ? 'bg-primary-50 text-primary-600' : 'bg-slate-50 text-slate-600'}`}>
                  {user.role === 'ADMIN' ? <Shield size={24} /> : <UserIcon size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-secondary-900">{user.name}</h3>
                  <p className="text-sm text-secondary-500">{user.email}</p>
                </div>
              </div>

              <div className="flex gap-1">
                <Link to={`/users/${user.id}/edit`}>
                  <Button variant="outline" className="p-2 h-auto">
                    <Edit2 size={14} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="p-2 h-auto text-red-600 hover:bg-red-50 hover:border-red-200"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-secondary-50 flex items-center justify-between">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                user.role === 'ADMIN' ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {user.role}
              </span>
              <span className="text-xs text-secondary-400">
                Criado em: {new Date(user.createdAt!).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
