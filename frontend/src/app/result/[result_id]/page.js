import { notFound } from "next/navigation";

import Button from "@/components/Button";
import { results } from "@/data/results";

export default async function ResultPage({ params }) {
  const { result_id: resultId } = await params;
  const result = results.find(({ result_id }) => result_id === resultId);

  if (!result) {
    notFound();
  }

  const { persona } = result;

  return (
    <main className="min-h-screen bg-canvas px-4 py-10 text-ink sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-[600px] flex-col gap-8">
        <header className="space-y-2 text-center">
          <p className="font-mono text-xs font-medium tracking-[0.15em] text-primary">
            FINANCIAL MBTI RESULT
          </p>
          <h1 className="text-5xl font-semibold tracking-[-0.06em]">{result.code}</h1>
          <h2 className="text-2xl font-semibold">{persona.name}</h2>
        </header>

        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#b8a4ed] p-8">
          <img
            alt={`${persona.name} 이미지`}
            className="h-full w-full object-contain"
            src={persona.image_path}
          />
        </div>

        <section className="rounded-2xl border border-hairline bg-surface-card p-6">
          <p className="text-lg leading-relaxed text-body">{persona.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{persona.style}</p>
        </section>

        <Button href="/" variant="primary" className="!h-14 w-full">
          테스트 다시하기
        </Button>
      </div>
    </main>
  );
}
