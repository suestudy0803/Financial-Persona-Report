from fastapi import APIRouter
from app.api.v1 import questions, results

api_router = APIRouter()

# 2번 담당: 질문 API 라우터 연결
api_router.include_router(questions.router, tags=["Questions"])

# 결과 상세 조회 API 연결
api_router.include_router(results.router, tags=["Results"])