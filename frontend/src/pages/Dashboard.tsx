import { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

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

  if (loading) return <div className="p-8">Carregando Dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Painel de Controle</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
          <p className="text-blue-600 font-medium">Total de Obras</p>
          <p className="text-4xl font-bold">{metrics.works}</p>
          <Link to="/works" className="text-sm text-blue-500 hover:underline mt-2 block">Ver todas</Link>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
          <p className="text-green-600 font-medium">Materiais Cadastrados</p>
          <p className="text-4xl font-bold">{metrics.materials}</p>
          <Link to="/materials" className="text-sm text-green-500 hover:underline mt-2 block">Ver todos</Link>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
          <p className="text-purple-600 font-medium">Depósitos Ativos</p>
          <p className="text-4xl font-bold">{metrics.warehouses}</p>
          <Link to="/warehouses" className="text-sm text-purple-500 hover:underline mt-2 block">Ver todos</Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="flex gap-4">
          <Link to="/works/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Cadastrar Obra</Link>
          <Link to="/materials/new" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">Cadastrar Material</Link>
          <Link to="/warehouses/new" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">Criar Depósito</Link>
        </div>
      </div>
    </div>
  );
}
