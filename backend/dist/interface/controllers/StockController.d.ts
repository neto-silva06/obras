import type { Request, Response } from "express";
interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}
export declare class StockController {
    getByWarehouse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getByMaterial(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adjust(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export {};
//# sourceMappingURL=StockController.d.ts.map