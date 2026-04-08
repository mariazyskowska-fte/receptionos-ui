import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * DashboardHeader — top hero of every Manager Dashboard. Single big metric
 * + delta badge + optional contextual subtitle.
 *
 * Source user stories (the "główna metryka" in each):
 *  - CallFlow:    US-CF-04 sc.1 — "Team Health Score" jako główna metryka
 *  - ConsultFlow: US-CO-05 sc.1 — "Avg Conversion Rate: [X]%"
 *  - ShiftFlow:   US-SF-05 sc.1 — "Utilizacja foteli: [X]%"
 *
 * Role: MANAGER ONLY. The operator views (Anna's Trend View, Dr Mazur's
 * report) do not have a hero KPI — they have a per-record breakdown.
 * Confirmed by gherkins: every "Given X jest zalogowana jako Manager"
 * scenario opens with this header.
 *
 * Visual mirrors `UI/design-system-audit/03-components.md` Stat Card
 * (28px Medium value + Badge pill). Slightly enlarged for the page hero.
 */
export interface DashboardHeaderProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  title: string;
  metricLabel: string;
  metricValue: string;
  /** Trend delta, e.g. "+12%" or "-3 pkt". Sign drives the tone. */
  delta?: string;
  /** Override the auto-detected delta tone. */
  deltaTone?: "success" | "danger" | "neutral";
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const brandAccent: Record<NonNullable<DashboardHeaderProps["brand"]>, string> =
  {
    callflow: "border-l-brand-callflow",
    consultflow: "border-l-brand-consultflow",
    shiftflow: "border-l-brand-shiftflow",
  };

function autoTone(delta?: string): "success" | "danger" | "neutral" {
  if (!delta) return "neutral";
  if (delta.trim().startsWith("+")) return "success";
  if (delta.trim().startsWith("-")) return "danger";
  return "neutral";
}

export function DashboardHeader({
  brand = "callflow",
  title,
  metricLabel,
  metricValue,
  delta,
  deltaTone,
  subtitle,
  actions,
  className,
}: DashboardHeaderProps) {
  const tone = deltaTone ?? autoTone(delta);
  return (
    <header
      className={cn(
        "rounded-card bg-white border border-ros-border border-l-4 p-6 flex items-start justify-between gap-6",
        brandAccent[brand],
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[12px] uppercase tracking-wide text-ros-ink-muted">
          {title}
        </p>
        <p className="text-[12px] text-ros-ink-muted">{metricLabel}</p>
        <div className="flex items-end gap-3">
          <p className="text-[28px] leading-none font-medium text-ros-ink">
            {metricValue}
          </p>
          {delta && <Badge tone={tone}>{delta}</Badge>}
        </div>
        {subtitle && (
          <p className="text-[12px] leading-[16px] text-ros-ink-muted max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
