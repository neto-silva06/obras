export interface Material {
  data: any;
  id: string;
  name: string;
  unit: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialService {
  getAll(): Promise<Material[]>;
  getById(id: string): Promise<Material>;
  create(material: Partial<Material>): Promise<Material>;
  update(id: string, material: Partial<Material>): Promise<Material>;
  delete(id: string): Promise<void>;
}
