import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stockApi } from '../../services/stock.service';
import { materialApi } from '../../services/materials.api';
import { warehouseApi } from '../../services/warehouses.api';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';

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
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [warehouse, setWarehouse] = useState<any>(null);
  const [materials, setMaterials] = useState<any[]>([]);
  const [adjustment, setAdjustment] = useState({ materialId: '', quantity: 0, operation: 'add' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const [stockRes, warehouseRes, materialRes] = await Promise.all([
        stockApi.getByWarehouse(id!),
        warehouseApi.get(id!),
        materialApi.list()
      ]);
      setStocks(stockRes.data);
      setWarehouse(warehouseRes.data);
      setMaterials(materialRes.data);
    } catch (error) {
      alert('Erro ao carregar dados de estoque');
    } finally {
      setLoading(false);
    }
  }

  async function handleAdjust() {
    if (!adjustment.materialId || adjustment.quantity <= 0) return;
    try {
      await stockApi.adjust({
        warehouseId: id!,
        ...adjustment
      });
      alert('Estoque atualizado com sucesso!');
      await loadData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao ajustar estoque');
    }
  }

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Estoque: {warehouse?.name}</h1>
        <Link to="/warehouses" className="text-blue-500">Voltar aos Depósitos</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Materiais em Estoque</h2>
          <DataTable
            data={stocks}
            columns={[
              { key: 'material.name', label: 'Material', render: (row) => row.material.name },
              { key: 'quantity', label: 'Quantidade', render: (row) => (
                <span className={`font-bold ${row.quantity < 10 ? 'text-red-500' : ''}`}>
                  {row.quantity} {row.material.unit}
                </span>
              )},
            ]}
          />
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4">Movimentação de Estoque</h2>
          <div className="space-y-4">
            <FormField
              label="Material"
              value={adjustment.materialId}
              onChange={(val) => setAdjustment({ ...adjustment, materialId: val })}
            >
              <select className="w-full p-2 border rounded">
                <option value="">Selecione o material</option>
                {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </FormField>

            <FormField
              label="Quantidade"
              type="number"
              value={adjustment.quantity}
              onChange={(val) => setAdjustment({ ...adjustment, quantity: Number(val) })}
            />

            <div className="flex gap-2">
              <Button
                onClick={() => setAdjustment({...adjustment, operation: 'add'})}
                className={adjustment.operation === 'add' ? 'bg-blue-600' : 'bg-gray-400'}
              >Entrada</Button>
              <Button
                onClick={() => setAdjustment({...adjustment, operation: 'remove'})}
                className={adjustment.operation === 'remove' ? 'bg-blue-600' : 'bg-gray-400'}
              >Saída</Button>
              <Button
                onClick={() => setAdjustment({...adjustment, operation: 'set'})}
                className={adjustment.operation === 'set' ? 'bg-blue-600' : 'bg-gray-400'}
              >Ajuste</Button>
            </div>

            <Button
              className="w-full mt-4 bg-green-600 text-white"
              onClick={handleAdjust}
            >
              Confirmar Operação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
