import api from './api.js';
const WarehouseServiceImplementation = {
    async getAll() {
        const { data } = await api.get('/warehouses');
        return data;
    },
    async getByWorkId(workId) {
        const { data } = await api.get(`/warehouses?workId=${workId}`);
        return data;
    },
    async getById(id) {
        const { data } = await api.get(`/warehouses/${id}`);
        return data;
    },
    async create(warehouse) {
        const { data } = await api.post('/warehouses', warehouse);
        return data;
    },
    async update(id, warehouse) {
        const { data } = await api.put(`/warehouses/${id}`, warehouse);
        return data;
    },
    async delete(id) {
        await api.delete(`/warehouses/${id}`);
    }
};
export default WarehouseServiceImplementation;
//# sourceMappingURL=warehouses.api.js.map