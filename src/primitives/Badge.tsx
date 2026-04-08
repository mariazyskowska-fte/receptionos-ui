import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Badge — pill status indicator.
 * Locked from `03-components.md` (Badge / Status Pill).
 * Used for: trend deltas (+/-), status pills (Active/Break),
 * inline counts (Tasks (8)).
 */
export type BadgeTone = "success" | "danger" | "warn" | "neutral";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

const toneCls: Record<BadgeTone, string> = {
  success: "bg-ros-success-bg text-ros-success-fg",
  danger: "bg-ros-danger-bg text-ros-danger-fg",
  warn: "bg-[#fff7ed] text-ros-warn-fg",
  neutral: "bg-ros-surface-hover text-ros-ink-muted",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-pill text-[12px] leading-[16px] font-medium",
        toneCls[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
