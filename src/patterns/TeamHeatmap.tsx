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

export interface HeatmapCell {
  /** Score 0–100. */
  score: number;
}

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
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-4",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
          Heatmapa obszarów
        </p>
        {weakest && weakest.avg < 75 && (
          <Badge tone={scoreTone(weakest.avg)}>
            Najsłabszy: {weakest.area} ({weakest.avg}%)
          </Badge>
        )}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[12px] leading-[16px] font-medium text-ros-ink-muted py-2 pr-3 min-w-[120px]">
                Osoba
              </th>
              {areas.map((area) => (
                <th
                  key={area}
                  className="text-center text-[12px] leading-[16px] font-medium text-ros-ink-muted py-2 px-2 min-w-[72px]"
                >
                  {area}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.name} className="border-t border-ros-border">
                <td className="text-[14px] leading-[20px] font-medium text-ros-ink py-2 pr-3">
                  {member.name}
                </td>
                {areas.map((area) => {
                  const score = member.scores[area] ?? 0;
                  const isWeakest =
                    weakest && area === weakest.area && score > 0 && score <= weakest.avg;
                  return (
                    <td key={area} className="py-2 px-2">
                      <div
                        className={cn(
                          "flex items-center justify-center h-8 rounded-stat text-[14px] font-medium transition-colors duration-150",
                          scoreBg(score),
                          scoreText(score),
                          isWeakest && "ring-2 ring-ros-warn-fg/30",
                        )}
                      >
                        {score > 0 ? `${score}` : "—"}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Averages row */}
            <tr className="border-t-2 border-ros-ink-faint">
              <td className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted py-2 pr-3">
                Średnia zespołu
              </td>
              {areaAverages.map(({ area, avg }) => (
                <td key={area} className="py-2 px-2">
                  <div
                    className={cn(
                      "flex items-center justify-center h-8 rounded-stat text-[14px] font-bold",
                      scoreBg(avg),
                      scoreText(avg),
                      weakest && area === weakest.area && "ring-2 ring-ros-warn-fg/30",
                    )}
                  >
                    {avg > 0 ? `${avg}` : "—"}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Suggestion */}
      {suggestion && weakest && weakest.avg < 75 && (
        <div className="flex items-start gap-3 p-3 rounded-input bg-[#fff7ed] border border-ros-warn-fg/20">
          <span className="text-ros-warn-fg text-[14px] flex-shrink-0 mt-0.5">⚑</span>
          <div className="flex flex-col gap-1">
            <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
              {suggestion}
            </p>
            {onWeakestAreaClick && (
              <button
                type="button"
                onClick={() => onWeakestAreaClick(weakest.area)}
                className={cn(
                  "text-[12px] leading-[16px] font-medium text-left border-none bg-transparent cursor-pointer p-0",
                  brand === "callflow" && "text-brand-callflow",
                  brand === "consultflow" && "text-brand-consultflow",
                  brand === "shiftflow" && "text-brand-shiftflow",
                )}
              >
                Zobacz wszystkie raporty z tym problemem →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
