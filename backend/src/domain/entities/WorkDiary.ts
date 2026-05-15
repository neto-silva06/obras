export interface WorkDiary {
  id: string;
  workId: string;
  date: Date;
}

export interface LaborEntry {
  id: string;
  workDiaryId: string;
  employeeId: string;
  cost: number;
}

export interface MaterialUsage {
  id: string;
  workDiaryId: string;
  materialId: string;
  quantity: number;
  unitPrice: number;
}
