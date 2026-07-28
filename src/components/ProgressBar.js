// Question progress indicator — ochre fill on a cream track, with a "n/총" label.
export default function ProgressBar({ current, total }) {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="flex items-center gap-4">
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-strong"
      >
        <div
          className="h-full rounded-full bg-brand-ochre transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="whitespace-nowrap text-[13px] font-medium leading-[1.4] text-ink/60">
        {current}/{total}
      </span>
    </div>
  );
}
