import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stockApi } from '../../services/stock.service';
import materialApi from '../../services/materials.api';
import warehouseApi from '../../services/warehouses.api';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeft, PlusCircle, MinusCircle, RefreshCcw, Package } from 'lucide-react';
import toast from 'react-hot-toast';

interface StockItem {
  id: string;
  quantity: number;
  material: {
    id: string;
    name: string;
    unit: string;
  };
}

export function WarehouseStock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [warehouse, setWarehouse] = useState<any>(null);
  const [materials, setMaterials] = useState<any[]>([]);
  const [adjustment, setAdjustment] = useState<{ materialId: string; quantity: number; operation: 'add' | 'remove' | 'set' }>({ materialId: '', quantity: 0, operation: 'add' });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const [stockRes, warehouseRes, materialRes] = await Promise.all([
        stockApi.getByWarehouse(id!),
        warehouseApi.getById(id!),
        materialApi.getAll()
      ]);
      setStocks(stockRes.data);
      setWarehouse(warehouseRes.data);
      setMaterials(materialRes);
    } catch (error) {
      toast.error('Erro ao carregar dados de estoque');
      navigate('/warehouses');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdjust() {
    if (!adjustment.materialId) {
      toast.error('Selecione um material');
      return;
    }
    if (adjustment.quantity <= 0) {
      toast.error('A quantidade deve ser maior que zero');
      return;
    }

    setIsUpdating(true);
    try {
      await stockApi.adjust({
        warehouseId: id!,
        ...adjustment
      });
      toast.success('Estoque atualizado com sucesso!');
      setAdjustment({ ...adjustment, quantity: 0 });
      await loadData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao ajustar estoque');
    } finally {
      setIsUpdating(false);
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Spinner />
      <p className="mt-4 text-secondary-500">Buscando informações do depósito...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/warehouses')} className="p-2 rounded-full h-auto">
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Estoque: {warehouse?.name}</h1>
            <p className="text-secondary-500 text-sm">Gerencie entradas e saídas de materiais neste local.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-secondary-900 flex items-center gap-2">
              <Package size={20} className="text-primary-600" />
              Materiais Disponíveis
            </h2>
            <span className="text-xs text-secondary-500 uppercase font-bold tracking-wider">
              {stocks.length} Itens cadastrados
            </span>
          </div>
          <DataTable
            data={stocks}
            columns={[
              {
                header: 'Material',
                accessor: (row) => <span className="font-medium text-secondary-900">{row.material.name}</span>
              },
              {
                header: 'Quantidade Atual',
                accessor: (row) => (
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${row.quantity < 10 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {row.quantity}
                    </span>
                    <span className="text-xs text-secondary-500 uppercase">{row.material.unit}</span>
                  </div>
                )
              },
            ]}
            emptyMessage="Este depósito está vazio no momento."
          />
        </div>

        <div className="h-fit sticky top-8">
          <Card className="border-primary-100 shadow-lg shadow-primary-900/5">
            <h2 className="text-lg font-semibold text-secondary-900 mb-6 flex items-center gap-2">
              <RefreshCcw size={20} className="text-primary-600" />
              Movimentar Estoque
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-secondary-700 block mb-1">Material</label>
                <select
                  className="w-full px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                  value={adjustment.materialId}
                  onChange={(e) => setAdjustment({ ...adjustment, materialId: e.target.value })}
                >
                  <option value="">Selecione um item...</option>
                  {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                </select>
              </div>

              <Input
                label="Quantidade"
                type="number"
                min="0"
                step="0.01"
                value={adjustment.quantity}
                onChange={(e) => setAdjustment({ ...adjustment, quantity: Number(e.target.value) })}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-secondary-700 block">Tipo de Operação</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAdjustment({ ...adjustment, operation: 'add' })}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      adjustment.operation === 'add'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-secondary-200 text-secondary-500 hover:bg-secondary-50'
                    }`}
                  >
                    <PlusCircle size={20} />
                    <span className="text-[10px] font-bold uppercase">Entrada</span>
                  </button>
                  <button
                    onClick={() => setAdjustment({ ...adjustment, operation: 'remove' })}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      adjustment.operation === 'remove'
                        ? 'bg-red-50 border-red-500 text-red-700'
                        : 'border-secondary-200 text-secondary-500 hover:bg-secondary-50'
                    }`}
                  >
                    <MinusCircle size={20} />
                    <span className="text-[10px] font-bold uppercase">Saída</span>
                  </button>
                  <button
                    onClick={() => setAdjustment({ ...adjustment, operation: 'set' })}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                      adjustment.operation === 'set'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-secondary-200 text-secondary-500 hover:bg-secondary-50'
                    }`}
                  >
                    <RefreshCcw size={20} />
                    <span className="text-[10px] font-bold uppercase">Ajuste</span>
                  </button>
                </div>
              </div>

              <Button
                className="w-full mt-4 h-12"
                onClick={handleAdjust}
                isLoading={isUpdating}
              >
                Confirmar Operação
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
