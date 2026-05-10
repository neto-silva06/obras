export declare const stockApi: {
    getByWarehouse: (warehouseId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getByMaterial: (materialId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    update: (warehouseId: string, materialId: string, quantity: number) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    adjust: (data: {
        warehouseId: string;
        materialId: string;
        quantity: number;
        operation: "add" | "remove" | "set";
    }) => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
//# sourceMappingURL=stock.service.d.ts.map