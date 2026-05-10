import api from './api.js';
import type { Work, WorkService } from './works.service.js';

const WorkServiceImplementation: WorkService = {
  async getAll() {
    const { data } = await api.get<Work[]>('/works');
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Work>(`/works/${id}`);
    return data;
  },
  async create(work) {
    const { data } = await api.post<Work>('/works', work);
    return data;
  },
  async update(id, work) {
    const { data } = await api.put<Work>(`/works/${id}`, work);
    return data;
  },
  async delete(id) {
    await api.delete(`/works/${id}`);
  }
};

export default WorkServiceImplementation;
