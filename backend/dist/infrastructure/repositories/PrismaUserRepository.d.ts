import type { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";
export declare class PrismaUserRepository implements UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    list(): Promise<User[]>;
    create(data: Omit<User, 'id'>): Promise<User>;
    update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=PrismaUserRepository.d.ts.map