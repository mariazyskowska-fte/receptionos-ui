import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Card — primary content shell.
 * Locked from `03-components.md` (Card Standard):
 *  - bg-white, rounded-card (24px), shadow-card
 *  - audit specifies "absolute inset border overlay" pattern; here we use
 *    Tailwind's native border to keep the package portable. Apps that need
 *    pixel-perfect parity can wrap their own border layer.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "stat" → off-white surface, smaller radius (KPI cards) */
  variant?: "standard" | "stat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "standard", className, ...rest },
  ref,
) {
  const cls =
    variant === "stat"
      ? "bg-ros-surface-off rounded-stat p-4 flex flex-col justify-between"
      : "bg-white rounded-card border border-ros-border shadow-card";
  return <div ref={ref} className={cn(cls, className)} {...rest} />;
});
