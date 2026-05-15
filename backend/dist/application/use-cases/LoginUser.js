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
            throw new Error("Verifique suas credenciais.");
        let isPasswordValid = false;
        try {
            // Try comparing with bcrypt first
            isPasswordValid = await bcrypt.compare(password, user.password);
        }
        catch (e) {
            // If the stored password is not a valid hash, bcrypt.compare might throw
            isPasswordValid = false;
        }
        // Fallback for legacy plain-text passwords (like the one in the user's screenshot)
        if (!isPasswordValid && password === user.password) {
            isPasswordValid = true;
            // Auto-migrate to hashed password to improve security and fix future logins
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userRepository.update(user.id, { password: hashedPassword });
        }
        if (!isPasswordValid)
            throw new Error("Verifique suas credenciais.");
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: "1d" });
        const { password: _, ...userResponse } = user;
        return { user: userResponse, token };
    }
}
//# sourceMappingURL=LoginUser.js.map