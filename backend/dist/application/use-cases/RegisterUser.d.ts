import type { UserRepository } from "../../domain/repositories/UserRepository.js";
import type { User } from "../../domain/entities/User.js";
export declare class RegisterUser {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
}
//# sourceMappingURL=RegisterUser.d.ts.map