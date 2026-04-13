import * as React from "react";
import { cn } from "../utils/cn";

/**
 * CardStack — swipe-to-dismiss card stack for report details.
 *
 * All cards are stacked on top of each other. The top card is fully
 * visible; cards beneath peek with increasing Y offset and decreasing
 * scale, showing their left accent bar (from ReportSection).
 *
 * Swipe left on the top card → it flies off-screen, revealing the
 * next card. Progress dots update automatically.
 *
 * Touch interaction:
 *  - Drag left beyond 30% of card width → dismiss (animate out)
 *  - Drag less than 30% → snap back
 *  - No drag right (can't undo dismiss)
 *
 * The dismissed card count indicates reading progress — the doctor
 * has "reviewed" each section of the report.
 *
 * Usage:
 *   <CardStack onProgress={(index, total) => ...}>
 *     <ReportSection variant="scores" title="Wyniki">...</ReportSection>
 *     <ReportSection variant="tips" title="Na następny raz">...</ReportSection>
 *     <ReportSection variant="strength" title="Mocne strony">...</ReportSection>
 *   </CardStack>
 */

export interface CardStackProps {
  children: React.ReactNode;
  /** Called when active card changes (for tracking reading progress). */
  onProgress?: (currentIndex: number, total: number) => void;
  /** Brand accent for progress dots. */
  brand?: "callflow" | "consultflow" | "shiftflow";
  className?: string;
}

const brandDot: Record<NonNullable<CardStackProps["brand"]>, string> = {
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

  // Drag state
  const [dragX, setDragX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dismissing, setDismissing] = React.useState(false);
  const startX = React.useRef(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  function handleTouchStart(e: React.TouchEvent) {
    if (dismissing) return;
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (dismissing) return;
    startX.current = e.clientX;
    setIsDragging(true);
  }

  function handleMove(clientX: number) {
    if (!isDragging || dismissing) return;
    const delta = clientX - startX.current;
    // Only allow drag left (negative)
    setDragX(Math.min(0, delta));
  }

  function handleTouchMove(e: React.TouchEvent) {
    handleMove(e.touches[0].clientX);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!isDragging) return;
    handleMove(e.clientX);
  }

  function handleEnd() {
    if (!isDragging || dismissing) return;
    setIsDragging(false);

    const width = cardRef.current?.offsetWidth || 300;
    const threshold = width * 0.3;

    if (Math.abs(dragX) > threshold && activeIndex < total - 1) {
      // Dismiss: animate off screen
      setDismissing(true);
      setDragX(-width * 1.2);
      setTimeout(() => {
        const next = activeIndex + 1;
        setActiveIndex(next);
        setDragX(0);
        setDismissing(false);
        onProgress?.(next, total);
      }, 250);
    } else {
      // Snap back
      setDragX(0);
    }
  }

  // Reset on last card
  const isLast = activeIndex >= total - 1;
  const progress = Math.min(activeIndex + 1, total);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Card stack area */}
      <div
        className="relative"
        style={{ minHeight: 200 }}
      >
        {cards.map((card, i) => {
          if (i < activeIndex) return null; // dismissed
          const offset = i - activeIndex;
          if (offset > 3) return null; // render max 4 deep

          const isTop = offset === 0;
          const yShift = offset * 12;
          const scaleVal = 1 - offset * 0.04;
          const opacity = offset === 0 ? 1 : offset === 1 ? 0.7 : 0.4;

          return (
            <div
              key={i}
              ref={isTop ? cardRef : undefined}
              className={cn(
                "transition-transform",
                isTop
                  ? isDragging ? "duration-0" : "duration-250"
                  : "duration-300",
                isTop ? "relative z-10" : "absolute inset-x-0 top-0",
              )}
              style={{
                transform: isTop
                  ? `translateX(${dragX}px) rotate(${dragX * 0.02}deg)`
                  : `translateY(${yShift}px) scale(${scaleVal})`,
                opacity,
                zIndex: total - offset,
              }}
              // Touch events only on top card
              onTouchStart={isTop && !isLast ? handleTouchStart : undefined}
              onTouchMove={isTop ? handleTouchMove : undefined}
              onTouchEnd={isTop ? handleEnd : undefined}
              onMouseDown={isTop && !isLast ? handleMouseDown : undefined}
              onMouseMove={isTop ? handleMouseMove : undefined}
              onMouseUp={isTop ? handleEnd : undefined}
              onMouseLeave={isTop && isDragging ? handleEnd : undefined}
            >
              {card}
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {cards.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-pill transition-all duration-200",
                  i < activeIndex
                    ? cn("w-4 h-1.5", brandDot[brand], "opacity-40")
                    : i === activeIndex
                      ? cn("w-6 h-1.5", brandDot[brand])
                      : "w-1.5 h-1.5 bg-ros-ink-faint/30",
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-ros-ink-faint">
            {progress}/{total}
          </span>
        </div>
      )}
    </div>
  );
}
