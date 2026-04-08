/**
 * @receptionos/ui — Tailwind preset
 *
 * Locked tokens, extracted from `UI/design-system-audit/02-design-tokens.md`
 * + `05-rules-for-lovable.md`. These values are the contract — do not override
 * in consuming apps without explicit approval.
 *
 * Apps consume this preset in their tailwind.config:
 *   presets: [require("@receptionos/ui/tailwind-preset")]
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand accents per app (Krok 2 z planu R1+R2)
        brand: {
          callflow: "#2563eb",     // 🔵 baseline blue, locked from audit
          consultflow: "#7c3aed",  // 🟣 purple — only deviation allowed
          shiftflow: "#16a34a",    // 🟢 green — only deviation allowed
        },
        // Neutrals — locked across all apps
        ros: {
          ink: "#09090b",
          "ink-strong": "#18181b",
          "ink-medium": "#27272a",
          "ink-muted": "#71717a",
          "ink-faint": "#a1a1aa",
          surface: "#ffffff",
          "surface-off": "#fafafa",
          "surface-hover": "#f4f4f5",
          border: "#e4e4e7",
          "border-input": "#e5e5e5",
          "success-bg": "#ecfdf5",
          "success-fg": "#059669",
          "danger-bg": "#fff1f2",
          "danger-fg": "#e11d48",
          "warn-fg": "#f97316",
          "status-active": "#22c55e",
        },
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "24px",
        stat: "14px",
        input: "8px",
      },
      boxShadow: {
        subtle: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        card: "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.1)",
        dropdown: "0px 1px 1px 0px rgba(0,0,0,0.05)",
      },
    },
  },
};
