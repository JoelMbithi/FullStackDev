import express from "express"
import { config } from "dotenv"
import { connect } from "mongoose"
import authRouter from "./routes/authRoutes.js"
import userRoutes from "./routes/UserRoutes.js"
import PostRouter from "./routes/PostRoutes.js"
import CategoryRoutes from "./routes/CategoryRoutes.js"
import multer from "multer"

const app = express()
config()

if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not defined in the environment variables");
    process.exit(1);
}

connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch(err => console.error("DB Connection Error: ", err));

//multer to upload

const storage = multer.diskStorage({
    destination:(req, file, callback) => {
        callback(null, "images")
    },
    filename:(req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        callback(null, uniqueSuffix);
    }
})

const upload = multer({storage: storage})
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File uploaded successful")
})

//middleware
app.use(express.json());

//API to Register and Login
app.use("/api/auth",authRouter)


//API to Update user

app.use("/api/user",userRoutes)

//API to Create a PostModel

app.use("/api/post", PostRouter)

//API to create Category

app.use("/api/category", CategoryRoutes)


app.listen("4001", ()=> {
    console.log("backend running on port 4001 ")
})