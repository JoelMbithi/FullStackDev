import express from  "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

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

app.listen(8000,()=>{
    connect()
    console.log("Server is Running on Port 8000")
})