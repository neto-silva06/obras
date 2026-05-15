import api from './api.js';

export interface StockAdjustData {
  warehouseId: string;
  materialId: string;
  quantity: number;
  operation: 'add' | 'remove' | 'set';
  description?: string;
}

export const stockApi = {
  getByWarehouse: (warehouseId: string) => api.get(`/stocks/warehouse/${warehouseId}`),
  getByMaterial: (materialId: string) => api.get(`/stocks/material/${materialId}`),
  update: (warehouseId: string, materialId: string, quantity: number) =>
    api.put(`/stocks/${warehouseId}/${materialId}`, { quantity }),
  adjust: (data: StockAdjustData) =>
    api.post('/stocks/adjust', data),
};
