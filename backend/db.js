import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: "postgres",
    password: "hello",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

export default pool;