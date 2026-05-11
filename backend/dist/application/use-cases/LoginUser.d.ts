import type { UserRepository } from "../../domain/repositories/UserRepository.js";
export declare class LoginUser {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute({ email, password }: any): Promise<{
        user: any;
        token: string;
    }>;
}
//# sourceMappingURL=LoginUser.d.ts.map