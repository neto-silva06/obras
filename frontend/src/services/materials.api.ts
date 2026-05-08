import api from './api';
import { Material, MaterialService } from './materials.service';

const MaterialServiceImplementation: MaterialService = {
  async getAll() {
    const { data } = await api.get<Material[]>('/materials');
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Material>(`/materials/${id}`);
    return data;
  },
  async create(material) {
    const { data } = await api.post<Material>('/materials', material);
    return data;
  },
  async update(id, material) {
    const { data } = await api.put<Material>(`/materials/${id}`, material);
    return data;
  },
  async delete(id) {
    await api.delete(`/materials/${id}`);
  }
};

export default MaterialServiceImplementation;
