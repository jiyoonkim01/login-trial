const pool = require("../config/db");

// 이메일로 유저 찾기
async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0]; // 없으면 undefined
}

// 새 유저 생성
async function createUser(email, passwordHash) {
  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, passwordHash]
  );

  return {
    id: result.insertId,
    email,
  };
}

module.exports = {
  findUserByEmail,
  createUser,
};
