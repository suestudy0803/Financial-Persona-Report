from fastapi import APIRouter, HTTPException
from typing import Optional, Union, List, Dict, Any
from app.core.supabase_client import supabase
from pydantic import BaseModel

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

@router.get("/results/{result_id}", response_model=ResultResponseSchema, summary="결과 상세 조회")
def get_result(result_id: str):
    if not result_id:
        raise HTTPException(status_code=400, detail="result_id가 필요합니다.")

    try:
        # Query results table and join with personas table
        response = supabase.table("results").select(
            "id, code, personas (name, image_path, description)"
        ).eq("id", result_id).single().execute()

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
                "image_path": persona_data.get("image_path", "") if persona_data else "",
                "description": persona_data.get("description", "") if persona_data else ""
            }
        }

    except Exception as e:
        print("GET /api/v1/results/{result_id} Error:", str(e))
        raise HTTPException(status_code=500, detail="서버 에러가 발생했습니다.")
