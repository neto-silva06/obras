import type { Employee } from "../../domain/entities/Employee.js";
import type { EmployeeRepository } from "../../domain/repositories/EmployeeRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaEmployeeRepository implements EmployeeRepository {
  async findAll(): Promise<Employee[]> {
    return await prisma.employee.findMany();
  }

  async findById(id: string): Promise<Employee | null> {
    return await prisma.employee.findUnique({ where: { id } });
  }

  async create(data: Omit<Employee, 'id'>): Promise<Employee> {
    return await prisma.employee.create({ data });
  }

  async update(id: string, data: Partial<Employee>): Promise<Employee> {
    return await prisma.employee.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await prisma.employee.delete({ where: { id } });
  }
}
