import * as React from "react";
import { cn } from "../utils/cn";
import { Button } from "../primitives/Button";

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
export interface ImportDropZoneProps {
  brand?: "callflow" | "consultflow" | "shiftflow";
  /** Accepted file types, e.g. ".csv" or ".mp3,.wav,.m4a,audio/*" */
  accept?: string;
  /** Human-readable description of accepted formats. */
  acceptLabel?: string;
  /** Max file size in bytes. Shown as helper text. */
  maxSize?: number;
  /** Currently selected file. When set, renders file preview instead of drop area. */
  selectedFile?: { name: string; size: number } | null;
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

const brandAccent: Record<NonNullable<ImportDropZoneProps["brand"]>, string> = {
  callflow: "border-brand-callflow/30 bg-blue-50/30",
  consultflow: "border-brand-consultflow/30 bg-purple-50/30",
  shiftflow: "border-brand-shiftflow/30 bg-green-50/30",
};

const brandIcon: Record<NonNullable<ImportDropZoneProps["brand"]>, string> = {
  callflow: "text-brand-callflow",
  consultflow: "text-brand-consultflow",
  shiftflow: "text-brand-shiftflow",
};

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function ImportDropZone({
  brand = "callflow",
  accept,
  acceptLabel,
  maxSize,
  selectedFile,
  progress = 0,
  progressLabel,
  onFileSelect,
  onRemove,
  submitLabel = "Wgraj",
  onSubmit,
  disabled,
  children,
  className,
}: ImportDropZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = React.useState(false);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect?.(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onFileSelect?.(file);
  }

  const isUploading = progress > 0 && progress < 100;

  return (
    <div
      className={cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-4",
        className,
      )}
    >
      {/* Drop area or file preview */}
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3 py-10 px-6 rounded-input border-2 border-dashed cursor-pointer transition-colors duration-150",
            dragOver
              ? brandAccent[brand]
              : "border-ros-border hover:border-ros-ink-faint hover:bg-ros-surface-off",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          role="button"
          tabIndex={0}
          aria-label="Wybierz plik"
        >
          <div className={cn("size-10 flex items-center justify-center", brandIcon[brand])}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-[14px] leading-[20px] font-medium text-ros-ink">
              Przeciągnij plik lub kliknij, aby wybrać
            </p>
            {acceptLabel && (
              <p className="text-[12px] leading-[16px] text-ros-ink-muted mt-1">
                {acceptLabel}
              </p>
            )}
            {maxSize && (
              <p className="text-[12px] leading-[16px] text-ros-ink-faint mt-0.5">
                Maks. {formatSize(maxSize)}
              </p>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
            aria-hidden
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 rounded-input bg-ros-surface-off border border-ros-border">
          <div className="flex items-center gap-3 min-w-0">
            <div className={cn("size-8 flex items-center justify-center flex-shrink-0", brandIcon[brand])}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[14px] leading-[20px] font-medium text-ros-ink truncate">
                {selectedFile.name}
              </p>
              <p className="text-[12px] leading-[16px] text-ros-ink-muted">
                {formatSize(selectedFile.size)}
              </p>
            </div>
          </div>
          {!isUploading && (
            <button
              type="button"
              onClick={onRemove}
              disabled={disabled}
              className="size-8 flex items-center justify-center rounded-input text-ros-ink-muted hover:text-ros-ink hover:bg-ros-surface-hover transition-colors duration-150 flex-shrink-0 border-none bg-transparent cursor-pointer"
              aria-label="Usuń plik"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Progress bar */}
      {isUploading && (
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-1.5 bg-ros-surface-off rounded-pill overflow-hidden">
            <div
              className={cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`)}
              style={{ width: `${progress}%` }}
            />
          </div>
          {progressLabel && (
            <p className="text-[12px] leading-[16px] text-ros-ink-muted">
              {progressLabel}
            </p>
          )}
        </div>
      )}

      {/* Extra fields (metadata, selectors, etc.) */}
      {children}

      {/* Submit */}
      {selectedFile && onSubmit && !isUploading && (
        <Button brand={brand} onClick={onSubmit} disabled={disabled} className="w-full">
          {submitLabel}
        </Button>
      )}
    </div>
  );
}
