import api from './api.js';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  createdAt?: string;
}

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },
  async create(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const response = await api.post('/users', data);
    return response.data;
  },
  async update(id: string, data: Partial<Omit<User, 'id' | 'createdAt'>>): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },
  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
};
