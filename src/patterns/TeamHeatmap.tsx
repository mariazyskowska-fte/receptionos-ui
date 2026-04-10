import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * TeamHeatmap — grid showing team-wide area scores as a color-coded matrix.
 * Highlights the weakest area across the whole team with a suggested action.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "heatmapę najsłabszego obszaru całego zespołu"
 *  - ConsultFlow: US-CO-05 sc.1 — "heatmapę najsłabszego obszaru całego zespołu
 *                 (np. Obiekcje)"
 *                 + sc.2 — "obszar 'Obiekcje' jest wyróżniony jako najsłabszy
 *                 zespołowy" + "system sugeruje: 'Zaplanuj szkolenie z: Obsługa
 *                 obiekcji'"
 *
 * Role: MANAGER ONLY. Operators never see team-level data.
 *
 * Cross-app areas:
 *  - CallFlow:    Empatia, Ton, Konwersja
 *  - ConsultFlow: Kompletność, Wartość, Obiekcje, Struktura, Zaufanie, CTA
 *  - ShiftFlow:   (not applicable — utilization is per-chair, not per-area)
 *
 * The component accepts generic areas so each app can define its own.
 */

export interface HeatmapMember {
  name: string;
  /** Scores keyed by area name, matching `areas` order. */
  scores: Record<string, number>;
}

export interface TeamHeatmapProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Ordered list of area names (column headers). */
  areas: string[];
  /** Team members with their per-area scores. */
  members: HeatmapMember[];
  /** Suggested action for the weakest area (US-CO-05 sc.2). */
  suggestion?: string;
  /** Called when manager clicks on the weakest area link. */
  onWeakestAreaClick?: (area: string) => void;
  className?: string;
}

function scoreTone(score: number): "success" | "warn" | "danger" | "neutral" {
  if (score >= 75) return "success";
  if (score >= 50) return "warn";
  if (score > 0) return "danger";
  return "neutral";
}

function scoreBg(score: number): string {
  if (score >= 75) return "bg-ros-success-bg";
  if (score >= 50) return "bg-[#fff7ed]";
  if (score > 0) return "bg-ros-danger-bg";
  return "bg-ros-surface-off";
}

function scoreText(score: number): string {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  if (score > 0) return "text-ros-danger-fg";
  return "text-ros-ink-faint";
}

export function TeamHeatmap({
  brand = "callflow",
  areas,
  members,
  suggestion,
  onWeakestAreaClick,
  className,
}: TeamHeatmapProps) {
  // Calculate area averages and find weakest
  const areaAverages = React.useMemo(() => {
    return areas.map((area) => {
      const scores = members
        .map((m) => m.scores[area])
        .filter((s) => s != null && s > 0);
      if (scores.length === 0) return { area, avg: 0, count: 0 };
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return { area, avg, count: scores.length };
    });
  }, [areas, members]);

  const weakest = React.useMemo(() => {
    const scored = areaAverages.filter((a) => a.count > 0);
    if (scored.length === 0) return null;
    return scored.reduce((min, a) => (a.avg < min.avg ? a : min), scored[0]);
  }, [areaAverages]);

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white p-4 flex flex-col gap-3",
        className,
      )}
    >
      {/* Header — compact, with weakest area + suggestion inline */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide">
            Obszary
          </p>
          {weakest && weakest.avg < 75 && (
            <Badge tone={scoreTone(weakest.avg)}>
              {weakest.area} {weakest.avg}%
            </Badge>
          )}
        </div>
        {suggestion && weakest && weakest.avg < 75 && onWeakestAreaClick && (
          <button
            type="button"
            onClick={() => onWeakestAreaClick(weakest.area)}
            className={cn(
              "text-[12px] leading-[16px] font-medium border-none bg-transparent cursor-pointer p-0",
              brand === "callflow" && "text-brand-callflow",
              brand === "consultflow" && "text-brand-consultflow",
              brand === "shiftflow" && "text-brand-shiftflow",
            )}
          >
            {suggestion} →
          </button>
        )}
      </div>

      {/* Compact grid — area averages as horizontal bar row */}
      <div className="flex gap-1.5">
        {areaAverages.map(({ area, avg }) => {
          const isWeakest = weakest && area === weakest.area;
          return (
            <div
              key={area}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 p-2 rounded-input",
                scoreBg(avg),
                isWeakest && "ring-1 ring-ros-warn-fg/40",
              )}
            >
              <span className="text-[10px] leading-[12px] font-medium text-ros-ink-muted text-center truncate w-full">
                {area}
              </span>
              <span className={cn("text-[18px] leading-none font-bold", scoreText(avg))}>
                {avg > 0 ? avg : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Per-member mini rows — only names + dots, no full table */}
      <div className="flex flex-col gap-0.5">
        {members.map((member) => (
          <div key={member.name} className="flex items-center gap-2 py-1">
            <span className="text-[12px] leading-[16px] text-ros-ink-medium w-[100px] truncate flex-shrink-0">
              {member.name}
            </span>
            <div className="flex gap-1 flex-1">
              {areas.map((area) => {
                const score = member.scores[area] ?? 0;
                return (
                  <div
                    key={area}
                    className={cn(
                      "flex-1 h-2 rounded-pill",
                      score >= 75
                        ? "bg-ros-success-fg/60"
                        : score >= 50
                          ? "bg-ros-warn-fg/60"
                          : score > 0
                            ? "bg-ros-danger-fg/60"
                            : "bg-ros-surface-off",
                    )}
                    title={`${member.name} · ${area}: ${score}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
