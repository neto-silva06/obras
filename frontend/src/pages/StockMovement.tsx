import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Save, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button.js';
import { Input } from '../components/ui/Input.js';
import { Card } from '../components/ui/Card.js';
import { stockApi } from '../services/stock.service.js';
import materialApi from '../services/materials.api.js';
import warehouseApi from '../services/warehouses.api.js';
import type { Material } from '../services/materials.service.js';
import type { Warehouse } from '../services/warehouses.service.js';
import toast from 'react-hot-toast';

export function StockMovement() {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    warehouseId: '',
    materialId: '',
    quantity: 0,
    operation: 'add' as 'add' | 'remove' | 'set',
    description: ''
  });

  useEffect(() => {
    async function loadData() {
      try {
        const [wRes, mRes] = await Promise.all([
          warehouseApi.getAll(),
          materialApi.getAll()
        ]);
        setWarehouses(wRes);
        setMaterials(mRes);
      } catch (error) {
        toast.error('Erro ao carregar dados para movimentação');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.warehouseId || !formData.materialId || formData.quantity <= 0) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    setSubmitting(true);
    try {
      const response: any = await stockApi.adjust(formData);

      if (response._isOffline) {
        toast.success('Movimentação salva localmente. Sincronização pendente.');
        navigate('/dashboard');
      } else {
        toast.success('Movimentação realizada com sucesso!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao realizar movimentação');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Carregando...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-secondary-900">Movimentação de Estoque</h1>
          {!navigator.onLine && (
            <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full animate-pulse">
              <Clock size={12} /> Offline
            </span>
          )}
        </div>
        <Button variant="outline" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
          <LayoutDashboard size={20} className="mr-2" /> Dashboard
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Depósito</label>
            <select
              className="w-full p-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              value={formData.warehouseId}
              onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
              required
            >
              <option value="">Selecione o depósito</option>
              {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Material</label>
            <select
              className="w-full p-2 border border-secondary-300 rounded-md focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              value={formData.materialId}
              onChange={(e) => setFormData({ ...formData, materialId: e.target.value })}
              required
            >
              <option value="">Selecione o material</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.unit})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Quantidade"
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">Tipo de Operação</label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer text-secondary-700">
                <input
                  type="radio"
                  className="mr-2"
                  name="operation"
                  checked={formData.operation === 'add'}
                  onChange={() => setFormData({ ...formData, operation: 'add' })}
                />
                Entrada (+)
              </label>
              <label className="flex items-center cursor-pointer text-secondary-700">
                <input
                  type="radio"
                  className="mr-2"
                  name="operation"
                  checked={formData.operation === 'remove'}
                  onChange={() => setFormData({ ...formData, operation: 'remove' })}
                />
                Saída (-)
              </label>
              <label className="flex items-center cursor-pointer text-secondary-700">
                <input
                  type="radio"
                  className="mr-2"
                  name="operation"
                  checked={formData.operation === 'set'}
                  onChange={() => setFormData({ ...formData, operation: 'set' })}
                />
                Ajuste (Fixo)
              </label>
            </div>
          </div>

          <Input
            label="Observação (Opcional)"
            placeholder="Ex: Nota fiscal 123, Devolução de obra..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="flex justify-end pt-4 border-t border-secondary-100">
            <Button type="submit" isLoading={submitting} className="w-full sm:w-auto">
              <Save size={18} className="mr-2" /> Confirmar {navigator.onLine ? 'Movimentação' : 'Localmente'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
