from fastapi import APIRouter, HTTPException
from typing import List
from app.core.supabase_client import supabase
from pydantic import BaseModel

from app.schemas.result import AnswerItem, ResultResponse, SubmitRequest
from app.services.scoring import calculate_result

router = APIRouter()


# Response schemas using Pydantic
class PersonaSchema(BaseModel):
    name: str
    image_path: str
    description: str


class ResultResponseSchema(BaseModel):
    result_id: str
    code: str
    persona: PersonaSchema


@router.get(
    "/results/{result_id}",
    response_model=ResultResponseSchema,
    summary="결과 상세 조회",
)
def get_result(result_id: str):
    if not result_id:
        raise HTTPException(status_code=400, detail="result_id가 필요합니다.")

    try:
        # Query results table and join with personas table
        response = (
            supabase.table("results")
            .select("id, code, personas (name, image_path, description)")
            .eq("id", result_id)
            .single()
            .execute()
        )

        result = response.data

        if not result:
            raise HTTPException(status_code=404, detail="결과를 찾을 수 없습니다.")

        # Handle case where personas is a list or a single dictionary
        personas = result.get("personas")
        persona_data = personas[0] if isinstance(personas, list) else personas

        return {
            "result_id": result.get("id"),
            "code": result.get("code"),
            "persona": {
                "name": persona_data.get("name", "") if persona_data else "",
                "image_path": (
                    persona_data.get("image_path", "") if persona_data else ""
                ),
                "description": (
                    persona_data.get("description", "") if persona_data else ""
                ),
            },
        }

    except Exception as e:
        print("GET /api/v1/results/{result_id} Error:", str(e))
        raise HTTPException(status_code=500, detail="서버 에러가 발생했습니다.")


def _answers_to_db(answers: List[AnswerItem]) -> List[dict]:
    # DB의 answers 컬럼은 jsonb 배열이어야 한다는 제약(results_answers_array_check)이 있어서 변환
    return [
        {"question_id": a.question_id, "option_id": a.choice_id} for a in answers
    ]


@router.post(
    "/submit",
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
