import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * MemberDetailView — header + back navigation + children slot for
 * individual team member pages. The header is shared across apps;
 * everything below is app-specific (passed as children).
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-05 sc.3 — "Manager otwiera pełny widok
 *                 wybranego lekarza"
 *  - CallFlow:    US-CF-04 sc.2 — per-receptionist detail
 *
 * Role: MANAGER ONLY.
 *
 * App-specific content examples (passed as children):
 *  - CallFlow:  ScoreCardRow + recommendations checklist + impact +
 *               ReportsTable
 *  - ShiftFlow: individual schedule blocks + TrendChart + ActivityLog +
 *               coaching note textarea
 *  - ConsultFlow: TrendChart + ReportBreakdown + coaching note
 */

export type MemberDetailTrend = "up" | "down" | "flat";
export type MemberDetailStatus = "ok" | "attention";
export type MemberDeliveryBadge = "delivered" | "pending" | "not_sent";

export interface MemberDetailViewProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  name: string;
  subtitle?: string;
  /** Headline metric label, e.g. "Quiz Score", "Utilizacja". */
  metricLabel?: string;
  metricValue?: string;
  trend?: MemberDetailTrend;
  status?: MemberDetailStatus;
  /** Overall score displayed large in the header (e.g. 8.5 out of 10). */
  overallScore?: number;
  /** Previous overall score — shows "prev → current" delta. */
  previousOverallScore?: number;
  /** Delivery badge in header ("Gotowe" / "Oczekuje" / hidden). */
  deliveryBadge?: MemberDeliveryBadge;
  /** Called when the back button is clicked. */
  onBack?: () => void;
  /** Extra content rendered in the header's right side (custom badges, actions). */
  headerActions?: React.ReactNode;
  /** App-specific content below the header. */
  children: React.ReactNode;
  className?: string;
}

const brandBg: Record<NonNullable<MemberDetailViewProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

const trendGlyph: Record<MemberDetailTrend, { glyph: string; tone: "success" | "danger" | "neutral" }> = {
  up: { glyph: "↑", tone: "success" },
  down: { glyph: "↓", tone: "danger" },
  flat: { glyph: "→", tone: "neutral" },
};

const deliveryConfig: Record<MemberDeliveryBadge, { label: string; className: string }> = {
  delivered: { label: "Gotowe", className: "bg-ros-success-bg text-ros-success-fg" },
  pending: { label: "Oczekuje", className: "bg-[#fff7ed] text-ros-warn-fg" },
  not_sent: { label: "Nie wysłano", className: "bg-ros-surface-off text-ros-ink-faint" },
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
  overallScore,
  previousOverallScore,
  deliveryBadge,
  onBack,
  headerActions,
  children,
  className,
}: MemberDetailViewProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Back navigation */}
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

      {/* Person header card */}
      <div className="flex items-center justify-between gap-4 rounded-card border border-ros-border bg-white p-6">
        {/* Left: avatar + name */}
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "size-12 rounded-pill flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0",
              brandBg[brand],
            )}
            aria-hidden
          >
            {getInitials(name)}
          </div>
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

        {/* Right: delivery badge + metric/score + trend + status + actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {deliveryBadge && (
            <span
              className={cn(
                "px-3 py-1 rounded-pill text-[12px] font-medium",
                deliveryConfig[deliveryBadge].className,
              )}
            >
              {deliveryConfig[deliveryBadge].label}
            </span>
          )}

          {/* Overall score with delta (CallFlow style: 6.2 → 8.5) */}
          {overallScore != null && (
            <div className="flex items-baseline gap-2">
              {previousOverallScore != null && (
                <span className="text-[14px] text-ros-ink-muted">
                  {previousOverallScore.toFixed(1)} →
                </span>
              )}
              <span className="text-[28px] leading-none font-medium text-ros-ink">
                {overallScore.toFixed(1)}
              </span>
            </div>
          )}

          {/* Metric value (ShiftFlow style: label + big number) */}
          {metricValue && !overallScore && (
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
          )}

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
          {headerActions}
        </div>
      </div>

      {/* App-specific content */}
      {children}
    </div>
  );
}
