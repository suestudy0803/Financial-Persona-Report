from pydantic import BaseModel
from typing import List

class ChoiceSchema(BaseModel):
    id: int
    question_id: int
    text: str
    type: str
    score: int
    display_order: int

    class Config:
        from_attributes = True

class QuestionSchema(BaseModel):
    id: int
    axis: str
    question_text: str
    display_order: int
    choices: List[ChoiceSchema] = []

    class Config:
        from_attributes = True