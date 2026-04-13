import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * PerformanceOverview — aggregated area scores for a team member
 * across multiple reports/consultations over a time period.
 *
 * Contrast with ReportBreakdown:
 *  - ReportBreakdown = ONE report, exact scores, transcript quotes,
 *    "co poprawić na następny raz"
 *  - PerformanceOverview = AGGREGATE over period, trend per area,
 *    "jak się rozwijasz w czasie"
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-05 sc.3 — "pełna historia trendów i podsumowania
 *                 raportów z ostatnich 3 miesięcy"
 *  - ConsultFlow: US-CO-03 sc.1 — trend z adnotacjami
 *  - CallFlow:    US-CF-04 sc.1 — manager widzi "aktualny Empathy Score,
 *                 trend ↑/↓ i status ✓/❗" per recepcjonistka
 *
 * Visual pattern: same horizontal card grid as ReportBreakdown, but
 * each card shows average + trend arrow + report count instead of
 * exact score + transcript quote.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │ Wyniki — ostatnie 3 miesiące          Średnia: 7.4     │
 *   ├─────────────────────────────────────────────────────────┤
 *   │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
 *   │ │Komplet.  │ │ Wartość  │ │ Obiekcje │ │ CTA      │   │
 *   │ │ 8.2  ✓ ↑ │ │ 7.1  ✓ → │ │ 4.8  ❗ ↓│ │ 6.9  ✓ ↑ │   │
 *   │ │████████░ │ │███████░░ │ │████░░░░░ │ │██████░░░ │   │
 *   │ │12 raportów│ │śr. +0.4  │ │śr. -1.2  │ │8 raportów│   │
 *   │ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
 *   ├─────────────────────────────────────────────────────────┤
 *   │ Mocne: Kompletność, CTA                                │
 *   │ Do poprawy: Obiekcje (najsłabszy, trend ↓)            │
 *   └─────────────────────────────────────────────────────────┘
 */

export type AreaTrend = "up" | "down" | "flat";

export interface OverviewArea {
  name: string;
  /** Average score 0–100 over the period. */
  avgScore: number;
  /** Average score in previous period (for delta). */
  prevAvgScore?: number;
  /** Trend direction. */
  trend?: AreaTrend;
  /** Number of data points (reports/consultations) that contributed. */
  dataPoints?: number;
}

export interface PerformanceOverviewProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Header title, e.g. "Wyniki — ostatnie 3 miesiące". */
  title?: string;
  /** Period label shown in subtitle, e.g. "sty–mar 2026". */
  periodLabel?: string;
  /** Overall average across all areas. */
  overallAvg?: number;
  /** Previous period overall average. */
  prevOverallAvg?: number;
  /** Aggregated area data. */
  areas: OverviewArea[];
  /** Total reports/consultations in this period. */
  totalReports?: number;
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

const trendGlyph: Record<AreaTrend, { glyph: string; tone: "success" | "danger" | "neutral" }> = {
  up: { glyph: "↑", tone: "success" },
  down: { glyph: "↓", tone: "danger" },
  flat: { glyph: "→", tone: "neutral" },
};

export function PerformanceOverview({
  brand = "callflow",
  title = "Wyniki",
  periodLabel,
  overallAvg,
  prevOverallAvg,
  areas,
  totalReports,
  className,
}: PerformanceOverviewProps) {
  const weakest = React.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => (a.avgScore < min.avgScore ? a : min), areas[0]);
  }, [areas]);

  const strongest = React.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((max, a) => (a.avgScore > max.avgScore ? a : max), areas[0]);
  }, [areas]);

  const colClass =
    areas.length <= 3 ? "grid-cols-3"
    : areas.length <= 4 ? "grid-cols-4"
    : "grid-cols-3 lg:grid-cols-6";

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
            {title}
          </p>
          {periodLabel && (
            <span className="text-[12px] text-ros-ink-faint">{periodLabel}</span>
          )}
          {totalReports != null && (
            <Badge tone="neutral">{totalReports} raportów</Badge>
          )}
        </div>
        {overallAvg != null && (
          <div className="flex items-baseline gap-2">
            {prevOverallAvg != null && prevOverallAvg !== overallAvg && (
              <span className="text-[14px] text-ros-ink-muted">
                {(prevOverallAvg / 10).toFixed(1)} →
              </span>
            )}
            <span className="text-[24px] leading-none font-medium text-ros-ink">
              {(overallAvg / 10).toFixed(1)}
            </span>
            <span className="text-[12px] text-ros-ink-muted">/10</span>
          </div>
        )}
      </div>

      {/* Area cards — horizontal grid */}
      <div className={cn("grid gap-2 px-5 pb-4", colClass)}>
        {areas.map((area) => {
          const isWeakest = weakest && area.name === weakest.name;
          const isPositive = area.avgScore >= 70;
          const delta = area.prevAvgScore != null
            ? ((area.avgScore - area.prevAvgScore) / 10).toFixed(1)
            : null;
          const trend = area.trend;

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
              {/* Name + trend arrow */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate">
                  {area.name}
                </span>
                <div className="flex items-center gap-1">
                  <span className={cn("text-[11px]", scoreText(area.avgScore))}>
                    {isPositive ? "✓" : "❗"}
                  </span>
                  {trend && (
                    <span className={cn("text-[11px]", `text-ros-${trendGlyph[trend].tone === "success" ? "success-fg" : trendGlyph[trend].tone === "danger" ? "danger-fg" : "ink-faint"}`)}>
                      {trendGlyph[trend].glyph}
                    </span>
                  )}
                </div>
              </div>

              {/* Average score */}
              <span className={cn("text-[20px] leading-none font-bold", scoreText(area.avgScore))}>
                {area.avgScore > 0 ? (area.avgScore / 10).toFixed(1) : "—"}
              </span>

              {/* Progress bar */}
              <div className="w-full h-1 bg-ros-border rounded-pill overflow-hidden">
                <div
                  className={cn("h-full rounded-pill", barColor(area.avgScore))}
                  style={{ width: `${Math.min(100, Math.max(0, area.avgScore))}%` }}
                />
              </div>

              {/* Context line: delta or data points (instead of quote) */}
              <p className="text-[10px] leading-[14px] text-ros-ink-faint">
                {delta != null && parseFloat(delta) !== 0
                  ? `${parseFloat(delta) > 0 ? "+" : ""}${delta} vs. poprz.`
                  : area.dataPoints != null
                    ? `${area.dataPoints} raportów`
                    : ""}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary line: strengths + weaknesses */}
      {(strongest || weakest) && (
        <div className="border-t border-ros-border px-5 py-3 flex flex-wrap gap-x-6 gap-y-1">
          {strongest && strongest.avgScore >= 70 && (
            <p className="text-[12px] text-ros-ink-muted">
              <span className="text-ros-success-fg font-medium">Mocne:</span>{" "}
              {areas.filter(a => a.avgScore >= 70).map(a => a.name).join(", ")}
            </p>
          )}
          {weakest && weakest.avgScore < 70 && (
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
