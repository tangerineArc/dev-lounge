import pool from "./pool.js";

async function selectUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function selectUserById(id) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function saveUser({ username, passwordHash }) {
  await pool.query(
    "INSERT INTO usernames (username, password_hash) VALUES ($1, $2)",
    [username, passwordHash]
  );
}

export { saveUser, selectUserById, selectUserByUsername };
