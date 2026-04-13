import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

/**
 * TranscriptDrawer — bottom sheet for transcript text, always
 * accessible from the report detail view.
 *
 * Sits at the bottom of the screen as a collapsed bar showing
 * "Transkrypcja ▲". Tap or drag up to expand and reveal the
 * full scrollable transcript text. Tap the bar again or drag
 * down to collapse.
 *
 * Separate from CardStack so the transcript is accessible at
 * any point during report review, regardless of which card is
 * currently on top.
 */

export interface TranscriptDrawerProps {
  /** Transcript text content. */
  content: string;
  /** Called when user copies transcript. */
  onCopy?: () => void;
  /** Label for collapsed state. */
  label?: string;
  className?: string;
}

export function TranscriptDrawer({
  content,
  onCopy,
  label = "Transkrypcja",
  className,
}: TranscriptDrawerProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [dragY, setDragY] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startY = React.useRef(0);

  if (!content) return null;

  function handleStart(clientY: number) {
    startY.current = clientY;
    setIsDragging(true);
  }

  function handleMove(clientY: number) {
    if (!isDragging) return;
    const delta = clientY - startY.current;
    if (expanded) {
      // When expanded, only allow drag down (positive)
      setDragY(Math.max(0, delta));
    } else {
      // When collapsed, only allow drag up (negative)
      setDragY(Math.min(0, delta));
    }
  }

  function handleEnd() {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;

    if (expanded && dragY > threshold) {
      setExpanded(false);
    } else if (!expanded && Math.abs(dragY) > threshold) {
      setExpanded(true);
    }
    setDragY(0);
  }

  function handleCopy() {
    navigator.clipboard.writeText(content).catch(() => {});
    onCopy?.();
  }

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white border-t border-ros-border rounded-t-card shadow-card transition-transform",
        isDragging ? "duration-0" : "duration-300",
        className,
      )}
      style={{
        transform: expanded
          ? `translateY(${Math.max(0, dragY)}px)`
          : `translateY(calc(100% - 48px + ${Math.min(0, dragY)}px))`,
        maxHeight: "70vh",
      }}
    >
      {/* Handle bar — always visible */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none flex-shrink-0"
        onClick={() => { if (!isDragging) setExpanded(!expanded); }}
        onTouchStart={(e) => handleStart(e.touches[0].clientY)}
        onTouchMove={(e) => handleMove(e.touches[0].clientY)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientY)}
        onMouseMove={(e) => { if (isDragging) handleMove(e.clientY); }}
        onMouseUp={handleEnd}
        onMouseLeave={() => { if (isDragging) handleEnd(); }}
      >
        <div className="flex items-center gap-2">
          {/* Drag indicator */}
          <div className="w-8 h-1 rounded-pill bg-ros-ink-faint/40 mx-auto absolute left-1/2 -translate-x-1/2 top-1.5" />
          <span className="text-[13px] font-medium text-ros-ink-medium mt-1">
            {label}
          </span>
          <span className="text-[11px] text-ros-ink-faint mt-1">
            {expanded ? "▼" : "▲"}
          </span>
        </div>
        {expanded && (
          <Button
            variant="ghost"
            className="text-[11px] h-7 px-2 mt-1"
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
          >
            Kopiuj
          </Button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <p className="text-[13px] leading-[20px] text-ros-ink-medium whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
}
