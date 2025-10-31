/**
 * Bui Cong Vinh
 * Code is done in 28/10/2025
 */

import express from "express";
import dotenv from "dotenv";
import resourceRoutes from "./routes/resourceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Resource API by Bui Cong Vinh" });
});

app.use("/api/resources", resourceRoutes);

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
