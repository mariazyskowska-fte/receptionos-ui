import * as React from "react";
import { cn } from "../utils/cn";

/**
 * CardStack — swipe-to-dismiss card stack for report details.
 *
 * Cards have fixed width (100% of container) and fixed shape.
 * No scaling — all cards are the same size. Cards beneath the top
 * one peek with a small Y offset showing their accent color bar.
 *
 * Swipe left → dismiss top card, reveal next.
 * Progress dots track reading progress.
 *
 * Transcript is NOT part of this stack — use TranscriptDrawer
 * separately as a bottom sheet.
 */

export interface CardStackProps {
  children: React.ReactNode;
  /** Called when active card changes. */
  onProgress?: (currentIndex: number, total: number) => void;
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
  const [dragX, setDragX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dismissing, setDismissing] = React.useState(false);
  const startX = React.useRef(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  function handleStart(clientX: number) {
    if (dismissing || activeIndex >= total - 1) return;
    startX.current = clientX;
    setIsDragging(true);
  }

  function handleMove(clientX: number) {
    if (!isDragging || dismissing) return;
    setDragX(Math.min(0, clientX - startX.current));
  }

  function handleEnd() {
    if (!isDragging || dismissing) return;
    setIsDragging(false);
    const width = containerRef.current?.offsetWidth || 300;

    if (Math.abs(dragX) > width * 0.3 && activeIndex < total - 1) {
      setDismissing(true);
      setDragX(-width * 1.2);
      setTimeout(() => {
        const next = activeIndex + 1;
        setActiveIndex(next);
        setDragX(0);
        setDismissing(false);
        onProgress?.(next, total);
      }, 200);
    } else {
      setDragX(0);
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Stack container — fixed width from parent */}
      <div ref={containerRef} className="relative w-full overflow-hidden" style={{ minHeight: 180 }}>
        {cards.map((card, i) => {
          if (i < activeIndex) return null;
          const offset = i - activeIndex;
          if (offset > 3) return null;

          const isTop = offset === 0;
          const isLast = activeIndex >= total - 1;
          // Fixed size — only Y offset for peeking, no scale
          const yShift = offset * 8;

          return (
            <div
              key={i}
              className={cn(
                "w-full",
                isTop
                  ? cn("relative z-10", isDragging ? "" : "transition-transform duration-200")
                  : "absolute inset-x-0 top-0 transition-all duration-300",
              )}
              style={{
                transform: isTop
                  ? `translateX(${dragX}px) rotate(${dragX * 0.015}deg)`
                  : `translateY(${yShift}px)`,
                opacity: isTop ? 1 : 1 - offset * 0.15,
                zIndex: total - offset,
              }}
              onTouchStart={isTop && !isLast ? (e) => handleStart(e.touches[0].clientX) : undefined}
              onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : undefined}
              onTouchEnd={isTop ? handleEnd : undefined}
              onMouseDown={isTop && !isLast ? (e) => handleStart(e.clientX) : undefined}
              onMouseMove={isTop && isDragging ? (e) => handleMove(e.clientX) : undefined}
              onMouseUp={isTop ? handleEnd : undefined}
              onMouseLeave={isTop && isDragging ? handleEnd : undefined}
            >
              {card}
            </div>
          );
        })}
      </div>

      {/* Progress */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5">
            {cards.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-pill transition-all duration-200",
                  i < activeIndex
                    ? cn("w-4", brandDot[brand], "opacity-30")
                    : i === activeIndex
                      ? cn("w-6", brandDot[brand])
                      : "w-1.5 bg-ros-ink-faint/30",
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-ros-ink-faint">
            {Math.min(activeIndex + 1, total)}/{total}
          </span>
        </div>
      )}
    </div>
  );
}
