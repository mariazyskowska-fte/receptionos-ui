import * as React from "react";
import { cn } from "../utils/cn";

/**
 * FeedRow — single row for any activity/event feed. Unified component
 * replacing the previous SidePanelFeedRow, ImportActivityRow, and
 * inline ActivityLog rows.
 *
 * Minimal: colored dot + text + optional detail + timestamp.
 * Used in: SidePanel feed, ImportPageLayout panel, ActivityLog.
 */

export type FeedDotColor = "green" | "orange" | "red" | "gray" | "blue" | "purple";

export interface FeedRowProps {
  /** Primary text (one line, truncated). */
  text: string;
  /** Secondary detail (smaller, optional). */
  detail?: string;
  /** Timestamp string. */
  timestamp?: string;
  /** Dot color. Maps to design system status colors. */
  dot?: FeedDotColor;
  /** Clickable row. */
  onClick?: () => void;
  /** Compact mode: smaller text, less padding. Used in SidePanel feed. */
  compact?: boolean;
  className?: string;
}

const dotColors: Record<FeedDotColor, string> = {
  green: "bg-ros-success-fg",
  orange: "bg-ros-warn-fg",
  red: "bg-ros-danger-fg",
  gray: "bg-ros-ink-faint",
  blue: "bg-brand-callflow",
  purple: "bg-brand-consultflow",
};

export function FeedRow({
  text,
  detail,
  timestamp,
  dot = "gray",
  onClick,
  compact = false,
  className,
}: FeedRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm transition-colors duration-150",
        compact ? "px-2 py-1" : "px-2.5 py-1.5",
        onClick && "cursor-pointer hover:bg-white/50",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className={cn("size-1.5 rounded-pill flex-shrink-0", dotColors[dot])} />
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-ros-ink-muted truncate",
          compact ? "text-[11px] leading-[15px]" : "text-[12px] leading-[16px]",
        )}>
          {text}
        </p>
        {detail && !compact && (
          <p className="text-[10px] leading-[14px] text-ros-ink-faint truncate">
            {detail}
          </p>
        )}
      </div>
      {timestamp && (
        <span className={cn(
          "text-ros-ink-faint flex-shrink-0",
          compact ? "text-[10px]" : "text-[11px]",
        )}>
          {timestamp}
        </span>
      )}
    </div>
  );
}
