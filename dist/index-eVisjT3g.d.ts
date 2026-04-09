/**
 * Design tokens — single source of truth for runtime access.
 *
 * These mirror `tailwind.preset.cjs` but as JS values, so non-Tailwind
 * code (e.g. inline styles for chart colors) can read the same palette.
 *
 * Source: UI/design-system-audit/02-design-tokens.md
 *         UI/design-system-audit/05-rules-for-lovable.md
 */
declare const brandColors: {
    readonly callflow: "#2563eb";
    readonly consultflow: "#7c3aed";
    readonly shiftflow: "#16a34a";
};
type BrandKey = keyof typeof brandColors;
declare const palette: {
    readonly ink: "#09090b";
    readonly inkStrong: "#18181b";
    readonly inkMedium: "#27272a";
    readonly inkMuted: "#71717a";
    readonly inkFaint: "#a1a1aa";
    readonly surface: "#ffffff";
    readonly surfaceOff: "#fafafa";
    readonly surfaceHover: "#f4f4f5";
    readonly border: "#e4e4e7";
    readonly borderInput: "#e5e5e5";
    readonly successBg: "#ecfdf5";
    readonly successFg: "#059669";
    readonly dangerBg: "#fff1f2";
    readonly dangerFg: "#e11d48";
    readonly warnFg: "#f97316";
    readonly statusActive: "#22c55e";
};
declare const radii: {
    readonly pill: 9999;
    readonly card: 24;
    readonly stat: 14;
    readonly input: 8;
};
declare const spacing: readonly [2, 4, 6, 8, 12, 16, 20, 24, 32, 40];

type index_BrandKey = BrandKey;
declare const index_brandColors: typeof brandColors;
declare const index_palette: typeof palette;
declare const index_radii: typeof radii;
declare const index_spacing: typeof spacing;
declare namespace index {
  export { type index_BrandKey as BrandKey, index_brandColors as brandColors, index_palette as palette, index_radii as radii, index_spacing as spacing };
}

export { type BrandKey as B, brandColors as b, index as i, palette as p, radii as r, spacing as s };
