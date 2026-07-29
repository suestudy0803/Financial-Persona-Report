from fastapi import APIRouter, HTTPException, status
from typing import List, Any, Dict
from app.database import supabase

router = APIRouter()

@router.get("")
async def get_all_questions():
    """
    질문과 선택지 목록을 조회합니다. (원인 파악용 로그 출력 포함)
    """
    try:
        # Supabase 쿼리 실행
        response = (
            supabase.table("questions")
            .select("*, choices(*)")
            .order("display_order")
            .execute()
        )
        
        # 터미널에 DB 응답 데이터 출력해보기
        print("====== [DEBUG] Supabase Response ======")
        print(response.data)
        print("=======================================")

        return response.data

    except Exception as e:
        # 터미널에 에러 출력
        print("====== [ERROR] Exception Occurred ======")
        print(type(e), e)
        print("========================================")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"DB 조회 또는 처리 중 에러 발생: {str(e)}"
        )