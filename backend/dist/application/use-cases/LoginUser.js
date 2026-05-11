import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class LoginUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute({ email, password }) {
        const user = await this.userRepository.findByEmail(email);
        if (!user)
            throw new Error("Invalid credentials");
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new Error("Invalid credentials");
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: "1d" });
        const { password: _, ...userResponse } = user;
        return { user: userResponse, token };
    }
}
//# sourceMappingURL=LoginUser.js.map