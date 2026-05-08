import { Warehouse } from "../../domain/entities/Warehouse";
import { WarehouseRepository } from "../../domain/repositories/WarehouseRepository";

export class CreateWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository) {}
  async execute(data: Omit<Warehouse, 'id'>) {
    return await this.warehouseRepository.create(data);
  }
}

export class ListWarehousesUseCase {
  constructor(private warehouseRepository: WarehouseRepository) {}
  async execute() {
    return await this.warehouseRepository.findAll();
  }
}

export class GetWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository) {}
  async execute(id: string) {
    const warehouse = await this.warehouseRepository.findById(id);
    if (!warehouse) throw new Error("Warehouse not found");
    return warehouse;
  }
}

export class UpdateWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository) {}
  async execute(id: string, data: Partial<Warehouse>) {
    return await this.warehouseRepository.update(id, data);
  }
}

export class DeleteWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository) {}
  async execute(id: string) {
    await this.warehouseRepository.delete(id);
  }
}
