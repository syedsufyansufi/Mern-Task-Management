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

// Serve static files from React build (for single deployment)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
} else {
  // Development route
  app.get("/", (req, res) => res.send("✅ API is running in development mode..."));
}

const PORT = process.env.PORT || 5000;

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
