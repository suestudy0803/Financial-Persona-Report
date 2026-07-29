from pydantic import BaseModel
from typing import List

class OptionSchema(BaseModel):
    id: str
    text: str

class QuestionSchema(BaseModel):
    id: int
    axis: str
    question: str
    options: List[OptionSchema]