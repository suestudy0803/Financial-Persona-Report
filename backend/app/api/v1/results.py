from fastapi import APIRouter, HTTPException

from app.core.supabase_client import supabase
from app.schemas.result import ResultResponse, SubmitRequest
from app.services.scoring import calculate_result

router = APIRouter()


@router.post("/submit", response_model=ResultResponse, summary="답변 제출, 점수 계산 및 결과 저장")
def submit_answers(payload: SubmitRequest):
    try:
        questions = supabase.table("questions").select("id, axis").execute().data

        if len(payload.answers) != len(questions):
            raise HTTPException(
                status_code=400,
                detail=f"모든 질문({len(questions)}개)에 답변해야 합니다. (받은 답변: {len(payload.answers)}개)",
            )

        scores, percentages, code = calculate_result(payload.answers, questions)

        inserted = (
            supabase.table("results")
            .insert({"answers": payload.answers, "code": code})
            .execute()
            .data[0]
        )

        return {
            "id": inserted["id"],
            "code": code,
            "scores": scores,
            "percentages": percentages,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"결과 저장 실패: {str(e)}")


@router.get("/results/{result_id}", response_model=ResultResponse, summary="저장된 결과 조회 (공유 링크용)")
def get_result(result_id: str):
    try:
        row = supabase.table("results").select("*").eq("id", result_id).single().execute().data
        questions = supabase.table("questions").select("id, axis").execute().data

        answers = {int(k): v for k, v in row["answers"].items()}
        scores, percentages, _ = calculate_result(answers, questions)

        return {
            "id": row["id"],
            "code": row["code"],
            "scores": scores,
            "percentages": percentages,
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"결과를 찾을 수 없습니다: {str(e)}")
