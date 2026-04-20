import * as React from "react";
import { cn } from "../utils/cn";
import { Badge, type BadgeTone } from "../primitives/Badge";

/**
 * StaffRosterRow — single row in the schedule-editor staff list.
 *
 * Distinct from `TeamMemberRow` (dashboard KPI row): this is a dense
 * management roster used in the **schedule editor** to show 3 different
 * staff groups (doctors, assistants, receptionists) with the SAME layout
 * but DIFFERENT primary metrics relevant to each contract type.
 *
 * Usage anchors:
 *  - ShiftFlow US-SF-04 (zarządzanie profilami) — manager edits roster
 *  - ShiftFlow US-SF-06 (assistant shift preference)
 *  - ShiftFlow US-SF-08 (assistant hygiene capability)
 *
 * Slot-based — domain-agnostic. Each consuming app fills slots with
 * its own data:
 *
 *   • Doctors:        primaryMetric = planned hours / target
 *                     relationLine  = "always parallel with Dr X"
 *   • Assistants:     primaryMetric = preferred shift (🌅/🌇)
 *                     metricCaption = last shift type + day
 *                     relationLine  = primary doctor / secondary
 *   • Receptionists:  primaryMetric = next shift label
 *                     tags          = role (Główna / Backup)
 *
 * Density target: ~72 px row height with all slots filled.
 *
 * Role: MANAGER ONLY. Operators (doctor / assistant / receptionist views)
 * never see other team members' roster entries.
 */
export type RosterTrend = "up" | "down" | "flat";
export type RosterEmphasis = "none" | "warning" | "selected";
/** Re-exported `BadgeTone` so consuming apps can use a single import. */
export type RosterTagTone = BadgeTone;

export interface RosterTag {
  label: string;
  tone?: RosterTagTone;
}

export interface RosterPrimaryMetric {
  /** Small label above the value, e.g. "h/mies" / "preferuje" / "zmiana" */
  label: string;
  /** The headline value — string or React node (icon/glyph) */
  value: React.ReactNode;
}

export interface RosterRelationLine {
  icon?: React.ReactNode;
  text: string;
}

export interface StaffRosterRowProps {
  /** Brand accent — affects nothing visually here (color comes from
   * accentColor), but kept for parity with other patterns. */
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Hex color from the database row (doctor/assistant/receptionist).
   * Drawn as a thin vertical bar on the left edge. */
  accentColor: string;
  name: string;
  /** Line under the name — role, specialty, available days. */
  subtitle?: string;
  /** Headline metric for this person. Always rendered on the right. */
  primaryMetric: RosterPrimaryMetric;
  /** Small caption under the metric — context for the value above. */
  metricCaption?: string;
  /** Trend arrow next to the value. */
  trend?: RosterTrend;
  /** Up to 3 badges shown under the subtitle. Extras are dropped. */
  tags?: RosterTag[];
  /** "Connection" line — partner doctor, assigned doctor, etc. */
  relationLine?: RosterRelationLine;
  /** Right-side action buttons (typically edit / delete). Click events
   * are stopped at this slot so they don't trigger the row's onClick. */
  actions?: React.ReactNode;
  /** Emphasis state — wraps the row in a colored border. Use "warning"
   * to flag attention (e.g. shift preference unmet) and "selected"
   * to mark the actively-edited row. */
  emphasis?: RosterEmphasis;
  onClick?: () => void;
  className?: string;
}

const trendGlyph: Record<RosterTrend, string> = {
  up: "↑",
  down: "↓",
  flat: "→",
};

const trendTone: Record<RosterTrend, "success" | "danger" | "neutral"> = {
  up: "success",
  down: "danger",
  flat: "neutral",
};

const emphasisRing: Record<RosterEmphasis, string> = {
  none: "border-ros-border",
  warning: "border-ros-warn-fg",
  selected: "border-ros-ink-faint bg-ros-surface-off",
};

export function StaffRosterRow({
  accentColor,
  name,
  subtitle,
  primaryMetric,
  metricCaption,
  trend,
  tags,
  relationLine,
  actions,
  emphasis = "none",
  onClick,
  className,
}: StaffRosterRowProps) {
  const visibleTags = tags?.slice(0, 3) ?? [];

  return (
    <div
      className={cn(
        "w-full flex items-stretch gap-3 p-3 rounded-input border bg-white",
        "transition-colors duration-150",
        emphasisRing[emphasis],
        onClick && "cursor-pointer hover:bg-ros-surface-hover",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {/* Accent bar */}
      <span
        aria-hidden
        className="w-1 rounded-pill flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      {/* Name + subtitle + relation + tags */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-[13px] font-medium text-ros-ink truncate">
          {name}
        </p>
        {subtitle && (
          <p className="text-[11px] text-ros-ink-muted truncate">{subtitle}</p>
        )}
        {relationLine && (
          <p className="text-[11px] text-ros-ink-faint truncate flex items-center gap-1 mt-0.5">
            {relationLine.icon}
            <span className="truncate">{relationLine.text}</span>
          </p>
        )}
        {visibleTags.length > 0 && (
          <div className="flex gap-1 mt-1 flex-wrap">
            {visibleTags.map((t, i) => (
              <Badge key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                {t.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Primary metric + trend + caption */}
      <div className="flex flex-col items-end gap-0 flex-shrink-0 min-w-[80px]">
        <span className="text-[10px] text-ros-ink-muted leading-none">
          {primaryMetric.label}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[15px] font-semibold text-ros-ink leading-tight">
            {primaryMetric.value}
          </span>
          {trend && <Badge tone={trendTone[trend]}>{trendGlyph[trend]}</Badge>}
        </div>
        {metricCaption && (
          <span className="text-[10px] text-ros-ink-faint mt-0.5 truncate max-w-[120px]">
            {metricCaption}
          </span>
        )}
      </div>

      {/* Action buttons — stop propagation so they don't trigger row onClick */}
      {actions && (
        <div
          className="flex items-center gap-1 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
