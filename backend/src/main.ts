import "dotenv/config";
// @ts-ignore
import "express-async-errors";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { authRouter } from "./interface/routes/auth.routes.js";
import { workRouter } from "./interface/routes/work.routes.js";
import { warehouseRouter } from "./interface/routes/warehouse.routes.js";
import { materialRouter } from "./interface/routes/material.routes.js";
import { stockRouter } from "./interface/routes/stock.routes.js";
import { userRoutes } from "./interface/routes/user.routes.js";
import { stockMovementRoutes } from "./interface/routes/stock-movement.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/works", workRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/materials", materialRouter);
app.use("/api/stocks", stockRouter);
app.use("/api/users", userRoutes);
app.use("/api/stock-movements", stockMovementRoutes);

app.get('/api/ping', (req, res) => {
  res.send('pong');
});

// Serve static files from the frontend/dist directory
// When running from backend/dist/main.js, we go up two levels to reach the root
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all route to serve the frontend index.html for React Router
app.get("*", (req, res, next) => {
  // If the request is for an API route that wasn't matched, don't serve index.html
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
