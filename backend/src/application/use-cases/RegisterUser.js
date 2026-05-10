import bcrypt from "bcryptjs";
export class RegisterUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("User already exists with this email");
        }
        if (!data.password) {
            throw new Error("Password is required");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userRepository.create({
            ...data,
            password: hashedPassword,
        });
        return user;
    }
}
//# sourceMappingURL=RegisterUser.js.map