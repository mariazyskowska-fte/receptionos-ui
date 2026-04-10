import * as React from "react";
import { cn } from "../utils/cn";

/**
 * DashboardLayout — two-column manager dashboard following the locked
 * layout spec from `UI/design-system-audit/01-layout.md`:
 *
 *   ┌──────────────────────────────┬─────────────────┐
 *   │  MAIN (flex-1)              │  PANEL (384px)   │
 *   │  DashboardHeader            │  "Zespół"        │
 *   │  TrendChart                 │  TeamMemberRow   │
 *   │  TeamHeatmap (compact)      │  TeamMemberRow   │
 *   │                             │  TeamMemberRow   │
 *   │                             │  ...scrollable   │
 *   └──────────────────────────────┴─────────────────┘
 *
 * The right panel is fixed-width, scrollable independently, and holds
 * the team member list. This keeps the list always visible while the
 * manager reviews charts and heatmaps on the left.
 *
 * Role: MANAGER ONLY.
 */
export interface DashboardLayoutProps {
  /** Main content: DashboardHeader, TrendChart, TeamHeatmap, etc. */
  children: React.ReactNode;
  /** Right panel content: TeamMemberRow list. */
  panel: React.ReactNode;
  /** Optional panel header (defaults to "Zespół"). */
  panelTitle?: string;
  className?: string;
}

export function DashboardLayout({
  children,
  panel,
  panelTitle = "Zespół",
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex gap-6 items-start", className)}>
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {children}
      </div>

      {/* Right panel — team list */}
      <aside className="w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-ros-border">
          <p className="text-[14px] leading-[20px] font-semibold text-ros-ink">
            {panelTitle}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {panel}
        </div>
      </aside>
    </div>
  );
}
