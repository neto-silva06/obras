import type { Work } from "../../domain/entities/Work.js";
import type { WorkRepository } from "../../domain/repositories/WorkRepository.js";

export class CreateWorkUseCase {
  constructor(private workRepository: WorkRepository) {}
  async execute(data: Omit<Work, 'id'>) {
    return await this.workRepository.create(data);
  }
}

export class ListWorksUseCase {
  constructor(private workRepository: WorkRepository) {}
  async execute() {
    return await this.workRepository.findAll();
  }
}

export class GetWorkUseCase {
  constructor(private workRepository: WorkRepository) {}
  async execute(id: string) {
    const work = await this.workRepository.findById(id);
    if (!work) throw new Error("Work not found");
    return work;
  }
}

export class UpdateWorkUseCase {
  constructor(private workRepository: WorkRepository) {}
  async execute(id: string, data: Partial<Work>) {
    return await this.workRepository.update(id, data);
  }
}

export class DeleteWorkUseCase {
  constructor(private workRepository: WorkRepository) {}
  async execute(id: string) {
    await this.workRepository.delete(id);
  }
}
