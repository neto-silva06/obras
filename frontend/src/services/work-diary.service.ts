import type { Material } from './materials.service.js';
import type { Employee } from './employees.service.js';

export interface LaborEntry {
  id: string;
  workDiaryId: string;
  employeeId: string;
  employee: Employee;
  cost: number;
}

export interface MaterialUsage {
  id: string;
  workDiaryId: string;
  materialId: string;
  material: Material;
  quantity: number;
  unitPrice: number;
}

export interface WorkDiary {
  id: string;
  workId: string;
  date: string;
  laborEntries: LaborEntry[];
  materialUsages: MaterialUsage[];
}

export interface WorkDiaryService {
  getDiary(workId: string, date: string): Promise<WorkDiary>;
  addLabor(workDiaryId: string, employeeId: string): Promise<LaborEntry>;
  removeLabor(id: string): Promise<void>;
  addMaterial(data: { workDiaryId: string, materialId: string, quantity: number, unitPrice: number }): Promise<MaterialUsage>;
  removeMaterial(id: string): Promise<void>;
  getReport(workId: string, startDate: string, endDate: string): Promise<WorkDiary[]>;
}
