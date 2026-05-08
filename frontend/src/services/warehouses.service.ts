export interface Warehouse {
  id: string;
  name: string;
  workId: string;
  work?: any;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseService {
  getAll(): Promise<Warehouse[]>;
  getByWorkId(workId: string): Promise<Warehouse[]>;
  getById(id: string): Promise<Warehouse>;
  create(warehouse: Partial<Warehouse>): Promise<Warehouse>;
  update(id: string, warehouse: Partial<Warehouse>): Promise<Warehouse>;
  delete(id: string): Promise<void>;
}
