import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";
import { Card } from "../primitives/Card";

/**
 * ReportBreakdown — per-person detailed report with area scores,
 * highlighted weakness, and AI-generated suggestions tied to quotes.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-02 sc.2 — "widzi wyniki dla obszarów: Empatia, Ton,
 *                 Konwersja" + "najsłabszy obszar jest wyróżniony kolorem ❗"
 *                 + "sugestia nie jest ogólna — odnosi się do konkretnego
 *                 cytatu z tej rozmowy"
 *  - ConsultFlow: US-CO-02 sc.2 — "widzi wyniki dla 6 obszarów: Kompletność,
 *                 Wartość, Obiekcje, Struktura, Zaufanie, CTA" + "każdy obszar
 *                 zawiera cytat z nagrania z adnotacją ✓ lub ❗"
 *                 + sc.3 — "dokładnie 3 obszary priorytetowe na bieżący miesiąc"
 *  - ConsultFlow: US-CO-01 sc.4 — "porównanie wyników: poprzedni vs aktualny"
 *
 * Role: accessible to both OPERATOR (own report) and MANAGER (any report).
 *
 * The component is generic: areas are passed as data, not hardcoded.
 */

export interface BreakdownArea {
  /** Area name, e.g. "Empatia", "Obiekcje". */
  name: string;
  /** Score 0–100. */
  score: number;
  /** Previous score for delta comparison (US-CO-01 sc.4). */
  previousScore?: number;
  /** Quote from the transcript backing this score. */
  quote?: string;
  /** Annotation on the quote: positive or negative. */
  quoteType?: "positive" | "negative";
}

export interface Suggestion {
  /** Area this suggestion targets. */
  area: string;
  /** The actionable suggestion text. */
  text: string;
  /** Quote from the conversation that triggered this suggestion. */
  sourceQuote?: string;
}

export interface ReportBreakdownProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Report title, e.g. "Raport z rozmowy — 8 kwi 2026". */
  title?: string;
  /** Overall score if applicable. */
  overallScore?: number;
  /** Previous overall score for delta. */
  previousOverallScore?: number;
  /** Scored areas. Weakest is auto-detected and highlighted. */
  areas: BreakdownArea[];
  /** AI-generated suggestions (US-CF-02 sc.2 / US-CO-02 sc.3). */
  suggestions?: Suggestion[];
  /** Max number of suggestions to show (ConsultFlow: 3). */
  maxSuggestions?: number;
  className?: string;
}

function scoreTone(score: number): "success" | "warn" | "danger" {
  if (score >= 75) return "success";
  if (score >= 50) return "warn";
  return "danger";
}

function scoreBg(score: number): string {
  if (score >= 75) return "bg-ros-success-bg";
  if (score >= 50) return "bg-[#fff7ed]";
  return "bg-ros-danger-bg";
}

function scoreText(score: number): string {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}

function deltaString(current: number, previous: number): string {
  const diff = current - previous;
  if (diff > 0) return `+${diff}`;
  return `${diff}`;
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

  // Sort: weakest first (gherkin: "najsłabszy obszar jest wyróżniony na górze sekcji")
  const sortedAreas = React.useMemo(() => {
    return [...areas].sort((a, b) => a.score - b.score);
  }, [areas]);

  const visibleSuggestions = suggestions?.slice(0, maxSuggestions);

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className,
      )}
    >
      {/* Header */}
      {(title || overallScore != null) && (
        <div className="flex items-center justify-between p-6 pb-0">
          {title && (
            <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
              {title}
            </p>
          )}
          {overallScore != null && (
            <div className="flex items-center gap-2">
              <span className="text-[28px] leading-none font-medium text-ros-ink">
                {overallScore}
              </span>
              <span className="text-[12px] text-ros-ink-muted">/100</span>
              {previousOverallScore != null && previousOverallScore !== overallScore && (
                <Badge
                  tone={overallScore >= previousOverallScore ? "success" : "danger"}
                >
                  {deltaString(overallScore, previousOverallScore)}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Area breakdown */}
      <div className="p-6 flex flex-col gap-3">
        <p className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide">
          Breakdown
        </p>

        <div className="flex flex-col gap-2">
          {sortedAreas.map((area) => {
            const isWeakest = weakestArea && area.name === weakestArea.name;
            return (
              <div
                key={area.name}
                className={cn(
                  "flex flex-col gap-2 p-3 rounded-input border transition-colors duration-150",
                  isWeakest
                    ? "border-ros-danger-fg/30 bg-ros-danger-bg/30"
                    : "border-ros-border bg-white",
                )}
              >
                {/* Area header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isWeakest && (
                      <span className="text-[12px]" aria-label="Najsłabszy obszar">
                        ❗
                      </span>
                    )}
                    <span className="text-[14px] leading-[20px] font-medium text-ros-ink">
                      {area.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "px-2.5 py-0.5 rounded-pill text-[14px] font-bold",
                        scoreBg(area.score),
                        scoreText(area.score),
                      )}
                    >
                      {area.score}
                    </div>
                    {area.previousScore != null && area.previousScore !== area.score && (
                      <Badge
                        tone={area.score >= area.previousScore ? "success" : "danger"}
                      >
                        {deltaString(area.score, area.previousScore)}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Score bar */}
                <div className="w-full h-1.5 bg-ros-surface-off rounded-pill overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-pill transition-all duration-300",
                      area.score >= 75
                        ? "bg-ros-success-fg"
                        : area.score >= 50
                          ? "bg-ros-warn-fg"
                          : "bg-ros-danger-fg",
                    )}
                    style={{ width: `${Math.min(100, Math.max(0, area.score))}%` }}
                  />
                </div>

                {/* Quote */}
                {area.quote && (
                  <div className="flex items-start gap-2 mt-1">
                    <span className="text-[12px] flex-shrink-0 mt-0.5">
                      {area.quoteType === "positive" ? "✓" : "❗"}
                    </span>
                    <p className="text-[12px] leading-[16px] text-ros-ink-muted italic">
                      „{area.quote}"
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Suggestions */}
      {visibleSuggestions && visibleSuggestions.length > 0 && (
        <div className="border-t border-ros-border p-6 flex flex-col gap-3">
          <p className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide">
            {visibleSuggestions.length === 1
              ? "Sugestia"
              : `Priorytety (${visibleSuggestions.length})`}
          </p>

          <div className="flex flex-col gap-3">
            {visibleSuggestions.map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 p-3 rounded-input bg-ros-surface-off border border-ros-border"
              >
                <div className="flex items-center gap-2">
                  <Badge tone={scoreTone(
                    areas.find((a) => a.name === s.area)?.score ?? 0,
                  )}>
                    {s.area}
                  </Badge>
                </div>
                <p className="text-[14px] leading-[20px] text-ros-ink">
                  {s.text}
                </p>
                {s.sourceQuote && (
                  <p className="text-[12px] leading-[16px] text-ros-ink-muted italic">
                    Kontekst: „{s.sourceQuote}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
