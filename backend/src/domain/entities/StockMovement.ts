export interface StockMovement {
  id: string;
  type: 'add' | 'remove' | 'set';
  quantity: number;
  description?: string | null;
  materialId: string;
  warehouseId: string;
  userId: string;
  createdAt: Date;

  // Relations
  material?: any;
  warehouse?: any;
  user?: any;
}
