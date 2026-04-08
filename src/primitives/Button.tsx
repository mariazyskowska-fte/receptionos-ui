import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Button — pill-shaped, two variants. Locked rules from
 * `UI/design-system-audit/03-components.md` (Button section):
 *  - always `rounded-pill`
 *  - Geist Medium 14px label
 *  - primary = brand blue, ghost = white with overlay border
 *
 * NEVER make square buttons (forbidden in 05-rules-for-lovable.md).
 */
export type ButtonVariant = "primary" | "ghost" | "danger";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Brand accent — colors the primary fill. Defaults to CallFlow blue. */
  brand?: "callflow" | "consultflow" | "shiftflow";
}

const brandBg: Record<NonNullable<ButtonProps["brand"]>, string> = {
  callflow: "bg-brand-callflow hover:bg-[#1d4ed8]",
  consultflow: "bg-brand-consultflow hover:bg-[#6d28d9]",
  shiftflow: "bg-brand-shiftflow hover:bg-[#15803d]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", brand = "callflow", className, children, ...rest },
    ref,
  ) {
    const base =
      "inline-flex items-center justify-center gap-2 px-4 py-2 h-10 rounded-pill text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors duration-150 shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed";

    const variantCls =
      variant === "primary"
        ? cn(brandBg[brand], "text-white border-none")
        : variant === "ghost"
          ? "bg-white text-ros-ink border border-ros-border hover:bg-ros-surface-hover"
          : "bg-transparent text-ros-danger-fg hover:bg-ros-danger-bg";

    return (
      <button ref={ref} className={cn(base, variantCls, className)} {...rest}>
        {children}
      </button>
    );
  },
);
