import * as React from "react";
import { cn } from "../utils/cn";
import { Badge } from "../primitives/Badge";

/**
 * SidePanel — right-side panel for the manager dashboard.
 *
 * Fixed height, fixed 60/40 split between team and feed.
 * Both sections scroll independently.
 *
 * Feed rows should use the shared <FeedRow> component.
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
      {/* Team section (60%) */}
      <div className="flex flex-col flex-[6] min-h-0">
        <div className="px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <p className="text-[13px] font-semibold text-ros-ink">{teamTitle}</p>
          {teamCount != null && (
            <span className="text-[11px] text-ros-ink-faint">{teamCount}</span>
          )}
        </div>
        {teamToolbar && (
          <div className="px-3 py-1 flex-shrink-0">{teamToolbar}</div>
        )}
        <div className="flex-1 overflow-y-auto px-2 py-1 flex flex-col gap-1">
          {teamContent}
        </div>
      </div>

      {/* Separator */}
      <div className="mx-4 border-t border-ros-ink-faint/15 flex-shrink-0" />

      {/* Feed section (40%) */}
      <div className="flex flex-col flex-[4] min-h-0">
        <div className="px-4 py-2 flex-shrink-0">
          <p className="text-[10px] font-semibold text-ros-ink-faint uppercase tracking-widest">
            {feedTitle}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-1 pb-1 flex flex-col">
          {feedContent}
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-3 py-2 border-t border-ros-border bg-white flex-shrink-0">
          {footer}
        </div>
      )}
    </aside>
  );
}

