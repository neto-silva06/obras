import api from './api.js';
const WorkServiceImplementation = {
    async getAll() {
        const { data } = await api.get('/works');
        return data;
    },
    async getById(id) {
        const { data } = await api.get(`/works/${id}`);
        return data;
    },
    async create(work) {
        const { data } = await api.post('/works', work);
        return data;
    },
    async update(id, work) {
        const { data } = await api.put(`/works/${id}`, work);
        return data;
    },
    async delete(id) {
        await api.delete(`/works/${id}`);
    }
};
export default WorkServiceImplementation;
//# sourceMappingURL=works.api.js.map