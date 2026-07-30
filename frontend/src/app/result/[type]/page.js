import { notFound } from "next/navigation";

import PersonaHeader from "@/components/PersonaHeader";
import ResultActions from "@/components/ResultActions";
import TraitBar from "@/components/TraitBar";
import { results } from "@/data/results";
import { fetchResult } from "@/lib/api/results";

export default async function ResultPage({ params }) {
  const { type } = await params;
  let result;

  try {
    const apiResult = await fetchResult(type);
    const mockResult = results.find(({ code }) => code === apiResult.code);

    result = {
      ...apiResult,
      traits: mockResult?.traits ?? [],
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
