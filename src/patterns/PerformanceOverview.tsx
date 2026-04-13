import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * PerformanceOverview — horizontal card grid showing scores per area.
 * Works in two modes:
 *
 * 1. "snapshot" — scores from a single point in time (one report,
 *    current state). No trend arrows, no delta. Similar to old
 *    ScoreCardRow but with consistent card shape.
 *
 * 2. "aggregate" — averaged scores over a period with trend arrows,
 *    delta vs. previous period, data point count, and
 *    strengths/weaknesses summary footer.
 *
 * Cross-app usage:
 *  - ConsultFlow manager: doctor detail (aggregate, 6 areas, /10 scale)
 *  - ConsultFlow doctor:  "Moje wyniki" overview (aggregate)
 *  - CallFlow manager:    receptionist detail (snapshot, 3 areas)
 *  - ShiftFlow manager:   doctor utilization breakdown (snapshot, % scale)
 *
 * Source user stories:
 *  - US-CO-05 sc.3 — "pełna historia trendów i podsumowania z 3 miesięcy"
 *  - US-CO-03 sc.1 — trend z adnotacjami
 *  - US-CF-04 sc.1 — "aktualny Empathy Score, trend ↑/↓ i status ✓/❗"
 */

export type AreaTrend = "up" | "down" | "flat";

export interface OverviewArea {
  name: string;
  /** Score 0–100. */
  score: number;
  /** Previous score (for delta in aggregate mode). */
  previousScore?: number;
  /** Trend direction (aggregate mode only). */
  trend?: AreaTrend;
  /** Number of data points (aggregate mode only). */
  dataPoints?: number;
}

export interface PerformanceOverviewProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** "snapshot" = single point, "aggregate" = averaged over period. */
  mode?: "snapshot" | "aggregate";
  /** How to display scores: "ten" = /10 (default), "percent" = %. */
  displayScale?: "ten" | "percent";
  /** Header title. */
  title?: string;
  /** Period label (aggregate mode), e.g. "sty–mar 2026". */
  periodLabel?: string;
  /** Overall score/average. */
  overallScore?: number;
  /** Previous overall (for delta). */
  previousOverallScore?: number;
  /** Area data. */
  areas: OverviewArea[];
  /** Badge in header, e.g. report count. */
  headerBadge?: string;
  /** Show strengths/weaknesses summary footer. Default: true in aggregate. */
  showSummary?: boolean;
  className?: string;
}

function barColor(score: number): string {
  if (score >= 75) return "bg-ros-success-fg";
  if (score >= 50) return "bg-ros-warn-fg";
  return "bg-ros-danger-fg";
}

function scoreText(score: number): string {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}

const trendGlyph: Record<AreaTrend, { glyph: string; color: string }> = {
  up: { glyph: "↑", color: "text-ros-success-fg" },
  down: { glyph: "↓", color: "text-ros-danger-fg" },
  flat: { glyph: "→", color: "text-ros-ink-faint" },
};

function formatScore(score: number, scale: "ten" | "percent"): string {
  if (score === 0) return "—";
  if (scale === "ten") return (score / 10).toFixed(1);
  return `${score}%`;
}

function formatDelta(current: number, previous: number, scale: "ten" | "percent"): string {
  const diff = scale === "ten"
    ? ((current - previous) / 10)
    : (current - previous);
  if (diff === 0) return "";
  const sign = diff > 0 ? "+" : "";
  return scale === "ten"
    ? `${sign}${diff.toFixed(1)} vs. poprz.`
    : `${sign}${Math.round(diff)}% vs. poprz.`;
}

export function PerformanceOverview({
  brand = "callflow",
  mode = "aggregate",
  displayScale = "ten",
  title = "Wyniki",
  periodLabel,
  overallScore,
  previousOverallScore,
  areas,
  headerBadge,
  showSummary,
  className,
}: PerformanceOverviewProps) {
  const shouldShowSummary = showSummary ?? mode === "aggregate";

  const weakest = React.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => (a.score < min.score ? a : min), areas[0]);
  }, [areas]);

  const colClass =
    areas.length <= 3 ? "grid-cols-3"
    : areas.length <= 4 ? "grid-cols-4"
    : "grid-cols-3 lg:grid-cols-6";

  return (
    <div className={cn("rounded-card border border-ros-border bg-white flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <p className="text-[14px] leading-[20px] font-medium text-ros-ink">{title}</p>
          {periodLabel && (
            <span className="text-[12px] text-ros-ink-faint">{periodLabel}</span>
          )}
          {headerBadge && <Badge tone="neutral">{headerBadge}</Badge>}
        </div>
        {overallScore != null && (
          <div className="flex items-baseline gap-2">
            {previousOverallScore != null && previousOverallScore !== overallScore && (
              <span className="text-[14px] text-ros-ink-muted">
                {formatScore(previousOverallScore, displayScale)} →
              </span>
            )}
            <span className="text-[24px] leading-none font-medium text-ros-ink">
              {formatScore(overallScore, displayScale)}
            </span>
          </div>
        )}
      </div>

      {/* Area cards */}
      <div className={cn("grid gap-2 px-5 pb-4", colClass)}>
        {areas.map((area) => {
          const isWeakest = weakest && area.name === weakest.name;
          const isPositive = area.score >= 70;
          const hasDelta = area.previousScore != null && area.previousScore !== area.score;

          return (
            <div
              key={area.name}
              className={cn(
                "rounded-stat p-3 flex flex-col gap-1.5",
                isWeakest
                  ? "bg-ros-danger-bg/50 ring-1 ring-ros-danger-fg/20"
                  : "bg-ros-surface-off",
              )}
            >
              {/* Name + indicators */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate">
                  {area.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className={cn("text-[11px]", scoreText(area.score))}>
                    {isPositive ? "✓" : "❗"}
                  </span>
                  {mode === "aggregate" && area.trend && (
                    <span className={cn("text-[11px]", trendGlyph[area.trend].color)}>
                      {trendGlyph[area.trend].glyph}
                    </span>
                  )}
                </div>
              </div>

              {/* Score */}
              <span className={cn("text-[20px] leading-none font-bold", scoreText(area.score))}>
                {formatScore(area.score, displayScale)}
              </span>

              {/* Progress bar */}
              <div className="w-full h-1 bg-ros-border rounded-pill overflow-hidden">
                <div
                  className={cn("h-full rounded-pill", barColor(area.score))}
                  style={{ width: `${Math.min(100, Math.max(0, area.score))}%` }}
                />
              </div>

              {/* Context line */}
              <p className="text-[10px] leading-[14px] text-ros-ink-faint">
                {mode === "aggregate" && hasDelta
                  ? formatDelta(area.score, area.previousScore!, displayScale)
                  : mode === "aggregate" && area.dataPoints != null
                    ? `${area.dataPoints} raportów`
                    : ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary footer */}
      {shouldShowSummary && areas.length > 0 && (
        <div className="border-t border-ros-border px-5 py-3 flex flex-wrap gap-x-6 gap-y-1">
          {areas.some(a => a.score >= 70) && (
            <p className="text-[12px] text-ros-ink-muted">
              <span className="text-ros-success-fg font-medium">Mocne:</span>{" "}
              {areas.filter(a => a.score >= 70).map(a => a.name).join(", ")}
            </p>
          )}
          {weakest && weakest.score < 70 && (
            <p className="text-[12px] text-ros-ink-muted">
              <span className="text-ros-danger-fg font-medium">Do poprawy:</span>{" "}
              {weakest.name}
              {weakest.trend === "down" && " (trend ↓)"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
