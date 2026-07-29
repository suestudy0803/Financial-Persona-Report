import Button from "@/components/Button";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffaf0] px-6 py-12 text-[#0a0a0a] sm:px-10 lg:px-16">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-6xl flex-col justify-center gap-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6a6a6a]">
          Finance MBTI
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] sm:text-7xl">
          나만의 금융 투자 성향을 알아보세요.
        </h1>
        <p className="max-w-xl text-lg leading-8 text-[#3a3a3a]">
          8개의 질문에 답하고 나에게 맞는 금융 MBTI 결과를 확인해보세요.
        </p>
        <Button href="/test" variant="primary" className="w-fit">
          테스트 시작하기
        </Button>
      </section>
    </main>
  );
}
