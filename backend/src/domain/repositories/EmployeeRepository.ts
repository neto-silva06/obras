import type { Employee } from "../entities/Employee.js";

export interface EmployeeRepository {
  findAll(): Promise<Employee[]>;
  findById(id: string): Promise<Employee | null>;
  create(data: Omit<Employee, 'id'>): Promise<Employee>;
  update(id: string, data: Partial<Employee>): Promise<Employee>;
  delete(id: string): Promise<void>;
}
