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

  return (
    <section className="space-y-3">
      <h3 className="text-center text-base font-bold">{title}</h3>
      <div className="flex items-center justify-between gap-4">
        <span className={`w-12 text-left text-2xl font-semibold ${fillSide === "left" ? colorClass.value : "text-muted"}`}>
          {left.percentage}%
        </span>
        <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-hairline">
          <div
            className={`absolute h-full ${colorClass.bar}`}
            style={{
              width: `${fill.percentage}%`,
              [fillSide]: 0,
            }}
          />
        </div>
        <span className={`w-12 text-right text-2xl font-semibold ${fillSide === "right" ? colorClass.value : "text-muted"}`}>
          {right.percentage}%
        </span>
      </div>
      <div className="flex justify-between font-mono text-xs text-muted">
        <span>
          <strong className="block text-ink">{left.label}</strong>
          {left.description}
        </span>
        <span className="text-right">
          <strong className="block text-ink">{right.label}</strong>
          {right.description}
        </span>
      </div>
    </section>
  );
}
