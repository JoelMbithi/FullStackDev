import pkg from 'pg';  // Import the pg package
const { Pool } = pkg;  // Destructure the Pool class from the package
import dotenv from 'dotenv';

dotenv.config();

export const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

export const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true
  },
  connectionTimeoutMillis: 10000, // 10 seconds timeout
  idleTimeoutMillis: 30000      // 30 seconds idle timeout
});
