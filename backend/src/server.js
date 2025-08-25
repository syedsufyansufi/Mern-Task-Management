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
app.use(express.json());// parse JSON body

const allowedOrigins = [
  "http://localhost:3000", // typical React port
  "http://localhost:5174", // if you're using Vite
  "https://your-app-name.vercel.app", 
  "https://your-app-name.netlify.app", 
];


app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
})); // allow frontend to call backend
app.use(morgan("combined")); // logs HTTP requests


// Task routes
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 5000;

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
