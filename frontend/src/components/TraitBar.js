const COLOR_CLASSES = {
  pink: {
    bar: "bg-[#ff4d8b]",
    value: "text-[#ff4d8b]",
  },
  mint: {
    bar: "bg-[#a4d4c5]",
    value: "text-[#a4d4c5]",
  },
  lavender: {
    bar: "bg-[#b8a4ed]",
    value: "text-[#b8a4ed]",
  },
  peach: {
    bar: "bg-[#ffb084]",
    value: "text-[#ffb084]",
  },
};

export default function TraitBar({ title, left, right, color, fillSide }) {
  const colorClass = COLOR_CLASSES[color] ?? COLOR_CLASSES.pink;
  const fill = fillSide === "right" ? right : left;
  const fillPercentage = Math.min(fill.percentage, 99);

  return (
    <section className="space-y-3">
      <h3 className="text-center text-base font-bold">{title}</h3>
      <div className="flex items-center gap-3">
        <div className="w-16 shrink-0 text-left">
          <strong
            className={`block text-xl font-bold ${fillSide === "left" ? colorClass.value : "text-ink"}`}
          >
            {left.label}
          </strong>
          <span className={`text-xs ${fillSide === "left" ? colorClass.value : "text-muted"}`}>
            {left.description}
          </span>
        </div>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-hairline">
          <div
            className={`trait-bar-fill absolute h-full ${colorClass.bar}`}
            style={{
              "--trait-bar-width": `${fillPercentage}%`,
              width: "var(--trait-bar-width)",
              [fillSide]: 0,
            }}
          />
        </div>
        <div className="w-16 shrink-0 text-right">
          <strong
            className={`block text-xl font-bold ${fillSide === "right" ? colorClass.value : "text-ink"}`}
          >
            {right.label}
          </strong>
          <span className={`text-xs ${fillSide === "right" ? colorClass.value : "text-muted"}`}>
            {right.description}
          </span>
        </div>
      </div>
    </section>
  );
}
