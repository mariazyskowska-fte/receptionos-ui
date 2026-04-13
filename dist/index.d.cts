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
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** App name shown next to the logo mark. */
    appName: string;
    /** Optional subtitle under the app name. */
    appSubtitle?: string;
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
declare function AppHeader({ brand, appName, appSubtitle, navItems, activeKey, onNavigate, userName, userMenuContent, actions, className, }: AppHeaderProps): react_jsx_runtime.JSX.Element;
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
 * ImportActivityRow — single row in the Import panel's activity feed.
 *
 * Mirrors the compact style of TeamMemberRow but for event tracking:
 * status dot + label + detail + timestamp.
 *
 * Cross-app semantics:
 *  - CallFlow:    label=receptionist, detail=file, status=read/sent/error
 *  - ShiftFlow:   label=doctor, detail="Nieobecność"/"Zmiana preferencji",
 *                 status=pending/done
 *  - ConsultFlow: label=doctor, detail="Upload audio", status=analyzing/done/error
 */
type ImportActivityStatus = "sent" | "read" | "pending" | "done" | "analyzing" | "error";
interface ImportActivityRowProps {
    /** Person or entity name. */
    label: string;
    /** Event description. */
    detail?: string;
    /** Timestamp string. */
    timestamp?: string;
    status?: ImportActivityStatus;
    /** Called when row is clicked (e.g. to open detail). */
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
    className?: string;
}
declare function ReportBreakdown({ brand, title, overallScore, previousOverallScore, areas, suggestions, maxSuggestions, className, }: ReportBreakdownProps): react_jsx_runtime.JSX.Element;

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
 * PerformanceOverview — aggregated area scores for a team member
 * across multiple reports/consultations over a time period.
 *
 * Contrast with ReportBreakdown:
 *  - ReportBreakdown = ONE report, exact scores, transcript quotes,
 *    "co poprawić na następny raz"
 *  - PerformanceOverview = AGGREGATE over period, trend per area,
 *    "jak się rozwijasz w czasie"
 *
 * Source user stories:
 *  - ConsultFlow: US-CO-05 sc.3 — "pełna historia trendów i podsumowania
 *                 raportów z ostatnich 3 miesięcy"
 *  - ConsultFlow: US-CO-03 sc.1 — trend z adnotacjami
 *  - CallFlow:    US-CF-04 sc.1 — manager widzi "aktualny Empathy Score,
 *                 trend ↑/↓ i status ✓/❗" per recepcjonistka
 *
 * Visual pattern: same horizontal card grid as ReportBreakdown, but
 * each card shows average + trend arrow + report count instead of
 * exact score + transcript quote.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────────┐
 *   │ Wyniki — ostatnie 3 miesiące          Średnia: 7.4     │
 *   ├─────────────────────────────────────────────────────────┤
 *   │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
 *   │ │Komplet.  │ │ Wartość  │ │ Obiekcje │ │ CTA      │   │
 *   │ │ 8.2  ✓ ↑ │ │ 7.1  ✓ → │ │ 4.8  ❗ ↓│ │ 6.9  ✓ ↑ │   │
 *   │ │████████░ │ │███████░░ │ │████░░░░░ │ │██████░░░ │   │
 *   │ │12 raportów│ │śr. +0.4  │ │śr. -1.2  │ │8 raportów│   │
 *   │ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
 *   ├─────────────────────────────────────────────────────────┤
 *   │ Mocne: Kompletność, CTA                                │
 *   │ Do poprawy: Obiekcje (najsłabszy, trend ↓)            │
 *   └─────────────────────────────────────────────────────────┘
 */
type AreaTrend = "up" | "down" | "flat";
interface OverviewArea {
    name: string;
    /** Average score 0–100 over the period. */
    avgScore: number;
    /** Average score in previous period (for delta). */
    prevAvgScore?: number;
    /** Trend direction. */
    trend?: AreaTrend;
    /** Number of data points (reports/consultations) that contributed. */
    dataPoints?: number;
}
interface PerformanceOverviewProps {
    brand?: "callflow" | "consultflow" | "shiftflow";
    /** Header title, e.g. "Wyniki — ostatnie 3 miesiące". */
    title?: string;
    /** Period label shown in subtitle, e.g. "sty–mar 2026". */
    periodLabel?: string;
    /** Overall average across all areas. */
    overallAvg?: number;
    /** Previous period overall average. */
    prevOverallAvg?: number;
    /** Aggregated area data. */
    areas: OverviewArea[];
    /** Total reports/consultations in this period. */
    totalReports?: number;
    className?: string;
}
declare function PerformanceOverview({ brand, title, periodLabel, overallAvg, prevOverallAvg, areas, totalReports, className, }: PerformanceOverviewProps): react_jsx_runtime.JSX.Element;

/**
 * DashboardLayout — two-column manager dashboard.
 *
 *   ┌──────────────────────────────┬──────────────────┐
 *   │  MAIN (flex-1)              │  panelToolbar     │
 *   │  DashboardHeader            │  ──────────────── │
 *   │  TrendChart                 │  TeamMemberRow ☑  │
 *   │  TeamHeatmap                │  TeamMemberRow ☐  │
 *   │                             │  TeamMemberRow ☑  │
 *   │                             │  ──────────────── │
 *   │                             │  [Wyślij do 2]    │
 *   └──────────────────────────────┴──────────────────┘
 *
 * Panel supports:
 *  - panelToolbar: select all, count, filter
 *  - panelFooter: bulk action button (send schedule/report)
 */
interface DashboardLayoutProps {
    children: React.ReactNode;
    /** Right panel content: TeamMemberRow list. */
    panel: React.ReactNode;
    panelTitle?: string;
    /** Toolbar above the list (select all toggle, count info). */
    panelToolbar?: React.ReactNode;
    /** Footer below the list (bulk action button). */
    panelFooter?: React.ReactNode;
    className?: string;
}
declare function DashboardLayout({ children, panel, panelTitle, panelToolbar, panelFooter, className, }: DashboardLayoutProps): react_jsx_runtime.JSX.Element;
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
 * ActivityLog — chronological timeline of events for a team member,
 * shown inside MemberDetailView.
 *
 * Cross-app usage:
 *  - ShiftFlow: schedule deliveries, AI suggestions, days off requests
 *    (US-SF-02 sc.1 "grafik gotowy", US-SF-03 sc.1 "zgłasza nieobecność",
 *     US-SF-03 sc.2 "zaktualizował preferencje")
 *  - CallFlow: report generations, feedback given, coaching sessions
 *    (US-CF-02 sc.1 "raport gotowy", US-CF-04 sc.2 "omówiona")
 *  - ConsultFlow: consultation uploads, report deliveries, coaching notes
 *    (US-CO-02 sc.1 "raport gotowy", US-CO-05 sc.3 "notatka coachingowa")
 */
type ActivityType = "report_sent" | "report_viewed" | "schedule_sent" | "schedule_confirmed" | "absence" | "preference_change" | "coaching_note" | "suggestion" | "feedback" | "custom";
interface ActivityEntry {
    type: ActivityType;
    /** Short description, e.g. "Wysłano grafik na tydzień 14–18 kwi". */
    text: string;
    /** ISO timestamp or display string. */
    timestamp: string;
    /** Optional extra detail shown below the text. */
    detail?: string;
    /** Custom icon label override. */
    iconLabel?: string;
}
interface ActivityLogProps {
    entries: ActivityEntry[];
    /** Max entries to show before "Pokaż więcej". 0 = show all. */
    maxVisible?: number;
    className?: string;
}
declare function ActivityLog({ entries, maxVisible, className, }: ActivityLogProps): react_jsx_runtime.JSX.Element;

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
 * ReportSection — unified card for report detail sections.
 * Each section has the same shape as PerformanceOverview (rounded-card,
 * header row, content) but with a subtle color accent that signals
 * the section's purpose.
 *
 * Variants:
 *  - scores    → neutral white (default, for ReportBreakdown)
 *  - tips      → warm orange tint (quick tips, "na następny raz")
 *  - strength  → green tint (mocne strony)
 *  - improve   → orange tint (do poprawy)
 *  - recommend → brand tint (rekomendacje)
 *  - progress  → purple tint (postęp vs. poprzednie)
 *  - neutral   → plain white (generic)
 *
 * Note: transcript is NOT a variant here — use TranscriptDrawer
 * as a separate bottom sheet component instead.
 *
 * All variants share:
 *  - Same rounded-card border radius (24px)
 *  - Same padding
 *  - Same header typography (13px semibold + optional icon)
 *  - Left color bar (4px) for variant identification
 */
type ReportSectionVariant = "scores" | "tips" | "strength" | "improve" | "recommend" | "progress" | "transcript" | "neutral";
interface ReportSectionProps {
    variant?: ReportSectionVariant;
    /** Section title shown in header. */
    title: string;
    /** Icon rendered before the title (16px recommended). */
    icon?: React.ReactNode;
    /** Optional right-side header content (badge, button). */
    headerRight?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
declare function ReportSection({ variant, title, icon, headerRight, children, className, }: ReportSectionProps): react_jsx_runtime.JSX.Element;

/**
 * CardStack — swipe-to-dismiss card stack for report details.
 *
 * Cards have fixed width (100% of container) and fixed shape.
 * No scaling — all cards are the same size. Cards beneath the top
 * one peek with a small Y offset showing their accent color bar.
 *
 * Swipe left → dismiss top card, reveal next.
 * Progress dots track reading progress.
 *
 * Transcript is NOT part of this stack — use TranscriptDrawer
 * separately as a bottom sheet.
 */
interface CardStackProps {
    children: React.ReactNode;
    /** Called when active card changes. */
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

export { type ActivityEntry, ActivityLog, type ActivityLogProps, type ActivityType, AppHeader, AppHeaderMenuItem, type AppHeaderMenuItemProps, type AppHeaderProps, type AreaTrend, Badge, type BadgeProps, type BadgeTone, type BreakdownArea, Button, type ButtonProps, type ButtonVariant, Card, type CardProps, CardStack, type CardStackProps, DashboardHeader, type DashboardHeaderProps, DashboardLayout, type DashboardLayoutProps, type DeliveryStatus, EmptyState, type EmptyStateProps, type HeatmapMember, ImportActivityRow, type ImportActivityRowProps, type ImportActivityStatus, ImportBatchRow, type ImportBatchRowProps, type ImportBatchStatus, ImportDropZone, type ImportDropZoneProps, ImportPageLayout, type ImportPageLayoutProps, InboxNotification, type InboxNotificationProps, type InboxUrgency, Input, type InputProps, type MemberDeliveryBadge, type MemberDetailStatus, type MemberDetailTrend, MemberDetailView, type MemberDetailViewProps, type MemberStatus, type NavItem, type NotificationChannel, type OverviewArea, PageHeading, type PageHeadingProps, PerformanceOverview, type PerformanceOverviewProps, ProfileForm, type ProfileFormProps, type ProfileFormValue, ReportBreakdown, type ReportBreakdownProps, ReportCard, type ReportCardProps, type ReportCardStatus, ReportSection, type ReportSectionProps, type ReportSectionVariant, type ScoreCard, ScoreCardRow, type ScoreCardRowProps, type Suggestion, SwipeView, type SwipeViewPage, type SwipeViewProps, TeamHeatmap, type TeamHeatmapProps, TeamMemberRow, type TeamMemberRowProps, TeamPanelFooter, type TeamPanelFooterProps, TeamPanelToolbar, type TeamPanelToolbarProps, TranscriptDrawer, type TranscriptDrawerProps, type Trend, type TrendAnnotation, TrendChart, type TrendChartProps, type TrendPoint };
