import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoutes from "./routes/authRoute.js";
import hotelRoute from "./routes/hotelRoute.js";

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
// Middleware to parse JSON request bodies
app.use(express.json());

// Route handlers
app.use("/api/authRoute", AuthRoutes);
app.use("/api/hotelRoute", hotelRoute);

app.use("/api/register", AuthRoutes);

app.listen(8000, () => {
  connect();
  console.log("Server running on port 8000");
});
