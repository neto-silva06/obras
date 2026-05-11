import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./interface/routes/auth.routes.js";
import { workRouter } from "./interface/routes/work.routes.js";
import { warehouseRouter } from "./interface/routes/warehouse.routes.js";
import { materialRouter } from "./interface/routes/material.routes.js";
import { stockRouter } from "./interface/routes/stock.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/works", workRouter);
app.use("/warehouses", warehouseRouter);
app.use("/materials", materialRouter);
app.use("/stocks", stockRouter);
app.get('/ping', (req, res) => {
    res.send('pong');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=main.js.map