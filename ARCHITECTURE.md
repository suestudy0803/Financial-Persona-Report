Architecture Overview
이 문서는 투자 MBTI 테스트 서비스의 핵심 기술 스택 및 구조를 간략히 설명합니다.


1. 사용 기술 (Tech Stack)

별도의 백엔드/DB 없이 100% 클라이언트 사이드에서 동작하는 정적 웹 서비스입니다.

Framework: Next.js (App Router)
Language: JavaScript
Styling: Tailwind CSS
Deployment: Vercel
Database / Backend: 없음 (Serverless / Pure Frontend)


2. 디렉토리 구조 (Directory Structure)

Plaintext
src/
├── app/                  # Next.js App 라우팅 (page.js, layout.js)
│   ├── page.js           # [랜딩] 테스트 시작 화면
│   ├── test/page.js      # [테스트] 16개 질문 진행 화면
│   └── result/[type]/    # [결과] 16가지 결과 페이지 (/result/PSDH)
├── components/           # UI 컴포넌트 (ProgressBar, QuestionCard 등)
├── data/                 # 정적 데이터 (questions.js, results.js)
└── utils/                # 점수 계산 및 동률(PNDH) 보정 로직 (calculator.js)


3. 핵심 데이터 흐름 (Data Flow)

[랜딩] 테스트 시작 버튼 클릭
[테스트 진행] data/questions.js에서 질문 렌더링 ➔ 유저 선택에 따른 점수 저장 (State)
[점수 계산] utils/calculator.js에서 4대 축 점수 합산 (동률 시 PNDH 디폴트 적용) ➔ 최종 4글자 코드 도출
[결과 출력] /result/[type] 라우팅 ➔ data/results.js에서 매핑된 동물 캐릭터 및 설명 렌더링


4. 핵심 특징 (Key Features)

Zero Latency: 서버 통신(API)이 없어 결과가 즉시 출력됩니다.
유지보수 용이: 질문/결과 데이터(questions.js, results.js)가 UI 코드와 분리되어 있어 텍스트 수정이 쉽습니다.
보안 및 안전성: 서버/DB가 없어 개인정보 유출 위험이 없으며, 잘못된 URL 접근 시 기본 결과(PNDH)로 안내합니다.