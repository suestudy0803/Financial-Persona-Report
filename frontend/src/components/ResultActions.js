import Button from "@/components/Button";

export default function ResultActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button href="/test" variant="secondary" className="!h-14 w-full">
        테스트 다시하기
      </Button>
      <Button type="button" variant="primary" className="!h-14 w-full">
        공유하기
      </Button>
    </div>
  );
}
