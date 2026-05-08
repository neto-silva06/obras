import { Request, Response } from "express";
import { PrismaWarehouseRepository } from "../../infrastructure/repositories/PrismaWarehouseRepository";
import {
  CreateWarehouseUseCase,
  ListWarehousesUseCase,
  GetWarehouseUseCase,
  UpdateWarehouseUseCase,
  DeleteWarehouseUseCase
} from "../../application/use-cases/WarehouseUseCases";

const warehouseRepository = new PrismaWarehouseRepository();
const createWarehouse = new CreateWarehouseUseCase(warehouseRepository);
const listWarehouses = new ListWarehousesUseCase(warehouseRepository);
const getWarehouse = new GetWarehouseUseCase(warehouseRepository);
const updateWarehouse = new UpdateWarehouseUseCase(warehouseRepository);
const deleteWarehouse = new DeleteWarehouseUseCase(warehouseRepository);

export class WarehouseController {
  async list(req: Request, res: Response) {
    return res.json(await listWarehouses.execute());
  }

  async create(req: Request, res: Response) {
    return res.status(201).json(await createWarehouse.execute(req.body));
  }

  async get(req: Request, res: Response) {
    try {
      return res.json(await getWarehouse.execute(req.params.id));
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    return res.json(await updateWarehouse.execute(req.params.id, req.body));
  }

  async delete(req: Request, res: Response) {
    await deleteWarehouse.execute(req.params.id);
    return res.status(204).send();
  }
}
