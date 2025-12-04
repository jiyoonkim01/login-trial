const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const authRoutes = require("./routes/auth.routes");

const app = express();

// CORS + JSON 파싱 설정
app.use(cors());
app.use(express.json());

// 루트 테스트용
app.get("/", (req, res) => {
  res.send("서버 정상 동작 중!");
});

// DB 연결 테스트용
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.send({
      message: "DB 연결 성공!",
      result: rows[0].result,
    });
  } catch (err) {
    console.error("DB 연결 실패:", err);
    res.status(500).send("DB 연결 실패");
  }
});

// ★ 여기서부터 회원가입/로그인 라우트 사용
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});


/* 1차
const express = require("express");
const app = express();
const pool = require("./config/db");

app.use(express.json());

// DB 연결 테스트용 엔드포인트
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.send({
      message: "DB 연결 성공!",
      result: rows[0].result,
    });
  } catch (err) {
    console.error("DB 연결 실패:", err);
    res.status(500).send("DB 연결 실패");
  }
});

app.listen(3000, () => {
  console.log("서버 실행 중: http://localhost:3000");
});
*/