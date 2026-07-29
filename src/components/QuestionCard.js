"use client";

import Choice from "./Choice";

export default function QuestionCard({
  questionData,
  selectedOption,
  onSelectOption,
  disabled = false,
}) {
  if (!questionData) return null;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      {/* 질문 영역 */}
      <div className="space-y-2">
        <h2 className="text-[20px] font-bold text-ink leading-[1.4] tracking-tight">
          {questionData.question}
        </h2>
      </div>

      {/* 선택지 목록 영역 */}
      <div className="flex flex-col gap-3">
        {questionData.options.map((option) => (
          <Choice
            key={option.id}
            id={option.id}
            name={`question-${questionData.id}`}
            value={option.id}
            label={option.text}
            checked={selectedOption?.id === option.id}
            onChange={() => onSelectOption(option)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
