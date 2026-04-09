import * as React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
export { i as tokens } from './index-eVisjT3g.js';

/**
 * Button — pill-shaped, two variants. Locked rules from
 * `UI/design-system-audit/03-components.md` (Button section):
 *  - always `rounded-pill`
 *  - Geist Medium 14px label
 *  - primary = brand blue, ghost = white with overlay border
 *
 * NEVER make square buttons (forbidden in 05-rules-for-lovable.md).
 */
type ButtonVariant = "primary" | "ghost" | "danger";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    /** Brand accent — colors the primary fill. Defaults to CallFlow blue. */
    brand?: "callflow" | "consultflow" | "shiftflow";
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Card — primary content shell.
 * Locked from `03-components.md` (Card Standard):
 *  - bg-white, rounded-card (24px), shadow-card
 *  - audit specifies "absolute inset border overlay" pattern; here we use
 *    Tailwind's native border to keep the package portable. Apps that need
 *    pixel-perfect parity can wrap their own border layer.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** "stat" → off-white surface, smaller radius (KPI cards) */
    variant?: "standard" | "stat";
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Badge — pill status indicator.
 * Locked from `03-components.md` (Badge / Status Pill).
 * Used for: trend deltas (+/-), status pills (Active/Break),
 * inline counts (Tasks (8)).
 */
type BadgeTone = "success" | "danger" | "warn" | "neutral";
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    tone?: BadgeTone;
}
declare function Badge({ tone, className, children, ...rest }: BadgeProps): react_jsx_runtime.JSX.Element;

/**
 * Labeled input — anatomy from `03-components.md` (Input Labeled).
 * Label-above stack, gap-2, 8px-radius border, optional error message.
 *
 * Error state is added by `receptionos-ui` (the source audit notes
 * "no error states present" — see 04-patterns.md, Form validation).
 * The validation messages from gherkin user stories
 * (US-CF-05 sc.2 / US-CO-04 sc.3 / US-SF-04 sc.2 — "Wybierz kanał
 * powiadomień") need an error UI, so we introduce one here.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

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
interface EmptyStateProps {
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
declare function EmptyState({ variant, title, description, ctaLabel, onCta, brand, icon, className, }: EmptyStateProps): react_jsx_runtime.JSX.Element;

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
type NotificationChannel = "sms" | "email" | "app";
interface ProfileFormValue {
    firstName: string;
    lastName: string;
    notificationChannel: NotificationChannel | null;
    /** App-specific extra field (specialization for ShiftFlow, scope for ConsultFlow). */
    extraField?: string;
}
interface ProfileFormProps {
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
declare function ProfileForm({ value, onChange, onSubmit, onCancel, extraFieldLabel, brand, className, }: ProfileFormProps): react_jsx_runtime.JSX.Element;

/**
 * TrendChart — line chart for tracking a single metric over time, with
 * optional event annotations and "insufficient data" empty state.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-03 sc.1 — Empathy Score, 30 dni, adnotacja
 *                 "Wzrost o [X] pkt po zastosowaniu sugestii z dnia [data]"
 *                 + sc.2 empty state "Trend będzie widoczny po co najmniej
 *                 5 analizach" / "2 z 5 rozmów zarejestrowanych"
 *  - ConsultFlow: US-CO-03 sc.1 — Overall Score, 6 tygodni; sc.2
 *                 ostrzeżenie regresji (odcinek wyróżniony pomarańczowy);
 *                 sc.3 anonimowy benchmark zespołu
 *  - ShiftFlow:   US-SF-05 sc.1 — utilizacja w czasie (manager dashboard)
 *
 * Role variants:
 *  - operator: shows ONLY their own series. Annotations describe their
 *    own actions ("po wdrożeniu sugestii z dnia X"). Optional anonymized
 *    benchmark line, never identifying others (gherkin US-CO-03 sc.3).
 *  - manager: shows aggregate (team average). Annotations describe team
 *    events like "szkolenie z Obsługa obiekcji" (US-CO-05 sc.4).
 *
 * The component is intentionally pure SVG with no chart-lib dependency,
 * because R1 plan says: paczka musi działać jako zwykła paczka npm bez
 * przepisywania backendu (cytat z planu R1+R2 / Krok 3).
 */
interface TrendPoint {
    /** Display label, e.g. "1 mar" or "Tydz. 12". */
    label: string;
    value: number;
}
interface TrendAnnotation {
    /** Index into `data` to anchor the annotation marker. */
    atIndex: number;
    text: string;
}
interface TrendChartProps {
    variant?: "operator" | "manager";
    brand?: "callflow" | "consultflow" | "shiftflow";
    title: string;
    data: TrendPoint[];
    /** Anonymized benchmark line (US-CO-03 sc.3). Manager dashboards may
     *  also use this to show "before training" baseline. */
    benchmark?: TrendPoint[];
    annotations?: TrendAnnotation[];
    /** Minimum number of points required before the chart is rendered.
     *  Below this, an "insufficient data" message replaces the chart
     *  (US-CF-03 sc.2). */
    minPoints?: number;
    insufficientDataMessage?: string;
    className?: string;
}
declare function TrendChart({ variant, brand, title, data, benchmark, annotations, minPoints, insufficientDataMessage, className, }: TrendChartProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardHeader — top hero of every Manager Dashboard. Single big metric
 * + delta badge + optional contextual subtitle.
 *
 * Source user stories (the "główna metryka" in each):
 *  - CallFlow:    US-CF-04 sc.1 — "Team Health Score" jako główna metryka
 *  - ConsultFlow: US-CO-05 sc.1 — "Avg Conversion Rate: [X]%"
 *  - ShiftFlow:   US-SF-05 sc.1 — "Utilizacja foteli: [X]%"
 *
 * Role: MANAGER ONLY. The operator views (Anna's Trend View, Dr Mazur's
 * report) do not have a hero KPI — they have a per-record breakdown.
 * Confirmed by gherkins: every "Given X jest zalogowana jako Manager"
 * scenario opens with this header.
 *
 * Visual mirrors `UI/design-system-audit/03-components.md` Stat Card
 * (28px Medium value + Badge pill). Slightly enlarged for the page hero.
 */
interface DashboardHeaderProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    title: string;
    metricLabel: string;
    metricValue: string;
    /** Trend delta, e.g. "+12%" or "-3 pkt". Sign drives the tone. */
    delta?: string;
    /** Override the auto-detected delta tone. */
    deltaTone?: "success" | "danger" | "neutral";
    subtitle?: string;
    actions?: React.ReactNode;
    className?: string;
}
declare function DashboardHeader({ brand, title, metricLabel, metricValue, delta, deltaTone, subtitle, actions, className, }: DashboardHeaderProps): react_jsx_runtime.JSX.Element;

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
type InboxUrgency = "info" | "warn" | "urgent";
interface InboxNotificationProps {
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
declare function InboxNotification({ variant, brand, appLabel, title, body, timestamp, urgency, ctaLabel, onCta, className, }: InboxNotificationProps): react_jsx_runtime.JSX.Element;

/**
 * TeamMemberRow — single row in the manager dashboard's team list. The
 * "lista [osób] z aktualnym wynikiem, trendem ↑/↓ i statusem ✓/❗"
 * description is repeated 1:1 in all three apps.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "listę recepcjonistek z: aktualnym
 *                 Empathy Score, trendem ↑/↓ i statusem ✓/❗"
 *  - ConsultFlow: US-CO-05 sc.1 — "listę lekarzy z: aktualnym wynikiem,
 *                 trendem ↑/↓ i statusem ✓/❗"
 *  - ShiftFlow:   US-SF-05 sc.1 — "listę lekarzy z ich utilizacją, trendem
 *                 ↑/↓ i statusem ✓/❗"
 *
 * Role: MANAGER ONLY. Operators cannot see other team members' data
 * (cf. ConsultFlow US-CO-03 sc.3 explicitly: "Dr Mazur nie widzi wyników
 * konkretnych innych lekarzy"). Inadequate role gating here would directly
 * violate the gherkin contract.
 *
 * Click target: opens the per-person detail view (US-CO-05 sc.3 — "Manager
 * otwiera pełny widok wybranego lekarza" + coaching note).
 */
type Trend = "up" | "down" | "flat";
type MemberStatus = "ok" | "attention";
interface TeamMemberRowProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    name: string;
    /** Optional role / specialization line under the name. */
    subtitle?: string;
    /** Headline metric for this person, e.g. "Empathy 78" or "Util. 87%". */
    metricLabel: string;
    metricValue: string;
    trend?: Trend;
    /** "ok" → green check, "attention" → orange badge ("flagowane rozmowy"). */
    status?: MemberStatus;
    onOpen?: () => void;
    className?: string;
}
declare function TeamMemberRow({ brand, name, subtitle, metricLabel, metricValue, trend, status, onOpen, className, }: TeamMemberRowProps): react_jsx_runtime.JSX.Element;

export { Badge, type BadgeProps, type BadgeTone, Button, type ButtonProps, type ButtonVariant, Card, type CardProps, DashboardHeader, type DashboardHeaderProps, EmptyState, type EmptyStateProps, InboxNotification, type InboxNotificationProps, type InboxUrgency, Input, type InputProps, type MemberStatus, type NotificationChannel, ProfileForm, type ProfileFormProps, type ProfileFormValue, TeamMemberRow, type TeamMemberRowProps, type Trend, type TrendAnnotation, TrendChart, type TrendChartProps, type TrendPoint };
