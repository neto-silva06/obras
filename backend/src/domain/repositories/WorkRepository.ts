import type { Work } from "../entities/Work.js";
export interface WorkRepository {
  findAll(): Promise<Work[]>;
  findById(id: string): Promise<Work | null>;
  create(work: Omit<Work, 'id'>): Promise<Work>;
  update(id: string, work: Partial<Work>): Promise<Work>;
  delete(id: string): Promise<void>;
}
