import * as React from "react";
import { cn } from "../utils/cn";
import { Badge, type BadgeTone } from "../primitives/Badge";
import { Button } from "../primitives/Button";

/**
 * WeekNavigator — toolbar for moving between weekly snapshots.
 *
 * Domain-agnostic: accepts pre-formatted labels, leaves date math to
 * the consuming app (which already has date-fns / dayjs / luxon).
 *
 * Use cases across receptionOS:
 *  - ShiftFlow: navigate between A/B-week schedules in the editor
 *  - CallFlow:  scrub through historic weekly coaching reports
 *  - ConsultFlow: weekly performance trend window
 *
 * Visual anatomy:
 *  [ ←  Pop. ]   [ 21–25.04.2026 · Tydzień A 🔒 ]   [ Nast. → ]
 *                                                        · [ Dziś ]
 *                                                        · [ + Zaplanuj ▾ ]
 *
 * The label slot (currentLabel + parityLabel + lock) is owned by the
 * caller — pass whatever date format suits the locale. Component
 * only handles layout, focus order, and the dropdown for generation
 * actions.
 */
export interface WeekGenerateAction {
  label: string;
  weeksAhead: number;
  onClick: () => void;
}

export interface WeekNavigatorProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Pre-formatted label for current week, e.g. "21–25.04.2026". */
  currentLabel: string;
  /** Optional secondary badge text, e.g. "Tydzień A" / "B". */
  parityLabel?: string;
  parityTone?: BadgeTone;
  /** When true, shows a lock glyph next to the label (historical week). */
  isReadOnly?: boolean;
  /** Disable the prev arrow (e.g. earliest week available). */
  prevDisabled?: boolean;
  /** Disable the next arrow (rare — usually next is always allowed). */
  nextDisabled?: boolean;
  /** Tooltip for the prev button — typically the previous week's label. */
  previousLabel?: string;
  /** Tooltip for the next button. */
  nextLabel?: string;
  onPrev: () => void;
  onNext: () => void;
  /** "Dziś" button — jump to current week. Hidden if not provided. */
  onToday?: () => void;
  /** Generation CTAs — typically "+1 tydzień" / "+2 tygodnie". */
  generateActions?: WeekGenerateAction[];
  className?: string;
}

export function WeekNavigator({
  brand = "callflow",
  currentLabel,
  parityLabel,
  parityTone = "neutral",
  isReadOnly = false,
  prevDisabled = false,
  nextDisabled = false,
  previousLabel,
  nextLabel,
  onPrev,
  onNext,
  onToday,
  generateActions,
  className,
}: WeekNavigatorProps) {
  const [genOpen, setGenOpen] = React.useState(false);
  const genRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!genOpen) return;
    function onDocClick(e: MouseEvent) {
      if (genRef.current && !genRef.current.contains(e.target as Node)) {
        setGenOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [genOpen]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 flex-wrap",
        className,
      )}
      role="toolbar"
      aria-label="Nawigacja tygodniowa"
    >
      {/* Prev */}
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        title={previousLabel ? `Poprzedni: ${previousLabel}` : "Poprzedni tydzień"}
        aria-label={previousLabel ? `Poprzedni tydzień: ${previousLabel}` : "Poprzedni tydzień"}
        className={cn(
          "h-8 px-2 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px]",
          "hover:bg-ros-surface-hover transition-colors",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        )}
      >
        ←
      </button>

      {/* Current week label + parity badge + lock */}
      <div
        className={cn(
          "flex items-center gap-1.5 h-8 px-3 rounded-pill border border-ros-border bg-white",
          isReadOnly && "bg-ros-surface-off",
        )}
      >
        <span className="text-[13px] font-medium text-ros-ink whitespace-nowrap">
          {currentLabel}
        </span>
        {parityLabel && <Badge tone={parityTone}>{parityLabel}</Badge>}
        {isReadOnly && (
          <span
            className="text-[11px] text-ros-ink-faint"
            title="Tydzień historyczny — tylko podgląd"
            aria-label="Tydzień historyczny"
          >
            🔒
          </span>
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        title={nextLabel ? `Następny: ${nextLabel}` : "Następny tydzień"}
        aria-label={nextLabel ? `Następny tydzień: ${nextLabel}` : "Następny tydzień"}
        className={cn(
          "h-8 px-2 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px]",
          "hover:bg-ros-surface-hover transition-colors",
          "disabled:opacity-40 disabled:cursor-not-allowed",
        )}
      >
        →
      </button>

      {/* Today */}
      {onToday && (
        <button
          type="button"
          onClick={onToday}
          className="h-8 px-3 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px] hover:bg-ros-surface-hover transition-colors"
        >
          Dziś
        </button>
      )}

      {/* Generate dropdown */}
      {generateActions && generateActions.length > 0 && (
        <div ref={genRef} className="relative ml-auto">
          <Button
            brand={brand}
            onClick={() => setGenOpen((v) => !v)}
            className="h-8 px-3 text-[12px]"
          >
            + Zaplanuj {generateActions.length > 1 && "▾"}
          </Button>
          {genOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-1 z-10 min-w-[180px] rounded-input border border-ros-border bg-white shadow-card overflow-hidden"
            >
              {generateActions.map((a) => (
                <button
                  key={`${a.label}-${a.weeksAhead}`}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    a.onClick();
                    setGenOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-[13px] text-ros-ink hover:bg-ros-surface-hover transition-colors"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
