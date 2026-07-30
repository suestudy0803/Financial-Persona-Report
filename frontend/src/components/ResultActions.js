"use client";

import { useState } from "react";

import Button from "@/components/Button";

export default function ResultActions() {
  const [isCopied, setIsCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button href="/test" variant="secondary" className="!h-14 w-full">
        테스트 다시하기
      </Button>
      <Button
        onClick={handleShare}
        type="button"
        variant="primary"
        className="!h-14 w-full"
      >
        {isCopied ? "복사완료" : "공유하기"}
      </Button>
    </div>
  );
}
