import axios from 'axios';
import { db } from '../offline/db.js';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    // Cache GET requests
    if (response.config.method === 'get' && response.config.url) {
      const cacheKey = response.config.url;
      await db.cache.put({
        key: cacheKey,
        data: response.data,
        timestamp: Date.now()
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    // Skip offline logic for sync requests to avoid infinite loops
    if (originalRequest.headers?.['X-Skip-Sync-Queue']) {
      return Promise.reject(error);
    }

    // Handle Offline / Network Error
    if (!error.response && (originalRequest.method !== 'get')) {
      // It's a mutation (POST, PUT, DELETE) and we're likely offline
      if (originalRequest.url) {
        const requestData = typeof originalRequest.data === 'string'
          ? JSON.parse(originalRequest.data)
          : originalRequest.data;

        const id = await db.syncQueue.add({
          url: originalRequest.url,
          method: originalRequest.method.toUpperCase() as any,
          data: requestData,
          timestamp: Date.now(),
          status: 'pending'
        });

        toast.success('Você está offline. A alteração foi salva localmente e será sincronizada em breve.');

        // Return a mock success with offline flag and id
        return Promise.resolve({
          data: {
            ...requestData,
            id: `offline-${id}`,
            _isOffline: true,
            _syncId: id
          },
          status: 202
        });
      }
    }

    // Try to serve from cache for GET requests if offline
    if (!error.response && originalRequest.method === 'get') {
      const cached = await db.cache.get(originalRequest.url);
      if (cached) {
        toast('Exibindo dados offline', { icon: '📴' });
        return Promise.resolve({ data: cached.data, status: 200, fromCache: true });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
