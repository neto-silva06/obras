import api from './api';

export const stockApi = {
  getByWarehouse: (warehouseId: string) => api.get(`/stocks/warehouse/${warehouseId}`),
  getByMaterial: (materialId: string) => api.get(`/stocks/material/${materialId}`),
  update: (warehouseId: string, materialId: string, quantity: number) =>
    api.put(`/stocks/${warehouseId}/${materialId}`, { quantity }),
  adjust: (data: { warehouseId: string; materialId: string; quantity: number; operation: 'add' | 'remove' | 'set' }) =>
    api.post('/stocks/adjust', data),
};
