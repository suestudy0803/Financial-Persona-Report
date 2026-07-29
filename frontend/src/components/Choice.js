"use client";

// Answer option for a question — a radio input wrapped in a card,
// matching public/question.html's checked-state styling (ink border + shadow).
export default function Choice({
  id,
  name,
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
}) {
  return (
    <label
      htmlFor={id}
      className={`group block ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />
      <div
        className="min-h-20 rounded-lg border border-hairline bg-canvas p-5 text-ink transition-all duration-200 group-active:scale-[0.98] peer-checked:border-ink peer-checked:bg-white peer-checked:shadow-[0_4px_12px_rgba(10,10,10,0.05)] group-hover:border-ink/40 flex items-center"
      >
        <p className="text-[16px] leading-[1.55]">{label}</p>
      </div>
    </label>
  );
}
