from fastapi import APIRouter, HTTPException
from typing import List
from app.core.supabase_client import supabase
from app.schemas.question import QuestionSchema

router = APIRouter()

@router.get("/questions", response_model=List[QuestionSchema], summary="질문 목록 조회")
def get_questions():
    try:
        # Supabase 'questions' 테이블에서 선택지와 함께 조회 (DB 테이블 구조에 맞게 조인/조회)
        # DB 담당자가 만든 테이블이 questions, options 인 경우
        response = supabase.table("questions").select("*, options(*)").order("id").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"질문 데이터 조회 실패: {str(e)}")