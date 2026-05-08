import api from './api';

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  async register(userData: any) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout() {
    localStorage.removeItem('token');
  }
};
