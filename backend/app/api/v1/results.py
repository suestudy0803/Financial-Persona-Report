from typing import Dict, List

from fastapi import APIRouter, HTTPException

from app.core.supabase_client import supabase
from app.schemas.result import ResultResponse, SubmitRequest
from app.services.scoring import calculate_result

router = APIRouter()


def _answers_to_db(answers: Dict[int, str]) -> List[dict]:
    # DB의 answers 컬럼은 jsonb 배열이어야 한다는 제약(results_answers_array_check)이 있어서 변환
    return [{"question_id": qid, "option_id": oid} for qid, oid in answers.items()]


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
            .insert({"answers": _answers_to_db(payload.answers), "code": code})
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
