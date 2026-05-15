import type { Request, Response } from "express";
import { PrismaEmployeeRepository } from "../../infrastructure/repositories/PrismaEmployeeRepository.js";
import {
  CreateEmployeeUseCase,
  ListEmployeesUseCase,
  GetEmployeeUseCase,
  UpdateEmployeeUseCase,
  DeleteEmployeeUseCase
} from "../../application/use-cases/EmployeeUseCases.js";

const employeeRepository = new PrismaEmployeeRepository();
const createEmployee = new CreateEmployeeUseCase(employeeRepository);
const listEmployees = new ListEmployeesUseCase(employeeRepository);
const getEmployee = new GetEmployeeUseCase(employeeRepository);
const updateEmployee = new UpdateEmployeeUseCase(employeeRepository);
const deleteEmployee = new DeleteEmployeeUseCase(employeeRepository);

export class EmployeeController {
  async list(req: Request, res: Response) {
    return res.json(await listEmployees.execute());
  }

  async create(req: Request, res: Response) {
    return res.status(201).json(await createEmployee.execute(req.body));
  }

  async get(req: Request, res: Response) {
    try {
      return res.json(await getEmployee.execute(req.params.id as string));
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    return res.json(await updateEmployee.execute(req.params.id as string, req.body));
  }

  async delete(req: Request, res: Response) {
    await deleteEmployee.execute(req.params.id as string);
    return res.status(204).send();
  }
}
