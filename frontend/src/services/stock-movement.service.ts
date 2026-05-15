import api from './api.js';

export interface StockMovement {
  id: string;
  type: 'add' | 'remove' | 'set';
  quantity: number;
  description: string | null;
  materialId: string;
  warehouseId: string;
  userId: string;
  createdAt: string;
  material?: { name: string; unit: string };
  warehouse?: { name: string };
  user?: { name: string };
}

export const stockMovementService = {
  async getAll(): Promise<StockMovement[]> {
    const response = await api.get('/stock-movements');
    return response.data;
  },
  async getByMaterial(materialId: string): Promise<StockMovement[]> {
    const response = await api.get(`/stock-movements/material/${materialId}`);
    return response.data;
  }
};
