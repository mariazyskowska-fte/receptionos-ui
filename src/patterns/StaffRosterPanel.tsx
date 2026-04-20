import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

/**
 * StaffRosterPanel — wrapper around a list of `StaffRosterRow`s.
 *
 * Provides the consistent header (title + count + primary action),
 * a search/filter strip, and a footer for aggregate stats. Used in
 * the schedule-editor view to render three identical-looking panels
 * for doctors, assistants, and receptionists — manager learns one
 * mental model and reads three lists without context switching.
 *
 * Empty-state contract: when `children` is empty AND `emptyState` is
 * provided, the empty state is rendered in place of the list. Never
 * render an empty box (gherkin-enforced cross-app rule, see
 * EmptyState.tsx).
 */
export interface RosterFilter {
  label: string;
  active: boolean;
  onToggle: () => void;
}

/**
 * `comfortable` — full panel for the main schedule editor column.
 * `compact`     — narrower spacing for use inside a side panel:
 *                 smaller header, no search/filter toolbar by default,
 *                 footer collapsed to a single line. Pair with
 *                 `density="compact"` on each `StaffRosterRow`.
 */
export type RosterPanelDensity = "comfortable" | "compact";

export interface StaffRosterPanelProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** "Lekarze" / "Asystentki" / "Recepcjonistki" (or app-specific). */
  title: string;
  /** Total count shown next to the title — usually the unfiltered total. */
  count: number;
  /** Toggleable filter chips above the list. */
  filters?: RosterFilter[];
  /** Search input value. Omit `onSearchChange` to hide the search field. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Primary CTA in the header — typically "+ Dodaj". */
  primaryAction?: { label: string; onClick: () => void };
  /** Aggregate stats line below the list. Plain text — no Card wrapper. */
  footer?: React.ReactNode;
  /** Rendered when `children` is empty. Pass an `<EmptyState />`. */
  emptyState?: React.ReactNode;
  /** Visual density. `compact` is intended for sidebar usage. */
  density?: RosterPanelDensity;
  children: React.ReactNode;
  className?: string;
}

const brandFocusRing: Record<
  NonNullable<StaffRosterPanelProps["brand"]>,
  string
> = {
  callflow: "focus:border-brand-callflow",
  consultflow: "focus:border-brand-consultflow",
  shiftflow: "focus:border-brand-shiftflow",
};

export function StaffRosterPanel({
  brand = "callflow",
  title,
  count,
  filters,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Szukaj…",
  primaryAction,
  footer,
  emptyState,
  density = "comfortable",
  children,
  className,
}: StaffRosterPanelProps) {
  const isCompact = density === "compact";
  const childCount = React.Children.count(children);
  const isEmpty = childCount === 0;
  const showToolbar = Boolean(onSearchChange) || (filters && filters.length > 0);

  return (
    <section
      className={cn(
        "flex flex-col",
        isCompact ? "gap-2" : "gap-3",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            "font-semibold text-ros-ink",
            isCompact ? "text-[12px] uppercase tracking-wide" : "text-[14px]",
          )}
        >
          {title}
          <span className="text-ros-ink-faint font-normal"> · {count}</span>
        </h2>
        {primaryAction && (
          <Button
            brand={brand}
            onClick={primaryAction.onClick}
            className={
              isCompact
                ? "h-7 px-2 text-[11px]"
                : "h-9 px-3 text-[13px]"
            }
          >
            + {primaryAction.label}
          </Button>
        )}
      </header>

      {showToolbar && (
        <div className="flex gap-2 items-center flex-wrap">
          {onSearchChange && (
            <input
              type="search"
              value={searchValue ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className={cn(
                "flex-1 min-w-[140px] bg-white rounded-input border border-ros-border-input shadow-subtle text-ros-ink outline-none transition-colors",
                isCompact
                  ? "h-7 px-2 text-[11px]"
                  : "h-9 px-3 text-[13px]",
                brandFocusRing[brand],
              )}
            />
          )}
          {filters?.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={f.onToggle}
              className={cn(
                "rounded-pill border transition-colors",
                isCompact
                  ? "px-2 py-0.5 text-[10px]"
                  : "px-3 py-1.5 text-[11px]",
                f.active
                  ? "bg-ros-ink text-white border-ros-ink"
                  : "bg-white text-ros-ink-muted border-ros-border hover:bg-ros-surface-hover",
              )}
              aria-pressed={f.active}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className={cn("flex flex-col", isCompact ? "gap-1" : "gap-2")}>
        {isEmpty && emptyState ? emptyState : children}
      </div>

      {footer && (
        <footer
          className={cn(
            "text-ros-ink-muted pt-2 border-t border-ros-border",
            isCompact ? "text-[10px]" : "text-[11px]",
          )}
        >
          {footer}
        </footer>
      )}
    </section>
  );
}
