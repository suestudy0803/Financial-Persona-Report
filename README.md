# Project 1
# 💳 금융 MBTI (Finance MBTI)

> **나만의 금융 투자 성향을 파악하고 결과를 공유해보세요!**  
본 프로젝트는 모바일 웹 UI에 최적화된 금융 MBTI 진단 서비스입니다.

---

## 💡 프로젝트 개요

사용자는 간단한 객관식 질문에 답하면서 자신의 투자 성향을 **4가지 금융 MBTI 축**을 통해 분석받을 수 있습니다.

### 🧩 금융 MBTI 4가지 유형 축
* **P / A** : 직간접 투자형 (Passive / Active)
* **N / S** : 정보 분석형 (News-based / System-based)
* **F / D** : 자산 배분형 (Fixed / Diverse)
* **T / H** : 투자 호흡 (Short-Term / Long-Holding)

---

## 📱 사용자 시나리오 & 주요 기능

### 1. 사용자 시나리오
1. **메인 화면**: 금융 MBTI 테스트 시작하기
2. **진단 진행**: 모바일 친화적 UI에서 객관식 문항 답변 선택
3. **결과 확인**: 최종 선택에 기반한 나만의 금융 MBTI 유형 확인
4. **결과 공유**: SNS 또는 링크 공유 기능을 통해 결과 공유

### 2. 핵심 기능
* **질문 및 선택지 UI**: 모바일 스크린에 최적화된 선택 화면
* **상태 제어**: 선택지 선택 상태 표시 및 미선택 시 [다음] 버튼 비활성화
* **네비게이션**: [이전] / [다음] 버튼 이동 및 실시간 프로그레스 바(Progress Bar)
* **결과 도출**: 마지막 문항 완료 시 [결과 보기] 버튼 전환
* **결과 공유**: 결과 페이지 공유하기 기능

---

## 🛠 기술 스택

* **Framework**: Next.js
* **Language**: JavaScript (ES6+)
* **Styling**: Tailwind CSS, Stitch UI
* **Deployment**: Vercel
*(본 프로젝트는 별도의 백엔드 및 데이터베이스 없이 Client-Side 중심으로 동작합니다.)*

---

## 🚀 실행 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속합니다.

### 3. 정적 빌드

```bash
npm run build
```

빌드 결과는 `out/` 디렉터리에 생성됩니다.
