// Ink spinner on the cream canvas, for route-level and inline loading states.
export default function LoadingIndicator({ label = "불러오는 중" }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-3">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-hairline border-t-ink" />
      <span className="text-[13px] font-medium leading-[1.4] text-muted">{label}</span>
    </div>
  );
}
