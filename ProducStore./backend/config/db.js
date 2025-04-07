import  { neon } from "@neondatabase/serverless"
import dotenv from "dotenv"

dotenv.config()

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env

//crete a SQL connection 
export const sql = neon (
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}@${PGDATABASE}?sslmode=require`,
)