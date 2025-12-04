const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../services/auth.service");

// 실제로는 .env에서 관리하는 게 좋지만, 지금은 연습이라 하드코딩
const JWT_SECRET = "dev-secret-key-change-this-later";

// 회원가입
async function register(req, res) {
  try {
    const { email, password } = req.body;

    // 1) 값이 들어왔는지 확인
    if (!email || !password) {
      return res.status(400).json({ message: "email과 password를 보내주세요." });
    }

    // 2) 이미 가입된 이메일인지 확인
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    }

    // 3) 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4) DB에 저장
    const newUser = await createUser(email, hashedPassword);

    return res.status(201).json({
      message: "회원가입 성공",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("회원가입 에러:", err);
    return res.status(500).json({ message: "서버 에러" });
  }
}

// 로그인
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1) 값 체크
    if (!email || !password) {
      return res.status(400).json({ message: "email과 password를 보내주세요." });
    }

    // 2) 이메일로 유저 조회
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // 3) 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "이메일 또는 비밀번호가 올바르지 않습니다." });
    }

    // 4) JWT 발급
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // 1시간 유효
    );

    return res.json({
      message: "로그인 성공",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("로그인 에러:", err);
    return res.status(500).json({ message: "서버 에러" });
  }
}

async function me(req, res) {
  // 미들웨어가 req.user에 userId 넣어줌
  const { userId, email } = req.user;

  return res.json({
    message: "인증된 사용자입니다.",
    user: { userId, email }
  });
}

module.exports = {
  register,
  login,
  me,
};
