import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'

//API config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"));
//End Point
app.use('/api/admin',adminRouter)
app.get('/',(req,res) => {
     res.send('API WORKING WELL')
})

//Strat the server

app.listen(port,()=> console.log("Server Started",port))