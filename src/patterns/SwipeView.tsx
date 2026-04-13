import * as React from "react";
import { cn } from "../utils/cn";

/**
 * SwipeView — horizontal scroll-snap container for mobile-first
 * layouts. Each child is a full-width "page" that snaps into view.
 *
 * Used for the "timeline" metaphor:
 *   ← past (historia) | present (raporty) | future (upload) →
 *
 * Cross-app usage:
 *  - ConsultFlow: doctor's mobile view (PerformanceOverview ← ReportList → Upload)
 *  - CallFlow:    potential mobile receptionist view
 *  - ShiftFlow:   potential mobile doctor schedule view
 *
 * The component renders:
 *  - A dot indicator showing which page is active
 *  - Optional labels above each dot
 *  - CSS scroll-snap for native touch swiping
 */

export interface SwipeViewPage {
  /** Unique key. */
  key: string;
  /** Short label shown in the dot indicator (e.g. "Historia", "Raporty", "Upload"). */
  label: string;
  /** Page content. */
  content: React.ReactNode;
}

export interface SwipeViewProps {
  pages: SwipeViewPage[];
  /** Index of the initially visible page (default: 0). */
  initialPage?: number;
  /** Called when the active page changes. */
  onPageChange?: (key: string, index: number) => void;
  /** Brand accent for the active dot. */
  brand?: "callflow" | "consultflow" | "shiftflow";
  className?: string;
}

const brandDot: Record<NonNullable<SwipeViewProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

export function SwipeView({
  pages,
  initialPage = 0,
  onPageChange,
  brand = "callflow",
  className,
}: SwipeViewProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(initialPage);

  // Scroll to initial page on mount
  React.useEffect(() => {
    if (scrollRef.current && initialPage > 0) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft = width * initialPage;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Track scroll position to update active dot
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!el) return;
        const width = el.offsetWidth;
        const index = Math.round(el.scrollLeft / width);
        const clamped = Math.max(0, Math.min(index, pages.length - 1));
        setActiveIndex((prev) => {
          if (prev !== clamped) {
            onPageChange?.(pages[clamped].key, clamped);
          }
          return clamped;
        });
        ticking = false;
      });
    }

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [pages, onPageChange]);

  function scrollToPage(index: number) {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Dot indicator */}
      <div className="flex items-center justify-center gap-4 py-3 px-4">
        {pages.map((page, i) => (
          <button
            key={page.key}
            type="button"
            onClick={() => scrollToPage(i)}
            className="flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer p-0"
            aria-label={page.label}
          >
            <span
              className={cn(
                "text-[11px] leading-[14px] font-medium transition-colors duration-150",
                i === activeIndex ? "text-ros-ink" : "text-ros-ink-faint",
              )}
            >
              {page.label}
            </span>
            <div
              className={cn(
                "h-1.5 rounded-pill transition-all duration-200",
                i === activeIndex
                  ? cn("w-6", brandDot[brand])
                  : "w-1.5 bg-ros-ink-faint/40",
              )}
            />
          </button>
        ))}
      </div>

      {/* Scrollable pages */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
      >
        {pages.map((page) => (
          <div
            key={page.key}
            className="w-full flex-shrink-0 snap-center"
          >
            {page.content}
          </div>
        ))}
      </div>
    </div>
  );
}
