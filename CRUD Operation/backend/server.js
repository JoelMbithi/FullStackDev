import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";  // ES6 import

import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/userRoutes.js";
import apartmentRouter from "./routes/ApartmentRoute.js";
import bookingRouter from "./routes/BookingRoutes.js";
import { initiateSTKPush } from "./mpesa.js"


// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Express setup
const app = express();
const PORT = 4000;


app.post("/api/mpesa-callback", (req, res) => {
  console.log("M-Pesa callback received:", req.body);
  res.status(200).json({ message: "Callback received successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


/* Mpesa  */
// Add this to your server.js file
app.post("/api/pay", async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const response = await initiateSTKPush(phone, amount);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error initiating STK Push:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});


// API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/apartment", apartmentRouter);
app.use("/api/booking", bookingRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
