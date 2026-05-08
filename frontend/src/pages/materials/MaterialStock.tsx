import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { stockApi } from '../../services/stock.service';
import { materialApi } from '../../services/materials.api';
import { DataTable } from '../../components/common/DataTable';
import { Link } from 'react-router-dom';

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
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [material, setMaterial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [stockRes, materialRes] = await Promise.all([
          stockApi.getByMaterial(id!),
          materialApi.get(id!)
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
        <Link to="/materials" className="text-blue-500">Voltar aos Materiais</Link>
      </div>

      <DataTable
        data={stocks}
        columns={[
          { key: 'warehouse.name', label: 'Depósito', render: (row) => row.warehouse.name },
          { key: 'quantity', label: 'Quantidade', render: (row) => (
            <span className={`font-bold ${row.quantity < 10 ? 'text-red-500' : ''}`}>
              {row.quantity} {material?.unit}
            </span>
          )},
        ]}
      />
    </div>
  );
}
