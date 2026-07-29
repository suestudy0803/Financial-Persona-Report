from pydantic import BaseModel
from typing import List

class OptionSchema(BaseModel):
    id: str
    text: str
    type: str
    score: int

class QuestionSchema(BaseModel):
    id: int
    axis: str
    question: str
    options: List[OptionSchema]
    