import * as React from "react";
import { cn } from "../utils/cn";

/**
 * CardStack — vertical stack of cards with peek effect and swipe-to-
 * dismiss interaction. Cards are stacked with a slight vertical offset
 * revealing the color accent of cards beneath.
 *
 * Two modes:
 *  - "peek" (default): all cards visible in a scrollable list with
 *    stacking depth illusion (shadow + slight scale on inactive cards)
 *  - "single": one card at a time, swipe up to reveal next
 *
 * For mobile report details: the doctor sees the top card (scores),
 * swipes up to see tips, then strengths, etc. Each card's left
 * accent bar peeks from beneath, hinting at the stack depth and
 * type of content below.
 *
 * Usage:
 *   <CardStack>
 *     <ReportSection variant="scores" title="Wyniki">...</ReportSection>
 *     <ReportSection variant="tips" title="Na następny raz">...</ReportSection>
 *     <ReportSection variant="strength" title="Mocne strony">...</ReportSection>
 *     <ReportSection variant="improve" title="Do poprawy">...</ReportSection>
 *     <ReportSection variant="transcript" title="Transkrypcja">...</ReportSection>
 *   </CardStack>
 */

export interface CardStackProps {
  /** Cards to stack (ReportSection components). */
  children: React.ReactNode;
  /** Visual mode. */
  mode?: "peek" | "single";
  className?: string;
}

export function CardStack({
  children,
  mode = "peek",
  className,
}: CardStackProps) {
  const cards = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (mode === "single") {
    return (
      <div className={cn("relative", className)}>
        {/* Stack depth indicators */}
        <div className="relative">
          {cards.map((card, i) => {
            if (i < activeIndex) return null; // already dismissed
            const offset = i - activeIndex;
            if (offset > 2) return null; // only show 3 deep

            return (
              <div
                key={i}
                className={cn(
                  "transition-all duration-300",
                  offset === 0
                    ? "relative z-10"
                    : "absolute inset-x-0 top-0 z-0",
                )}
                style={{
                  transform: offset > 0
                    ? `translateY(${offset * 8}px) scale(${1 - offset * 0.03})`
                    : undefined,
                  opacity: offset > 0 ? 0.6 : 1,
                }}
              >
                {card}
              </div>
            );
          })}
        </div>

        {/* Navigation dots */}
        {cards.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-3">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "rounded-pill transition-all duration-200 border-none cursor-pointer p-0",
                  i === activeIndex
                    ? "w-4 h-1.5 bg-ros-ink-medium"
                    : "w-1.5 h-1.5 bg-ros-ink-faint/40",
                )}
                aria-label={`Karta ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── Peek mode: scrollable stack with visual depth ──
  return (
    <div className={cn("flex flex-col", className)}>
      {cards.map((card, i) => (
        <div
          key={i}
          className={cn(
            "transition-all duration-200",
            // Negative margin to create overlap/peek effect
            i > 0 && "-mt-2",
          )}
          style={{
            // Subtle z-index stacking so later cards overlap earlier
            zIndex: cards.length - i,
          }}
        >
          {card}
        </div>
      ))}
    </div>
  );
}
