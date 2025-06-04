import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";  
import authRoute from "./routes/authRoutes.js"
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/OrderController.js"
import revenueRouter from "./routes/Revenue.js"
import productRouter from "./routes/addProduct.js"
import MessageRouter from "./routes/MessagesRouter.js";


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



// Middleware to parse JSON request bodies
app.use(express.json());




// Middleware setup
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());




// API routes
app.use("/api/auth",authRoute)
app.use("/api/user",userRouter)
app.use("/api/order",orderRouter)
app.use("/api/revenue",revenueRouter)
app.use("/api/product",productRouter)
app.use("/api/messages", MessageRouter)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});