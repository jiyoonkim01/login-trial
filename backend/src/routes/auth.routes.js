const express = require("express");
const router = express.Router();
const { register, login, me } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// 회원가입
router.post("/register", register);

// 로그인
router.post("/login", login);

// 인증 필요한 라우트 → middleware 추가
router.get("/me", authMiddleware, me);

module.exports = router;
