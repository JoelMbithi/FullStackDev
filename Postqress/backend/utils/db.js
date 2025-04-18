import pkg from 'pg';  // Default import
import pg from "pg"
import 'dotenv/config';


 const { Client } = pkg;

const db = new Client({
    user: process.env.DB_USER,     // your database username
    host: process.env.DB_HOST,     // your database host, typically 'localhost' or an IP address
    database: process.env.DB_NAME, // your database name
    password: process.env.DB_PASS, // your database password
    port: process.env.DB_PORT,  
});

db.connect()
  .then(() => console.log('PostgreSQL Connected'))
  .catch((err) => console.error('Connection error', err.stack));

export default db /* query = (text, params) => db.query(text, params) */;
