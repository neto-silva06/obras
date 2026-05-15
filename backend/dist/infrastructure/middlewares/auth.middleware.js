import jwt from "jsonwebtoken";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository.js";
const userRepository = new PrismaUserRepository();
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token format is invalid" });
    }
    const [scheme, token] = parts;
    if (scheme !== "Bearer") {
        return res.status(401).json({ error: "Token scheme must be Bearer" });
    }
    try {
        const secret = process.env.JWT_SECRET || 'secret';
        const decoded = jwt.verify(token, secret);
        const user = await userRepository.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = {
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Token is invalid or expired" });
    }
};
//# sourceMappingURL=auth.middleware.js.map