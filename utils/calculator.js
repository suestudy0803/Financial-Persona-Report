// src/utils/calculator.js

/**
 * 유저의 선택 답변 배열을 받아 점수를 가중 합산 후 4글자 투자 MBTI 코드를 반환하는 함수
 * @param {Array} userAnswers - 유저가 선택한 option 객체들의 배열 [{ id, text, type, score }, ...]
 * @returns {string} 4글자 결과 코드 (예: "PSDH", "ANFT")
 */
export function calculateResult(userAnswers) {
    // 1. 각 성향별 점수 카운터 초기화
    const scores = {
        A: 0,
        P: 0,
        N: 0,
        S: 0,
        F: 0,
        D: 0,
        T: 0,
        H: 0,
    };

    // 2. 유저가 선택한 답변들의 score(1점 또는 2점) 가중치 합산
    userAnswers.forEach((answer) => {
        if (answer && answer.type && scores[answer.type] !== undefined) {
            // score 값이 지정되어 있으면 그 값을 더하고, 없으면 기본 1점 더함
            const points = answer.score || 1;
            scores[answer.type] += points;
        }
    });

    // 3. 축별 점수 비교 및 동률 보정 (동률 시 P, N, D, H 기본값 부여)
    const ap = scores.A > scores.P ? "A" : "P"; // 동률 시 P
    const ns = scores.N >= scores.S ? "N" : "S"; // 동률 시 N
    const fd = scores.D >= scores.F ? "D" : "F"; // 동률 시 D
    const th = scores.H >= scores.T ? "H" : "T"; // 동률 시 H

    // 4. 최종 4글자 코드 조합하여 반환
    return `${ap}${ns}${fd}${th}`;
}