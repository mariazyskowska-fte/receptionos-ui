import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";
import { Button } from "../primitives/Button";

/**
 * MemberDetailView — full-page layout for an individual team member,
 * opened when a manager clicks on a TeamMemberRow.
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-05 sc.3 — "Manager otwiera pełny widok wybranego
 *                 lekarza" + "widzi pełną historię trendów i podsumowania
 *                 raportów z ostatnich 3 miesięcy" + "może dodać notatkę
 *                 coachingową widoczną tylko dla managera"
 *  - CallFlow:    US-CF-04 sc.2 — "widzi rozmowę z wyróżnionym obszarem
 *                 słabości" + "może jednym kliknięciem oznaczyć rozmowę
 *                 jako 'omówiona'"
 *
 * Role: MANAGER ONLY.
 *
 * This component provides the chrome (header, back nav, coaching notes).
 * The content area (TrendChart, ReportBreakdown, report list) is passed
 * as children so each app can compose its own detail layout.
 */

export type Trend = "up" | "down" | "flat";
export type MemberStatus = "ok" | "attention";

export interface MemberDetailViewProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Person's full name. */
  name: string;
  /** Role / specialization shown under name. */
  subtitle?: string;
  /** Headline metric, e.g. "Empathy Score". */
  metricLabel?: string;
  metricValue?: string;
  trend?: Trend;
  status?: MemberStatus;
  /** Called when the back button is clicked. */
  onBack?: () => void;
  /** Coaching note content (US-CO-05 sc.3). Manager-only, never visible to operator. */
  coachingNote?: string;
  /** Called when manager edits the coaching note. */
  onCoachingNoteChange?: (note: string) => void;
  /** Placeholder for the coaching note textarea. */
  coachingNotePlaceholder?: string;
  /** App-specific content: TrendChart, ReportBreakdown list, etc. */
  children: React.ReactNode;
  className?: string;
}

const brandBg: Record<NonNullable<MemberDetailViewProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

const trendGlyph: Record<Trend, { glyph: string; tone: "success" | "danger" | "neutral" }> = {
  up: { glyph: "↑", tone: "success" },
  down: { glyph: "↓", tone: "danger" },
  flat: { glyph: "→", tone: "neutral" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MemberDetailView({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status,
  onBack,
  coachingNote,
  onCoachingNoteChange,
  coachingNotePlaceholder = "Dodaj notatkę coachingową (widoczna tylko dla managera)...",
  children,
  className,
}: MemberDetailViewProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Back + person header */}
      <div className="flex flex-col gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-ros-ink-muted hover:text-ros-ink transition-colors duration-150 border-none bg-transparent cursor-pointer p-0 self-start"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Powrót do zespołu
          </button>
        )}

        <div className="flex items-center justify-between gap-4 rounded-card border border-ros-border bg-white p-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className={cn(
                "size-12 rounded-pill flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0",
                brandBg[brand],
              )}
              aria-hidden
            >
              {getInitials(name)}
            </div>

            {/* Name + subtitle */}
            <div className="flex flex-col gap-0.5">
              <p className="text-[18px] leading-[28px] font-semibold text-ros-ink">
                {name}
              </p>
              {subtitle && (
                <p className="text-[14px] leading-[20px] text-ros-ink-muted">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Metric + trend + status */}
          {metricValue && (
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                {metricLabel && (
                  <p className="text-[12px] leading-[16px] text-ros-ink-muted">
                    {metricLabel}
                  </p>
                )}
                <p className="text-[28px] leading-none font-medium text-ros-ink">
                  {metricValue}
                </p>
              </div>
              {trend && (
                <Badge tone={trendGlyph[trend].tone}>
                  {trendGlyph[trend].glyph}
                </Badge>
              )}
              {status === "attention" && (
                <Badge tone="warn" aria-label="Wymaga uwagi">
                  ❗
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content area (TrendChart, ReportBreakdown, etc.) */}
      {children}

      {/* Coaching notes (US-CO-05 sc.3) */}
      {onCoachingNoteChange != null && (
        <div className="rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
              Notatka coachingowa
            </p>
            <Badge tone="neutral">Tylko manager</Badge>
          </div>
          <textarea
            value={coachingNote ?? ""}
            onChange={(e) => onCoachingNoteChange(e.target.value)}
            placeholder={coachingNotePlaceholder}
            rows={3}
            className="w-full px-3 py-2 bg-ros-surface-off rounded-input border border-ros-border-input text-[14px] leading-[20px] text-ros-ink placeholder:text-ros-ink-faint outline-none focus:border-ros-ink-muted resize-y"
          />
        </div>
      )}
    </div>
  );
}
