import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { HardHat, Package, Warehouse, PlusCircle, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const [metrics, setMetrics] = useState({
    works: 0,
    materials: 0,
    warehouses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const [worksRes, materialsRes, warehousesRes] = await Promise.all([
          api.get('/works'),
          api.get('/materials'),
          api.get('/warehouses')
        ]);
        setMetrics({
          works: worksRes.data.length,
          materials: materialsRes.data.length,
          warehouses: warehousesRes.data.length
        });
      } catch (error) {
        console.error('Erro ao carregar métricas', error);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Spinner />
      <p className="mt-4 text-secondary-500 animate-pulse">Carregando indicadores...</p>
    </div>
  );

  const stats = [
    {
      label: 'Total de Obras',
      value: metrics.works,
      icon: HardHat,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      link: '/works'
    },
    {
      label: 'Materiais no Catálogo',
      value: metrics.materials,
      icon: Package,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      link: '/materials'
    },
    {
      label: 'Depósitos Ativos',
      value: metrics.warehouses,
      icon: Warehouse,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      link: '/warehouses'
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-secondary-900">Painel de Controle</h1>
        <p className="text-secondary-500 mt-2">Visão geral do seu sistema de gerenciamento de obras.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={28} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-secondary-500">{stat.label}</p>
                <p className="text-3xl font-bold text-secondary-900">{stat.value}</p>
              </div>
              <Link to={stat.link} className="text-secondary-400 hover:text-primary-600 transition-colors">
                <ArrowRight size={20} />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Ações Rápidas">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/works/new">
              <div className="p-4 border border-secondary-100 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-all group flex items-center gap-3">
                <PlusCircle className="text-primary-600" size={24} />
                <div>
                  <p className="font-semibold text-secondary-900">Nova Obra</p>
                  <p className="text-xs text-secondary-500">Cadastrar novo empreendimento</p>
                </div>
              </div>
            </Link>
            <Link to="/materials/new">
              <div className="p-4 border border-secondary-100 rounded-lg hover:bg-orange-50 hover:border-orange-200 transition-all group flex items-center gap-3">
                <PlusCircle className="text-orange-600" size={24} />
                <div>
                  <p className="font-semibold text-secondary-900">Novo Material</p>
                  <p className="text-xs text-secondary-500">Adicionar item ao catálogo</p>
                </div>
              </div>
            </Link>
            <Link to="/warehouses/new">
              <div className="p-4 border border-secondary-100 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition-all group flex items-center gap-3">
                <PlusCircle className="text-emerald-600" size={24} />
                <div>
                  <p className="font-semibold text-secondary-900">Novo Depósito</p>
                  <p className="text-xs text-secondary-500">Vincular estoque a uma obra</p>
                </div>
              </div>
            </Link>
          </div>
        </Card>

        <Card title="Resumo do Sistema">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-secondary-50">
              <span className="text-secondary-600">Status da API</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Operacional
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-secondary-50">
              <span className="text-secondary-600">Última Atualização</span>
              <span className="text-sm text-secondary-900 font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="pt-4">
              <p className="text-sm text-secondary-500 italic">
                Utilize o menu lateral para navegar entre os módulos de gerenciamento.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
