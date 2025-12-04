import { useState } from "react";
import api from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      alert("로그인 성공!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="container">
      <h2>로그인</h2>

      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>로그인</button>

      <div className="links">
        <a href="/find-email">아이디(이메일) 찾기</a>
        <a href="/find-password">비밀번호 찾기</a>
      </div>
    </div>
  );
}
