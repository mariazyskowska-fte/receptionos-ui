/**
 * Design tokens — single source of truth for runtime access.
 *
 * These mirror `tailwind.preset.cjs` but as JS values, so non-Tailwind
 * code (e.g. inline styles for chart colors) can read the same palette.
 *
 * Source: UI/design-system-audit/02-design-tokens.md
 *         UI/design-system-audit/05-rules-for-lovable.md
 */

export const brandColors = {
  callflow: "#2563eb",
  consultflow: "#7c3aed",
  shiftflow: "#16a34a",
} as const;

export type BrandKey = keyof typeof brandColors;

export const palette = {
  ink: "#09090b",
  inkStrong: "#18181b",
  inkMedium: "#27272a",
  inkMuted: "#71717a",
  inkFaint: "#a1a1aa",
  surface: "#ffffff",
  surfaceOff: "#fafafa",
  surfaceHover: "#f4f4f5",
  border: "#e4e4e7",
  borderInput: "#e5e5e5",
  successBg: "#ecfdf5",
  successFg: "#059669",
  dangerBg: "#fff1f2",
  dangerFg: "#e11d48",
  warnFg: "#f97316",
  statusActive: "#22c55e",
} as const;

export const radii = {
  pill: 9999,
  card: 24,
  stat: 14,
  input: 8,
} as const;

export const spacing = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40] as const;
