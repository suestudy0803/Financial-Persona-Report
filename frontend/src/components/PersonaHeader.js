"use client";

import { useState } from "react";

export default function PersonaHeader({ code, persona }) {
  const [showImage, setShowImage] = useState(Boolean(persona.image_path));

  return (
    <>
      <header className="space-y-2 text-center">
        <p className="font-mono text-xs font-medium tracking-[0.15em] text-primary">
          Investing MBTI RESULT
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.06em]">{code}</h1>
        <h2 className="text-2xl font-semibold">{persona.name}</h2>
      </header>

      <div className="flex aspect-square w-full items-center justify-center overflow-hidden border-0 bg-transparent p-8">
        {showImage ? (
          <img
            alt={`${persona.name} 이미지`}
            className="h-full w-full object-contain"
            onError={() => setShowImage(false)}
            src={persona.image_path}
          />
        ) : (
          <span className="text-lg font-semibold text-muted">No Image</span>
        )}
      </div>

      <section className="relative flex h-[110px] items-center overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#faf5e8] px-6 py-0">
        <div
          className="absolute right-4 top-4 leading-none text-[#0a0a0a] opacity-10"
          aria-hidden="true"
        >
          <span className="material-symbols-outlined text-2xl">format_quote</span>
        </div>
        
        <div className="relative z-10 w-full">
          <p className="text-lg font-semibold leading-relaxed text-[#0a0a0a]">
            {persona.description}
          </p>
          {persona.style && (
            <p className="mt-4 text-sm leading-relaxed text-muted">{persona.style}</p>
          )}
        </div>
      </section>
    </>
  );
}
