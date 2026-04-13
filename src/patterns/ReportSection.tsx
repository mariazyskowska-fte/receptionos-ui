import * as React from "react";
import { cn } from "../utils/cn";

/**
 * ReportSection — single full-width card for one section of a report.
 * Designed to be the only thing visible on screen at a given moment
 * (inside CardStack quiz-flow).
 *
 * All variants have identical dimensions. Only the top accent line
 * (3px) and subtle background tint differ between variants.
 *
 * Variants:
 *  - scores    → neutral (white bg, gray accent)
 *  - tips      → warm (cream bg, orange accent)
 *  - strength  → positive (mint bg, green accent)
 *  - improve   → attention (peach bg, orange accent)
 *  - recommend → brand (lavender bg, purple accent)
 *  - progress  → insight (light purple bg, purple accent)
 *  - neutral   → plain white
 */

export type ReportSectionVariant =
  | "scores"
  | "tips"
  | "strength"
  | "improve"
  | "recommend"
  | "progress"
  | "neutral";

export interface ReportSectionProps {
  variant?: ReportSectionVariant;
  title: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  ReportSectionVariant,
  { bg: string; accent: string; titleColor: string }
> = {
  scores: {
    bg: "bg-white",
    accent: "bg-ros-ink-faint",
    titleColor: "text-ros-ink",
  },
  tips: {
    bg: "bg-[#fffbf5]",
    accent: "bg-ros-warn-fg",
    titleColor: "text-[#c2410c]",
  },
  strength: {
    bg: "bg-[#f7fef9]",
    accent: "bg-ros-success-fg",
    titleColor: "text-ros-success-fg",
  },
  improve: {
    bg: "bg-[#fffaf5]",
    accent: "bg-[#ea580c]",
    titleColor: "text-[#ea580c]",
  },
  recommend: {
    bg: "bg-[#faf8ff]",
    accent: "bg-[#7c3aed]",
    titleColor: "text-[#7c3aed]",
  },
  progress: {
    bg: "bg-[#fdf8ff]",
    accent: "bg-[#9333ea]",
    titleColor: "text-[#9333ea]",
  },
  neutral: {
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
        "rounded-card border border-ros-border overflow-hidden flex flex-col",
        v.bg,
        className,
      )}
    >
      {/* Top accent line */}
      <div className={cn("h-[3px] w-full", v.accent)} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {icon && (
            <span className={cn("flex-shrink-0", v.titleColor)}>{icon}</span>
          )}
          <p className={cn("text-[14px] leading-[20px] font-semibold", v.titleColor)}>
            {title}
          </p>
        </div>
        {headerRight}
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        {children}
      </div>
    </div>
  );
}
