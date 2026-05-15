import type { WorkDiary, LaborEntry, MaterialUsage } from "../entities/WorkDiary.js";

export interface WorkDiaryRepository {
  findByWorkAndDate(workId: string, date: Date): Promise<WorkDiary | null>;
  findById(id: string): Promise<(WorkDiary & { laborEntries: any[], materialUsages: any[] }) | null>;
  create(workId: string, date: Date): Promise<WorkDiary>;
  addLaborEntry(data: Omit<LaborEntry, 'id'>): Promise<LaborEntry>;
  removeLaborEntry(id: string): Promise<void>;
  addMaterialUsage(data: Omit<MaterialUsage, 'id'>): Promise<MaterialUsage>;
  removeMaterialUsage(id: string): Promise<void>;
  getWorkDiaryWithDetails(workId: string, date: Date): Promise<any>;
  getReportByPeriod(workId: string, startDate: Date, endDate: Date): Promise<any>;
}
