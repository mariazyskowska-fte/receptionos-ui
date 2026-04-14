import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * SidePanel — right-side panel for the manager dashboard, combining
 * a team member list (top) and an activity feed (bottom) in a single
 * sticky column.
 *
 * Visual distinction from main content:
 *  - Slightly tinted background (surface-off) instead of white
 *  - The two sections have different inner backgrounds:
 *    team list = white cards, activity feed = transparent rows
 *  - Thin separator between sections
 *
 * This replaces the raw `panel` slot in DashboardLayout with a
 * structured, opinionated component.
 *
 * Cross-app usage:
 *  - CallFlow:    team = recepcjonistki, feed = sent reports + read status
 *  - ConsultFlow: team = lekarze, feed = uploads + analysis status
 *  - ShiftFlow:   team = lekarze, feed = schedule changes + absence requests
 */

export interface SidePanelProps {
  /** Team member list (top section). */
  teamContent: React.ReactNode;
  teamTitle?: string;
  teamCount?: number;
  /** Toolbar above team list (select all, etc.). */
  teamToolbar?: React.ReactNode;
  /** Activity feed (bottom section). */
  feedContent: React.ReactNode;
  feedTitle?: string;
  /** Footer for bulk actions. */
  footer?: React.ReactNode;
  className?: string;
}

export function SidePanel({
  teamContent,
  teamTitle = "Zespół",
  teamCount,
  teamToolbar,
  feedContent,
  feedTitle = "Ostatnie zmiany",
  footer,
  className,
}: SidePanelProps) {
  return (
    <aside
      className={cn(
        "w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)]",
        "flex flex-col rounded-card border border-ros-border bg-ros-surface-off overflow-hidden",
        className,
      )}
    >
      {/* ── Team section (top) ── */}
      <div className="flex flex-col">
        {/* Team header */}
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-[13px] leading-[18px] font-semibold text-ros-ink">
              {teamTitle}
            </p>
            {teamCount != null && (
              <Badge tone="neutral">{teamCount}</Badge>
            )}
          </div>
        </div>

        {/* Toolbar */}
        {teamToolbar && (
          <div className="px-3 py-1.5 border-t border-ros-border/50">
            {teamToolbar}
          </div>
        )}

        {/* Team list — scrollable, white card background per row */}
        <div className="overflow-y-auto px-2 py-1.5 flex flex-col gap-1 max-h-[45%]">
          {teamContent}
        </div>
      </div>

      {/* ── Separator ── */}
      <div className="mx-3 border-t border-ros-ink-faint/20" />

      {/* ── Feed section (bottom) ── */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 py-2.5">
          <p className="text-[11px] leading-[14px] font-semibold text-ros-ink-muted uppercase tracking-wide">
            {feedTitle}
          </p>
        </div>

        {/* Feed rows — transparent background, compact */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-0.5">
          {feedContent}
        </div>
      </div>

      {/* ── Footer (bulk actions) ── */}
      {footer && (
        <div className="px-3 py-2.5 border-t border-ros-border bg-white">
          {footer}
        </div>
      )}
    </aside>
  );
}

/**
 * SidePanelFeedRow — single row in the activity feed section.
 * Compact, no border, transparent background — visually distinct
 * from TeamMemberRow cards above.
 */
export interface SidePanelFeedRowProps {
  /** Icon or emoji. */
  icon?: string;
  /** Primary text. */
  text: string;
  /** Secondary detail. */
  detail?: string;
  /** Timestamp. */
  timestamp?: string;
  /** Status dot color. */
  dotColor?: "green" | "orange" | "red" | "gray";
  onClick?: () => void;
  className?: string;
}

const dotColors: Record<NonNullable<SidePanelFeedRowProps["dotColor"]>, string> = {
  green: "bg-ros-success-fg",
  orange: "bg-ros-warn-fg",
  red: "bg-ros-danger-fg",
  gray: "bg-ros-ink-faint",
};

export function SidePanelFeedRow({
  icon,
  text,
  detail,
  timestamp,
  dotColor,
  onClick,
  className,
}: SidePanelFeedRowProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 px-2 py-1.5 rounded-input transition-colors duration-150",
        onClick && "cursor-pointer hover:bg-white/60",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Icon or dot */}
      <div className="flex-shrink-0 mt-0.5">
        {icon ? (
          <span className="text-[11px]">{icon}</span>
        ) : dotColor ? (
          <span className={cn("inline-block size-1.5 rounded-pill mt-1", dotColors[dotColor])} />
        ) : null}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[12px] leading-[16px] text-ros-ink truncate">{text}</p>
        {detail && (
          <p className="text-[10px] leading-[14px] text-ros-ink-faint truncate">{detail}</p>
        )}
      </div>

      {/* Timestamp */}
      {timestamp && (
        <span className="text-[10px] text-ros-ink-faint flex-shrink-0 whitespace-nowrap mt-0.5">
          {timestamp}
        </span>
      )}
    </div>
  );
}
