# Architecture

금융 MBTI 서비스는 `frontend/`와 `backend/`를 하나의 모노레포에서 관리한다. 프론트엔드는 Next.js, 백엔드는 FastAPI, 데이터베이스는 Supabase PostgreSQL을 사용한다. 브라우저가 Supabase에 직접 접근하지 않고 FastAPI를 통해서만 데이터에 접근한다.

## 1. 기술 스택

| 영역 | 기술 | 역할 |
|---|---|---|
| Frontend | Next.js App Router, JavaScript, Tailwind CSS | 화면, 사용자 입력, 테스트 진행 상태, 결과 표시 |
| Backend | FastAPI, Python | API, 입력 검증, 테스트 계산·저장, 예외 응답 |
| Database | Supabase PostgreSQL | 질문·선택지·결과·테스트 기록 저장 |
| Database 관리 | Supabase CLI, SQL migration | 스키마 변경과 초기 데이터 관리 |
| 배포 | Frontend/Backend 배포 환경은 추후 결정 | 앱별 독립 배포 |

프론트엔드에는 Supabase `service_role` 키를 절대 노출하지 않는다. 데이터 접근과 비즈니스 규칙은 FastAPI가 담당한다.

## 2. 모노레포 구조

```text
Financial-Persona-Report/
├── frontend/                        # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/                     # App Router 페이지와 레이아웃
│   │   ├── components/              # 공통 UI 컴포넌트
│   │   ├── data/                    # 프론트 전용 정적 데이터가 필요할 때만 사용
│   │   └── lib/                     # API 클라이언트와 브라우저 유틸리티
│   ├── public/                      # 프론트 정적 파일
│   ├── DESIGN.md                    # 프론트엔드 디자인 기준
│   ├── package.json
│   └── next.config.mjs
│
├── backend/                         # FastAPI 백엔드
│   ├── app/
│   │   ├── main.py                  # FastAPI 앱 진입점
│   │   ├── api/                     # 라우터와 API 버전
│   │   ├── core/                    # 설정, 보안, 공통 예외
│   │   ├── models/                  # DB 모델 또는 응답 모델
│   │   ├── schemas/                 # 요청·응답 검증 스키마
│   │   ├── services/                # 테스트 계산·업무 규칙
│   │   └── repositories/            # Supabase/PostgreSQL 접근
│   ├── supabase/
│   │   ├── migrations/              # 스키마 변경 SQL
│   │   ├── seed.sql                 # 개발용 초기 데이터
│   │   └── config.toml
│   ├── tests/
│   └── pyproject.toml
│
├── docs/                            # ARCHITECTURE, SPEC, TASK, API·운영 문서
├── README.md                        # 프로젝트 시작 안내
└── .gitignore
```

프론트엔드 전용 디자인 문서는 `frontend/DESIGN.md`에 두고, 전체 구조와 기능 명세는 `docs/ARCHITECTURE.md`와 `docs/SPEC.md`에서 관리한다.

## 3. 서비스 경계

```text
Browser
  ↓ HTTPS
Next.js (frontend)
  ↓ /api/v1/*
FastAPI (backend)
  ↓ server-only credentials
Supabase PostgreSQL
```

- Next.js는 화면과 사용자 경험을 담당한다.
- FastAPI는 요청 검증, 계산 규칙, 데이터 접근을 담당한다.
- Supabase는 영속 데이터와 데이터베이스 보안 정책을 담당한다.
- 프론트엔드에서 Supabase REST API 또는 DB 연결 정보를 직접 사용하지 않는다.
- FastAPI의 OpenAPI 문서를 API 계약의 기준으로 삼는다.

## 4. 핵심 데이터 흐름

### 질문 조회

1. 테스트 화면이 FastAPI에 질문 목록을 요청한다.
2. FastAPI가 Supabase에서 활성 질문과 선택지를 조회한다.
3. FastAPI가 공개 가능한 질문 데이터만 응답한다.
4. Next.js가 질문을 한 문항씩 렌더링한다.

### 테스트 제출

1. 사용자가 각 질문의 선택지를 하나씩 선택한다.
2. Next.js가 답변을 로컬 상태로 유지한다.
3. 마지막 답변에서 답변 목록을 FastAPI에 제출한다.
4. FastAPI가 질문 ID, 선택지 ID, 답변 누락 여부를 검증한다.
5. FastAPI가 네 축의 점수와 결과 유형을 계산한다.
6. 필요한 경우 제출 기록과 결과를 Supabase에 저장한다.
7. FastAPI가 결과 코드와 결과 상세를 반환한다.
8. Next.js가 결과 화면을 표시한다.

## 5. API 책임

초기 API는 `/api/v1` 아래에 둔다. 실제 엔드포인트와 응답 형식은 구현 전에 확정한다.

| 엔드포인트 예시 | 책임 |
|---|---|
| `GET /api/v1/questions` | 활성 질문·선택지 조회 |
| `POST /api/v1/assessments` | 답변 검증, 점수 계산, 결과 생성 |
| `GET /api/v1/results/{code}` | 결과 코드에 해당하는 결과 조회 |
| `GET /health` | 백엔드 상태 확인 |

FastAPI 라우터는 요청을 받고 서비스로 전달하는 역할만 한다. 계산과 데이터 접근을 라우터에 직접 작성하지 않는다.

## 6. 데이터베이스 원칙

- 모든 스키마 변경은 `supabase/migrations/`에 SQL migration으로 기록한다.
- 질문, 선택지, 결과 유형, 테스트 제출 기록의 테이블 구조는 `docs/SPEC.md`와 함께 확정한다.
- 외부에 노출되는 `public` 스키마의 테이블에는 RLS를 활성화한다.
- RLS 정책은 실제 접근 주체와 소유권에 맞게 작성한다. 단순히 `authenticated` 역할만 확인하는 정책은 사용하지 않는다.
- `service_role` 키는 FastAPI 서버 환경에서만 사용하고 로그·응답·프론트엔드에 노출하지 않는다.
- 개발용 초기 데이터는 `supabase/seed.sql`로 관리하며 운영 데이터와 섞지 않는다.
- Supabase 패키지와 CLI 버전은 lockfile 또는 프로젝트 설정으로 고정한다.

## 7. 상태 관리와 예외 처리

### Frontend

- 현재 질문 번호와 사용자의 답변은 테스트 화면의 로컬 상태로 관리한다.
- 서버에서 받은 질문과 결과는 API 요청 상태로 관리한다.
- 별도 상태 관리 라이브러리는 여러 화면에서 공유해야 할 상태가 생길 때만 도입한다.
- 로딩, 네트워크 오류, 빈 질문 목록, 제출 실패, 잘못된 결과 코드를 사용자에게 표시한다.

### Backend

- Pydantic 스키마로 요청과 응답을 검증한다.
- 잘못된 질문·선택지 ID, 중복 답변, 답변 누락은 `4xx`로 응답한다.
- 예상하지 못한 서버·DB 오류는 내부 정보를 노출하지 않는 `5xx` 응답으로 처리하고 서버 로그에만 상세 내용을 남긴다.
- 계산 함수는 라우터와 분리하고, 동일한 입력에 동일한 결과를 반환하도록 유지한다.

## 8. 기술 선택과 트레이드오프

- **모노레포**: 프론트엔드·백엔드·DB migration을 한 저장소에서 함께 관리하기 쉽다. 대신 앱별 의존성과 실행 방법을 분리해야 한다.
- **FastAPI**: Python 기반 검증과 계산 로직을 명확히 분리할 수 있고 OpenAPI 문서를 자동 생성한다. 프론트엔드와 별도 서버를 운영해야 한다.
- **Supabase**: PostgreSQL, 관리 콘솔, migration, RLS를 함께 제공한다. Supabase 기능에 대한 의존성이 생기므로 데이터 접근 경계를 FastAPI에 고정한다.
- **FastAPI를 통한 DB 접근**: 브라우저의 비밀정보 노출을 막고 규칙을 한 곳에 모을 수 있다. 단순 조회도 API를 거치므로 직접 접근보다 코드와 지연이 늘어난다.
- **앱별 독립 배포**: Next.js와 FastAPI를 각각 적합한 환경에 배포할 수 있다. CORS, 환경 변수, 버전 호환성을 별도로 관리해야 한다.

## 9. 구현 전 결정사항

- 테스트 제출 기록을 Supabase에 저장할지, 결과만 계산하고 저장하지 않을지 결정한다.
- 사용자 인증이 필요한지 결정한다. 인증이 없으면 개인 식별 정보와 제출 기록을 최소화한다.
- FastAPI의 Supabase 접근 방식을 결정한다: Supabase Python client 또는 PostgreSQL 전용 드라이버.
- 질문·선택지·결과 데이터의 최종 테이블과 RLS 정책을 결정한다.
- API 응답 형식과 에러 형식을 확정하고 OpenAPI 기준으로 공유한다.
- 모노레포 패키지 관리 방식과 공통 실행 명령을 결정한다.
- Next.js와 FastAPI의 로컬 실행 포트, CORS 허용 origin, 배포 환경을 결정한다.
- 운영·개발·테스트 환경의 Supabase 프로젝트 분리 여부를 결정한다.
