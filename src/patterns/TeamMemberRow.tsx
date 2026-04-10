import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * TeamMemberRow — single row in the manager dashboard's team list.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "listę recepcjonistek z: aktualnym
 *                 Empathy Score, trendem ↑/↓ i statusem ✓/❗"
 *  - ConsultFlow: US-CO-05 sc.1 — "listę lekarzy z: aktualnym wynikiem,
 *                 trendem ↑/↓ i statusem ✓/❗"
 *  - ShiftFlow:   US-SF-05 sc.1 — "listę lekarzy z ich utilizacją, trendem
 *                 ↑/↓ i statusem ✓/❗"
 *
 * Role: MANAGER ONLY.
 *
 * Extended with:
 *  - Selectable checkbox for bulk actions (send schedule/report)
 *  - Delivery status indicator (sent ✓ / pending ◌)
 *  - lastActivityAt for chronological sorting by consuming app
 */
export type Trend = "up" | "down" | "flat";
export type MemberStatus = "ok" | "attention";
export type DeliveryStatus = "delivered" | "pending" | "not_sent";

export interface TeamMemberRowProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  name: string;
  /** Optional role / specialization line under the name. */
  subtitle?: string;
  /** Headline metric for this person, e.g. "Empathy 78" or "Util. 87%". */
  metricLabel: string;
  metricValue: string;
  trend?: Trend;
  /** "ok" → green check, "attention" → orange badge. */
  status?: MemberStatus;
  /** Whether the latest report/schedule was delivered to this person. */
  deliveryStatus?: DeliveryStatus;
  /** Enables checkbox selection for bulk actions. */
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
  onOpen?: () => void;
  className?: string;
}

const trendGlyph: Record<Trend, { glyph: string; tone: "success" | "danger" | "neutral" }> = {
  up: { glyph: "↑", tone: "success" },
  down: { glyph: "↓", tone: "danger" },
  flat: { glyph: "→", tone: "neutral" },
};

const brandRing: Record<NonNullable<TeamMemberRowProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

const deliveryIcon: Record<DeliveryStatus, { label: string; className: string }> = {
  delivered: { label: "Wysłano", className: "bg-ros-success-fg" },
  pending: { label: "Oczekuje", className: "bg-ros-warn-fg" },
  not_sent: { label: "Nie wysłano", className: "bg-ros-ink-faint" },
};

export function TeamMemberRow({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status = "ok",
  deliveryStatus,
  selectable,
  selected,
  onSelect,
  onOpen,
  className,
}: TeamMemberRowProps) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  function handleCheckbox(e: React.MouseEvent | React.ChangeEvent) {
    e.stopPropagation();
    onSelect?.(!selected);
  }

  return (
    <div
      className={cn(
        "w-full flex items-center gap-2.5 p-2.5 rounded-input border transition-colors duration-150 text-left",
        selected
          ? "bg-ros-surface-off border-ros-ink-faint"
          : "bg-white border-ros-border hover:bg-ros-surface-hover",
        onOpen && "cursor-pointer",
        className,
      )}
      onClick={onOpen}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
    >
      {/* Checkbox */}
      {selectable && (
        <input
          type="checkbox"
          checked={selected ?? false}
          onChange={handleCheckbox}
          onClick={(e) => e.stopPropagation()}
          className="size-4 rounded-sm border-ros-border accent-current flex-shrink-0 cursor-pointer"
          aria-label={`Zaznacz ${name}`}
        />
      )}

      {/* Avatar */}
      <div
        className={cn(
          "size-7 rounded-pill flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0",
          brandRing[brand],
        )}
        aria-hidden
      >
        {initials}
      </div>

      {/* Name + subtitle */}
      <div className="flex flex-col gap-0 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] font-medium text-ros-ink truncate">{name}</p>
          {/* Delivery dot */}
          {deliveryStatus && (
            <span
              className={cn(
                "size-2 rounded-pill flex-shrink-0",
                deliveryIcon[deliveryStatus].className,
              )}
              title={deliveryIcon[deliveryStatus].label}
            />
          )}
        </div>
        {subtitle && (
          <p className="text-[11px] text-ros-ink-muted truncate">{subtitle}</p>
        )}
      </div>

      {/* Metric + trend + status */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="text-right">
          <p className="text-[10px] text-ros-ink-muted leading-none">{metricLabel}</p>
          <p className="text-[13px] font-medium text-ros-ink leading-tight">{metricValue}</p>
        </div>
        {trend && (
          <Badge tone={trendGlyph[trend].tone}>{trendGlyph[trend].glyph}</Badge>
        )}
        {status === "attention" ? (
          <Badge tone="warn" aria-label="Wymaga uwagi">❗</Badge>
        ) : (
          <Badge tone="success" aria-label="OK">✓</Badge>
        )}
      </div>
    </div>
  );
}
