import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/UserRoutes.js";
import ProductRouter from "./routes/ProductRoute.js"
import getCategoryRoute from "./routes/getCategoryRoutes.js"

dotenv.config();

const app = express();
app.use(cookieParser());

// ✅ Increase request size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ MongoDB Connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ DB connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    }
};

// ✅ CORS Middleware
app.use(cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

// ✅ User Routes
app.use("/api/user", authRoutes);
app.use("/api/user", userRoute);
app.use("/api/product",ProductRouter)
app.use("/api/productCategory",getCategoryRoute)


// ✅ Start Server
app.listen(8000, () => {
    connect();
    console.log("🚀 Server is running on port 8000");
});
