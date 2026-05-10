import api from './api.js';
const MaterialServiceImplementation = {
    async getAll() {
        const { data } = await api.get('/materials');
        return data;
    },
    async getById(id) {
        const { data } = await api.get(`/materials/${id}`);
        return data;
    },
    async create(material) {
        const { data } = await api.post('/materials', material);
        return data;
    },
    async update(id, material) {
        const { data } = await api.put(`/materials/${id}`, material);
        return data;
    },
    async delete(id) {
        await api.delete(`/materials/${id}`);
    }
};
export default MaterialServiceImplementation;
//# sourceMappingURL=materials.api.js.map