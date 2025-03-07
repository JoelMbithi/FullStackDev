const express = require("express")
const app = express()
const dotenv= require("dotenv")
const mongoose = require("mongoose")


dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
     
}).then(console.log("DB Connected"))

 app.listen("4000", ()=> {
    console.log("backend running on port 4000 ")
})