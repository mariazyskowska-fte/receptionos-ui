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
/**
 * `comfortable` — full row used in the main schedule editor column.
 * `compact`     — narrower tile used inside a side panel (~320–384 px):
 *                 smaller padding/font, no relation line, max 2 tags,
 *                 metric trend hidden. Same data, denser presentation.
 */
export type RosterDensity = "comfortable" | "compact";

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
  /** Visual density. Default `comfortable`. Use `compact` inside a
   * side panel — drops relationLine + trend, caps tags at 2, shrinks
   * padding and typography. */
  density?: RosterDensity;
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
  density = "comfortable",
  onClick,
  className,
}: StaffRosterRowProps) {
  const isCompact = density === "compact";
  const visibleTags = (tags ?? []).slice(0, isCompact ? 2 : 3);

  return (
    <div
      className={cn(
        "w-full flex items-stretch rounded-input border bg-white",
        "transition-colors duration-150",
        isCompact ? "gap-2 p-2" : "gap-3 p-3",
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
        <p
          className={cn(
            "font-medium text-ros-ink truncate",
            isCompact ? "text-[12px]" : "text-[13px]",
          )}
        >
          {name}
        </p>
        {subtitle && (
          <p
            className={cn(
              "text-ros-ink-muted truncate",
              isCompact ? "text-[10px]" : "text-[11px]",
            )}
          >
            {subtitle}
          </p>
        )}
        {/* Relation line dropped in compact — too noisy in narrow column */}
        {!isCompact && relationLine && (
          <p className="text-[11px] text-ros-ink-faint truncate flex items-center gap-1 mt-0.5">
            {relationLine.icon}
            <span className="truncate">{relationLine.text}</span>
          </p>
        )}
        {visibleTags.length > 0 && (
          <div className={cn("flex gap-1 flex-wrap", isCompact ? "mt-0.5" : "mt-1")}>
            {visibleTags.map((t, i) => (
              <Badge key={`${t.label}-${i}`} tone={t.tone ?? "neutral"}>
                {t.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Primary metric + (in comfortable) trend + caption */}
      <div
        className={cn(
          "flex flex-col items-end gap-0 flex-shrink-0",
          isCompact ? "min-w-[56px]" : "min-w-[80px]",
        )}
      >
        <span className="text-[10px] text-ros-ink-muted leading-none">
          {primaryMetric.label}
        </span>
        <div className="flex items-center gap-1 mt-0.5">
          <span
            className={cn(
              "font-semibold text-ros-ink leading-tight",
              isCompact ? "text-[13px]" : "text-[15px]",
            )}
          >
            {primaryMetric.value}
          </span>
          {/* Trend dropped in compact — saves a column of width */}
          {!isCompact && trend && (
            <Badge tone={trendTone[trend]}>{trendGlyph[trend]}</Badge>
          )}
        </div>
        {metricCaption && (
          <span
            className={cn(
              "text-[10px] text-ros-ink-faint mt-0.5 truncate",
              isCompact ? "max-w-[80px]" : "max-w-[120px]",
            )}
          >
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
