import  pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    database: "postgres",
    password: "mysecretpassword",
    port: 5432,
    host: "localhost",
    user: "postgres",
})

export default pool;