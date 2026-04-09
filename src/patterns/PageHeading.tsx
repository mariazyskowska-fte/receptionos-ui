import * as React from "react";
import { cn } from "../utils/cn";

/**
 * PageHeading — section header used at the top of every tab/page view.
 *
 * Anatomy: title (left) + optional description below + optional actions (right).
 * Follows the locked typography scale: title 18px/600, description 14px/400.
 *
 * Used on every tab: Dashboard, Import, Zespół — provides consistent
 * visual rhythm across all receptionOS apps.
 */
export interface PageHeadingProps {
  title: string;
  description?: string;
  /** Right-aligned slot for CTA buttons or controls. */
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeading({
  title,
  description,
  actions,
  className,
}: PageHeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex flex-col gap-1 min-w-0">
        <h2 className="text-[18px] leading-[28px] font-semibold text-ros-ink">
          {title}
        </h2>
        {description && (
          <p className="text-[14px] leading-[20px] text-ros-ink-muted">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </div>
  );
}
