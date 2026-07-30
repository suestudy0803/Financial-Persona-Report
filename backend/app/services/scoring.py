from typing import Dict, List, Tuple

# 선택지 순서(1~4번째)별 점수 크기(부호 없음): 강한 2, 약한 1, 약한 1, 강한 2
CHOICE_MAGNITUDES = {1: 2, 2: 1, 3: 1, 4: 2}

# 1,2번 선택지는 첫 성향 쪽에, 3,4번 선택지는 둘째 성향 쪽에 점수가 쌓인다
FIRST_POLE_CHOICES = {1, 2}

# 축 코드 -> (첫 성향 글자, 둘째 성향 글자)
# DB 기준: AP 축의 선택지 1,2번은 A 타입, 3,4번은 P 타입이므로 A가 첫 성향, P가 둘째 성향이다.
AXIS_POLES = {
    "AP": ("A", "P"),
    "NS": ("N", "S"),
    "FD": ("F", "D"),
    "TH": ("T", "H"),
}

# 동점일 때 결과 코드에 사용할 기본 성향 (SPEC.md §3 기본 성향 테이블 기준)
# 모든 점수가 동점이면 결과 코드는 PNDH
DEFAULT_POLES = {
    "AP": "P",
    "NS": "N",
    "FD": "D",
    "TH": "H",
}


def _choice_index(option_id: str) -> int:
    # option_id 형식: "AP1-2" -> 2
    return int(option_id.rsplit("-", 1)[-1])


def calculate_result(
    answers: Dict[int, str], questions: List[dict]
) -> Tuple[Dict[str, Dict[str, int]], Dict[str, Dict[str, float]], str]:
    axis_by_question_id = {q["id"]: q["axis"] for q in questions}

    # 축별로 첫 성향/둘째 성향 점수를 각각 누적
    pole_scores = {axis: {"first": 0, "second": 0} for axis in AXIS_POLES}
    for question_id, option_id in answers.items():
        axis = axis_by_question_id[question_id]
        choice_index = _choice_index(option_id)
        magnitude = CHOICE_MAGNITUDES[choice_index]
        side = "first" if choice_index in FIRST_POLE_CHOICES else "second"
        pole_scores[axis][side] += magnitude

    scores: Dict[str, Dict[str, int]] = {}
    percentages: Dict[str, Dict[str, float]] = {}
    code = ""
    for axis, (neg_letter, pos_letter) in AXIS_POLES.items():
        first_score = pole_scores[axis]["first"]
        second_score = pole_scores[axis]["second"]
        scores[axis] = {neg_letter: first_score, pos_letter: second_score}

        # 동점이면 DEFAULT_POLES의 기본 성향을 따른다 (SPEC.md §3).
        if second_score > first_score:
            letter = pos_letter
        elif first_score > second_score:
            letter = neg_letter
        else:
            letter = DEFAULT_POLES[axis]
        code += letter

        # SPEC.md 퍼센티지 공식은 부호 있는 축 점수(-4~+4) 기준이므로 여기서 다시 계산
        signed_score = second_score - first_score
        neg_pct = (4 - signed_score) * 12.5
        percentages[axis] = {neg_letter: neg_pct, pos_letter: 100 - neg_pct}

    return scores, percentages, code
