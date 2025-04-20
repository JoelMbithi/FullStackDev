// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";


// Express setup
const app = express();
const PORT = 3000;
dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
