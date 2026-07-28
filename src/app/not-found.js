import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-24 text-center">
      <span className="mb-6 inline-block rounded-full bg-surface-card px-3 py-1 text-[13px] font-medium leading-[1.4] text-ink">
        404
      </span>
      <h1 className="max-w-md text-[32px] font-medium leading-[1.15] tracking-[-0.5px] text-ink sm:text-[40px] sm:leading-[1.1] sm:tracking-[-1px]">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-4 max-w-sm text-[16px] leading-[1.55] text-body">
        주소가 정확한지 확인하거나, 처음으로 돌아가 금융 MBTI 테스트를 다시 시작해보세요.
      </p>
      <Button href="/" variant="primary" className="mt-8">
        홈으로 돌아가기
      </Button>
    </main>
  );
}
