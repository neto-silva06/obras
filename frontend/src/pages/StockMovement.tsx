import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Save } from 'lucide-react';
import { Button } from '../components/common/Button.js';
import { FormField } from '../components/common/FormField.js';
import { stockApi } from '../services/stock.service.js';
import materialApi from '../services/materials.api.js';
import warehouseApi from '../services/warehouses.api.js';
import type { Material } from '../services/materials.service.js';
import type { Warehouse } from '../services/warehouses.service.js';

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
    operation: 'add' as 'add' | 'remove' | 'set'
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
        alert('Erro ao carregar dados para movimentação');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.warehouseId || !formData.materialId || formData.quantity <= 0) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    setSubmitting(true);
    try {
      await stockApi.adjust(formData);
      alert('Movimentação realizada com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Erro ao realizar movimentação');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-600">Carregando...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Movimentação de Estoque</h1>
        <Button variant="ghost" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
          <LayoutDashboard size={20} className="mr-2" /> Dashboard
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Depósito</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.warehouseId}
            onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
            required
          >
            <option value="">Selecione o depósito</option>
            {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
          <select
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
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

        <FormField
          label="Quantidade"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={(val) => setFormData({ ...formData, quantity: Number(val) })}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Operação</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="mr-2"
                name="operation"
                checked={formData.operation === 'add'}
                onChange={() => setFormData({ ...formData, operation: 'add' })}
              />
              Entrada (+)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="mr-2"
                name="operation"
                checked={formData.operation === 'remove'}
                onChange={() => setFormData({ ...formData, operation: 'remove' })}
              />
              Saída (-)
            </label>
            <label className="flex items-center cursor-pointer">
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

        <div className="flex justify-end pt-4 border-t">
          <Button type="submit" isLoading={submitting} className="w-full sm:w-auto">
            <Save size={18} className="mr-2" /> Confirmar Movimentação
          </Button>
        </div>
      </form>
    </div>
  );
}
