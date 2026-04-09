import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";
import { Button } from "../primitives/Button";

/**
 * ImportBatchRow — status row for an uploaded file/batch in the Import
 * tab's history list.
 *
 * Cross-app usage:
 *  - CallFlow:    CSV batch → "analyzing" → "completed" → CTA "Generuj raport"
 *  - ConsultFlow: Audio file → "analyzing" → "completed" → CTA "Zobacz raport"
 *  - ShiftFlow:   Schedule paste → "parsed" → CTA "Importuj do grafiku"
 *
 * Visual pattern mirrors InboxNotification but for data imports:
 * icon + file info + status badge + optional progress + CTA.
 */
export type ImportBatchStatus = "pending" | "analyzing" | "completed" | "error";

export interface ImportBatchRowProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** File or batch name. */
  fileName: string;
  /** Secondary info: receptionist name, date, item count, etc. */
  subtitle?: string;
  status: ImportBatchStatus;
  /** Progress 0–100, shown when status is "analyzing". */
  progress?: number;
  /** Custom status label override. */
  statusLabel?: string;
  /** Timestamp string, e.g. "2 min temu". */
  timestamp?: string;
  /** CTA button (shown for completed/error batches). */
  ctaLabel?: string;
  onCta?: () => void;
  /** Loading state for CTA button. */
  ctaLoading?: boolean;
  className?: string;
}

const statusConfig: Record<
  ImportBatchStatus,
  { tone: "neutral" | "warn" | "success" | "danger"; label: string }
> = {
  pending: { tone: "neutral", label: "Oczekuje" },
  analyzing: { tone: "warn", label: "Analizuję..." },
  completed: { tone: "success", label: "Gotowe" },
  error: { tone: "danger", label: "Błąd" },
};

const brandIcon: Record<NonNullable<ImportBatchRowProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

export function ImportBatchRow({
  brand = "callflow",
  fileName,
  subtitle,
  status,
  progress,
  statusLabel,
  timestamp,
  ctaLabel,
  onCta,
  ctaLoading,
  className,
}: ImportBatchRowProps) {
  const cfg = statusConfig[status];
  const showProgress = status === "analyzing" && progress != null;

  return (
    <article
      className={cn(
        "flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border",
        className,
      )}
    >
      {/* File icon */}
      <div
        className={cn(
          "size-8 rounded-input flex-shrink-0 flex items-center justify-center text-white",
          brandIcon[brand],
        )}
        aria-hidden
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>

      {/* File info + progress */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-[14px] leading-[20px] font-medium text-ros-ink truncate">
            {fileName}
          </p>
          <Badge tone={cfg.tone}>{statusLabel ?? cfg.label}</Badge>
          {timestamp && (
            <span className="text-[12px] text-ros-ink-faint ml-auto flex-shrink-0">
              {timestamp}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[12px] leading-[16px] text-ros-ink-muted truncate">
            {subtitle}
          </p>
        )}
        {showProgress && (
          <div className="w-full h-1 bg-ros-surface-off rounded-pill overflow-hidden mt-1">
            <div
              className={cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* CTA */}
      {ctaLabel && onCta && status !== "analyzing" && (
        <div className="flex-shrink-0">
          <Button
            brand={brand}
            onClick={onCta}
            disabled={ctaLoading}
            className="text-[12px] px-3 h-8"
          >
            {ctaLoading ? "..." : ctaLabel}
          </Button>
        </div>
      )}
    </article>
  );
}
