// src/app/test/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";
import { calculateResult } from "@/utils/calculator";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";

export default function TestPage() {
    const router = useRouter();

    // --------------------------------------------------
    // [Step 4] 질문 페이지 상태(State) 설계
    // --------------------------------------------------
    // 1. currentIndex: 현재 진행 중인 질문 인덱스 (0부터 시작)
    const [currentIndex, setCurrentIndex] = useState(0);

    // 2. answers: 각 질문 인덱스별로 유저가 선택한 option 객체를 저장하는 객체
    // 예: { 0: { id: "AP1-1", type: "A", score: 2 }, 1: { ... } }
    const [answers, setAnswers] = useState({});

    // 현재 질문 데이터 및 총 질문 수
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex];

    // 유저가 현재 질문에서 이미 선택한 답변이 있는지 확인
    const selectedOption = answers[currentIndex] || null;

    // --------------------------------------------------
    // [Step 5 & 6] 답변 선택 및 이동 / 예외 처리 로직
    // --------------------------------------------------
    // 답변 선택 클릭 시
    const handleSelectOption = (option) => {
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: option,
        }));
    };

    // 이전 버튼 클릭 시
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    // 다음 버튼 클릭 시
    const handleNext = () => {
        // 예외 처리: 답변을 고르지 않은 상태에서 다음으로 넘어가려는 경우
        if (!selectedOption) {
            alert("답변을 선택해 주세요!");
            return;
        }

        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    // [Step 7] 마지막 질문 - 결과 보기 버튼 클릭 시
    const handleSubmit = () => {
        if (!selectedOption) {
            alert("답변을 선택해 주세요!");
            return;
        }

        // 1. answers 객체의 값들(option 객체들)을 배열로 추출
        const answerList = Object.values(answers);

        // 2. calculator.js의 calculateResult 함수를 실행하여 4글자 성향 코드 도출
        const resultType = calculateResult(answerList);

        // 3. 결과 페이지로 이동 (예: /result/PSDH)
        router.push(`/result/${resultType}`);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-between py-8 px-4">
            {/* 1. 상단 프로그레스 바 (1부터 시작하도록 currentIndex + 1 전달) */}
            <div>
                <ProgressBar current={currentIndex + 1} total={totalQuestions} />

                {/* 2. 중앙 질문 카운터 및 질문 카드 */}
                <div className="mt-4">
                    <QuestionCard
                        questionData={currentQuestion}
                        selectedOption={selectedOption}
                        onSelectOption={handleSelectOption}
                    />
                </div>
            </div>

            {/* 3. 하단 네비게이션 버튼 (이전 / 다음 / 결과 보기) */}
            <div className="w-full max-w-xl mx-auto mt-8 flex gap-3">
                {/* 첫 번째 질문(currentIndex === 0)일 때는 이전 버튼 숨김 */}
                {currentIndex > 0 && (
                    <button
                        onClick={handlePrev}
                        className="flex-1 py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
                    >
                        이전
                    </button>
                )}

                {/* 마지막 질문이 아니면 '다음', 마지막 질문이면 '결과 보기' 버튼 표시 */}
                {currentIndex < totalQuestions - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={!selectedOption} // 선택지가 없으면 버튼 비활성화 스타일
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${selectedOption
                                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        다음
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                        className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${selectedOption
                                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg animate-pulse"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                    >
                        결과 보기 🎉
                    </button>
                )}
            </div>
        </main>
    );
}