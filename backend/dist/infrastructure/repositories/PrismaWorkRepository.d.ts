import type { Work } from "../../domain/entities/Work.js";
import type { WorkRepository } from "../../domain/repositories/WorkRepository.js";
export declare class PrismaWorkRepository implements WorkRepository {
    findAll(): Promise<Work[]>;
    findById(id: string): Promise<Work | null>;
    create(data: Omit<Work, 'id'>): Promise<Work>;
    update(id: string, data: Partial<Work>): Promise<Work>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaWorkRepository.d.ts.map