import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * ReportCard — compact touch-friendly card for a single consultation
 * or report in a scrollable list. Optimized for mobile viewports.
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-02 sc.1 — "widzi powiadomienie: 'Raport z
 *                 konsultacji [data] jest gotowy'" + CTA
 *  - CallFlow:    US-CF-02 sc.1 — "Twój nowy raport z rozmowy jest gotowy"
 *
 * Shows: identifier (initials/name), date, status badge, score (if completed).
 * Tap opens the full report (ReportBreakdown).
 */

export type ReportCardStatus = "completed" | "analyzing" | "pending" | "error";

export interface ReportCardProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Primary label — patient initials, receptionist name, etc. */
  label: string;
  /** Date string, e.g. "8 kwi 2026". */
  date: string;
  /** Secondary info, e.g. duration "12m". */
  subtitle?: string;
  status: ReportCardStatus;
  /** Overall score (shown only when completed). */
  score?: number;
  /** Additional score details shown on larger screens. */
  scoreDetails?: Array<{ label: string; value: number }>;
  /** Called when the card is tapped. */
  onOpen?: () => void;
  className?: string;
}

const statusConfig: Record<ReportCardStatus, { label: string; tone: "success" | "warn" | "neutral" | "danger" }> = {
  completed: { label: "✓", tone: "success" },
  analyzing: { label: "...", tone: "warn" },
  pending: { label: "↑", tone: "neutral" },
  error: { label: "!", tone: "danger" },
};

const brandBg: Record<NonNullable<ReportCardProps["brand"]>, string> = {
  callflow: "bg-brand-callflow/10 text-brand-callflow",
  consultflow: "bg-brand-consultflow/10 text-brand-consultflow",
  shiftflow: "bg-brand-shiftflow/10 text-brand-shiftflow",
};

function scoreColor(score: number): string {
  if (score >= 8) return "text-ros-success-fg";
  if (score >= 6) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}

export function ReportCard({
  brand = "callflow",
  label,
  date,
  subtitle,
  status,
  score,
  scoreDetails,
  onOpen,
  className,
}: ReportCardProps) {
  const cfg = statusConfig[status];

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full text-left rounded-stat bg-white border border-ros-border p-3.5 flex items-center gap-3 transition-colors duration-150 active:bg-ros-surface-hover cursor-pointer",
        className,
      )}
    >
      {/* Avatar / initials */}
      <div
        className={cn(
          "size-10 rounded-pill flex items-center justify-center flex-shrink-0 text-[13px] font-bold",
          brandBg[brand],
        )}
      >
        {label}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-ros-ink truncate">
          Pacjent {label}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-ros-ink-muted">
          <span>{date}</span>
          {subtitle && <span>· {subtitle}</span>}
        </div>
      </div>

      {/* Score + status */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {scoreDetails && scoreDetails.length > 0 && (
          <div className="hidden sm:flex gap-2">
            {scoreDetails.map((d) => (
              <div key={d.label} className="text-center">
                <div className={cn("text-[12px] font-bold", scoreColor(d.value))}>
                  {d.value.toFixed(1)}
                </div>
                <div className="text-[9px] text-ros-ink-faint">{d.label}</div>
              </div>
            ))}
          </div>
        )}
        {status === "completed" && score != null && (
          <div className="px-2 py-0.5 rounded-input bg-ros-surface-off">
            <span className={cn("text-[16px] font-bold", scoreColor(score))}>
              {score.toFixed(1)}
            </span>
          </div>
        )}
        <Badge tone={cfg.tone}>{cfg.label}</Badge>
      </div>
    </button>
  );
}
