from typing import List

from pydantic import BaseModel


class AnswerItem(BaseModel):
    question_id: int
    choice_id: str


class SubmitRequest(BaseModel):
    answers: List[AnswerItem]


class ResultResponse(BaseModel):
    result_id: str
    code: str


class PersonaSchema(BaseModel):
    name: str
    image_path: str
    description: str


class ResultResponseSchema(BaseModel):
    code: str
    persona: PersonaSchema

