import type { Work } from "../../domain/entities/Work.js";
import type { WorkRepository } from "../../domain/repositories/WorkRepository.js";
export declare class CreateWorkUseCase {
    private workRepository;
    constructor(workRepository: WorkRepository);
    execute(data: Omit<Work, 'id'>): Promise<Work>;
}
export declare class ListWorksUseCase {
    private workRepository;
    constructor(workRepository: WorkRepository);
    execute(): Promise<Work[]>;
}
export declare class GetWorkUseCase {
    private workRepository;
    constructor(workRepository: WorkRepository);
    execute(id: string): Promise<Work>;
}
export declare class UpdateWorkUseCase {
    private workRepository;
    constructor(workRepository: WorkRepository);
    execute(id: string, data: Partial<Work>): Promise<Work>;
}
export declare class DeleteWorkUseCase {
    private workRepository;
    constructor(workRepository: WorkRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=WorkUseCases.d.ts.map