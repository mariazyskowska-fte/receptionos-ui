import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";
import { Badge } from "../primitives/Badge";

/**
 * InboxNotification — single row in the platform's Omnichannel Inbox.
 * It is the cross-app touchpoint between platform shell and Layer-5 apps:
 * the inbox lives on the platform side, but the notification body and CTA
 * are produced by CallFlow / ConsultFlow / ShiftFlow.
 *
 * Source user stories (literally identical wording across apps):
 *  - CallFlow:    US-CF-02 sc.1 — "Twój nowy raport z rozmowy jest gotowy"
 *                 + CTA [Otwórz raport]
 *  - ConsultFlow: US-CO-02 sc.1 — "Raport z konsultacji [data] jest gotowy"
 *                 + CTA [Otwórz raport]
 *  - ShiftFlow:   US-SF-02 sc.1 — "Twój grafik na tydzień [daty] jest
 *                 gotowy" + CTA [Zobacz grafik]
 *
 * Also covers the urgent absence flow:
 *  - ShiftFlow:   US-SF-03 sc.1 — pilne powiadomienie "PILNE", manager-side
 *
 * Role variants:
 *  - operator: receives "your report/grafik is ready" — single CTA, neutral
 *    tone, brand accent on icon.
 *  - manager:  receives "PILNE" / "flagowana rozmowa" — danger or warn tone,
 *    typically with stronger color and a status badge.
 */
export type InboxUrgency = "info" | "warn" | "urgent";

export interface InboxNotificationProps {
  variant?: "operator" | "manager";
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** App label shown as a small chip ("CallFlow" / "ConsultFlow" / "ShiftFlow"). */
  appLabel?: string;
  title: string;
  body?: string;
  timestamp?: string;
  urgency?: InboxUrgency;
  ctaLabel?: string;
  onCta?: () => void;
  className?: string;
}

const brandIcon: Record<NonNullable<InboxNotificationProps["brand"]>, string> =
  {
    callflow: "bg-brand-callflow",
    consultflow: "bg-brand-consultflow",
    shiftflow: "bg-brand-shiftflow",
  };

const urgencyBadge: Record<InboxUrgency, { tone: "success" | "warn" | "danger"; label: string }> =
  {
    info: { tone: "success", label: "Nowe" },
    warn: { tone: "warn", label: "Sprawdź" },
    urgent: { tone: "danger", label: "PILNE" }, // gherkin literal, US-SF-03
  };

export function InboxNotification({
  variant = "operator",
  brand = "callflow",
  appLabel,
  title,
  body,
  timestamp,
  urgency = "info",
  ctaLabel,
  onCta,
  className,
}: InboxNotificationProps) {
  const badge = urgencyBadge[urgency];
  return (
    <article
      data-variant={variant}
      className={cn(
        "flex items-start gap-3 p-4 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150",
        className,
      )}
    >
      <div
        className={cn(
          "size-8 rounded-pill flex-shrink-0 flex items-center justify-center text-white",
          brandIcon[brand],
        )}
        aria-hidden
      >
        {appLabel?.charAt(0) ?? "•"}
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {appLabel && (
            <span className="text-[12px] font-medium text-ros-ink-medium">
              {appLabel}
            </span>
          )}
          <Badge tone={badge.tone}>{badge.label}</Badge>
          {timestamp && (
            <span className="text-[12px] text-ros-ink-faint ml-auto">
              {timestamp}
            </span>
          )}
        </div>
        <p className="text-[14px] leading-[20px] font-medium text-ros-ink truncate">
          {title}
        </p>
        {body && (
          <p className="text-[12px] leading-[16px] text-ros-ink-muted line-clamp-2">
            {body}
          </p>
        )}
      </div>
      {ctaLabel && onCta && (
        <div className="flex-shrink-0 self-center">
          <Button brand={brand} onClick={onCta}>
            {ctaLabel}
          </Button>
        </div>
      )}
    </article>
  );
}
