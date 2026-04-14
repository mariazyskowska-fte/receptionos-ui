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
 * ImportActivityRow — backward-compatible wrapper around FeedRow.
 * Use FeedRow directly in new code.
 *
 * @deprecated Use `FeedRow` from "receptionos-ui" instead.
 */
export type ImportActivityStatus = "sent" | "read" | "pending" | "done" | "analyzing" | "error";

export interface ImportActivityRowProps {
  label: string;
  detail?: string;
  timestamp?: string;
  status?: ImportActivityStatus;
  onClick?: () => void;
  className?: string;
}

const statusToDot: Record<ImportActivityStatus, FeedDotColor> = {
  sent: "orange",
  read: "green",
  pending: "orange",
  done: "green",
  analyzing: "orange",
  error: "red",
};

import { FeedRow, type FeedDotColor } from "./FeedRow";

export function ImportActivityRow({
  label,
  detail,
  timestamp,
  status,
  onClick,
  className,
}: ImportActivityRowProps) {
  return (
    <FeedRow
      text={label}
      detail={detail}
      timestamp={timestamp}
      dot={status ? statusToDot[status] : "gray"}
      onClick={onClick}
      className={className}
    />
  );
}
