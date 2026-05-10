export interface Work {
    id: string;
    name: string;
    address: string;
    description?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
export interface WorkService {
    getAll(): Promise<Work[]>;
    getById(id: string): Promise<Work>;
    create(work: Partial<Work>): Promise<Work>;
    update(id: string, work: Partial<Work>): Promise<Work>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=works.service.d.ts.map