import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoutes from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";

// Create an Express application
const app = express();
// Load environment variables from .env file
dotenv.config();

const connect = async () => {
  // Function to connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB");
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(cookieParser())
// Middleware to parse JSON request bodies
app.use(express.json());

// Route handlers
app.use("/api/authRoute", AuthRoutes);
app.use("/api/hotelRoute", hotelRoute);
app.use("/api/userRoute",userRoute)

//app.use("/api/register", AuthRoutes);
//app.use("/api/login",AuthRoutes)
app.use("/api", AuthRoutes);
app.listen(5890, () => {
  connect();
  console.log("Server running on port 8000");
});
 