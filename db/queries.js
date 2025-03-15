import pool from "./pool.js";

async function selectMemberByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM member WHERE username = $1",
    [username]
  );
  return rows[0];
}

async function selectMemberById(id) {
  const { rows } = await pool.query("SELECT * FROM member WHERE id = $1", [id]);
  return rows[0];
}

async function selectAllPosts() {
  const { rows } = await pool.query(
    "SELECT post.id AS post_id, member.id AS member_id, member.username, post.title, post.description, post.created_at FROM post INNER JOIN member ON post.userid = member.id ORDER BY post.created_at DESC"
  );
  return rows;
}

async function selectAllPostsByUserId(userId) {
  const { rows } = await pool.query("SELECT * FROM post WHERE userid = $1", [
    userId,
  ]);
  return rows;
}

async function insertNewMember({
  username,
  passwordHash,
  firstName,
  lastName,
}) {
  await pool.query(
    "INSERT INTO member (username, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4)",
    [username, passwordHash, firstName, lastName]
  );
}

async function insertNewPost({ title, description, userId }) {
  await pool.query(
    "INSERT INTO post (title, description, userId) VALUES ($1, $2, $3)",
    [title, description, userId]
  );
}

async function checkUsernameExistence(username) {
  const { rows } = await pool.query(
    "SELECT exists (SELECT 1 FROM member WHERE username = $1 LIMIT 1)",
    [username]
  );
  return rows[0].exists;
}

async function deletePostById(id) {
  await pool.query("DELETE FROM post WHERE id = $1", [id]);
}

async function updateMemberStatusToKnight(id) {
  await pool.query(
    "UPDATE member SET membership_status = 'knight' WHERE id = $1",
    [id]
  );
}

async function verifyPostAndMember(postId, memberId) {
  const { rows } = await pool.query(
    "SELECT exists (SELECT 1 FROM post WHERE id = $1 AND userid = $2 LIMIT 1)",
    [postId, memberId]
  );
  return rows[0].exists;
}

export {
  checkUsernameExistence,
  deletePostById,
  insertNewMember,
  insertNewPost,
  selectAllPosts,
  selectAllPostsByUserId,
  selectMemberById,
  selectMemberByUsername,
  updateMemberStatusToKnight,
  verifyPostAndMember,
};
