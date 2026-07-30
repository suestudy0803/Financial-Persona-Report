from fastapi import APIRouter, HTTPException
from typing import List
from app.core.supabase_client import supabase

from app.schemas.result import AnswerItem, ResultResponse, SubmitRequest, PersonaSchema, ResultResponseSchema
from app.services.scoring import calculate_result

router = APIRouter()


@router.get(
    "/results/{code}",
    response_model=ResultResponseSchema,
    summary="결과 상세 조회",
)
def get_result(code: str):
    if not code:
        raise HTTPException(status_code=400, detail="code가 필요합니다.")

    try:
        # personas 테이블에 직접 code로 접근
        response = (
            supabase.table("personas")
            .select("name, image_path, description")
            .eq("code", code)
            .single()
            .execute()
        )

        persona_data = response.data

        if not persona_data:
            raise HTTPException(status_code=404, detail="결과를 찾을 수 없습니다.")

        return {
            "code": code,
            "persona": {
                "name": persona_data.get("name", ""),
                "image_path": persona_data.get("image_path", ""),
                "description": persona_data.get("description", ""),
            },
        }

    except Exception as e:
        print(f"GET /api/v1/results/{code} Error:", str(e))
        raise HTTPException(status_code=500, detail="서버 에러가 발생했습니다.")



def _answers_to_db(answers: List[AnswerItem]) -> List[dict]:
    # DB의 answers 컬럼은 jsonb 배열이어야 한다는 제약(results_answers_array_check)이 있어서 변환
    return [
        {"question_id": a.question_id, "option_id": a.choice_id} for a in answers
    ]


@router.post(
    "/results",
    response_model=ResultResponse,
    summary="답변 제출, 점수 계산 및 결과 저장",
)
def submit_answers(payload: SubmitRequest):
    try:
        questions = supabase.table("questions").select("id, axis").execute().data

        if len(payload.answers) != len(questions):
            raise HTTPException(
                status_code=400,
                detail=f"모든 질문({len(questions)}개)에 답변해야 합니다. (받은 답변: {len(payload.answers)}개)",
            )

        answers_by_question_id = {a.question_id: a.choice_id for a in payload.answers}
        _, _, code = calculate_result(answers_by_question_id, questions)

        inserted = (
            supabase.table("results")
            .insert({"answers": _answers_to_db(payload.answers), "code": code})
            .execute()
            .data[0]
        )

        return {
            "result_id": inserted["id"],
            "code": code,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"결과 저장 실패: {str(e)}")
