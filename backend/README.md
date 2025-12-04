# 백엔드 폴더 구조

routes/ → URL 정의

controllers/ → 요청/응답 처리

services/ → 실제 비즈니스 로직 (DB 조회, 토큰 생성 등)

models/ → DB 테이블 정의

middlewares/ → JWT 인증 등

utils/ → 공통 함수



# 백엔드 프로젝트 세팅
1) 기본 app.js 만들기
mkdir backend
cd backend
npm init -y
npm i express mysql2 bcrypt jsonwebtoken dotenv cors
npm i -D nodemon

2) DB에 user 테이블 생성
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT NOW()
);

3) 회원가입 API 구현
- bcrypt로 password hash
- DB 저장

4) 로그인 API 구현
- 이메일 존재 확인
- 비밀번호 비교
- JWT 발급 (access_token)

5) 인증 미들웨어 만들기
- Authorization: Bearer <token> 형식 검사

6) Postman으로 모든 API 테스트


여기까지 되면 백엔드의 기본 인증 기능 완성.