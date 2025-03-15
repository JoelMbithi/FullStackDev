import express from  "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoute from "./routes/authRoute.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

//COnnecting to Mongoose DB

const connect = async ()=>{
   try {
    await  mongoose.connect(process.env.MONGODB_URI)
    console.log("DB connected")
   } catch (error) {
    console.error("MongoDB Connection Error:", error);
    
   }
}

//middlewares
app.use(express.json());
app.use(cookieParser())



app.use("/api/auth",authRoute)

app.listen(8000,()=>{
    connect()
    console.log("Server is Running on Port 8000")
})