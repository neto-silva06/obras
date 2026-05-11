import type { Request, Response } from "express";
export declare class StockController {
    getByWarehouse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getByMaterial(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adjust(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=StockController.d.ts.map