import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * TeamMemberRow — single row in the manager dashboard's team list. The
 * "lista [osób] z aktualnym wynikiem, trendem ↑/↓ i statusem ✓/❗"
 * description is repeated 1:1 in all three apps.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "listę recepcjonistek z: aktualnym
 *                 Empathy Score, trendem ↑/↓ i statusem ✓/❗"
 *  - ConsultFlow: US-CO-05 sc.1 — "listę lekarzy z: aktualnym wynikiem,
 *                 trendem ↑/↓ i statusem ✓/❗"
 *  - ShiftFlow:   US-SF-05 sc.1 — "listę lekarzy z ich utilizacją, trendem
 *                 ↑/↓ i statusem ✓/❗"
 *
 * Role: MANAGER ONLY. Operators cannot see other team members' data
 * (cf. ConsultFlow US-CO-03 sc.3 explicitly: "Dr Mazur nie widzi wyników
 * konkretnych innych lekarzy"). Inadequate role gating here would directly
 * violate the gherkin contract.
 *
 * Click target: opens the per-person detail view (US-CO-05 sc.3 — "Manager
 * otwiera pełny widok wybranego lekarza" + coaching note).
 */
export type Trend = "up" | "down" | "flat";
export type MemberStatus = "ok" | "attention";

export interface TeamMemberRowProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  name: string;
  /** Optional role / specialization line under the name. */
  subtitle?: string;
  /** Headline metric for this person, e.g. "Empathy 78" or "Util. 87%". */
  metricLabel: string;
  metricValue: string;
  trend?: Trend;
  /** "ok" → green check, "attention" → orange badge ("flagowane rozmowy"). */
  status?: MemberStatus;
  onOpen?: () => void;
  className?: string;
}

const trendGlyph: Record<Trend, { glyph: string; tone: "success" | "danger" | "neutral" }> =
  {
    up: { glyph: "↑", tone: "success" },
    down: { glyph: "↓", tone: "danger" },
    flat: { glyph: "→", tone: "neutral" },
  };

const brandRing: Record<NonNullable<TeamMemberRowProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

export function TeamMemberRow({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status = "ok",
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

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150 text-left",
        className,
      )}
    >
      <div
        className={cn(
          "size-8 rounded-pill flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0",
          brandRing[brand],
        )}
        aria-hidden
      >
        {initials}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-[14px] font-medium text-ros-ink truncate">{name}</p>
        {subtitle && (
          <p className="text-[12px] text-ros-ink-muted truncate">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-[12px] text-ros-ink-muted">{metricLabel}</p>
          <p className="text-[14px] font-medium text-ros-ink">{metricValue}</p>
        </div>
        {trend && (
          <Badge tone={trendGlyph[trend].tone}>{trendGlyph[trend].glyph}</Badge>
        )}
        {status === "attention" ? (
          <Badge tone="warn" aria-label="Wymaga uwagi">
            ❗
          </Badge>
        ) : (
          <Badge tone="success" aria-label="OK">
            ✓
          </Badge>
        )}
      </div>
    </button>
  );
}
