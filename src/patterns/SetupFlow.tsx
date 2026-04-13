import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

/**
 * SetupFlow — step-by-step configuration wizard.
 *
 * Used for multi-step setup processes where the user must complete
 * or review configuration before proceeding to an action.
 *
 * Cross-app usage:
 *  - ShiftFlow:  "Nowy grafik" flow (klinika → zespół → import → generuj)
 *  - CallFlow:   potential "Nowy raport" flow (klinika → recepcjonistka → upload)
 *  - ConsultFlow: potential onboarding flow
 *
 * Each step is a full-width card with title and content. Navigation
 * is via "Dalej" / "Wstecz" buttons — no swiping (intentional, to
 * prevent accidental skipping of configuration).
 *
 * Steps can be marked as optional (skippable) or required.
 */

export interface SetupStep {
  key: string;
  title: string;
  /** Short description below the title. */
  subtitle?: string;
  /** Whether this step can be skipped. */
  optional?: boolean;
  /** Content of the step (form fields, etc.). */
  content: React.ReactNode;
  /** Validation — return true if step is complete and user can proceed. */
  isValid?: boolean;
}

export interface SetupFlowProps {
  steps: SetupStep[];
  /** Called when user completes all steps and clicks the final action. */
  onComplete: () => void;
  /** Label for the final action button (e.g. "Generuj grafik"). */
  completeLabel?: string;
  /** Called when user cancels/exits the flow. */
  onCancel?: () => void;
  brand?: "callflow" | "consultflow" | "shiftflow";
  className?: string;
}

const brandBg: Record<NonNullable<SetupFlowProps["brand"]>, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

export function SetupFlow({
  steps,
  onComplete,
  completeLabel = "Gotowe",
  onCancel,
  brand = "callflow",
  className,
}: SetupFlowProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const total = steps.length;
  const current = steps[activeIndex];
  const isLast = activeIndex >= total - 1;
  const isFirst = activeIndex === 0;

  function handleNext() {
    if (isLast) {
      onComplete();
    } else {
      setActiveIndex((i) => Math.min(i + 1, total - 1));
    }
  }

  function handleBack() {
    setActiveIndex((i) => Math.max(i - 1, 0));
  }

  function handleSkip() {
    if (current.optional && !isLast) {
      setActiveIndex((i) => Math.min(i + 1, total - 1));
    }
  }

  const progress = ((activeIndex + 1) / total) * 100;
  const canProceed = current.isValid !== false;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Progress bar + step indicator */}
      <div className="flex items-center gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-[13px] text-ros-ink-muted hover:text-ros-ink bg-transparent border-none cursor-pointer p-0 flex-shrink-0"
          >
            ✕
          </button>
        )}
        <div className="flex-1 h-1.5 bg-ros-surface-hover rounded-pill overflow-hidden">
          <div
            className={cn("h-full rounded-pill transition-all duration-300", brandBg[brand])}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[12px] text-ros-ink-faint flex-shrink-0">
          {activeIndex + 1}/{total}
        </span>
      </div>

      {/* Step header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] leading-[28px] font-semibold text-ros-ink">
            {current.title}
          </h3>
          {current.subtitle && (
            <p className="text-[13px] text-ros-ink-muted mt-0.5">
              {current.subtitle}
            </p>
          )}
        </div>
        {current.optional && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-[13px] text-ros-ink-muted hover:text-ros-ink bg-transparent border-none cursor-pointer p-0"
          >
            Pomiń →
          </button>
        )}
      </div>

      {/* Step content */}
      <div className="rounded-card border border-ros-border bg-white p-5">
        {current.content}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {!isFirst ? (
          <Button variant="ghost" onClick={handleBack}>
            ← Wstecz
          </Button>
        ) : (
          <div />
        )}
        <Button
          brand={brand}
          onClick={handleNext}
          disabled={!canProceed}
        >
          {isLast ? completeLabel : "Dalej →"}
        </Button>
      </div>
    </div>
  );
}
