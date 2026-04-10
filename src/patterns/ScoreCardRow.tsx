import * as React from "react";
import { cn } from "../utils/cn";

/**
 * ScoreCardRow — horizontal row of score cards for an individual
 * member's key areas. Each card shows area name, score, progress
 * bar, and positive/negative indicator.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-02 sc.2 — "widzi wyniki dla obszarów: Empatia,
 *                 Ton, Konwersja" + "najsłabszy obszar jest wyróżniony
 *                 kolorem ❗"
 *  - ConsultFlow: US-CO-02 sc.2 — "widzi wyniki dla 6 obszarów"
 *
 * Replaces the inline score card grid from CallFlow's custom layout
 * and the per-area list from ReportBreakdown into a single reusable
 * component. ReportBreakdown remains available for detailed report
 * views with quotes and suggestions; ScoreCardRow is the compact
 * overview used inside MemberDetailView.
 *
 * Score display:
 *  - Raw score (0–100) is shown divided by 10 (e.g. 85 → 8.5) when
 *    `displayScale` is "ten" (default for CallFlow/ConsultFlow).
 *  - Raw score shown as-is + "%" when `displayScale` is "percent"
 *    (default for ShiftFlow utilization).
 */

export interface ScoreCard {
  name: string;
  /** Score 0–100. */
  score: number;
  /** Previous score for visual delta (not displayed, used for indicator). */
  previousScore?: number;
}

export interface ScoreCardRowProps {
  cards: ScoreCard[];
  /** How to display the score number. */
  displayScale?: "ten" | "percent";
  /** Number of columns in the grid. Auto-fits if not specified. */
  columns?: number;
  className?: string;
}

function scoreBg(score: number): string {
  if (score >= 75) return "bg-ros-success-bg";
  if (score >= 50) return "bg-[#fff7ed]";
  return "bg-ros-danger-bg";
}

function barColor(score: number): string {
  if (score >= 75) return "bg-ros-success-fg";
  if (score >= 50) return "bg-ros-warn-fg";
  return "bg-ros-danger-fg";
}

function indicatorColor(score: number): string {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}

function formatScore(score: number, scale: "ten" | "percent"): string {
  if (score === 0) return "—";
  if (scale === "ten") return (score / 10).toFixed(1);
  return `${score}%`;
}

export function ScoreCardRow({
  cards,
  displayScale = "ten",
  columns,
  className,
}: ScoreCardRowProps) {
  const gridCols = columns
    ? `grid-cols-${columns}`
    : cards.length <= 3
      ? "grid-cols-3"
      : cards.length <= 4
        ? "grid-cols-4"
        : "grid-cols-3 lg:grid-cols-6";

  return (
    <div className={cn("grid gap-3", gridCols, className)}>
      {cards.map((card) => {
        const isPositive = card.score >= 70;
        return (
          <div
            key={card.name}
            className="rounded-stat bg-ros-surface-off p-4 flex flex-col gap-2"
          >
            {/* Area name + indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] leading-[16px] font-medium text-ros-ink-muted">
                {card.name}
              </span>
              <span className={cn("text-[12px]", indicatorColor(card.score))}>
                {isPositive ? "✓" : "❗"}
              </span>
            </div>

            {/* Score value */}
            <span className="text-[24px] leading-none font-medium text-ros-ink">
              {formatScore(card.score, displayScale)}
            </span>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-ros-border rounded-pill overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-pill transition-all duration-300",
                  barColor(card.score),
                )}
                style={{ width: `${Math.min(100, Math.max(0, card.score))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
