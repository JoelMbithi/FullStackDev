import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/UserRoutes.js" 



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
 app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    allowedHeaders: "Content-Type,Authorization,Cache-Control,Express,Pragma",
    credentials: true
 }))
 app.use(express.json())

 app.use("/api/user",userRoutes)

app.listen(8000,()=> {
    connect()
    console.log("Server is running on port 8000")
})