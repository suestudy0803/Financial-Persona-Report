from fastapi import APIRouter
from app.api.v1 import questions, results

api_router = APIRouter()

# 2번 담당: 질문 API 라우터 연결
api_router.include_router(questions.router, tags=["Questions"])

# 1번 담당자 분이 만든 submit, results 라우터도 추후 여기에 include_router 해주면 됩니다.
