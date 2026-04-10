import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * ActivityLog — chronological timeline of events for a team member,
 * shown inside MemberDetailView.
 *
 * Cross-app usage:
 *  - ShiftFlow: schedule deliveries, AI suggestions, days off requests
 *    (US-SF-02 sc.1 "grafik gotowy", US-SF-03 sc.1 "zgłasza nieobecność",
 *     US-SF-03 sc.2 "zaktualizował preferencje")
 *  - CallFlow: report generations, feedback given, coaching sessions
 *    (US-CF-02 sc.1 "raport gotowy", US-CF-04 sc.2 "omówiona")
 *  - ConsultFlow: consultation uploads, report deliveries, coaching notes
 *    (US-CO-02 sc.1 "raport gotowy", US-CO-05 sc.3 "notatka coachingowa")
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
  /** Short description, e.g. "Wysłano grafik na tydzień 14–18 kwi". */
  text: string;
  /** ISO timestamp or display string. */
  timestamp: string;
  /** Optional extra detail shown below the text. */
  detail?: string;
  /** Custom icon label override. */
  iconLabel?: string;
}

export interface ActivityLogProps {
  entries: ActivityEntry[];
  /** Max entries to show before "Pokaż więcej". 0 = show all. */
  maxVisible?: number;
  className?: string;
}

const typeConfig: Record<
  ActivityType,
  { icon: string; tone: "success" | "warn" | "danger" | "neutral" }
> = {
  report_sent: { icon: "📄", tone: "success" },
  report_viewed: { icon: "👁", tone: "success" },
  schedule_sent: { icon: "📅", tone: "success" },
  schedule_confirmed: { icon: "✓", tone: "success" },
  absence: { icon: "✕", tone: "danger" },
  preference_change: { icon: "⚙", tone: "neutral" },
  coaching_note: { icon: "✎", tone: "neutral" },
  suggestion: { icon: "💡", tone: "warn" },
  feedback: { icon: "↩", tone: "neutral" },
  custom: { icon: "•", tone: "neutral" },
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

      <div className="flex flex-col">
        {visible.map((entry, i) => {
          const cfg = typeConfig[entry.type];
          const isLast = i === visible.length - 1;
          return (
            <div
              key={i}
              className={cn(
                "flex gap-3 px-4 py-2.5",
                !isLast && "border-b border-ros-border",
              )}
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center pt-0.5 flex-shrink-0">
                <span className="text-[12px] leading-none">
                  {entry.iconLabel ?? cfg.icon}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] leading-[18px] text-ros-ink">
                    {entry.text}
                  </p>
                  <span className="text-[11px] text-ros-ink-faint flex-shrink-0 whitespace-nowrap">
                    {entry.timestamp}
                  </span>
                </div>
                {entry.detail && (
                  <p className="text-[12px] leading-[16px] text-ros-ink-muted mt-0.5">
                    {entry.detail}
                  </p>
                )}
              </div>
            </div>
          );
        })}
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
