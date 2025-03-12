import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_URL,
});

export default pool;
