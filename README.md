# @receptionos/ui

Shared design system for the **receptionOS** platform — phase **R1** of the
[Plan implementacji R1+R2](../01-Plan-implementacji-R1-R2.pdf). This package
is consumed by the three Layer-5 apps:

| App | Brand | Repo | Persony |
|---|---|---|---|
| **CallFlow** | 🔵 `#2563eb` | `call-flow/` | Anna (recepcjonistka), Marta (manager) |
| **ConsultFlow** | 🟣 `#7c3aed` | `ConsultFlowAI/` | Dr Mazur (lekarz), Violetta (manager) |
| **ShiftFlow** | 🟢 `#16a34a` | `dental-shift-solver/` | Tomasz (manager), Dr Nowak (lekarz), Kasia (asystentka) |

## What this package contains (R1, v0.1.0)

```
src/
├── tokens/         # JS export of palette + radii — mirrors the Tailwind preset
├── primitives/     # Button · Card · Badge · Input
├── patterns/       # 6 cross-app shared screen patterns (see PATTERNS.md)
└── utils/          # cn() helper
```

## What this package does NOT contain — and why

- ❌ No data fetching, no auth, no router. Every app has its own backend
  (CallFlow + ShiftFlow → Supabase, ConsultFlow → Express + Drizzle); the
  shared package must stay framework-pure so Lovable / Replit can install it
  as a regular npm dependency without backend rewrites. This is the
  contract from `01-Plan-implementacji-R1-R2.pdf` → "Czego ten plan
  świadomie nie robi".
- ❌ No app-unique components. The drag-and-drop schedule editor
  (US-SF-01 sc.3) lives in ShiftFlow only and stays there.
- ❌ No `ReportBreakdown` (yet). It's only in CallFlow + ConsultFlow,
  fails the "all 3 apps" reuse threshold. Scheduled for v0.2.0.

## Sources of truth

When extending this package, always reference these files first:

| Question | File |
|---|---|
| What does this screen do? | `gherkin-callflow.pdf`, `gherkin-consultflow.pdf`, `gherkin-shiftflow.pdf` |
| Who sees this screen? | `PATTERNS.md` + `ROLES.md` (this repo) |
| What colors / radius / spacing? | `UI/design-system-audit/02-design-tokens.md` |
| What's already a reusable component? | `UI/design-system-audit/03-components.md` |
| What patterns are forbidden? | `UI/design-system-audit/05-rules-for-lovable.md` |
| Where does this screen sit in the app? | `UI/app-structure-reference/02-apps-logic-map.md` |

## Install (in each app)

```bash
bun add @receptionos/ui
```

`tailwind.config.ts`:
```ts
import preset from "@receptionos/ui/tailwind-preset";
export default { presets: [preset], content: [...] };
```

## Usage

```tsx
import { EmptyState, DashboardHeader, TrendChart } from "@receptionos/ui";

// Manager dashboard hero — US-SF-05 sc.1
<DashboardHeader
  brand="shiftflow"
  title="ShiftFlow — bieżący tydzień"
  metricLabel="Utilizacja foteli"
  metricValue="87%"
  delta="+12%"
/>

// Operator empty state — US-CF-02 sc.3
<EmptyState
  variant="operator"
  brand="callflow"
  title="Twój pierwszy raport pojawi się po pierwszej przeanalizowanej rozmowie"
  ctaLabel="Dowiedz się jak działa analiza"
  onCta={() => navigate("/help/callflow")}
/>
```
