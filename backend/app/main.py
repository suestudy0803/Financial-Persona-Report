from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import questions  # 질문 라우터 모듈 불러오기

app = FastAPI(title="Financial MBTI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 질문 라우터 등록
app.include_router(
    questions.router,
    prefix="/api/v1/questions",
    tags=["questions"]
)

# 메인 실행 테스트용 루트 엔드포인트 (선택사항)
@app.get("/")
def read_root():
    return {"message": "Financial MBTI API Server is running!"}