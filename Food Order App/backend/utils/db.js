import pkg from "pg"
import "dotenv/config"

const {Client} = pkg 

const db = new Client({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port:process.env.DB_PORT
})

db.connect()
.then(() => console.log('PostgreSQL Connect'))
.catch((err) => console.error("Connect error",
err.stack))

export default db