import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FindEmailPage from "./pages/FindEmailPage";
import FindPasswordPage from "./pages/FindPasswordPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10 }}>
        <Link to="/">로그인</Link> |{" "}
        <Link to="/register">회원가입</Link> |{" "}
        <Link to="/find-email">아이디 찾기</Link> |{" "}
        <Link to="/find-password">비밀번호 찾기</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/find-email" element={<FindEmailPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
