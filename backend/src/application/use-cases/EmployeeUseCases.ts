import type { Employee } from "../../domain/entities/Employee.js";
import type { EmployeeRepository } from "../../domain/repositories/EmployeeRepository.js";

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute(data: Omit<Employee, 'id'>) {
    return await this.employeeRepository.create(data);
  }
}

export class ListEmployeesUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute() {
    return await this.employeeRepository.findAll();
  }
}

export class GetEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute(id: string) {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) throw new Error("Employee not found");
    return employee;
  }
}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute(id: string, data: Partial<Employee>) {
    return await this.employeeRepository.update(id, data);
  }
}

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute(id: string) {
    await this.employeeRepository.delete(id);
  }
}
