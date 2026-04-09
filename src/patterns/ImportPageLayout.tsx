import * as React from "react";
import { cn } from "../utils/cn";
import { PageHeading } from "./PageHeading";

/**
 * ImportPageLayout — page-level wrapper for the Import tab.
 *
 * Composes PageHeading + a content area (ImportDropZone + ImportBatchRow
 * list). Ensures consistent vertical spacing and max-width across all
 * three receptionOS apps.
 *
 * Usage:
 *   <ImportPageLayout brand="callflow" title="Import rozmów" description="...">
 *     <ImportDropZone ... />
 *     <div className="space-y-2">
 *       {batches.map(b => <ImportBatchRow ... />)}
 *     </div>
 *   </ImportPageLayout>
 */
export interface ImportPageLayoutProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  title: string;
  description?: string;
  /** Right-aligned actions in the heading (e.g. help link). */
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ImportPageLayout({
  title,
  description,
  actions,
  children,
  className,
}: ImportPageLayoutProps) {
  return (
    <div className={cn("flex flex-col gap-6 max-w-2xl mx-auto", className)}>
      <PageHeading title={title} description={description} actions={actions} />
      {children}
    </div>
  );
}
