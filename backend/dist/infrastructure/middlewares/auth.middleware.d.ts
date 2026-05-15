import type { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
        name: string;
        email: string;
    };
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map