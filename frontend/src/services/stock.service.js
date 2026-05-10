import api from './api.js';
export const stockApi = {
    getByWarehouse: (warehouseId) => api.get(`/stocks/warehouse/${warehouseId}`),
    getByMaterial: (materialId) => api.get(`/stocks/material/${materialId}`),
    update: (warehouseId, materialId, quantity) => api.put(`/stocks/${warehouseId}/${materialId}`, { quantity }),
    adjust: (data) => api.post('/stocks/adjust', data),
};
//# sourceMappingURL=stock.service.js.map