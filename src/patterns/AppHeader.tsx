import * as React from "react";
import { cn } from "../utils/cn";
import type { AppBrand, AppEntry } from "./AppSwitcher";

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

export interface NavItem {
  /** Unique key for matching active state. */
  key: string;
  label: string;
  /** Optional badge count (e.g. "Tasks (3)"). */
  badge?: number;
  /** Icon rendered before the label — 16px recommended. */
  icon?: React.ReactNode;
}

export interface AppHeaderProps {
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

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AppHeader({
  brand = "callflow",
  appName,
  appSubtitle,
  apps,
  navItems,
  activeKey,
  onNavigate,
  userName,
  userMenuContent,
  actions,
  className,
}: AppHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [appMenuOpen, setAppMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const appMenuRef = React.useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  React.useEffect(() => {
    if (!userMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // Close app switcher dropdown on outside click + Escape
  React.useEffect(() => {
    if (!appMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        appMenuRef.current &&
        !appMenuRef.current.contains(e.target as Node)
      ) {
        setAppMenuOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAppMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [appMenuOpen]);

  const otherApps = React.useMemo(
    () => (apps ?? []).filter((a) => a.key !== brand),
    [apps, brand],
  );
  const hasAppSwitcher = otherApps.length > 0;

  const logoInner = (
    <>
      <div
        className={cn(
          "size-8 rounded-input flex items-center justify-center text-white text-[12px] font-bold",
          brandBg[brand],
        )}
        aria-hidden
      >
        {appName
          .split(/(?=[A-Z])/)[0]
          ?.slice(0, 2)
          .toUpperCase() ?? "??"}
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[14px] leading-[20px] font-semibold text-ros-ink">
          {appName}
        </span>
        {appSubtitle && (
          <span className="text-[12px] leading-[16px] text-ros-ink-muted">
            {appSubtitle}
          </span>
        )}
      </div>
      {hasAppSwitcher && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="#a1a1aa"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform duration-150",
            appMenuOpen && "rotate-180",
          )}
          aria-hidden
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      )}
    </>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full bg-white border-b border-ros-border",
        className,
      )}
    >
      <div className="flex items-center justify-between h-full px-6 max-w-full">
        {/* Left: logo + nav */}
        <div className="flex items-center gap-6 min-w-0">
          {/* Logo mark + app name (with optional app-switcher dropdown) */}
          {hasAppSwitcher ? (
            <div className="relative flex-shrink-0" ref={appMenuRef}>
              <button
                type="button"
                onClick={() => setAppMenuOpen((v) => !v)}
                aria-label="Przełącz aplikację"
                aria-expanded={appMenuOpen}
                aria-haspopup="menu"
                className={cn(
                  "flex items-center gap-3 px-2 py-1 -ml-2 rounded-input",
                  "bg-transparent hover:bg-ros-surface-hover transition-colors duration-150",
                  "border-none cursor-pointer text-left",
                )}
              >
                {logoInner}
              </button>

              {appMenuOpen && (
                <div
                  role="menu"
                  aria-label="Inne aplikacje receptionOS"
                  className={cn(
                    "absolute left-0 top-[calc(100%+4px)] z-50 w-72",
                    "bg-white border border-ros-border rounded-lg shadow-lg",
                    "py-2 overflow-hidden",
                  )}
                >
                  <div className="px-3 py-1.5 text-[11px] leading-[14px] uppercase tracking-wide font-semibold text-ros-ink-muted">
                    Przełącz aplikację
                  </div>
                  {otherApps.map((app) => (
                    <a
                      key={app.key}
                      href={app.url}
                      role="menuitem"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 no-underline text-inherit",
                        "hover:bg-ros-surface-hover transition-colors duration-150 cursor-pointer",
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
                        <span className="text-[14px] leading-[20px] font-semibold text-ros-ink">
                          {app.label}
                        </span>
                        {app.description && (
                          <span className="text-[12px] leading-[16px] text-ros-ink-muted truncate">
                            {app.description}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-shrink-0">
              {logoInner}
            </div>
          )}

          {/* Nav tabs */}
          {navItems && navItems.length > 0 && (
            <nav className="flex items-center gap-[2px]" aria-label="Nawigacja główna">
              {navItems.map((item) => {
                const isActive = item.key === activeKey;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onNavigate?.(item.key)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2.5 rounded-input text-[14px] leading-[20px] font-medium transition-colors duration-150 border-none bg-transparent cursor-pointer",
                      isActive
                        ? "text-ros-ink-medium"
                        : "text-ros-ink-muted hover:bg-ros-surface-hover",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon}
                    <span>
                      {item.label}
                      {item.badge != null && item.badge > 0 && (
                        <span className="text-ros-ink-muted"> ({item.badge})</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right: actions + user menu */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}

          {userName && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-2 rounded-input bg-white hover:bg-ros-surface-hover active:bg-ros-border transition-colors duration-150 border-none cursor-pointer"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <div
                  className={cn(
                    "size-8 rounded-pill flex items-center justify-center text-white text-[14px] font-bold",
                    brandBg[brand],
                  )}
                >
                  {getInitials(userName)}
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {userMenuOpen && userMenuContent && (
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-input border border-ros-border shadow-card p-1 z-50">
                  {userMenuContent}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/**
 * AppHeaderMenuItem — helper for items inside the user dropdown.
 * Follows the dropdown item spec: rounded-[6px], 14px text, hover bg.
 */
export interface AppHeaderMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  icon?: React.ReactNode;
}

export function AppHeaderMenuItem({
  danger,
  icon,
  children,
  className,
  ...rest
}: AppHeaderMenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-[14px] leading-[20px] font-medium text-left transition-colors duration-150 border-none bg-transparent cursor-pointer",
        danger
          ? "text-ros-danger-fg hover:bg-ros-danger-bg"
          : "text-ros-ink hover:bg-ros-surface-hover",
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
