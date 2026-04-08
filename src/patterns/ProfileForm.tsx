import * as React from "react";
import { cn } from "../utils/cn";
import { Input } from "../primitives/Input";
import { Button } from "../primitives/Button";

/**
 * ProfileForm — admin form for creating receptionist / doctor / assistant
 * profiles. The shape is identical across all three apps' admin panels.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-05 sc.1 — "Dodanie nowego profilu recepcjonistki"
 *                 + sc.2 walidacja "Wybierz kanał powiadomień"
 *  - ConsultFlow: US-CO-04 sc.1 — "Dodanie profilu lekarza z zakresem
 *                 konsultacyjnym" + sc.3 ta sama walidacja
 *  - ShiftFlow:   US-SF-04 sc.1 — "Dodanie profilu lekarza z pełnymi
 *                 danymi"  (+ specialization, availability, chair)
 *
 * Role: this is a MANAGER-only screen across all 3 apps. It is never shown
 * to the operator (Anna/Dr Mazur/Dr Nowak/Kasia). Confirmed by the
 * "Given Marta/Violetta/Tomasz jest w panelu administracyjnym" preamble in
 * every gherkin scenario above.
 *
 * Validation rule that MUST be enforced (cross-app contract):
 *   "And nie wybrała kanału powiadomień (SMS / e-mail / app)
 *    When klika Zapisz
 *    Then formularz wyświetla błąd walidacji: 'Wybierz kanał powiadomień'
 *    But pozostałe pola formularza nie są czyszczone"
 *
 * The component preserves form state on validation failure (controlled
 * by the parent through `value`/`onChange`).
 */
export type NotificationChannel = "sms" | "email" | "app";

export interface ProfileFormValue {
  firstName: string;
  lastName: string;
  notificationChannel: NotificationChannel | null;
  /** App-specific extra field (specialization for ShiftFlow, scope for ConsultFlow). */
  extraField?: string;
}

export interface ProfileFormProps {
  value: ProfileFormValue;
  onChange: (next: ProfileFormValue) => void;
  onSubmit: (value: ProfileFormValue) => void;
  onCancel?: () => void;
  /** App-specific label for the optional extra field. */
  extraFieldLabel?: string;
  /** Brand accent for the submit button. */
  brand?: "callflow" | "consultflow" | "shiftflow";
  className?: string;
}

const channelLabels: Record<NotificationChannel, string> = {
  sms: "SMS",
  email: "E-mail",
  app: "Aplikacja",
};

export function ProfileForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  extraFieldLabel,
  brand = "callflow",
  className,
}: ProfileFormProps) {
  const [errors, setErrors] = React.useState<{
    notificationChannel?: string;
    firstName?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!value.firstName.trim()) next.firstName = "Imię jest wymagane";
    if (!value.notificationChannel)
      next.notificationChannel = "Wybierz kanał powiadomień"; // gherkin literal
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit(value);
  }

  function patch<K extends keyof ProfileFormValue>(
    key: K,
    v: ProfileFormValue[K],
  ) {
    onChange({ ...value, [key]: v });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-5 max-w-md", className)}
      noValidate
    >
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Imię"
          value={value.firstName}
          onChange={(e) => patch("firstName", e.target.value)}
          error={errors.firstName}
        />
        <Input
          label="Nazwisko"
          value={value.lastName}
          onChange={(e) => patch("lastName", e.target.value)}
        />
      </div>

      {extraFieldLabel && (
        <Input
          label={extraFieldLabel}
          value={value.extraField ?? ""}
          onChange={(e) => patch("extraField", e.target.value)}
        />
      )}

      <fieldset className="flex flex-col gap-2">
        <legend className="text-[14px] font-medium text-ros-ink leading-none mb-1">
          Kanał powiadomień
        </legend>
        <div className="flex gap-2">
          {(Object.keys(channelLabels) as NotificationChannel[]).map((ch) => {
            const selected = value.notificationChannel === ch;
            return (
              <button
                key={ch}
                type="button"
                onClick={() => patch("notificationChannel", ch)}
                className={cn(
                  "px-4 h-9 rounded-pill text-[14px] font-medium border transition-colors duration-150",
                  selected
                    ? "bg-ros-ink text-white border-ros-ink"
                    : "bg-white text-ros-ink border-ros-border hover:bg-ros-surface-hover",
                )}
                aria-pressed={selected}
              >
                {channelLabels[ch]}
              </button>
            );
          })}
        </div>
        {errors.notificationChannel && (
          <p className="text-[12px] leading-[16px] text-ros-danger-fg">
            {errors.notificationChannel}
          </p>
        )}
      </fieldset>

      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button variant="ghost" type="button" onClick={onCancel}>
            Anuluj
          </Button>
        )}
        <Button type="submit" brand={brand}>
          Zapisz
        </Button>
      </div>
    </form>
  );
}
