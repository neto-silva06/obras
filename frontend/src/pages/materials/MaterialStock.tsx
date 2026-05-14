import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useParams, useNavigate } from 'react-router-dom';
import { stockApi } from '../../services/stock.service';
import materialApi from '../../services/materials.api';
import { DataTable } from '../../components/common/DataTable';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Spinner } from '../../components/ui/Spinner';
import { ArrowLeft, Package, Warehouse } from 'lucide-react';
import toast from 'react-hot-toast';
=======
import { useParams, Link, useNavigate } from 'react-router-dom';
import { stockApi } from '../../services/stock.service.js';
import materialApi from '../../services/materials.api.js';
import { DataTable } from '../../components/common/DataTable.js';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '../../components/common/Button.js';
>>>>>>> main

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
        setLoading(true);
        const [stockRes, materialRes] = await Promise.all([
          stockApi.getByMaterial(id!),
          materialApi.getById(id!)
        ]);
        setStocks(stockRes.data);
        setMaterial(materialRes.data);
      } catch (error) {
        toast.error('Erro ao carregar distribuição do material');
        navigate('/materials');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id, navigate]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <Spinner />
      <p className="mt-4 text-secondary-500">Buscando estoques...</p>
    </div>
  );

  const totalQuantity = stocks.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
<<<<<<< HEAD
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/materials')} className="p-2 rounded-full h-auto">
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Distribuição de Material</h1>
          <p className="text-secondary-500 text-sm">Visualizando estoque de {material?.name} em todos os depósitos.</p>
=======
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Distribuição: {material?.name}</h1>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} title="Dashboard">
            <LayoutDashboard size={20} className="mr-2" /> Dashboard
          </Button>
          <Link to="/materials" className="text-blue-500 hover:underline">Voltar aos Materiais</Link>
>>>>>>> main
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-600 text-white">
          <p className="text-primary-100 text-sm font-medium">Estoque Total</p>
          <p className="text-3xl font-bold mt-1">
            {totalQuantity} <span className="text-xl font-normal opacity-80">{material?.unit}</span>
          </p>
        </Card>
        <Card>
          <p className="text-secondary-500 text-sm font-medium">Depósitos com Item</p>
          <p className="text-3xl font-bold mt-1 text-secondary-900">{stocks.length}</p>
        </Card>
        <Card>
          <p className="text-secondary-500 text-sm font-medium">Média por Depósito</p>
          <p className="text-3xl font-bold mt-1 text-secondary-900">
            {stocks.length > 0 ? (totalQuantity / stocks.length).toFixed(2) : 0}
          </p>
        </Card>
      </div>

      <Card title="Detalhamento por Depósito">
        <DataTable
          data={stocks}
          columns={[
            {
              header: 'Depósito',
              accessor: (row: StockItem) => (
                <div className="flex items-center gap-3">
                  <Warehouse size={16} className="text-secondary-400" />
                  <span className="font-medium text-secondary-900">{row.warehouse.name}</span>
                </div>
              )
            },
            {
              header: 'Quantidade em Estoque',
              accessor: (row: StockItem) => (
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${row.quantity < 10 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {row.quantity}
                  </span>
                  <span className="text-xs text-secondary-500 font-medium uppercase">{material?.unit}</span>
                  {row.quantity < 10 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-700 font-bold uppercase">
                      Estoque Baixo
                    </span>
                  )}
                </div>
              )
            },
            {
              header: 'Ação',
              accessor: (row: StockItem) => (
                <Button
                  variant="outline"
                  onClick={() => navigate(`/warehouses/${row.warehouse.id}/stock`)}
                >
                  Ir para Depósito
                </Button>
              )
            }
          ]}
          emptyMessage="Este material não possui estoque em nenhum depósito no momento."
        />
      </Card>
    </div>
  );
}
