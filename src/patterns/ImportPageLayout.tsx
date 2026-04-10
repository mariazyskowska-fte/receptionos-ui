import * as React from "react";
import { cn } from "../utils/cn";
import { PageHeading } from "./PageHeading";

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
export interface ImportPageLayoutProps {
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

export function ImportPageLayout({
  title,
  description,
  actions,
  children,
  panel,
  panelTitle = "Aktywność",
  className,
}: ImportPageLayoutProps) {
  // If no panel, fall back to single-column centered layout
  if (!panel) {
    return (
      <div className={cn("flex flex-col gap-6 max-w-2xl mx-auto", className)}>
        <PageHeading title={title} description={description} actions={actions} />
        {children}
      </div>
    );
  }

  return (
    <div className={cn("flex gap-6 items-start", className)}>
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <PageHeading title={title} description={description} actions={actions} />
        {children}
      </div>

      {/* Right panel — activity feed */}
      <aside className="w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-ros-border">
          <p className="text-[14px] leading-[20px] font-semibold text-ros-ink">
            {panelTitle}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {panel}
        </div>
      </aside>
    </div>
  );
}

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
export type ImportActivityStatus = "sent" | "read" | "pending" | "done" | "analyzing" | "error";

export interface ImportActivityRowProps {
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

const statusDot: Record<ImportActivityStatus, { color: string; title: string }> = {
  sent: { color: "bg-ros-warn-fg", title: "Wysłano" },
  read: { color: "bg-ros-success-fg", title: "Odczytano" },
  pending: { color: "bg-ros-warn-fg", title: "Oczekuje" },
  done: { color: "bg-ros-success-fg", title: "Zrealizowano" },
  analyzing: { color: "bg-ros-warn-fg", title: "Analizuję" },
  error: { color: "bg-ros-danger-fg", title: "Błąd" },
};

export function ImportActivityRow({
  label,
  detail,
  timestamp,
  status,
  onClick,
  className,
}: ImportActivityRowProps) {
  const dot = status ? statusDot[status] : null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-input transition-colors duration-150",
        onClick && "cursor-pointer hover:bg-ros-surface-hover",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Status dot */}
      {dot && (
        <span
          className={cn("size-2 rounded-pill flex-shrink-0", dot.color)}
          title={dot.title}
        />
      )}

      {/* Content */}
      <div className="flex flex-col gap-0 flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] font-medium text-ros-ink truncate">{label}</p>
        </div>
        {detail && (
          <p className="text-[11px] text-ros-ink-muted truncate">{detail}</p>
        )}
      </div>

      {/* Timestamp */}
      {timestamp && (
        <span className="text-[11px] text-ros-ink-faint flex-shrink-0">
          {timestamp}
        </span>
      )}
    </div>
  );
}
