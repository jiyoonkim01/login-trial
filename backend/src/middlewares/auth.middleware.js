const jwt = require("jsonwebtoken");

const JWT_SECRET = "dev-secret-key-change-this-later";

// 요청 헤더에서 token 확인 → 검증 → req.user 에 담기
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Authorization 헤더가 아예 없음
  if (!authHeader) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  // "Bearer TOKEN값" 형태 → TOKEN 추출
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "토큰 형식이 올바르지 않습니다." });
  }

  // 토큰 검증
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // req.user.userId 로 접근 가능
    next(); // 다음 라우트로 이동
  } catch (err) {
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
}

module.exports = authMiddleware;
