import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { stockApi } from '../../services/stock.service.js';
import materialApi from '../../services/materials.api.js';
import { DataTable } from '../../components/common/DataTable.js';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';

interface StockItem {
  id: string;
  quantity: number;
  warehouse: {
    id: string;
    name: string;
  };
}

export function MaterialStock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [stockRes, materialRes] = await Promise.all([
          stockApi.getByMaterial(id!),
          materialApi.getById(id!)
        ]);
        setStocks(stockRes.data);
        setMaterial(materialRes.data);
      } catch (error) {
        alert('Erro ao carregar distribuição de material');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Distribuição: {material?.name}</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} title="Dashboard">
            <LayoutDashboard size={20} className="mr-2" /> Dashboard
          </Button>
          <Link to="/materials" className="text-blue-500 hover:underline">Voltar aos Materiais</Link>
        </div>
      </div>

      <DataTable
        data={stocks}
        columns={[
          { header: 'Depósito', accessor: (row: StockItem) => row.warehouse.name },
          {
            header: 'Quantidade',
            accessor: (row: StockItem) => (
              <span className={`font-bold ${row.quantity < 10 ? 'text-red-500' : ''}`}>
                {row.quantity} {material?.unit}
              </span>
            )
          }
        ]}
      />
    </div>
  );
}
