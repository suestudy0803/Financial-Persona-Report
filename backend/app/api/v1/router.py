from fastapi import APIRouter
from app.api.v1 import questions, results

api_router = APIRouter()

# 2번 담당: 질문 API 라우터 연결
api_router.include_router(questions.router, tags=["Questions"])

# 1번 담당: 답변 제출/결과 조회 라우터 연결
api_router.include_router(results.router, tags=["Results"])