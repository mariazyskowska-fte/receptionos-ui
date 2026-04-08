import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Labeled input — anatomy from `03-components.md` (Input Labeled).
 * Label-above stack, gap-2, 8px-radius border, optional error message.
 *
 * Error state is added by `@receptionos/ui` (the source audit notes
 * "no error states present" — see 04-patterns.md, Form validation).
 * The validation messages from gherkin user stories
 * (US-CF-05 sc.2 / US-CO-04 sc.3 / US-SF-04 sc.2 — "Wybierz kanał
 * powiadomień") need an error UI, so we introduce one here.
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, id, className, ...rest }, ref) {
    const inputId = id ?? React.useId();
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={inputId}
          className="text-[14px] font-medium text-ros-ink leading-none"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 px-3 bg-white rounded-input border border-ros-border-input shadow-subtle text-[14px] leading-[20px] text-ros-ink outline-none focus:border-brand-callflow",
            error && "border-ros-danger-fg focus:border-ros-danger-fg",
            className,
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-[12px] leading-[16px] text-ros-danger-fg"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
