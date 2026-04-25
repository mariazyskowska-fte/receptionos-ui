import * as React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
export { i as tokens } from './index-eVisjT3g.cjs';

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
 * TrendChart — line chart for tracking metrics over time.
 *
 * Supports two modes:
 * 1. Single line: `data` prop (backward compatible)
 * 2. Multi-line: `series` prop — multiple named lines on one chart
 *    with color-coded legend, for comparing areas side by side.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-03 sc.1 — Empathy Score trend
 *  - ConsultFlow: US-CO-03 sc.1 — Overall Score + area breakdown lines
 *  - ShiftFlow:   US-SF-05 sc.1 — chair utilization trend
 *
 * Pure SVG, no chart-lib dependency.
 */
interface TrendPoint {
    label: string;
    value: number;
}
interface TrendSeries {
    /** Series name shown in legend. */
    name: string;
    /** Line color (hex). */
    color: string;
    /** Data points — must share the same labels/x-axis as other series. */
    data: TrendPoint[];
    /** Dashed line style (for benchmarks). */
    dashed?: boolean;
}
interface TrendAnnotation {
    atIndex: number;
    text: string;
}
interface TrendChartProps {
    variant?: "operator" | "manager";
    brand?: "callflow" | "consultflow" | "shiftflow";
    title: string;
    /** Single line mode (backward compatible). */
    data?: TrendPoint[];
    /** Multi-line mode — multiple series on one chart. */
    series?: TrendSeries[];
    /** Benchmark line (single-line mode only). */
    benchmark?: TrendPoint[];
    annotations?: TrendAnnotation[];
    minPoints?: number;
    insufficientDataMessage?: string;
    className?: string;
}
declare function TrendChart({ variant, brand, title, data, series, benchmark, annotations, minPoints, insufficientDataMessage, className, }: TrendChartProps): react_jsx_runtime.JSX.Element;

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
 * TeamMemberRow — single row in the manager dashboard's team list.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "listę recepcjonistek z: aktualnym
 *                 Empathy Score, trendem ↑/↓ i statusem ✓/❗"
 *  - ConsultFlow: US-CO-05 sc.1 — "listę lekarzy z: aktualnym wynikiem,
 *                 trendem ↑/↓ i statusem ✓/❗"
 *  - ShiftFlow:   US-SF-05 sc.1 — "listę lekarzy z ich utilizacją, trendem
 *                 ↑/↓ i statusem ✓/❗"
 *
 * Role: MANAGER ONLY.
 *
 * Extended with:
 *  - Selectable checkbox for bulk actions (send schedule/report)
 *  - Delivery status indicator (sent ✓ / pending ◌)
 *  - lastActivityAt for chronological sorting by consuming app
 */
type Trend = "up" | "down" | "flat";
type MemberStatus = "ok" | "attention";
type DeliveryStatus = "delivered" | "pending" | "not_sent";
interface TeamMemberRowProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    name: string;
    /** Optional role / specialization line under the name. */
    subtitle?: string;
    /** Headline metric for this person, e.g. "Empathy 78" or "Util. 87%". */
    metricLabel: string;
    metricValue: string;
    trend?: Trend;
    /** "ok" → green check, "attention" → orange badge. */
    status?: MemberStatus;
    /** Whether the latest report/schedule was delivered to this person. */
    deliveryStatus?: DeliveryStatus;
    /** Enables checkbox selection for bulk actions. */
    selectable?: boolean;
    selected?: boolean;
    onSelect?: (selected: boolean) => void;
    onOpen?: () => void;
    className?: string;
}
declare function TeamMemberRow({ brand, name, subtitle, metricLabel, metricValue, trend, status, deliveryStatus, selectable, selected, onSelect, onOpen, className, }: TeamMemberRowProps): react_jsx_runtime.JSX.Element;

type AppBrand = "callflow" | "consultflow" | "shiftflow";
interface AppEntry {
    key: AppBrand;
    label: string;
    url: string;
    description?: string;
}
interface AppSwitcherProps {
    current: AppBrand;
    apps?: AppEntry[];
    className?: string;
}
declare function AppSwitcher({ current, apps, className, }: AppSwitcherProps): react_jsx_runtime.JSX.Element;

/**
 * AppHeader — shared top navigation bar for all receptionOS apps.
 *
 * Layout spec from `UI/design-system-audit/01-layout.md`:
 *   Nav bar: h=64px, bg-white, border-bottom #e4e4e7
 *   [Logo]  [Tab | Tab (n) | Tab (n)]  [UserMenu]
 *
 * Nav tab spec from `UI/design-system-audit/03-components.md`:
 *   Active: transparent bg, text #27272a
 *   Inactive: transparent bg, text #71717a, hover bg #f4f4f5
 *   No underline for active — text color change only
 *   Gap between tabs: 2px
 *   Tab padding: px-12px py-10px, rounded-8px
 *
 * User menu button spec from `03-components.md`:
 *   Avatar 32px pill, brand bg, white initials
 *   Chevron 16px, stroke #a1a1aa
 *
 * Locked rules from `05-rules-for-lovable.md`:
 *   - Horizontal top nav only (sidebar forbidden)
 *   - No underline on active tabs
 *   - Geist font, 14px/20px Medium
 *   - transition-colors duration-150
 *
 * App switcher (cross-app navigation):
 *   When `apps` prop is supplied with 2+ entries, the logo block becomes
 *   a clickable trigger that opens a dropdown with the OTHER apps
 *   (current app is filtered out). Entries link via <a href>.
 */
interface NavItem {
    /** Unique key for matching active state. */
    key: string;
    label: string;
    /** Optional badge count (e.g. "Tasks (3)"). */
    badge?: number;
    /** Icon rendered before the label — 16px recommended. */
    icon?: React.ReactNode;
}
interface AppHeaderProps {
    brand?: AppBrand;
    /** App name shown next to the logo mark. */
    appName: string;
    /** Optional subtitle under the app name. */
    appSubtitle?: string;
    /**
     * Cross-app navigation. When provided (with more than the current app),
     * clicking the logo opens a dropdown to switch to another app.
     */
    apps?: AppEntry[];
    /** Navigation items rendered as tabs. */
    navItems?: NavItem[];
    /** Key of the currently active nav item. */
    activeKey?: string;
    /** Called when a nav tab is clicked. */
    onNavigate?: (key: string) => void;
    /** User display name — used to derive initials for the avatar. */
    userName?: string;
    /** Slot rendered inside the user dropdown (logout button, etc.). */
    userMenuContent?: React.ReactNode;
    /** Extra content between nav tabs and user menu (e.g. clinic selector). */
    actions?: React.ReactNode;
    className?: string;
}
declare function AppHeader({ brand, appName, appSubtitle, apps, navItems, activeKey, onNavigate, userName, userMenuContent, actions, className, }: AppHeaderProps): react_jsx_runtime.JSX.Element;
/**
 * AppHeaderMenuItem — helper for items inside the user dropdown.
 * Follows the dropdown item spec: rounded-[6px], 14px text, hover bg.
 */
interface AppHeaderMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    danger?: boolean;
    icon?: React.ReactNode;
}
declare function AppHeaderMenuItem({ danger, icon, children, className, ...rest }: AppHeaderMenuItemProps): react_jsx_runtime.JSX.Element;

/**
 * PageHeading — section header used at the top of every tab/page view.
 *
 * Anatomy: title (left) + optional description below + optional actions (right).
 * Follows the locked typography scale: title 18px/600, description 14px/400.
 *
 * Used on every tab: Dashboard, Import, Zespół — provides consistent
 * visual rhythm across all receptionOS apps.
 */
interface PageHeadingProps {
    title: string;
    description?: string;
    /** Right-aligned slot for CTA buttons or controls. */
    actions?: React.ReactNode;
    className?: string;
}
declare function PageHeading({ title, description, actions, className, }: PageHeadingProps): react_jsx_runtime.JSX.Element;

/**
 * ImportDropZone — file upload area with drag & drop, file preview,
 * and progress indicator.
 *
 * Cross-app usage:
 *  - CallFlow:    CSV transcript upload (US-CF-01 flow, manager side)
 *  - ConsultFlow: Audio file upload (US-CO-01, MP3/WAV/M4A)
 *  - ShiftFlow:   Schedule text/CSV paste or file (import flow)
 *
 * The component is intentionally "dumb" — it handles visual state only.
 * All upload logic (chunked upload, validation, API calls) stays in
 * the consuming app.
 *
 * Visual spec follows `03-components.md` Card Standard (rounded-card,
 * border, bg-white) with a dashed inner border for the drop area.
 */
interface ImportDropZoneProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Accepted file types, e.g. ".csv" or ".mp3,.wav,.m4a,audio/*" */
    accept?: string;
    /** Human-readable description of accepted formats. */
    acceptLabel?: string;
    /** Max file size in bytes. Shown as helper text. */
    maxSize?: number;
    /** Currently selected file. When set, renders file preview instead of drop area. */
    selectedFile?: {
        name: string;
        size: number;
    } | null;
    /** Upload progress 0–100. When > 0, renders progress bar. */
    progress?: number;
    /** Progress label, e.g. "Analiza AI w toku..." */
    progressLabel?: string;
    /** Called when user selects a file via input or drop. */
    onFileSelect?: (file: File) => void;
    /** Called when user removes the selected file. */
    onRemove?: () => void;
    /** Submit button label. */
    submitLabel?: string;
    /** Called when user clicks submit. */
    onSubmit?: () => void;
    /** Disables all interactions. */
    disabled?: boolean;
    /** Extra content rendered between file preview and submit button (e.g. metadata fields). */
    children?: React.ReactNode;
    className?: string;
}
declare function ImportDropZone({ brand, accept, acceptLabel, maxSize, selectedFile, progress, progressLabel, onFileSelect, onRemove, submitLabel, onSubmit, disabled, children, className, }: ImportDropZoneProps): react_jsx_runtime.JSX.Element;

/**
 * ImportBatchRow — status row for an uploaded file/batch in the Import
 * tab's history list.
 *
 * Cross-app usage:
 *  - CallFlow:    CSV batch → "analyzing" → "completed" → CTA "Generuj raport"
 *  - ConsultFlow: Audio file → "analyzing" → "completed" → CTA "Zobacz raport"
 *  - ShiftFlow:   Schedule paste → "parsed" → CTA "Importuj do grafiku"
 *
 * Visual pattern mirrors InboxNotification but for data imports:
 * icon + file info + status badge + optional progress + CTA.
 */
type ImportBatchStatus = "pending" | "analyzing" | "completed" | "error";
interface ImportBatchRowProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** File or batch name. */
    fileName: string;
    /** Secondary info: receptionist name, date, item count, etc. */
    subtitle?: string;
    status: ImportBatchStatus;
    /** Progress 0–100, shown when status is "analyzing". */
    progress?: number;
    /** Custom status label override. */
    statusLabel?: string;
    /** Timestamp string, e.g. "2 min temu". */
    timestamp?: string;
    /** CTA button (shown for completed/error batches). */
    ctaLabel?: string;
    onCta?: () => void;
    /** Loading state for CTA button. */
    ctaLoading?: boolean;
    className?: string;
}
declare function ImportBatchRow({ brand, fileName, subtitle, status, progress, statusLabel, timestamp, ctaLabel, onCta, ctaLoading, className, }: ImportBatchRowProps): react_jsx_runtime.JSX.Element;

/**
 * ImportPageLayout — two-column layout for the Import tab.
 *
 * Mirrors the DashboardLayout pattern: main content area (left) with
 * import tools, and a right panel (384px) showing activity feed.
 *
 *   ┌──────────────────────────────┬──────────────────┐
 *   │  PageHeading                 │  panelTitle       │
 *   │  "Import rozmów"            │  ──────────────── │
 *   │                              │  ActivityRow      │
 *   │  ImportDropZone              │  ActivityRow      │
 *   │                              │  ActivityRow      │
 *   │  ImportBatchRow              │  ...scrollable    │
 *   │  ImportBatchRow              │                   │
 *   │                              │                   │
 *   └──────────────────────────────┴──────────────────┘
 *
 * Right panel content varies per app:
 *  - CallFlow:    delivery log — sent reports + read status per
 *                 receptionist (US-CF-02 sc.1 "raport gotowy",
 *                 tracking viewed_at)
 *  - ShiftFlow:   incoming requests — schedule change requests +
 *                 preference updates from doctors (US-SF-03 sc.1
 *                 "zgłasza nieobecność", US-SF-03 sc.2
 *                 "zaktualizował preferencje")
 *  - ConsultFlow: upload + analysis status — audio uploads and
 *                 their processing state (US-CO-01 sc.1
 *                 "analiza gotowa w ciągu 24h")
 *
 * Usage (CallFlow):
 *   <ImportPageLayout
 *     brand="callflow"
 *     title="Import rozmów"
 *     description="Wgraj plik CSV z transkryptami."
 *     panelTitle="Ostatnie wysyłki"
 *     panel={
 *       sentReports.map(r => (
 *         <ImportActivityRow
 *           key={r.id}
 *           label={r.receptionist_name}
 *           detail={r.file_name}
 *           timestamp="2 min temu"
 *           status={r.viewed_at ? "read" : "sent"}
 *         />
 *       ))
 *     }
 *   >
 *     <ImportDropZone ... />
 *     {batches.map(b => <ImportBatchRow ... />)}
 *   </ImportPageLayout>
 *
 * Usage (ShiftFlow):
 *   <ImportPageLayout
 *     brand="shiftflow"
 *     title="Import grafiku"
 *     description="Wgraj CSV lub wklej tekst."
 *     panelTitle="Prośby od lekarzy"
 *     panel={
 *       requests.map(r => (
 *         <ImportActivityRow
 *           key={r.id}
 *           label={r.doctorName}
 *           detail={r.type === 'absence' ? 'Nieobecność' : 'Zmiana preferencji'}
 *           timestamp={r.date}
 *           status={r.resolved ? "done" : "pending"}
 *         />
 *       ))
 *     }
 *   >
 *     <ImportDropZone ... />
 *   </ImportPageLayout>
 */
interface ImportPageLayoutProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    title: string;
    description?: string;
    /** Right-aligned actions in the heading (e.g. help link). */
    actions?: React.ReactNode;
    /** Main content: ImportDropZone + ImportBatchRow list. */
    children: React.ReactNode;
    /** Right panel content: activity feed rows. */
    panel?: React.ReactNode;
    /** Right panel header (e.g. "Ostatnie wysyłki", "Prośby od lekarzy"). */
    panelTitle?: string;
    className?: string;
}
declare function ImportPageLayout({ title, description, actions, children, panel, panelTitle, className, }: ImportPageLayoutProps): react_jsx_runtime.JSX.Element;
/**
 * ImportActivityRow — backward-compatible wrapper around FeedRow.
 * Use FeedRow directly in new code.
 *
 * @deprecated Use `FeedRow` from "receptionos-ui" instead.
 */
type ImportActivityStatus = "sent" | "read" | "pending" | "done" | "analyzing" | "error";
interface ImportActivityRowProps {
    label: string;
    detail?: string;
    timestamp?: string;
    status?: ImportActivityStatus;
    onClick?: () => void;
    className?: string;
}
declare function ImportActivityRow({ label, detail, timestamp, status, onClick, className, }: ImportActivityRowProps): react_jsx_runtime.JSX.Element;

/**
 * TeamHeatmap — grid showing team-wide area scores as a color-coded matrix.
 * Highlights the weakest area across the whole team with a suggested action.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-04 sc.1 — "heatmapę najsłabszego obszaru całego zespołu"
 *  - ConsultFlow: US-CO-05 sc.1 — "heatmapę najsłabszego obszaru całego zespołu
 *                 (np. Obiekcje)"
 *                 + sc.2 — "obszar 'Obiekcje' jest wyróżniony jako najsłabszy
 *                 zespołowy" + "system sugeruje: 'Zaplanuj szkolenie z: Obsługa
 *                 obiekcji'"
 *
 * Role: MANAGER ONLY. Operators never see team-level data.
 *
 * Cross-app areas:
 *  - CallFlow:    Empatia, Ton, Konwersja
 *  - ConsultFlow: Kompletność, Wartość, Obiekcje, Struktura, Zaufanie, CTA
 *  - ShiftFlow:   (not applicable — utilization is per-chair, not per-area)
 *
 * The component accepts generic areas so each app can define its own.
 */
interface HeatmapMember {
    name: string;
    /** Scores keyed by area name, matching `areas` order. */
    scores: Record<string, number>;
}
interface TeamHeatmapProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Ordered list of area names (column headers). */
    areas: string[];
    /** Team members with their per-area scores. */
    members: HeatmapMember[];
    /** Suggested action for the weakest area (US-CO-05 sc.2). */
    suggestion?: string;
    /** Called when manager clicks on the weakest area link. */
    onWeakestAreaClick?: (area: string) => void;
    className?: string;
}
declare function TeamHeatmap({ brand, areas, members, suggestion, onWeakestAreaClick, className, }: TeamHeatmapProps): react_jsx_runtime.JSX.Element;

/**
 * ReportBreakdown — per-report view with area scores displayed
 * horizontally as compact cards, plus suggestions section below.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-02 sc.2 — "widzi wyniki dla obszarów: Empatia, Ton,
 *                 Konwersja" + "najsłabszy obszar jest wyróżniony kolorem ❗"
 *  - ConsultFlow: US-CO-02 sc.2 — "widzi wyniki dla 6 obszarów"
 *                 + sc.3 — "dokładnie 3 obszary priorytetowe"
 *  - ConsultFlow: US-CO-01 sc.4 — "porównanie wyników: poprzedni vs aktualny"
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │ Title                               Overall: 7.8   │
 *   ├─────────────────────────────────────────────────────┤
 *   │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐       │
 *   │ │Empatia │ │  Ton   │ │Konwers.│ │ ...    │       │
 *   │ │ 8.5  ✓ │ │ 5.8  ❗│ │ 7.1  ✓ │ │        │       │
 *   │ │████░░░ │ │███░░░░ │ │█████░░ │ │        │       │
 *   │ │"cyt."  │ │"cyt."  │ │        │ │        │       │
 *   │ └────────┘ └────────┘ └────────┘ └────────┘       │
 *   ├─────────────────────────────────────────────────────┤
 *   │ ⚑ Priorytety (3)                                   │
 *   │ [Obiekcje] Użyj techniki...                        │
 *   │ [CTA] Zawsze kończ propozycją...                   │
 *   └─────────────────────────────────────────────────────┘
 */
interface BreakdownArea {
    name: string;
    /** Score 0–100. */
    score: number;
    previousScore?: number;
    quote?: string;
    quoteType?: "positive" | "negative";
}
interface Suggestion {
    area: string;
    text: string;
    sourceQuote?: string;
}
interface ReportBreakdownProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    title?: string;
    overallScore?: number;
    previousOverallScore?: number;
    areas: BreakdownArea[];
    suggestions?: Suggestion[];
    maxSuggestions?: number;
    /**
     * "compact" hides the per-area indicator (✓ / ❗) and slightly reduces the
     * area-name font, so long Polish labels ("Komunikacja", "Ogólna ocena")
     * fit without truncation in narrow / mobile viewports. Use in operator
     * views; manager views should keep "default" so the weakest-area cue
     * stays visible.
     */
    density?: "default" | "compact";
    className?: string;
}
declare function ReportBreakdown({ brand, title, overallScore, previousOverallScore, areas, suggestions, maxSuggestions, density, className, }: ReportBreakdownProps): react_jsx_runtime.JSX.Element;

/**
 * MemberDetailView — header + back navigation + children slot for
 * individual team member pages. The header is shared across apps;
 * everything below is app-specific (passed as children).
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-05 sc.3 — "Manager otwiera pełny widok
 *                 wybranego lekarza"
 *  - CallFlow:    US-CF-04 sc.2 — per-receptionist detail
 *
 * Role: MANAGER ONLY.
 *
 * App-specific content examples (passed as children):
 *  - CallFlow:  ScoreCardRow + recommendations checklist + impact +
 *               ReportsTable
 *  - ShiftFlow: individual schedule blocks + TrendChart + ActivityLog +
 *               coaching note textarea
 *  - ConsultFlow: TrendChart + ReportBreakdown + coaching note
 */
type MemberDetailTrend = "up" | "down" | "flat";
type MemberDetailStatus = "ok" | "attention";
type MemberDeliveryBadge = "delivered" | "pending" | "not_sent";
interface MemberDetailViewProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    name: string;
    subtitle?: string;
    /** Headline metric label, e.g. "Quiz Score", "Utilizacja". */
    metricLabel?: string;
    metricValue?: string;
    trend?: MemberDetailTrend;
    status?: MemberDetailStatus;
    /** Overall score displayed large in the header (e.g. 8.5 out of 10). */
    overallScore?: number;
    /** Previous overall score — shows "prev → current" delta. */
    previousOverallScore?: number;
    /** Delivery badge in header ("Gotowe" / "Oczekuje" / hidden). */
    deliveryBadge?: MemberDeliveryBadge;
    /** Called when the back button is clicked. */
    onBack?: () => void;
    /** Extra content rendered in the header's right side (custom badges, actions). */
    headerActions?: React.ReactNode;
    /** App-specific content below the header. */
    children: React.ReactNode;
    className?: string;
}
declare function MemberDetailView({ brand, name, subtitle, metricLabel, metricValue, trend, status, overallScore, previousOverallScore, deliveryBadge, onBack, headerActions, children, className, }: MemberDetailViewProps): react_jsx_runtime.JSX.Element;

/**
 * ScoreCardRow — horizontal row of score cards for an individual
 * member's key areas. Each card shows area name, score, progress
 * bar, and positive/negative indicator.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-02 sc.2 — "widzi wyniki dla obszarów: Empatia,
 *                 Ton, Konwersja" + "najsłabszy obszar jest wyróżniony
 *                 kolorem ❗"
 *  - ConsultFlow: US-CO-02 sc.2 — "widzi wyniki dla 6 obszarów"
 *
 * Replaces the inline score card grid from CallFlow's custom layout
 * and the per-area list from ReportBreakdown into a single reusable
 * component. ReportBreakdown remains available for detailed report
 * views with quotes and suggestions; ScoreCardRow is the compact
 * overview used inside MemberDetailView.
 *
 * Score display:
 *  - Raw score (0–100) is shown divided by 10 (e.g. 85 → 8.5) when
 *    `displayScale` is "ten" (default for CallFlow/ConsultFlow).
 *  - Raw score shown as-is + "%" when `displayScale` is "percent"
 *    (default for ShiftFlow utilization).
 */
interface ScoreCard {
    name: string;
    /** Score 0–100. */
    score: number;
    /** Previous score for visual delta (not displayed, used for indicator). */
    previousScore?: number;
}
interface ScoreCardRowProps {
    cards: ScoreCard[];
    /** How to display the score number. */
    displayScale?: "ten" | "percent";
    /** Number of columns in the grid. Auto-fits if not specified. */
    columns?: number;
    className?: string;
}
declare function ScoreCardRow({ cards, displayScale, columns, className, }: ScoreCardRowProps): react_jsx_runtime.JSX.Element;

/**
 * PerformanceOverview — horizontal card grid showing scores per area.
 * Works in two modes:
 *
 * 1. "snapshot" — scores from a single point in time (one report,
 *    current state). No trend arrows, no delta. Similar to old
 *    ScoreCardRow but with consistent card shape.
 *
 * 2. "aggregate" — averaged scores over a period with trend arrows,
 *    delta vs. previous period, data point count, and
 *    strengths/weaknesses summary footer.
 *
 * Cross-app usage:
 *  - ConsultFlow manager: doctor detail (aggregate, 6 areas, /10 scale)
 *  - ConsultFlow doctor:  "Moje wyniki" overview (aggregate)
 *  - CallFlow manager:    receptionist detail (snapshot, 3 areas)
 *  - ShiftFlow manager:   doctor utilization breakdown (snapshot, % scale)
 *
 * Source user stories:
 *  - US-CO-05 sc.3 — "pełna historia trendów i podsumowania z 3 miesięcy"
 *  - US-CO-03 sc.1 — trend z adnotacjami
 *  - US-CF-04 sc.1 — "aktualny Empathy Score, trend ↑/↓ i status ✓/❗"
 */
type AreaTrend = "up" | "down" | "flat";
interface OverviewArea {
    name: string;
    /** Score 0–100. */
    score: number;
    /** Previous score (for delta in aggregate mode). */
    previousScore?: number;
    /** Trend direction (aggregate mode only). */
    trend?: AreaTrend;
    /** Number of data points (aggregate mode only). */
    dataPoints?: number;
}
interface PerformanceOverviewProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** "snapshot" = single point, "aggregate" = averaged over period. */
    mode?: "snapshot" | "aggregate";
    /** How to display scores: "ten" = /10 (default), "percent" = %. */
    displayScale?: "ten" | "percent";
    /** Header title. */
    title?: string;
    /** Period label (aggregate mode), e.g. "sty–mar 2026". */
    periodLabel?: string;
    /** Overall score/average. */
    overallScore?: number;
    /** Previous overall (for delta). */
    previousOverallScore?: number;
    /** Area data. */
    areas: OverviewArea[];
    /** Badge in header, e.g. report count. */
    headerBadge?: string;
    /** Show strengths/weaknesses summary footer. Default: true in aggregate. */
    showSummary?: boolean;
    /**
     * "compact" hides the per-area indicator (✓/❗) and reduces the area-name
     * font from 11px to 10px. Use in narrow / mobile viewports so long Polish
     * labels (e.g. "Komunikacja", "Ogólna ocena") fit without truncation.
     * Trend arrow (↑/↓/→) stays — it's smaller and carries direction info.
     */
    density?: "default" | "compact";
    className?: string;
}
declare function PerformanceOverview({ brand, mode, displayScale, title, periodLabel, overallScore, previousOverallScore, areas, headerBadge, showSummary, density, className, }: PerformanceOverviewProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardLayout — two-column manager dashboard.
 *
 * Two ways to provide the right panel:
 *
 * 1. `sidePanel` (recommended) — pass a <SidePanel> component directly.
 *    It handles its own chrome (team list + feed + footer).
 *
 *   ┌──────────────────────────────┬──────────────────┐
 *   │  MAIN (flex-1)              │  Zespół (3)       │
 *   │  DashboardHeader            │  ┌ Anna    82% ┐ │
 *   │  TrendChart                 │  ┌ Kasia   65% ┐ │
 *   │  TeamHeatmap                │  ────────────── │
 *   │                             │  Ostatnie zmiany │
 *   │                             │  📄 Raport...    │
 *   │                             │  📅 Grafik...    │
 *   │                             │  [Wyślij (2)]    │
 *   └──────────────────────────────┴──────────────────┘
 *
 * 2. `panel` (legacy) — raw content wrapped in a default aside.
 */
interface DashboardLayoutProps {
    children: React.ReactNode;
    /** Preferred: pass a <SidePanel> component. */
    sidePanel?: React.ReactNode;
    /** Legacy: raw panel content (wrapped in default aside). */
    panel?: React.ReactNode;
    panelTitle?: string;
    panelToolbar?: React.ReactNode;
    panelFooter?: React.ReactNode;
    className?: string;
}
declare function DashboardLayout({ children, sidePanel, panel, panelTitle, panelToolbar, panelFooter, className, }: DashboardLayoutProps): react_jsx_runtime.JSX.Element;
/**
 * TeamPanelToolbar — helper for the panel toolbar slot.
 * Provides select all toggle + selected count.
 */
interface TeamPanelToolbarProps {
    totalCount: number;
    selectedCount: number;
    onSelectAll: () => void;
    onDeselectAll: () => void;
}
declare function TeamPanelToolbar({ totalCount, selectedCount, onSelectAll, onDeselectAll, }: TeamPanelToolbarProps): react_jsx_runtime.JSX.Element;
/**
 * TeamPanelFooter — helper for the panel footer slot.
 * Shows bulk action button when items are selected.
 */
interface TeamPanelFooterProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    selectedCount: number;
    /** Action label, e.g. "Wyślij grafik" or "Wyślij raport". */
    actionLabel: string;
    onAction: () => void;
    disabled?: boolean;
}
declare function TeamPanelFooter({ brand, selectedCount, actionLabel, onAction, disabled, }: TeamPanelFooterProps): react_jsx_runtime.JSX.Element | null;

/**
 * ActivityLog — chronological timeline of events, shown inside
 * MemberDetailView or as a standalone history section.
 *
 * Uses FeedRow internally for each entry. This component adds
 * the card wrapper, header, and expand/collapse logic.
 */
type ActivityType = "report_sent" | "report_viewed" | "schedule_sent" | "schedule_confirmed" | "absence" | "preference_change" | "coaching_note" | "suggestion" | "feedback" | "custom";
interface ActivityEntry {
    type: ActivityType;
    text: string;
    timestamp: string;
    detail?: string;
    /** @deprecated Use FeedRow directly if you need custom icons. */
    iconLabel?: string;
}
interface ActivityLogProps {
    entries: ActivityEntry[];
    maxVisible?: number;
    className?: string;
}
declare function ActivityLog({ entries, maxVisible, className, }: ActivityLogProps): react_jsx_runtime.JSX.Element;

/**
 * SidePanel — right-side panel for the manager dashboard.
 *
 * Fixed height, fixed 60/40 split between team and feed.
 * Both sections scroll independently.
 *
 * Feed rows should use the shared <FeedRow> component.
 */
interface SidePanelProps {
    teamContent: React.ReactNode;
    teamTitle?: string;
    teamCount?: number;
    teamToolbar?: React.ReactNode;
    feedContent: React.ReactNode;
    feedTitle?: string;
    footer?: React.ReactNode;
    className?: string;
}
declare function SidePanel({ teamContent, teamTitle, teamCount, teamToolbar, feedContent, feedTitle, footer, className, }: SidePanelProps): react_jsx_runtime.JSX.Element;

/**
 * FeedRow — single row for any activity/event feed. Unified component
 * replacing the previous SidePanelFeedRow, ImportActivityRow, and
 * inline ActivityLog rows.
 *
 * Minimal: colored dot + text + optional detail + timestamp.
 * Used in: SidePanel feed, ImportPageLayout panel, ActivityLog.
 */
type FeedDotColor = "green" | "orange" | "red" | "gray" | "blue" | "purple";
interface FeedRowProps {
    /** Primary text (one line, truncated). */
    text: string;
    /** Secondary detail (smaller, optional). */
    detail?: string;
    /** Timestamp string. */
    timestamp?: string;
    /** Dot color. Maps to design system status colors. */
    dot?: FeedDotColor;
    /** Clickable row. */
    onClick?: () => void;
    /** Compact mode: smaller text, less padding. Used in SidePanel feed. */
    compact?: boolean;
    className?: string;
}
declare function FeedRow({ text, detail, timestamp, dot, onClick, compact, className, }: FeedRowProps): react_jsx_runtime.JSX.Element;

/**
 * SwipeView — horizontal scroll-snap container for mobile-first
 * layouts. Each child is a full-width "page" that snaps into view.
 *
 * Used for the "timeline" metaphor:
 *   ← past (historia) | present (raporty) | future (upload) →
 *
 * Cross-app usage:
 *  - ConsultFlow: doctor's mobile view (PerformanceOverview ← ReportList → Upload)
 *  - CallFlow:    potential mobile receptionist view
 *  - ShiftFlow:   potential mobile doctor schedule view
 *
 * The component renders:
 *  - A dot indicator showing which page is active
 *  - Optional labels above each dot
 *  - CSS scroll-snap for native touch swiping
 */
interface SwipeViewPage {
    /** Unique key. */
    key: string;
    /** Short label shown in the dot indicator (e.g. "Historia", "Raporty", "Upload"). */
    label: string;
    /** Page content. */
    content: React.ReactNode;
}
interface SwipeViewProps {
    pages: SwipeViewPage[];
    /** Index of the initially visible page (default: 0). */
    initialPage?: number;
    /** Called when the active page changes. */
    onPageChange?: (key: string, index: number) => void;
    /** Brand accent for the active dot. */
    brand?: "callflow" | "consultflow" | "shiftflow";
    className?: string;
}
declare function SwipeView({ pages, initialPage, onPageChange, brand, className, }: SwipeViewProps): react_jsx_runtime.JSX.Element;

/**
 * ReportCard — compact touch-friendly card for a single consultation
 * or report in a scrollable list. Optimized for mobile viewports.
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-02 sc.1 — "widzi powiadomienie: 'Raport z
 *                 konsultacji [data] jest gotowy'" + CTA
 *  - CallFlow:    US-CF-02 sc.1 — "Twój nowy raport z rozmowy jest gotowy"
 *
 * Shows: identifier (initials/name), date, status badge, score (if completed).
 * Tap opens the full report (ReportBreakdown).
 */
type ReportCardStatus = "completed" | "analyzing" | "pending" | "error";
interface ReportCardProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Primary label — patient initials, receptionist name, etc. */
    label: string;
    /** Date string, e.g. "8 kwi 2026". */
    date: string;
    /** Secondary info, e.g. duration "12m". */
    subtitle?: string;
    status: ReportCardStatus;
    /** Overall score (shown only when completed). */
    score?: number;
    /** Additional score details shown on larger screens. */
    scoreDetails?: Array<{
        label: string;
        value: number;
    }>;
    /** Called when the card is tapped. */
    onOpen?: () => void;
    className?: string;
}
declare function ReportCard({ brand, label, date, subtitle, status, score, scoreDetails, onOpen, className, }: ReportCardProps): react_jsx_runtime.JSX.Element;

/**
 * ReportSection — single full-width card for one section of a report.
 * Designed to be the only thing visible on screen at a given moment
 * (inside CardStack quiz-flow).
 *
 * All variants have identical dimensions. Only the top accent line
 * (3px) and subtle background tint differ between variants.
 *
 * Variants:
 *  - scores    → neutral (white bg, gray accent)
 *  - tips      → warm (cream bg, orange accent)
 *  - strength  → positive (mint bg, green accent)
 *  - improve   → attention (peach bg, orange accent)
 *  - recommend → brand (lavender bg, purple accent)
 *  - progress  → insight (light purple bg, purple accent)
 *  - neutral   → plain white
 */
type ReportSectionVariant = "scores" | "tips" | "strength" | "improve" | "recommend" | "progress" | "neutral";
interface ReportSectionProps {
    variant?: ReportSectionVariant;
    title: string;
    icon?: React.ReactNode;
    headerRight?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
declare function ReportSection({ variant, title, icon, headerRight, children, className, }: ReportSectionProps): react_jsx_runtime.JSX.Element;

/**
 * CardStack — quiz-flow card viewer. One card visible at a time,
 * full width, clean transition. No peeking, no stacking depth.
 *
 * Interaction:
 *  - Swipe left → next card (animate out left, next fades in)
 *  - Swipe right → previous card (go back)
 *  - Progress bar at top shows position
 *
 * Designed for minimal cognitive load — the user focuses on one
 * piece of information at a time.
 *
 * Usage with TranscriptDrawer:
 *   <div>
 *     <CardStack brand="consultflow">
 *       <ReportSection variant="scores" title="Wyniki">...</ReportSection>
 *       <ReportSection variant="tips" title="Wskazówki">...</ReportSection>
 *       <ReportSection variant="strength" title="Mocne strony">...</ReportSection>
 *     </CardStack>
 *     <TranscriptDrawer content={transcript} />
 *   </div>
 */
interface CardStackProps {
    children: React.ReactNode;
    onProgress?: (currentIndex: number, total: number) => void;
    brand?: "callflow" | "consultflow" | "shiftflow";
    className?: string;
}
declare function CardStack({ children, onProgress, brand, className, }: CardStackProps): react_jsx_runtime.JSX.Element;

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
interface TranscriptDrawerProps {
    /** Transcript text content. */
    content: string;
    /** Called when user copies transcript. */
    onCopy?: () => void;
    /** Label for collapsed state. */
    label?: string;
    className?: string;
}
declare function TranscriptDrawer({ content, onCopy, label, className, }: TranscriptDrawerProps): react_jsx_runtime.JSX.Element | null;

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
interface SetupStep {
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
interface SetupFlowProps {
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
declare function SetupFlow({ steps, onComplete, completeLabel, onCancel, brand, className, }: SetupFlowProps): react_jsx_runtime.JSX.Element;

/**
 * StaffRosterRow — single row in the schedule-editor staff list.
 *
 * Distinct from `TeamMemberRow` (dashboard KPI row): this is a dense
 * management roster used in the **schedule editor** to show 3 different
 * staff groups (doctors, assistants, receptionists) with the SAME layout
 * but DIFFERENT primary metrics relevant to each contract type.
 *
 * Usage anchors:
 *  - ShiftFlow US-SF-04 (zarządzanie profilami) — manager edits roster
 *  - ShiftFlow US-SF-06 (assistant shift preference)
 *  - ShiftFlow US-SF-08 (assistant hygiene capability)
 *
 * Slot-based — domain-agnostic. Each consuming app fills slots with
 * its own data:
 *
 *   • Doctors:        primaryMetric = planned hours / target
 *                     relationLine  = "always parallel with Dr X"
 *   • Assistants:     primaryMetric = preferred shift (🌅/🌇)
 *                     metricCaption = last shift type + day
 *                     relationLine  = primary doctor / secondary
 *   • Receptionists:  primaryMetric = next shift label
 *                     tags          = role (Główna / Backup)
 *
 * Density target: ~72 px row height with all slots filled.
 *
 * Role: MANAGER ONLY. Operators (doctor / assistant / receptionist views)
 * never see other team members' roster entries.
 */
type RosterTrend = "up" | "down" | "flat";
type RosterEmphasis = "none" | "warning" | "selected";
/** Re-exported `BadgeTone` so consuming apps can use a single import. */
type RosterTagTone = BadgeTone;
/**
 * `comfortable` — full row used in the main schedule editor column.
 * `compact`     — narrower tile used inside a side panel (~320–384 px):
 *                 smaller padding/font, no relation line, max 2 tags,
 *                 metric trend hidden. Same data, denser presentation.
 */
type RosterDensity = "comfortable" | "compact";
interface RosterTag {
    label: string;
    tone?: RosterTagTone;
}
interface RosterPrimaryMetric {
    /** Small label above the value, e.g. "h/mies" / "preferuje" / "zmiana" */
    label: string;
    /** The headline value — string or React node (icon/glyph) */
    value: React.ReactNode;
}
interface RosterRelationLine {
    icon?: React.ReactNode;
    text: string;
}
interface StaffRosterRowProps {
    /** Brand accent — affects nothing visually here (color comes from
     * accentColor), but kept for parity with other patterns. */
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Hex color from the database row (doctor/assistant/receptionist).
     * Drawn as a thin vertical bar on the left edge. */
    accentColor: string;
    name: string;
    /** Line under the name — role, specialty, available days. */
    subtitle?: string;
    /** Headline metric for this person. Always rendered on the right. */
    primaryMetric: RosterPrimaryMetric;
    /** Small caption under the metric — context for the value above. */
    metricCaption?: string;
    /** Trend arrow next to the value. */
    trend?: RosterTrend;
    /** Up to 3 badges shown under the subtitle. Extras are dropped. */
    tags?: RosterTag[];
    /** "Connection" line — partner doctor, assigned doctor, etc. */
    relationLine?: RosterRelationLine;
    /** Right-side action buttons (typically edit / delete). Click events
     * are stopped at this slot so they don't trigger the row's onClick. */
    actions?: React.ReactNode;
    /** Emphasis state — wraps the row in a colored border. Use "warning"
     * to flag attention (e.g. shift preference unmet) and "selected"
     * to mark the actively-edited row. */
    emphasis?: RosterEmphasis;
    /** Visual density. Default `comfortable`. Use `compact` inside a
     * side panel — drops relationLine + trend, caps tags at 2, shrinks
     * padding and typography. */
    density?: RosterDensity;
    onClick?: () => void;
    className?: string;
}
declare function StaffRosterRow({ accentColor, name, subtitle, primaryMetric, metricCaption, trend, tags, relationLine, actions, emphasis, density, onClick, className, }: StaffRosterRowProps): react_jsx_runtime.JSX.Element;

/**
 * StaffRosterPanel — wrapper around a list of `StaffRosterRow`s.
 *
 * Provides the consistent header (title + count + primary action),
 * a search/filter strip, and a footer for aggregate stats. Used in
 * the schedule-editor view to render three identical-looking panels
 * for doctors, assistants, and receptionists — manager learns one
 * mental model and reads three lists without context switching.
 *
 * Empty-state contract: when `children` is empty AND `emptyState` is
 * provided, the empty state is rendered in place of the list. Never
 * render an empty box (gherkin-enforced cross-app rule, see
 * EmptyState.tsx).
 */
interface RosterFilter {
    label: string;
    active: boolean;
    onToggle: () => void;
}
/**
 * `comfortable` — full panel for the main schedule editor column.
 * `compact`     — narrower spacing for use inside a side panel:
 *                 smaller header, no search/filter toolbar by default,
 *                 footer collapsed to a single line. Pair with
 *                 `density="compact"` on each `StaffRosterRow`.
 */
type RosterPanelDensity = "comfortable" | "compact";
interface StaffRosterPanelProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** "Lekarze" / "Asystentki" / "Recepcjonistki" (or app-specific). */
    title: string;
    /** Total count shown next to the title — usually the unfiltered total. */
    count: number;
    /** Toggleable filter chips above the list. */
    filters?: RosterFilter[];
    /** Search input value. Omit `onSearchChange` to hide the search field. */
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    /** Primary CTA in the header — typically "+ Dodaj". */
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    /** Aggregate stats line below the list. Plain text — no Card wrapper. */
    footer?: React.ReactNode;
    /** Rendered when `children` is empty. Pass an `<EmptyState />`. */
    emptyState?: React.ReactNode;
    /** Visual density. `compact` is intended for sidebar usage. */
    density?: RosterPanelDensity;
    children: React.ReactNode;
    className?: string;
}
declare function StaffRosterPanel({ brand, title, count, filters, searchValue, onSearchChange, searchPlaceholder, primaryAction, footer, emptyState, density, children, className, }: StaffRosterPanelProps): react_jsx_runtime.JSX.Element;

/**
 * WeekNavigator — toolbar for moving between weekly snapshots.
 *
 * Domain-agnostic: accepts pre-formatted labels, leaves date math to
 * the consuming app (which already has date-fns / dayjs / luxon).
 *
 * Use cases across receptionOS:
 *  - ShiftFlow: navigate between A/B-week schedules in the editor
 *  - CallFlow:  scrub through historic weekly coaching reports
 *  - ConsultFlow: weekly performance trend window
 *
 * Visual anatomy:
 *  [ ←  Pop. ]   [ 21–25.04.2026 · Tydzień A 🔒 ]   [ Nast. → ]
 *                                                        · [ Dziś ]
 *                                                        · [ + Zaplanuj ▾ ]
 *
 * The label slot (currentLabel + parityLabel + lock) is owned by the
 * caller — pass whatever date format suits the locale. Component
 * only handles layout, focus order, and the dropdown for generation
 * actions.
 */
interface WeekGenerateAction {
    label: string;
    weeksAhead: number;
    onClick: () => void;
}
interface WeekNavigatorProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Pre-formatted label for current week, e.g. "21–25.04.2026". */
    currentLabel: string;
    /** Optional secondary badge text, e.g. "Tydzień A" / "B". */
    parityLabel?: string;
    parityTone?: BadgeTone;
    /** When true, shows a lock glyph next to the label (historical week). */
    isReadOnly?: boolean;
    /** Disable the prev arrow (e.g. earliest week available). */
    prevDisabled?: boolean;
    /** Disable the next arrow (rare — usually next is always allowed). */
    nextDisabled?: boolean;
    /** Tooltip for the prev button — typically the previous week's label. */
    previousLabel?: string;
    /** Tooltip for the next button. */
    nextLabel?: string;
    onPrev: () => void;
    onNext: () => void;
    /** "Dziś" button — jump to current week. Hidden if not provided. */
    onToday?: () => void;
    /** Generation CTAs — typically "+1 tydzień" / "+2 tygodnie". */
    generateActions?: WeekGenerateAction[];
    className?: string;
}
declare function WeekNavigator({ brand, currentLabel, parityLabel, parityTone, isReadOnly, prevDisabled, nextDisabled, previousLabel, nextLabel, onPrev, onNext, onToday, generateActions, className, }: WeekNavigatorProps): react_jsx_runtime.JSX.Element;

export { type ActivityEntry, ActivityLog, type ActivityLogProps, type ActivityType, type AppBrand, type AppEntry, AppHeader, AppHeaderMenuItem, type AppHeaderMenuItemProps, type AppHeaderProps, AppSwitcher, type AppSwitcherProps, type AreaTrend, Badge, type BadgeProps, type BadgeTone, type BreakdownArea, Button, type ButtonProps, type ButtonVariant, Card, type CardProps, CardStack, type CardStackProps, DashboardHeader, type DashboardHeaderProps, DashboardLayout, type DashboardLayoutProps, type DeliveryStatus, EmptyState, type EmptyStateProps, type FeedDotColor, FeedRow, type FeedRowProps, type HeatmapMember, ImportActivityRow, type ImportActivityRowProps, type ImportActivityStatus, ImportBatchRow, type ImportBatchRowProps, type ImportBatchStatus, ImportDropZone, type ImportDropZoneProps, ImportPageLayout, type ImportPageLayoutProps, InboxNotification, type InboxNotificationProps, type InboxUrgency, Input, type InputProps, type MemberDeliveryBadge, type MemberDetailStatus, type MemberDetailTrend, MemberDetailView, type MemberDetailViewProps, type MemberStatus, type NavItem, type NotificationChannel, type OverviewArea, PageHeading, type PageHeadingProps, PerformanceOverview, type PerformanceOverviewProps, ProfileForm, type ProfileFormProps, type ProfileFormValue, ReportBreakdown, type ReportBreakdownProps, ReportCard, type ReportCardProps, type ReportCardStatus, ReportSection, type ReportSectionProps, type ReportSectionVariant, type RosterDensity, type RosterEmphasis, type RosterFilter, type RosterPanelDensity, type RosterPrimaryMetric, type RosterRelationLine, type RosterTag, type RosterTagTone, type RosterTrend, type ScoreCard, ScoreCardRow, type ScoreCardRowProps, SetupFlow, type SetupFlowProps, type SetupStep, SidePanel, type SidePanelProps, StaffRosterPanel, type StaffRosterPanelProps, StaffRosterRow, type StaffRosterRowProps, type Suggestion, SwipeView, type SwipeViewPage, type SwipeViewProps, TeamHeatmap, type TeamHeatmapProps, TeamMemberRow, type TeamMemberRowProps, TeamPanelFooter, type TeamPanelFooterProps, TeamPanelToolbar, type TeamPanelToolbarProps, TranscriptDrawer, type TranscriptDrawerProps, type Trend, type TrendAnnotation, TrendChart, type TrendChartProps, type TrendPoint, type TrendSeries, type WeekGenerateAction, WeekNavigator, type WeekNavigatorProps };
