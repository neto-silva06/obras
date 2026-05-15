import type { Request, Response } from "express";
import { PrismaWorkDiaryRepository } from "../../infrastructure/repositories/PrismaWorkDiaryRepository.js";
import { PrismaEmployeeRepository } from "../../infrastructure/repositories/PrismaEmployeeRepository.js";
import {
  GetOrCreateWorkDiaryUseCase,
  AddLaborEntryUseCase,
  RemoveLaborEntryUseCase,
  AddMaterialUsageUseCase,
  RemoveMaterialUsageUseCase,
  GetWorkReportUseCase
} from "../../application/use-cases/WorkDiaryUseCases.js";

const workDiaryRepository = new PrismaWorkDiaryRepository();
const employeeRepository = new PrismaEmployeeRepository();

const getOrCreateWorkDiary = new GetOrCreateWorkDiaryUseCase(workDiaryRepository);
const addLaborEntry = new AddLaborEntryUseCase(workDiaryRepository, employeeRepository);
const removeLaborEntry = new RemoveLaborEntryUseCase(workDiaryRepository);
const addMaterialUsage = new AddMaterialUsageUseCase(workDiaryRepository);
const removeMaterialUsage = new RemoveMaterialUsageUseCase(workDiaryRepository);
const getWorkReport = new GetWorkReportUseCase(workDiaryRepository);

export class WorkDiaryController {
  async getDiary(req: Request, res: Response) {
    const { workId, date } = req.query;
    return res.json(await getOrCreateWorkDiary.execute(workId as string, date as string));
  }

  async addLabor(req: Request, res: Response) {
    const { workDiaryId, employeeId } = req.body;
    return res.status(201).json(await addLaborEntry.execute(workDiaryId, employeeId));
  }

  async removeLabor(req: Request, res: Response) {
    await removeLaborEntry.execute(req.params.id as string);
    return res.status(204).send();
  }

  async addMaterial(req: Request, res: Response) {
    return res.status(201).json(await addMaterialUsage.execute(req.body));
  }

  async removeMaterial(req: Request, res: Response) {
    await removeMaterialUsage.execute(req.params.id as string);
    return res.status(204).send();
  }

  async getReport(req: Request, res: Response) {
    const { workId, startDate, endDate } = req.query;
    return res.json(await getWorkReport.execute(workId as string, startDate as string, endDate as string));
  }
}
