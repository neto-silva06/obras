import type { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const roleMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }

    next();
  };
};
