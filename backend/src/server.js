import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // parse JSON body

// ✅ Define allowed origins clearly
const allowedOrigins = [
  "http://localhost:3000", // React dev
  "http://localhost:5174", // Vite dev
  "https://mern-task-management-ochre.vercel.app", // Vercel frontend
];

// ✅ CORS setup
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(morgan("combined")); // logs HTTP requests

// Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// DB + Server
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
