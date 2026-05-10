import api from './api.js';
import type { Warehouse, WarehouseService } from './warehouses.service.js';

const WarehouseServiceImplementation: WarehouseService = {
  async getAll() {
    const { data } = await api.get<Warehouse[]>('/warehouses');
    return data;
  },
  async getByWorkId(workId: string) {
    const { data } = await api.get<Warehouse[]>(`/warehouses?workId=${workId}`);
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Warehouse>(`/warehouses/${id}`);
    return data;
  },
  async create(warehouse) {
    const { data } = await api.post<Warehouse>('/warehouses', warehouse);
    return data;
  },
  async update(id, warehouse) {
    const { data } = await api.put<Warehouse>(`/warehouses/${id}`, warehouse);
    return data;
  },
  async delete(id) {
    await api.delete(`/warehouses/${id}`);
  }
};

export default WarehouseServiceImplementation;
