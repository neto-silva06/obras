import type { Warehouse } from "../entities/Warehouse.js";
export interface WarehouseRepository {
  findAll(): Promise<Warehouse[]>;
  findById(id: string): Promise<Warehouse | null>;
  findByWorkId(workId: string): Promise<Warehouse[]>;
  create(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse>;
  update(id: string, warehouse: Partial<Warehouse>): Promise<Warehouse>;
  delete(id: string): Promise<void>;
}
