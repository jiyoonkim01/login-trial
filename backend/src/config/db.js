const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0803",
  database: "login_trial",
});

module.exports = pool;
