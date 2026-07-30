"use client";

import { useState } from "react";
import { useEffect } from "react";

import Button from "@/components/Button";
import Choice from "@/components/Choice";
import ProgressBar from "@/components/ProgressBar";
import { questions as initialQuestions } from "@/data/questions";
import { fetchQuestions } from "@/lib/api/questions";
import { submitResults } from "@/lib/api/results";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchQuestions()
      .then((data) => {
        if (cancelled) return;

        setQuestions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (cancelled) return;

        setErrorMessage(error.message);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading && questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-body">
        질문을 불러오는 중입니다.
      </main>
    );
  }

  if (errorMessage && questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-center text-body">
        {errorMessage}
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6 text-body">
        표시할 질문이 없습니다.
      </main>
    );
  }

  const question = questions[currentIndex];
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === questions.length - 1;
  const selectedChoiceId = answers[question.id];

  function handlePrevious() {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }

  function handleNext() {
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await submitResults(
        Object.entries(answers).map(([questionId, choiceId]) => ({
          question_id: Number(questionId),
          choice_id: choiceId,
        })),
      );

      router.push(`/result/${result.result_id}`);
    } catch (error) {
      setSubmitError(error.message);
      setIsSubmitting(false);
    }
  }

  function handleChoiceChange(choiceId) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [question.id]: choiceId,
    }));
  }

  return (
    <main className="flex min-h-dvh flex-col bg-canvas text-ink">
      <div className="mx-auto flex min-h-dvh max-h-[900px] w-full max-w-[600px] flex-col overflow-hidden">
        <div className="px-4 pb-4 pt-10 sm:px-6">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>

        <section className="min-h-0 w-full flex-1 overflow-y-auto px-4 pb-28 pt-12 sm:px-6">
          <h1 className="text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">
            {question.question}
          </h1>
          <div className="mt-12 space-y-3">
            {question.choices.map((option) => (
              <Choice
                checked={selectedChoiceId === option.id}
                id={option.id}
                key={option.id}
                label={option.text}
                name="mbti-question"
                onChange={(event) => handleChoiceChange(event.target.value)}
                value={option.id}
              />
            ))}
          </div>
        </section>

        <div className="shrink-0 bg-gradient-to-t from-canvas via-canvas/95 to-transparent p-4 sm:px-6">
          <div className="flex gap-3">
            {isFirstQuestion ? (
              <Button
                href="/"
                variant="secondary"
                className="!h-14 flex-1 !border-2 !border-ink/20 !bg-transparent px-6 active:scale-95"
              >
                이전
              </Button>
            ) : (
              <Button
                onClick={handlePrevious}
                variant="secondary"
                type="button"
                className="!h-14 flex-1 !border-2 !border-ink/20 !bg-transparent px-6 active:scale-95"
              >
                이전
              </Button>
            )}
            <Button
              onClick={isLastQuestion ? handleSubmit : handleNext}
              variant="primary"
              type="button"
              disabled={!selectedChoiceId || isSubmitting}
              className="!h-14 !flex-[2] !border-2 !border-primary px-6 active:scale-95"
            >
              {isSubmitting ? "결과를 불러오는 중" : isLastQuestion ? "결과 보기" : "다음"}
            </Button>
          </div>
          {submitError && (
            <p className="mt-3 text-center text-sm text-clay-pink">{submitError}</p>
          )}
        </div>
      </div>
    </main>
  );
}
