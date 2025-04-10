import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios'; // Keep axios import in case it's used later
import path from "path"

import productRoute from './routes/ProductRoute.js';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve()
// Database connection configuration using pg Pool
const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Adjust this if necessary
  },
});

// Middleware
/* app.use(helmet()); */
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Database initialization
async function initDB() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    console.log("Database connection successful");

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Products table ready');
    client.release();
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
}

// Routes
app.use("/api/products", productRoute);

if(process.env.NODE_ENV==="products"){
  //server out reast app
  app.use(express.static(path.join(__dirname,"/frontend/dist")))

  app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
  })
}

// Start server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
