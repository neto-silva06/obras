import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HardHat,
  Package,
  Warehouse,
  ArrowRightLeft,
  Users,
  TrendingUp,
  Clock,
  Plus,
  UserCheck
} from 'lucide-react';
import { Card } from '../components/ui/Card.js';
import { Button } from '../components/ui/Button.js';
import { Spinner } from '../components/ui/Spinner.js';
import workApi from '../services/works.api.js';
import materialApi from '../services/materials.api.js';
import warehouseApi from '../services/warehouses.api.js';
import { useAuth } from '../hooks/useAuth.js';
import toast from 'react-hot-toast';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    works: 0,
    materials: 0,
    warehouses: 0,
    movements: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [works, materials, warehouses] = await Promise.all([
          workApi.getAll(),
          materialApi.getAll(),
          warehouseApi.getAll()
        ]);

        setStats({
          works: works.length,
          materials: materials.length,
          warehouses: warehouses.length,
          movements: 0 // Mock por enquanto
        });
      } catch (error) {
        toast.error('Erro ao carregar estatísticas do dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: 'Obras Ativas', value: stats.works, icon: HardHat, color: 'text-blue-600', bg: 'bg-blue-100', to: '/works' },
    { label: 'Materiais no Catálogo', value: stats.materials, icon: Package, color: 'text-orange-600', bg: 'bg-orange-100', to: '/materials' },
    { label: 'Depósitos Cadastrados', value: stats.warehouses, icon: Warehouse, color: 'text-green-600', bg: 'bg-green-100', to: '/warehouses' },
    { label: 'Funcionários Cadastrados', value: '-', icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-100', to: '/employees' },
  ];

  const quickActions = [
    { label: 'Nova Obra', icon: Plus, to: '/works/new', adminOnly: true },
    { label: 'Novo Material', icon: Plus, to: '/materials/new', adminOnly: true },
    { label: 'Movimentar Estoque', icon: ArrowRightLeft, to: '/stock-movement' },
    { label: 'Diário de Obra', icon: Clock, to: '/works' },
    { label: 'Relatórios de Custos', icon: TrendingUp, to: '/works' },
    { label: 'Gestão de Usuários', icon: Users, to: '/users', adminOnly: true },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Bem-vindo, {user?.name}!</h1>
        <p className="text-secondary-500">Aqui está um resumo do que está acontecendo no sistema.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.label}
            className="cursor-pointer"
            onClick={() => navigate(card.to)}
          >
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-500 uppercase tracking-wider">{card.label}</p>
                  <p className="text-3xl font-bold text-secondary-900 mt-1">{card.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                  <card.icon size={24} />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ações Rápidas */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-secondary-900">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              if (action.adminOnly && user?.role !== 'ADMIN') return null;

              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 border-secondary-200 hover:border-primary-500 hover:text-primary-600"
                  onClick={() => navigate(action.to)}
                >
                  <action.icon size={24} />
                  <span className="text-sm font-semibold">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Informações Extras / Atalhos */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-secondary-900">Suporte e Ajuda</h2>
          <Card className="p-6 bg-primary-900 text-white border-none">
            <h3 className="font-bold mb-2">Dica do Dia</h3>
            <p className="text-sm text-primary-200 leading-relaxed">
              Use o "Diário de Obra" para registrar diariamente a presença da equipe e os materiais gastos. Isso ajuda a manter o custo da obra sempre atualizado!
            </p>
            <Button
              className="mt-4 w-full bg-white text-primary-900 hover:bg-primary-50"
              onClick={() => navigate('/works')}
            >
              Começar agora
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
