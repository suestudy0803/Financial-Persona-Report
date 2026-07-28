"use client";

import Link from "next/link";

// DESIGN.md components: button-primary / button-secondary / button-on-color / button-text-link
const VARIANT_CLASSES = {
  primary:
    "h-11 rounded-full px-5 bg-primary text-on-primary hover:bg-primary-active active:bg-primary-active disabled:bg-primary-disabled disabled:text-muted",
  secondary:
    "h-11 rounded-full px-5 border border-hairline bg-canvas text-ink disabled:text-muted disabled:opacity-60",
  "on-color":
    "h-11 rounded-full px-5 bg-canvas text-ink disabled:text-muted disabled:opacity-60",
  "text-link":
    "px-1 py-2 bg-transparent text-ink disabled:text-muted disabled:opacity-60",
};

export default function Button({
  variant = "primary",
  className = "",
  type = "button",
  href,
  children,
  ...props
}) {
  const variantClassName = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;
  const sharedClassName = `inline-flex items-center justify-center whitespace-nowrap text-sm leading-none font-semibold tracking-normal transition-colors disabled:cursor-not-allowed disabled:pointer-events-none ${variantClassName} ${className}`;

  if (href) {
    return (
      <Link href={href} className={sharedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={sharedClassName} {...props}>
      {children}
    </button>
  );
}
