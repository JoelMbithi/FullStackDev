import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from "./routes/userRouter.js"



import pkg from 'pg';
const { Client } = pkg;

const app = express();
dotenv.config();

const port = 3000;

// PostgreSQL client setup
const client = new Client({
  user: process.env.DB_USER,     // your database username
  host: process.env.DB_HOST,     // your database host, typically 'localhost' or an IP address
  database: process.env.DB_NAME, // your database name
  password: process.env.DB_PASS, // your database password
  port: process.env.DB_PORT,     // your database port (default is 5432)
});

client.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.error("Connection error", err.stack));

// Middleware
app.use(cors());
app.use(express.json());

// Test route to fetch data from PostgreSQL
app.get('/test', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()');  // A simple query to check connection
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to database');
  }
});


//routes

app.use("/api/user",userRouter)

app.listen(port, () => {
  console.log("Server is well connected on port " + port);
});
