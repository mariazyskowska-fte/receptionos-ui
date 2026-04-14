import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

/**
 * DashboardLayout — two-column manager dashboard.
 *
 * Two ways to provide the right panel:
 *
 * 1. `sidePanel` (recommended) — pass a <SidePanel> component directly.
 *    It handles its own chrome (team list + feed + footer).
 *
 *   ┌──────────────────────────────┬──────────────────┐
 *   │  MAIN (flex-1)              │  Zespół (3)       │
 *   │  DashboardHeader            │  ┌ Anna    82% ┐ │
 *   │  TrendChart                 │  ┌ Kasia   65% ┐ │
 *   │  TeamHeatmap                │  ────────────── │
 *   │                             │  Ostatnie zmiany │
 *   │                             │  📄 Raport...    │
 *   │                             │  📅 Grafik...    │
 *   │                             │  [Wyślij (2)]    │
 *   └──────────────────────────────┴──────────────────┘
 *
 * 2. `panel` (legacy) — raw content wrapped in a default aside.
 */
export interface DashboardLayoutProps {
  children: React.ReactNode;
  /** Preferred: pass a <SidePanel> component. */
  sidePanel?: React.ReactNode;
  /** Legacy: raw panel content (wrapped in default aside). */
  panel?: React.ReactNode;
  panelTitle?: string;
  panelToolbar?: React.ReactNode;
  panelFooter?: React.ReactNode;
  className?: string;
}

export function DashboardLayout({
  children,
  sidePanel,
  panel,
  panelTitle = "Zespół",
  panelToolbar,
  panelFooter,
  className,
}: DashboardLayoutProps) {
  return (
    <div className={cn("flex gap-6 items-start", className)}>
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        {children}
      </div>

      {/* Right panel — SidePanel or legacy wrapper */}
      {sidePanel || (
        <aside className="w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-ros-border flex items-center justify-between">
            <p className="text-[14px] leading-[20px] font-semibold text-ros-ink">
              {panelTitle}
            </p>
          </div>
          {panelToolbar && (
            <div className="px-3 py-2 border-b border-ros-border bg-ros-surface-off">
              {panelToolbar}
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
            {panel}
          </div>
          {panelFooter && (
            <div className="px-3 py-2.5 border-t border-ros-border bg-white">
              {panelFooter}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

/**
 * TeamPanelToolbar — helper for the panel toolbar slot.
 * Provides select all toggle + selected count.
 */
export interface TeamPanelToolbarProps {
  totalCount: number;
  selectedCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function TeamPanelToolbar({
  totalCount,
  selectedCount,
  onSelectAll,
  onDeselectAll,
}: TeamPanelToolbarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0;
  return (
    <div className="flex items-center justify-between">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={allSelected ? onDeselectAll : onSelectAll}
          className="size-3.5 rounded-sm border-ros-border accent-current cursor-pointer"
        />
        <span className="text-[12px] text-ros-ink-muted">
          {selectedCount > 0
            ? `${selectedCount} z ${totalCount}`
            : `Zaznacz wszystko`}
        </span>
      </label>
    </div>
  );
}

/**
 * TeamPanelFooter — helper for the panel footer slot.
 * Shows bulk action button when items are selected.
 */
export interface TeamPanelFooterProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  selectedCount: number;
  /** Action label, e.g. "Wyślij grafik" or "Wyślij raport". */
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
}

export function TeamPanelFooter({
  brand = "callflow",
  selectedCount,
  actionLabel,
  onAction,
  disabled,
}: TeamPanelFooterProps) {
  if (selectedCount === 0) return null;
  return (
    <Button
      brand={brand}
      onClick={onAction}
      disabled={disabled}
      className="w-full"
    >
      {actionLabel} ({selectedCount})
    </Button>
  );
}
