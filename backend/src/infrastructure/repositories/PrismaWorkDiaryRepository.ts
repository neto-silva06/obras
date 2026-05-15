import type { WorkDiary, LaborEntry, MaterialUsage } from "../../domain/entities/WorkDiary.js";
import type { WorkDiaryRepository } from "../../domain/repositories/WorkDiaryRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaWorkDiaryRepository implements WorkDiaryRepository {
  async findByWorkAndDate(workId: string, date: Date): Promise<WorkDiary | null> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    return await prisma.workDiary.findFirst({
      where: {
        workId,
        date: startOfDay
      }
    });
  }

  async findById(id: string): Promise<(WorkDiary & { laborEntries: any[], materialUsages: any[] }) | null> {
    return await prisma.workDiary.findUnique({
      where: { id },
      include: {
        laborEntries: {
          include: { employee: true }
        },
        materialUsages: {
          include: { material: true }
        }
      }
    }) as any;
  }

  async create(workId: string, date: Date): Promise<WorkDiary> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    return await prisma.workDiary.create({
      data: {
        workId,
        date: startOfDay
      }
    });
  }

  async addLaborEntry(data: Omit<LaborEntry, 'id'>): Promise<LaborEntry> {
    return await prisma.laborEntry.create({ data });
  }

  async removeLaborEntry(id: string): Promise<void> {
    await prisma.laborEntry.delete({ where: { id } });
  }

  async addMaterialUsage(data: Omit<MaterialUsage, 'id'>): Promise<MaterialUsage> {
    return await prisma.materialUsage.create({ data });
  }

  async removeMaterialUsage(id: string): Promise<void> {
    await prisma.materialUsage.delete({ where: { id } });
  }

  async getWorkDiaryWithDetails(workId: string, date: Date): Promise<any> {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    return await prisma.workDiary.findFirst({
      where: { workId, date: startOfDay },
      include: {
        laborEntries: {
          include: { employee: true }
        },
        materialUsages: {
          include: { material: true }
        }
      }
    });
  }

  async getReportByPeriod(workId: string, startDate: Date, endDate: Date): Promise<any> {
    const start = new Date(startDate);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999);

    return await prisma.workDiary.findMany({
      where: {
        workId,
        date: {
          gte: start,
          lte: end
        }
      },
      include: {
        laborEntries: {
          include: { employee: true }
        },
        materialUsages: {
          include: { material: true }
        }
      },
      orderBy: { date: 'asc' }
    });
  }
}
