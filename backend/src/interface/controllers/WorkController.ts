import type { Request, Response } from "express";
import { PrismaWorkRepository } from "../../infrastructure/repositories/PrismaWorkRepository.js";
import {
  CreateWorkUseCase,
  ListWorksUseCase,
  GetWorkUseCase,
  UpdateWorkUseCase,
  DeleteWorkUseCase
} from "../../application/use-cases/WorkUseCases.js";

const workRepository = new PrismaWorkRepository();
const createWork = new CreateWorkUseCase(workRepository);
const listWorks = new ListWorksUseCase(workRepository);
const getWork = new GetWorkUseCase(workRepository);
const updateWork = new UpdateWorkUseCase(workRepository);
const deleteWork = new DeleteWorkUseCase(workRepository);

export class WorkController {
  async list(req: Request, res: Response) {
    return res.json(await listWorks.execute());
  }

  async create(req: Request, res: Response) {
    return res.status(201).json(await createWork.execute(req.body));
  }

  async get(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    try {
      return res.json(await getWork.execute(req.params.id));
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    return res.json(await updateWork.execute(req.params.id, req.body));
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID is required" });
    }
    await deleteWork.execute(req.params.id);
    return res.status(204).send();
  }
}
