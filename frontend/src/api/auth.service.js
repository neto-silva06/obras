import api from './api.js';
export const authService = {
    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },
    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout() {
        localStorage.removeItem('token');
    }
};
//# sourceMappingURL=auth.service.js.map