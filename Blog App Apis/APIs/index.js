import express from "express"
import { config } from "dotenv"
import { connect } from "mongoose"
import authRouter from "./routes/authRoutes.js"
import userRoutes from "./routes/UserRoutes.js"

const app = express()
config()

if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
}

connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Connection Error: ", err));

//middleware
app.use(express.json());

//API to Register and Login
app.use("/api/auth",authRouter)


//API to Update user

app.use("/api/user",userRoutes)


app.listen("4001", ()=> {
    console.log("backend running on port 4001 ")
})