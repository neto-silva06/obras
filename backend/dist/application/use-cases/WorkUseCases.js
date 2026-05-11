export class CreateWorkUseCase {
    workRepository;
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async execute(data) {
        return await this.workRepository.create(data);
    }
}
export class ListWorksUseCase {
    workRepository;
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async execute() {
        return await this.workRepository.findAll();
    }
}
export class GetWorkUseCase {
    workRepository;
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async execute(id) {
        const work = await this.workRepository.findById(id);
        if (!work)
            throw new Error("Work not found");
        return work;
    }
}
export class UpdateWorkUseCase {
    workRepository;
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async execute(id, data) {
        return await this.workRepository.update(id, data);
    }
}
export class DeleteWorkUseCase {
    workRepository;
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async execute(id) {
        await this.workRepository.delete(id);
    }
}
//# sourceMappingURL=WorkUseCases.js.map