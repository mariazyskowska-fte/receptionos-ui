import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * SidePanel — right-side panel for the manager dashboard.
 *
 * Fixed height (fills viewport minus header). Two sections with
 * fixed proportions: team list takes 60%, feed takes 40%.
 * Both scroll independently within their allocated space.
 *
 * Visual cues:
 *  - Panel background: surface-off (subtle gray, distinct from main)
 *  - Team rows: white card background (elevated from panel bg)
 *  - Feed rows: no background, smaller text (secondary info)
 *  - Permanent separator between sections
 *
 * Design principle: comfort over density. Each element shows only
 * the essential — name, one metric, one status indicator. No
 * information overload.
 */

export interface SidePanelProps {
  teamContent: React.ReactNode;
  teamTitle?: string;
  teamCount?: number;
  teamToolbar?: React.ReactNode;
  feedContent: React.ReactNode;
  feedTitle?: string;
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
        "w-[384px] min-w-[384px] flex-shrink-0",
        "sticky top-[80px] h-[calc(100vh-96px)]",
        "flex flex-col rounded-card border border-ros-border bg-ros-surface-off overflow-hidden",
        className,
      )}
    >
      {/* ── Team section (top, 60%) ── */}
      <div className="flex flex-col flex-[6] min-h-0">
        {/* Header */}
        <div className="px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <p className="text-[13px] font-semibold text-ros-ink">{teamTitle}</p>
          {teamCount != null && (
            <span className="text-[11px] text-ros-ink-faint">{teamCount}</span>
          )}
        </div>

        {/* Toolbar */}
        {teamToolbar && (
          <div className="px-3 py-1 flex-shrink-0">
            {teamToolbar}
          </div>
        )}

        {/* Team list — scrollable */}
        <div className="flex-1 overflow-y-auto px-2 py-1 flex flex-col gap-1">
          {teamContent}
        </div>
      </div>

      {/* ── Fixed separator ── */}
      <div className="mx-4 border-t border-ros-ink-faint/15 flex-shrink-0" />

      {/* ── Feed section (bottom, 40%) ── */}
      <div className="flex flex-col flex-[4] min-h-0">
        <div className="px-4 py-2 flex-shrink-0">
          <p className="text-[10px] font-semibold text-ros-ink-faint uppercase tracking-widest">
            {feedTitle}
          </p>
        </div>

        {/* Feed rows — scrollable */}
        <div className="flex-1 overflow-y-auto px-2 pb-1 flex flex-col">
          {feedContent}
        </div>
      </div>

      {/* ── Footer ── */}
      {footer && (
        <div className="px-3 py-2 border-t border-ros-border bg-white flex-shrink-0">
          {footer}
        </div>
      )}
    </aside>
  );
}

/**
 * SidePanelFeedRow — minimal feed entry. Small text, no borders,
 * just a dot + one line + timestamp. Reads like a log, not a card.
 */
export interface SidePanelFeedRowProps {
  text: string;
  timestamp?: string;
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
  text,
  timestamp,
  dotColor = "gray",
  onClick,
  className,
}: SidePanelFeedRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1 rounded-sm",
        onClick && "cursor-pointer hover:bg-white/50",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className={cn("size-1.5 rounded-pill flex-shrink-0", dotColors[dotColor])} />
      <p className="flex-1 text-[11px] leading-[15px] text-ros-ink-muted truncate">{text}</p>
      {timestamp && (
        <span className="text-[10px] text-ros-ink-faint flex-shrink-0">{timestamp}</span>
      )}
    </div>
  );
}
