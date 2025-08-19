import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // parse JSON body
app.use(cors()); // allow frontend to call backend
app.use(morgan("dev")); // logs HTTP requests

// Test route
app.get("/", (req, res) => res.send("✅ API is running..."));

// Task routes
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
