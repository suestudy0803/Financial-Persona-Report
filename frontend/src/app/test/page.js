"use client";

import { useState } from "react";

import Button from "@/components/Button";
import Choice from "@/components/Choice";
import ProgressBar from "@/components/ProgressBar";
import { questions } from "@/data/questions";

export default function TestPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const question = questions[currentIndex];

  function handlePrevious() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function handleNext() {
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }

  return (
    <main className="flex min-h-screen flex-col bg-canvas text-ink">
      <div className="mx-auto flex h-screen min-h-[640px] max-h-[900px] w-full max-w-[600px] flex-col overflow-hidden">
        <div className="px-4 pb-4 pt-10 sm:px-6">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <section className="w-full flex-1 overflow-y-auto px-4 pb-28 pt-12 sm:px-6">
          <h1 className="text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-3xl">
            {question.question}
          </h1>

          <div className="mt-12 space-y-3">
            {question.options.map((option, index) => (
              <Choice
                defaultChecked={index === 0}
                id={option.id}
                key={option.id}
                label={option.text}
                name="mbti-question"
                value={option.id}
              />
            ))}
          </div>
        </section>

        <div className="bg-gradient-to-t from-canvas via-canvas/95 to-transparent p-4 sm:px-6">
          <div className="flex gap-3">
            <Button
              onClick={handlePrevious}
              variant="secondary"
              type="button"
              disabled={currentIndex === 0}
              className="!h-14 flex-1 !border-2 !border-ink/20 !bg-transparent px-6 active:scale-95"
            >
              이전
            </Button>
            <Button
              onClick={handleNext}
              variant="primary"
              type="button"
              disabled={currentIndex === questions.length - 1}
              className="!h-14 !flex-[2] !border-2 !border-primary px-6 active:scale-95"
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
