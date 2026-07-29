from typing import Dict

from pydantic import BaseModel


class SubmitRequest(BaseModel):
    # {question_id: option_id} 예: {1: "AP1-2", 2: "AP2-4", ...}
    answers: Dict[int, str]


class ResultResponse(BaseModel):
    id: str
    code: str
    scores: Dict[str, Dict[str, int]]
    percentages: Dict[str, Dict[str, float]]
