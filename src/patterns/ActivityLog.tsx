import * as React from "react";
import { cn } from "../utils/cn";
import { FeedRow, type FeedDotColor } from "./FeedRow";

/**
 * ActivityLog — chronological timeline of events, shown inside
 * MemberDetailView or as a standalone history section.
 *
 * Uses FeedRow internally for each entry. This component adds
 * the card wrapper, header, and expand/collapse logic.
 */

export type ActivityType =
  | "report_sent"
  | "report_viewed"
  | "schedule_sent"
  | "schedule_confirmed"
  | "absence"
  | "preference_change"
  | "coaching_note"
  | "suggestion"
  | "feedback"
  | "custom";

export interface ActivityEntry {
  type: ActivityType;
  text: string;
  timestamp: string;
  detail?: string;
  /** @deprecated Use FeedRow directly if you need custom icons. */
  iconLabel?: string;
}

export interface ActivityLogProps {
  entries: ActivityEntry[];
  maxVisible?: number;
  className?: string;
}

const typeToDot: Record<ActivityType, FeedDotColor> = {
  report_sent: "green",
  report_viewed: "green",
  schedule_sent: "green",
  schedule_confirmed: "green",
  absence: "red",
  preference_change: "gray",
  coaching_note: "gray",
  suggestion: "orange",
  feedback: "blue",
  custom: "gray",
};

export function ActivityLog({
  entries,
  maxVisible = 10,
  className,
}: ActivityLogProps) {
  const [expanded, setExpanded] = React.useState(false);

  const visible =
    maxVisible > 0 && !expanded ? entries.slice(0, maxVisible) : entries;
  const hasMore = maxVisible > 0 && entries.length > maxVisible;

  if (entries.length === 0) {
    return (
      <div className={cn("rounded-card border border-ros-border bg-white p-4", className)}>
        <p className="text-[12px] text-ros-ink-muted text-center py-4">
          Brak aktywności
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className,
      )}
    >
      <div className="px-4 py-3 border-b border-ros-border">
        <p className="text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide">
          Historia
        </p>
      </div>

      <div className="flex flex-col py-1">
        {visible.map((entry, i) => (
          <FeedRow
            key={i}
            text={entry.text}
            detail={entry.detail}
            timestamp={entry.timestamp}
            dot={typeToDot[entry.type]}
          />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="px-4 py-2 text-[12px] font-medium text-ros-ink-muted hover:text-ros-ink border-t border-ros-border bg-transparent cursor-pointer transition-colors duration-150"
        >
          {expanded
            ? "Pokaż mniej"
            : `Pokaż więcej (${entries.length - maxVisible})`}
        </button>
      )}
    </div>
  );
}
