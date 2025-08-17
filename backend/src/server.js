import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { connectDB } from "../src/config/db.js";

dotenv.config();

const app = express();

// ----- Middleware -----
app.use(express.json()); // parse JSON request body
app.use(cors()); // allow frontend requests
app.use(helmet()); // security best practices
app.use(morgan("dev")); // log HTTP requests in console

// ----- Routes -----
app.get("/ping", (req, res) => {
  res.json({ message: "pong 🏓" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// ----- Start Server -----
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
