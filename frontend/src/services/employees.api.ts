import api from './api.js';
import type { Employee, EmployeeService } from './employees.service.js';

const EmployeeServiceImplementation: EmployeeService = {
  async getAll() {
    const { data } = await api.get<Employee[]>('/employees');
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Employee>(`/employees/${id}`);
    return data;
  },
  async create(employee) {
    const { data } = await api.post<Employee>('/employees', employee);
    return data;
  },
  async update(id, employee) {
    const { data } = await api.put<Employee>(`/employees/${id}`, employee);
    return data;
  },
  async delete(id) {
    await api.delete(`/employees/${id}`);
  }
};

export default EmployeeServiceImplementation;
