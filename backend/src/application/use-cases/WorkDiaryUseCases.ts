import type { WorkDiaryRepository } from "../../domain/repositories/WorkDiaryRepository.js";
import type { EmployeeRepository } from "../../domain/repositories/EmployeeRepository.js";

export class GetOrCreateWorkDiaryUseCase {
  constructor(private workDiaryRepository: WorkDiaryRepository) {}
  async execute(workId: string, dateStr: string) {
    const date = new Date(dateStr);
    let diary = await this.workDiaryRepository.getWorkDiaryWithDetails(workId, date);
    if (!diary) {
      await this.workDiaryRepository.create(workId, date);
      diary = await this.workDiaryRepository.getWorkDiaryWithDetails(workId, date);
    }
    return diary;
  }
}

export class AddLaborEntryUseCase {
  constructor(
    private workDiaryRepository: WorkDiaryRepository,
    private employeeRepository: EmployeeRepository
  ) {}
  async execute(workDiaryId: string, employeeId: string) {
    const employee = await this.employeeRepository.findById(employeeId);
    if (!employee) throw new Error("Employee not found");

    return await this.workDiaryRepository.addLaborEntry({
      workDiaryId,
      employeeId,
      cost: employee.dailyRate
    });
  }
}

export class RemoveLaborEntryUseCase {
  constructor(private workDiaryRepository: WorkDiaryRepository) {}
  async execute(id: string) {
    await this.workDiaryRepository.removeLaborEntry(id);
  }
}

export class AddMaterialUsageUseCase {
  constructor(private workDiaryRepository: WorkDiaryRepository) {}
  async execute(data: { workDiaryId: string, materialId: string, quantity: number, unitPrice: number }) {
    return await this.workDiaryRepository.addMaterialUsage(data);
  }
}

export class RemoveMaterialUsageUseCase {
  constructor(private workDiaryRepository: WorkDiaryRepository) {}
  async execute(id: string) {
    await this.workDiaryRepository.removeMaterialUsage(id);
  }
}

export class GetWorkReportUseCase {
  constructor(private workDiaryRepository: WorkDiaryRepository) {}
  async execute(workId: string, startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await this.workDiaryRepository.getReportByPeriod(workId, start, end);
  }
}
