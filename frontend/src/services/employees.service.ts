export interface Employee {
  id: string;
  name: string;
  jobTitle: string;
  dailyRate: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeService {
  getAll(): Promise<Employee[]>;
  getById(id: string): Promise<Employee>;
  create(employee: Partial<Employee>): Promise<Employee>;
  update(id: string, employee: Partial<Employee>): Promise<Employee>;
  delete(id: string): Promise<void>;
}
