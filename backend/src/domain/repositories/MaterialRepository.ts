import { Material } from "../entities/Material";
export interface MaterialRepository {
  findAll(): Promise<Material[]>;
  findById(id: string): Promise<Material | null>;
  create(material: Omit<Material, 'id'>): Promise<Material>;
  update(id: string, material: Partial<Material>): Promise<Material>;
  delete(id: string): Promise<void>;
}
