import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

/**
 * EmptyState — pattern for "no data yet" screens.
 *
 * Source user stories (powtarza się 1:1 we wszystkich 3 apkach):
 *  - CallFlow:    US-CF-02 sc.3 — "Twój pierwszy raport pojawi się po
 *                 pierwszej przeanalizowanej rozmowie"
 *  - ConsultFlow: US-CO-02 sc.4 — "Twój pierwszy raport pojawi się po
 *                 przesłaniu i przeanalizowaniu nagrania"
 *  - ShiftFlow:   US-SF-02 sc.3 — "Twój grafik pojawi się po zatwierdzeniu
 *                 przez managera"
 *
 * Anti-pattern explicitly forbidden by all 3 gherkins:
 *   "But nie widzi pustej tabeli ani komunikatu błędu"
 *
 * Role variants:
 *  - operator (Anna / Dr Mazur / Dr Nowak / Kasia): personal "first
 *    report/grafik" message + onboarding CTA. Always one CTA only.
 *  - manager  (Marta / Violetta / Tomasz): empty *team* state, encourages
 *    profile creation. CTA points at the admin panel.
 *
 * Visual anatomy from `UI/design-system-audit/03-components.md` (Empty State):
 *   40px circle icon → headline → subtitle → optional CTA.
 */
export interface EmptyStateProps {
  variant?: "operator" | "manager";
  title: string;
  description?: string;
  /** Optional CTA — gherkin scenarios always recommend exactly one. */
  ctaLabel?: string;
  onCta?: () => void;
  /** Brand accent for the icon background + CTA button. */
  brand?: "callflow" | "consultflow" | "shiftflow";
  icon?: React.ReactNode;
  className?: string;
}

const brandIconBg: Record<NonNullable<EmptyStateProps["brand"]>, string> = {
  callflow: "bg-blue-50 text-brand-callflow",
  consultflow: "bg-purple-50 text-brand-consultflow",
  shiftflow: "bg-green-50 text-brand-shiftflow",
};

export function EmptyState({
  variant = "operator",
  title,
  description,
  ctaLabel,
  onCta,
  brand = "callflow",
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-variant={variant}
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "size-10 rounded-pill flex items-center justify-center",
          brandIconBg[brand],
        )}
        aria-hidden
      >
        {icon ?? <DefaultIcon />}
      </div>
      <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
        {title}
      </p>
      {description && (
        <p className="text-[12px] leading-[16px] text-ros-ink-muted max-w-sm">
          {description}
        </p>
      )}
      {ctaLabel && onCta && (
        <div className="pt-2">
          <Button brand={brand} onClick={onCta}>
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
