import * as React from "react";
import { cn } from "../utils/cn";

export type AppBrand = "callflow" | "consultflow" | "shiftflow";

export interface AppEntry {
  key: AppBrand;
  label: string;
  url: string;
  description?: string;
}

export interface AppSwitcherProps {
  current: AppBrand;
  apps?: AppEntry[];
  className?: string;
}

const brandBg: Record<AppBrand, string> = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow",
};

const brandInitial: Record<AppBrand, string> = {
  callflow: "CF",
  consultflow: "Co",
  shiftflow: "SF",
};

const DEFAULT_APPS: AppEntry[] = [
  {
    key: "callflow",
    label: "CallFlow",
    url: "https://callflowai.pages.dev",
    description: "Analiza rozmów recepcji",
  },
  {
    key: "consultflow",
    label: "ConsultFlow",
    url: "https://consultflowai.pages.dev",
    description: "Analiza konsultacji lekarskich",
  },
  {
    key: "shiftflow",
    label: "ShiftFlow",
    url: "https://shiftflowai.pages.dev",
    description: "Grafiki i zmiany w klinice",
  },
];

export function AppSwitcher({
  current,
  apps = DEFAULT_APPS,
  className,
}: AppSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Przełącz aplikację"
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-input",
          "text-[14px] leading-[20px] font-medium text-ros-ink",
          "bg-transparent hover:bg-ros-surface-hover transition-colors duration-150",
          "border-none cursor-pointer",
        )}
      >
        <GridIcon />
        <span>Aplikacje</span>
        <ChevronDownIcon className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 top-[calc(100%+4px)] z-50 w-72",
            "bg-white border border-ros-border rounded-lg shadow-lg",
            "py-2 overflow-hidden",
          )}
        >
          {apps.map((app) => {
            const isCurrent = app.key === current;
            const content = (
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5",
                  "transition-colors duration-150",
                  isCurrent
                    ? "bg-ros-surface-hover cursor-default"
                    : "hover:bg-ros-surface-hover cursor-pointer",
                )}
              >
                <div
                  className={cn(
                    "size-8 rounded-input flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0",
                    brandBg[app.key],
                  )}
                  aria-hidden
                >
                  {brandInitial[app.key]}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] leading-[20px] font-semibold text-ros-ink">
                      {app.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] leading-[14px] text-ros-ink-muted font-medium">
                        · obecna
                      </span>
                    )}
                  </div>
                  {app.description && (
                    <span className="text-[12px] leading-[16px] text-ros-ink-muted truncate">
                      {app.description}
                    </span>
                  )}
                </div>
              </div>
            );

            if (isCurrent) {
              return (
                <div key={app.key} role="menuitem" aria-current="true">
                  {content}
                </div>
              );
            }

            return (
              <a
                key={app.key}
                href={app.url}
                role="menuitem"
                className="block no-underline text-inherit"
              >
                {content}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="4" height="4" rx="0.5" />
      <rect x="10" y="2" width="4" height="4" rx="0.5" />
      <rect x="2" y="10" width="4" height="4" rx="0.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
