import { prisma } from "../database/prisma.js";
export class PrismaStockRepository {
    async findByWarehouse(warehouseId) {
        return await prisma.stock.findMany({
            where: { warehouseId },
            include: { material: true }
        });
    }
    async findByMaterial(materialId) {
        return await prisma.stock.findMany({
            where: { materialId },
            include: { warehouse: true }
        });
    }
    async findByWarehouseAndMaterial(warehouseId, materialId) {
        return await prisma.stock.findUnique({
            where: {
                warehouseId_materialId: {
                    warehouseId,
                    materialId
                }
            }
        });
    }
    async updateQuantity(warehouseId, materialId, quantity) {
        return await prisma.stock.update({
            where: {
                warehouseId_materialId: {
                    warehouseId,
                    materialId
                }
            },
            data: { quantity },
        });
    }
    async upsertStock(warehouseId, materialId, quantity) {
        return await prisma.stock.upsert({
            where: {
                warehouseId_materialId: {
                    warehouseId,
                    materialId
                }
            },
            update: { quantity },
            create: {
                warehouseId,
                materialId,
                quantity
            }
        });
    }
}
//# sourceMappingURL=PrismaStockRepository.js.map