import express from 'express'
import cors from 'cors'
import 'dotenv/config'


//API config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

//End Point

app.get('/',(req,res) => {
     res.send('API WORKING WELL')
})

//Strat the server

app.listen(port,()=> console.log("Server Started",port))