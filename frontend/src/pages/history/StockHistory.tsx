import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, LayoutDashboard, Search, ArrowUpCircle, ArrowDownCircle, Settings } from 'lucide-react';
import { Button } from '../../components/ui/Button.js';
import { Card } from '../../components/ui/Card.js';
import { Spinner } from '../../components/ui/Spinner.js';
import { stockMovementService, StockMovement } from '../../services/stock-movement.service.js';
import toast from 'react-hot-toast';

export function StockHistory() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await stockMovementService.getAll();
        setMovements(data);
      } catch (error) {
        toast.error('Erro ao carregar histórico');
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  const filteredMovements = movements.filter(m =>
    m.material?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.warehouse?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-center"><Spinner /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Histórico de Movimentações</h1>
          <p className="text-secondary-500">Log completo de todas as entradas e saídas de estoque</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
          <LayoutDashboard size={20} className="mr-2" /> Dashboard
        </Button>
      </div>

      <Card>
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-secondary-400" />
          </div>
          <input
            type="text"
            placeholder="Filtrar por material, depósito ou usuário..."
            className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-md leading-5 bg-white placeholder-secondary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-secondary-200">
            <thead className="bg-secondary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Depósito</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">Qtd</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">Obs</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                    {new Date(m.createdAt).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-secondary-900">{m.material?.name}</div>
                    <div className="text-xs text-secondary-500">{m.material?.unit}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {m.warehouse?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {m.type === 'add' && (
                      <span className="flex items-center text-green-600 text-xs font-bold">
                        <ArrowUpCircle size={14} className="mr-1" /> Entrada
                      </span>
                    )}
                    {m.type === 'remove' && (
                      <span className="flex items-center text-red-600 text-xs font-bold">
                        <ArrowDownCircle size={14} className="mr-1" /> Saída
                      </span>
                    )}
                    {m.type === 'set' && (
                      <span className="flex items-center text-blue-600 text-xs font-bold">
                        <Settings size={14} className="mr-1" /> Ajuste
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-secondary-900">
                    {m.quantity.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900">
                    {m.user?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary-500 max-w-xs truncate" title={m.description || ''}>
                    {m.description || '-'}
                  </td>
                </tr>
              ))}
              {filteredMovements.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-secondary-500 italic">
                    Nenhuma movimentação encontrada para os filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
