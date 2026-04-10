import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * ReportBreakdown — per-report view with area scores displayed
 * horizontally as compact cards, plus suggestions section below.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-02 sc.2 — "widzi wyniki dla obszarów: Empatia, Ton,
 *                 Konwersja" + "najsłabszy obszar jest wyróżniony kolorem ❗"
 *  - ConsultFlow: US-CO-02 sc.2 — "widzi wyniki dla 6 obszarów"
 *                 + sc.3 — "dokładnie 3 obszary priorytetowe"
 *  - ConsultFlow: US-CO-01 sc.4 — "porównanie wyników: poprzedni vs aktualny"
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │ Title                               Overall: 7.8   │
 *   ├─────────────────────────────────────────────────────┤
 *   │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
 *   │ │Empatia │ │  Ton   │ │Konwers.│ │ ...    │       │
 *   │ │ 8.5  ✓ │ │ 5.8  ❗│ │ 7.1  ✓ │ │        │       │
 *   │ │████░░░ │ │███░░░░ │ │█████░░ │ │        │       │
 *   │ │"cyt."  │ │"cyt."  │ │        │ │        │       │
 *   │ └────────┘ └────────┘ └────────┘ └────────┘       │
 *   ├─────────────────────────────────────────────────────┤
 *   │ ⚑ Priorytety (3)                                   │
 *   │ [Obiekcje] Użyj techniki...                        │
 *   │ [CTA] Zawsze kończ propozycją...                   │
 *   └─────────────────────────────────────────────────────┘
 */

export interface BreakdownArea {
  name: string;
  /** Score 0–100. */
  score: number;
  previousScore?: number;
  quote?: string;
  quoteType?: "positive" | "negative";
}

export interface Suggestion {
  area: string;
  text: string;
  sourceQuote?: string;
}

export interface ReportBreakdownProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  title?: string;
  overallScore?: number;
  previousOverallScore?: number;
  areas: BreakdownArea[];
  suggestions?: Suggestion[];
  maxSuggestions?: number;
  className?: string;
}

function scoreTone(score: number): "success" | "warn" | "danger" {
  if (score >= 75) return "success";
  if (score >= 50) return "warn";
  return "danger";
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

export function ReportBreakdown({
  brand = "callflow",
  title,
  overallScore,
  previousOverallScore,
  areas,
  suggestions,
  maxSuggestions = 3,
  className,
}: ReportBreakdownProps) {
  const weakestArea = React.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => (a.score < min.score ? a : min), areas[0]);
  }, [areas]);

  const visibleSuggestions = suggestions?.slice(0, maxSuggestions);

  // Auto columns: 3 for ≤3 areas, else fit to count (max 6)
  const colClass =
    areas.length <= 3
      ? "grid-cols-3"
      : areas.length <= 4
        ? "grid-cols-4"
        : areas.length <= 6
          ? "grid-cols-3 lg:grid-cols-6"
          : "grid-cols-3 lg:grid-cols-6";

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className,
      )}
    >
      {/* Header row */}
      {(title || overallScore != null) && (
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          {title && (
            <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
              {title}
            </p>
          )}
          {overallScore != null && (
            <div className="flex items-baseline gap-2">
              {previousOverallScore != null && previousOverallScore !== overallScore && (
                <span className="text-[14px] text-ros-ink-muted">
                  {previousOverallScore} →
                </span>
              )}
              <span className="text-[24px] leading-none font-medium text-ros-ink">
                {overallScore}
              </span>
              <span className="text-[12px] text-ros-ink-muted">/100</span>
            </div>
          )}
        </div>
      )}

      {/* Horizontal area cards */}
      <div className={cn("grid gap-2 px-5 pb-5", colClass)}>
        {areas.map((area) => {
          const isWeakest = weakestArea && area.name === weakestArea.name;
          const isPositive = area.score >= 70;
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
              {/* Name + indicator */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate">
                  {area.name}
                </span>
                <span className={cn("text-[11px]", scoreText(area.score))}>
                  {isPositive ? "✓" : "❗"}
                </span>
              </div>

              {/* Score */}
              <span className={cn("text-[20px] leading-none font-bold", scoreText(area.score))}>
                {area.score > 0 ? (area.score / 10).toFixed(1) : "—"}
              </span>

              {/* Progress bar */}
              <div className="w-full h-1 bg-ros-border rounded-pill overflow-hidden">
                <div
                  className={cn("h-full rounded-pill", barColor(area.score))}
                  style={{ width: `${Math.min(100, Math.max(0, area.score))}%` }}
                />
              </div>

              {/* Quote (compact) */}
              {area.quote && (
                <p className="text-[10px] leading-[14px] text-ros-ink-muted italic line-clamp-2 mt-0.5">
                  „{area.quote}"
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Suggestions / priorities */}
      {visibleSuggestions && visibleSuggestions.length > 0 && (
        <div className="border-t border-ros-border px-5 py-4 flex flex-col gap-2.5">
          <p className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide">
            {visibleSuggestions.length === 1
              ? "Sugestia"
              : `Priorytety (${visibleSuggestions.length})`}
          </p>

          <div className="flex flex-col gap-2">
            {visibleSuggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Badge
                  tone={scoreTone(areas.find((a) => a.name === s.area)?.score ?? 0)}
                  className="mt-0.5 flex-shrink-0"
                >
                  {s.area}
                </Badge>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-[13px] leading-[18px] text-ros-ink">
                    {s.text}
                  </p>
                  {s.sourceQuote && (
                    <p className="text-[11px] leading-[14px] text-ros-ink-muted italic truncate">
                      „{s.sourceQuote}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
