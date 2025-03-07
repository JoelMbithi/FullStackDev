import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoutes from "./routes/authRoute.js"; // Ensure the correct path
import hotelRoute from "./routes/hotelRoute.js";
import userRoute from "./routes/userRoute.js";
import roomRoute from "./routes/roomsRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Create an Express application
const app = express();
dotenv.config();

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/hotels", hotelRoute);
app.use("/api/auth", AuthRoutes);  // This now correctly uses `authRoute.js`
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);

// Start server
app.listen(8888, () => {
  connect();
  console.log("Server running on port 8888");
});
