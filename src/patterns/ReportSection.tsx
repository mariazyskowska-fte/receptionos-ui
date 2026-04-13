import * as React from "react";
import { cn } from "../utils/cn";

/**
 * ReportSection — unified card for report detail sections.
 * Each section has the same shape as PerformanceOverview (rounded-card,
 * header row, content) but with a subtle color accent that signals
 * the section's purpose.
 *
 * Variants:
 *  - scores    → neutral white (default, for ReportBreakdown)
 *  - tips      → warm orange tint (quick tips, "na następny raz")
 *  - strength  → green tint (mocne strony)
 *  - improve   → orange tint (do poprawy)
 *  - recommend → brand tint (rekomendacje)
 *  - progress  → purple tint (postęp vs. poprzednie)
 *  - transcript→ cool gray (transkrypcja)
 *  - neutral   → plain white (generic)
 *
 * All variants share:
 *  - Same rounded-card border radius (24px)
 *  - Same padding (px-5 py-4)
 *  - Same header typography (14px medium + optional icon)
 *  - Left color bar (4px) instead of full background tint
 *    for subtlety while remaining distinct
 */

export type ReportSectionVariant =
  | "scores"
  | "tips"
  | "strength"
  | "improve"
  | "recommend"
  | "progress"
  | "transcript"
  | "neutral";

export interface ReportSectionProps {
  variant?: ReportSectionVariant;
  /** Section title shown in header. */
  title: string;
  /** Icon rendered before the title (16px recommended). */
  icon?: React.ReactNode;
  /** Optional right-side header content (badge, button). */
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  ReportSectionVariant,
  { border: string; bg: string; accent: string; titleColor: string }
> = {
  scores: {
    border: "border-ros-border",
    bg: "bg-white",
    accent: "bg-ros-ink-faint",
    titleColor: "text-ros-ink",
  },
  tips: {
    border: "border-[#fed7aa]",
    bg: "bg-[#fffbf5]",
    accent: "bg-ros-warn-fg",
    titleColor: "text-[#c2410c]",
  },
  strength: {
    border: "border-[#bbf7d0]",
    bg: "bg-[#f7fef9]",
    accent: "bg-ros-success-fg",
    titleColor: "text-ros-success-fg",
  },
  improve: {
    border: "border-[#fed7aa]",
    bg: "bg-[#fffaf5]",
    accent: "bg-[#ea580c]",
    titleColor: "text-[#ea580c]",
  },
  recommend: {
    border: "border-[#c4b5fd]",
    bg: "bg-[#faf8ff]",
    accent: "bg-[#7c3aed]",
    titleColor: "text-[#7c3aed]",
  },
  progress: {
    border: "border-[#c4b5fd]",
    bg: "bg-[#fdf8ff]",
    accent: "bg-[#9333ea]",
    titleColor: "text-[#9333ea]",
  },
  transcript: {
    border: "border-ros-border",
    bg: "bg-ros-surface-off",
    accent: "bg-ros-ink-muted",
    titleColor: "text-ros-ink-medium",
  },
  neutral: {
    border: "border-ros-border",
    bg: "bg-white",
    accent: "bg-ros-ink-faint",
    titleColor: "text-ros-ink",
  },
};

export function ReportSection({
  variant = "neutral",
  title,
  icon,
  headerRight,
  children,
  className,
}: ReportSectionProps) {
  const v = variantStyles[variant];

  return (
    <div
      className={cn(
        "rounded-card border overflow-hidden flex flex-col",
        v.border,
        v.bg,
        className,
      )}
    >
      {/* Left accent bar + content */}
      <div className="flex">
        {/* Color bar */}
        <div className={cn("w-1 flex-shrink-0", v.accent)} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              {icon && (
                <span className={cn("flex-shrink-0", v.titleColor)}>{icon}</span>
              )}
              <p className={cn("text-[13px] leading-[18px] font-semibold", v.titleColor)}>
                {title}
              </p>
            </div>
            {headerRight}
          </div>

          {/* Content */}
          <div className="px-4 pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
