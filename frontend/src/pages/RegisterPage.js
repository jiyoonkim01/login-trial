import { useState } from "react";
import api from "../api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { email, password });
      alert("회원가입 성공! 로그인해주세요.");
      window.location.href = "/";
    } catch (err) {
      alert("회원가입 실패: 이미 사용 중인 이메일입니다.");
    }
  };

  return (
    <div className="container">
      <h2>회원가입</h2>

      <input
        type="text"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}
