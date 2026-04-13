import * as React from "react";
import { cn } from "../utils/cn";

/**
 * CardStack — quiz-flow card viewer. One card visible at a time,
 * full width, clean transition. No peeking, no stacking depth.
 *
 * Interaction:
 *  - Swipe left → next card (animate out left, next fades in)
 *  - Swipe right → previous card (go back)
 *  - Progress bar at top shows position
 *
 * Designed for minimal cognitive load — the user focuses on one
 * piece of information at a time.
 *
 * Usage with TranscriptDrawer:
 *   <div>
 *     <CardStack brand="consultflow">
 *       <ReportSection variant="scores" title="Wyniki">...</ReportSection>
 *       <ReportSection variant="tips" title="Wskazówki">...</ReportSection>
 *       <ReportSection variant="strength" title="Mocne strony">...</ReportSection>
 *     </CardStack>
 *     <TranscriptDrawer content={transcript} />
 *   </div>
 */

export interface CardStackProps {
  children: React.ReactNode;
  onProgress?: (currentIndex: number, total: number) => void;
  brand?: "callflow" | "consultflow" | "shiftflow";
  className?: string;
}

const brandBg: Record<NonNullable<CardStackProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

export function CardStack({
  children,
  onProgress,
  brand = "callflow",
  className,
}: CardStackProps) {
  const cards = React.Children.toArray(children);
  const total = cards.length;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dragX, setDragX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const startX = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  function handleStart(clientX: number) {
    if (animating) return;
    startX.current = clientX;
    setIsDragging(true);
  }

  function handleMove(clientX: number) {
    if (!isDragging || animating) return;
    const delta = clientX - startX.current;
    // Allow left (next) and right (prev) but with resistance at edges
    if (activeIndex === 0 && delta > 0) {
      setDragX(delta * 0.3); // resist at start
    } else if (activeIndex >= total - 1 && delta < 0) {
      setDragX(delta * 0.3); // resist at end
    } else {
      setDragX(delta);
    }
  }

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(index, total - 1));
    if (clamped === activeIndex) {
      setDragX(0);
      return;
    }
    setAnimating(true);
    const width = containerRef.current?.offsetWidth || 300;
    setDragX(clamped > activeIndex ? -width : width);
    setTimeout(() => {
      setActiveIndex(clamped);
      setDragX(0);
      setAnimating(false);
      onProgress?.(clamped, total);
    }, 200);
  }

  function handleEnd() {
    if (!isDragging || animating) return;
    setIsDragging(false);
    const width = containerRef.current?.offsetWidth || 300;
    const threshold = width * 0.25;

    if (dragX < -threshold && activeIndex < total - 1) {
      goTo(activeIndex + 1);
    } else if (dragX > threshold && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else {
      setDragX(0);
    }
  }

  const progress = ((activeIndex + 1) / total) * 100;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Progress bar */}
      {total > 1 && (
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 h-1 bg-ros-surface-hover rounded-pill overflow-hidden">
            <div
              className={cn("h-full rounded-pill transition-all duration-200", brandBg[brand])}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] text-ros-ink-faint flex-shrink-0">
            {activeIndex + 1}/{total}
          </span>
        </div>
      )}

      {/* Single card view */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => { if (isDragging) handleMove(e.clientX); }}
        onMouseUp={handleEnd}
        onMouseLeave={() => { if (isDragging) handleEnd(); }}
      >
        <div
          className={cn(
            "w-full",
            isDragging || animating ? "" : "transition-transform duration-200",
            animating && "transition-transform duration-200",
          )}
          style={{
            transform: `translateX(${dragX}px)`,
          }}
        >
          {cards[activeIndex]}
        </div>
      </div>

      {/* Swipe hint on first card */}
      {activeIndex === 0 && total > 1 && !isDragging && (
        <p className="text-center text-[11px] text-ros-ink-faint animate-pulse">
          ← przesuń, aby zobaczyć więcej
        </p>
      )}
    </div>
  );
}
