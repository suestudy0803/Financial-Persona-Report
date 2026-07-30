export default function PersonaHeader({ code, persona }) {
  return (
    <>
      <header className="space-y-2 text-center">
        <p className="font-mono text-xs font-medium tracking-[0.15em] text-primary">
          FINANCIAL MBTI RESULT
        </p>
        <h1 className="text-5xl font-semibold tracking-[-0.06em]">{code}</h1>
        <h2 className="text-2xl font-semibold">{persona.name}</h2>
      </header>

      <div className="flex aspect-square w-full items-center justify-center overflow-hidden border-0 bg-transparent p-8">
        <span className="text-lg font-semibold text-muted">No Image</span>
      </div>

      <section className="rounded-2xl border border-hairline bg-surface-card p-6">
        <p className="text-lg leading-relaxed text-body">{persona.description}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{persona.style}</p>
      </section>
    </>
  );
}
