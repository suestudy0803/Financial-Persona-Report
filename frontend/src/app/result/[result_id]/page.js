import { notFound } from "next/navigation";

import PersonaHeader from "@/components/PersonaHeader";
import ResultActions from "@/components/ResultActions";
import TraitBar from "@/components/TraitBar";
import { fetchResult } from "@/lib/api/results";

const TRAIT_CONFIG = {
  AP: {
    title: "활동 방식",
    left: { label: "A", description: "직접투자" },
    right: { label: "P", description: "간접투자" },
    color: "pink",
  },
  NS: {
    title: "정보 분석",
    left: { label: "N", description: "숫자 중심" },
    right: { label: "S", description: "감각 중심" },
    color: "mint",
  },
  FD: {
    title: "자산 배분",
    left: { label: "F", description: "한놈만 판다" },
    right: { label: "D", description: "골고루 담아" },
    color: "lavender",
  },
  TH: {
    title: "투자 호흡",
    left: { label: "T", description: "빠른 승부" },
    right: { label: "H", description: "진득하게" },
    color: "peach",
  },
};

function createTraits(percentages) {
  return Object.entries(TRAIT_CONFIG).map(([axis, config]) => {
    const axisPercentages = percentages[axis] ?? {};
    const leftPercentage = axisPercentages[config.left.label] ?? 0;
    const rightPercentage = axisPercentages[config.right.label] ?? 0;

    return {
      ...config,
      left: { ...config.left, percentage: leftPercentage },
      right: { ...config.right, percentage: rightPercentage },
      fillSide: leftPercentage >= rightPercentage ? "left" : "right",
    };
  });
}

export default async function ResultPage({ params }) {
  const { result_id: resultId } = await params;
  let result;

  try {
    const apiResult = await fetchResult(resultId);

    result = {
      ...apiResult,
      traits: createTraits(apiResult.traits),
    };
  } catch {
    result = null;
  }

  if (!result) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-canvas px-4 py-10 text-ink sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8">
        <PersonaHeader code={result.code} persona={result.persona} />

        <section className="space-y-8">
          <h2 className="border-b border-hairline pb-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted">
            Analysis Breakdown
          </h2>
          {result.traits.map((trait) => (
            <TraitBar key={trait.title} {...trait} />
          ))}
        </section>

        <ResultActions />
      </div>
    </main>
  );
}
