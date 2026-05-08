import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid or expired" });
  }
};
