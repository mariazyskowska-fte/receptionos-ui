# Comparison: `@receptionos/ui` vs current apps

> Audit date: 2026-04-08. Compares this package's 6 patterns + 4 primitives
> against what is **already implemented** in the three Layer-5 apps:
> `call-flow/`, `ConsultFlowAI/`, `dental-shift-solver/`.
>
> Sources used for the audit:
> - `gherkin-{callflow,consultflow,shiftflow}.pdf` — contract for what the
>   screen should do
> - `UI/design-system-audit/{02-tokens,03-components,05-rules-for-lovable}.md`
>   — contract for how the screen should look
> - Direct read of `src/components/**` and `src/pages/**` in each app

## TL;DR

| Layer | Status across apps | Action |
|---|---|---|
| **Token primitives (button, card, input, badge)** | All 3 apps ship full **shadcn/ui** kit. **Drift from locked rules:** shadcn `Button` is `rounded-md`, audit demands `rounded-pill`. | Replace `import { Button } from "@/components/ui/button"` with `@receptionos/ui` Button — or override the shadcn variant to `rounded-full`. |
| **EmptyState** | **Not implemented in any app.** Gherkin contract is therefore violated 3×. | Adopt `@receptionos/ui` EmptyState immediately. High-impact, low-risk change. |
| **ProfileForm** | ShiftFlow has a **600+ line** `ReceptionistManagementPanel.tsx`; CallFlow + ConsultFlow have ad-hoc forms. None enforce the "Wybierz kanał powiadomień" validation literal. | Refactor toward `ProfileForm`. Keep app-specific extras (color picker, preferred-hours grid) outside the shared component. |
| **TrendChart** | ConsultFlow has `ScoreChart.tsx`; CallFlow + ShiftFlow have **none**. | Adopt `@receptionos/ui` TrendChart in CallFlow + ShiftFlow first; migrate ConsultFlow's `ScoreChart` later. |
| **DashboardHeader** | ConsultFlow has `DashboardStats.tsx` (4-card grid). CallFlow has only a back button + title row. ShiftFlow's manager view is a free-form layout. | Replace each one with `DashboardHeader`. The 4-card grid in ConsultFlow contradicts the gherkin: every gherkin specifies exactly **one** "główna metryka". |
| **InboxNotification** | **Not present in any app.** The Omnichannel Inbox is a platform-shell concept; the layer-5 apps don't render it themselves. | Defer adoption until the platform shell exists. The component is built into `@receptionos/ui` so it's ready to drop in. |
| **TeamMemberRow** | CallFlow uses `ReportsTable` (a per-report table, not a per-person list). ConsultFlow's "DashboardStats" doesn't list people. ShiftFlow has no team list at all. | Adopt `@receptionos/ui` TeamMemberRow — currently **all three apps fail to satisfy the gherkin contract** for the manager dashboard list. |

---

## Detailed comparison per pattern

### 1. EmptyState

**Gherkin contract** (verbatim, 3×):
> *"But nie widzi pustej tabeli ani komunikatu błędu"*

| App | Current state | Verdict |
|---|---|---|
| `call-flow/src/pages/CoachingReportView.tsx` | Renders an empty table when there are no reports | ❌ Direct violation of US-CF-02 sc.3 |
| `ConsultFlowAI/client/src/pages/consultations.tsx` | Shows skeleton on load, no first-time empty state | ❌ Violation of US-CO-02 sc.4 |
| `dental-shift-solver/src/pages/Index.tsx` | Calendar grid renders blank cells | ❌ Violation of US-SF-02 sc.3 |

**Recommendation: REPLACE.** Drop `<EmptyState>` from `@receptionos/ui` into
each "first time" route. Use the literal Polish copy from the gherkin
(already pre-quoted in `PATTERNS.md`).

### 2. ProfileForm

| App | Current file | LOC | Notes |
|---|---|---|---|
| CallFlow | (no dedicated file — managed through Supabase auth profiles) | — | Doesn't model the gherkin US-CF-05 admin flow |
| ConsultFlow | (no dedicated file) | — | Manager UI not yet implemented |
| ShiftFlow | `src/components/staff/ReceptionistManagementPanel.tsx` | ~600 | Has ad-hoc form with color picker, preferred-hours, role select |

**The ShiftFlow form is a superset** — it has fields the gherkin doesn't
mention (`color`, `preferredHours`, `availableDays`, `maxHoursPerDay`). These
are legitimate ShiftFlow extensions, but the **shared base** (firstName,
lastName, notificationChannel, validation) should come from
`@receptionos/ui`'s `ProfileForm`. The extras can wrap or extend it.

**Drift to fix:** none of the three forms enforce the cross-app validation
literal *"Wybierz kanał powiadomień"*. Adopting `ProfileForm` fixes that
in one line.

**Recommendation: REFACTOR** ShiftFlow's panel to compose
`<ProfileForm extraFieldLabel="Specjalizacja">` + the schedule-specific
extensions. Build the missing CallFlow + ConsultFlow forms on the same
base.

### 3. TrendChart

| App | Current file | Verdict |
|---|---|---|
| CallFlow | None | ❌ US-CF-03 not implemented |
| ConsultFlow | `src/components/ScoreChart.tsx` | ⚠️ Implemented but does not model annotations or insufficient-data state |
| ShiftFlow | None | ❌ US-SF-05 trend not implemented (only point-in-time utilization) |

**Drift to fix in ConsultFlow's ScoreChart:**
- Missing `annotations` (gherkin US-CO-03 sc.1: *"adnotacja: 'Wzrost o [X]
  pkt po zastosowaniu techniki z dnia [data]'"*)
- Missing insufficient-data branch (US-CF-03 sc.2 — needs `minPoints` gate)
- Missing anonymized benchmark line (US-CO-03 sc.3)

**Recommendation: REPLACE** in CallFlow + ShiftFlow.
**REFACTOR** in ConsultFlow: deprecate `ScoreChart` and migrate to
`@receptionos/ui`'s `TrendChart`. The contracts the existing component
misses are not optional — they are gherkin-mandated.

### 4. DashboardHeader

| App | Current state |
|---|---|
| CallFlow | `ManagerDashboard.tsx` lines 41–54 — ad-hoc back button + title + subtitle row, **no headline KPI**. |
| ConsultFlow | `DashboardStats.tsx` — **4 stat cards in a grid**: Konsultacje / Średnia ocena / Trend / Spostrzeżenia. |
| ShiftFlow | No equivalent. |

**Critical contradiction with gherkins:** Every gherkin Manager Dashboard
scenario opens with **one** main metric:
- *"Team Health Score jako główną metrykę"* (US-CF-04)
- *"nagłówkową metrykę: 'Avg Conversion Rate: [X]%'"* (US-CO-05)
- *"nagłówkową metrykę: 'Utilizacja foteli: [X]%'"* (US-SF-05)

ConsultFlow's 4-card grid is **the wrong shape**. It buries the headline
metric among three peers, violating the gherkin "headline" intent.

**Recommendation: REPLACE in all 3 apps.** Use one `DashboardHeader` for
the headline; keep the 4-card grid in ConsultFlow as a *secondary* row
**below** the header, not in place of it.

### 5. InboxNotification

| App | Current state |
|---|---|
| All 3 | **Not implemented at the layer-5 level.** Correct — the Omnichannel Inbox lives in the platform shell (`UI/app-structure-reference/01-platform-screen-map.md` § Tasks). |

**Verdict: DO NOT PORT YET.** The component exists in `@receptionos/ui` so
it's ready when the platform shell repo lands, but no app-side action is
needed today. If we wanted a quick win, we could ship a "Powiadomienia"
banner inside each app using this component.

### 6. TeamMemberRow

| App | Current closest equivalent | Gap |
|---|---|---|
| CallFlow | `manager/ReportsTable.tsx` — table of **reports**, not people | Doesn't model "lista recepcjonistek z trendem" |
| ConsultFlow | `DashboardStats.tsx` — aggregate, no per-person row | Missing entirely |
| ShiftFlow | None — schedule grid is per-day-per-chair | Missing entirely |

**All three apps fail the gherkin contract:**
> *"listę [recepcjonistek/lekarzy] z: aktualnym wynikiem, trendem ↑/↓ i statusem ✓/❗"*

**Recommendation: ADD** `TeamMemberRow` lists to all 3 manager dashboards.
This is the **largest current gap** and the highest-leverage adoption.

---

## Drift summary — locked design rules being violated today

| Rule (from `05-rules-for-lovable.md`) | Violator | Severity |
|---|---|---|
| Buttons must be `rounded-pill` (9999px) | All 3 apps via shadcn `rounded-md` | High — visible on every screen |
| No colored card backgrounds outside `#fafafa` | ConsultFlow uses `text-medical-blue` and `text-success-green` on bold KPI numbers | Medium — non-palette accents |
| One headline KPI in dashboard hero | ConsultFlow has four | Medium — wrong information hierarchy |
| Empty state must use 40px icon circle + headline + subtitle | All 3 apps render empty tables | High — gherkin contract |
| Validation must show error inline, not clear the form | None of the 3 has the "Wybierz kanał powiadomień" literal | High — gherkin contract |

---

## What is **already correct** and should stay

1. **shadcn/ui as the underlying primitive layer.** It's fine — the R1 plan
   doesn't ask us to rewrite primitives, only to add shared *patterns* on
   top. Keep shadcn, add `@receptionos/ui` patterns above it.
2. **CallFlow's split between operator (`CoachingReportView`) and manager
   (`ManagerDashboard`).** The role separation is correct; only the
   *content* of each view needs the shared patterns.
3. **ShiftFlow's drag-and-drop schedule editor (`WeeklyCalendar.tsx`).**
   App-unique, correctly **not** in the shared package.
4. **ConsultFlow's `AudioUpload.tsx` and `ObjectUploader.tsx`.** App-unique
   to ConsultFlow's MP3 upload flow (US-CO-01); correctly **not** in the
   shared package.

## What is currently in the apps but is **not needed** (per gherkin scope)

These exist in code today but **no gherkin scenario requires them** —
they are speculative scope or carried over from shadcn defaults:

| App | File | Why not needed |
|---|---|---|
| ShiftFlow | `OptimizationProfileSelector.tsx`, `RevenueMethodologyDrawer.tsx`, `HeuristicsPanel.tsx` | No gherkin scenario covers heuristic profile selection or revenue methodology — these are research surface that should live behind a feature flag, not as default UI |
| ShiftFlow | `ScheduleSnapshotDialog.tsx`, `VersionHistoryPanel.tsx` | Versioning isn't in any US-SF-* — postpone until a "manager grafików — wersjonowanie" story exists |
| All 3 | `breadcrumb.tsx`, `pagination.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `input-otp.tsx`, `carousel.tsx`, `resizable.tsx`, `command.tsx` (from shadcn install) | None used by any current screen and none referenced by any gherkin — safe to delete to reduce bundle and Lovable's index noise |
| CallFlow | `components/coaching/CoachingCarousel.tsx` + `slides/` | Carousel UX not described in any US-CF-* — currently shipping a UX that isn't contracted |

## Migration order (recommended)

1. **Week 1:** Adopt `EmptyState` in all 3 apps. Smallest diff, biggest
   contract win.
2. **Week 1:** Replace shadcn `Button` styling with `rounded-pill` (or
   import `@receptionos/ui`'s Button directly). Single Tailwind override.
3. **Week 2:** Add `DashboardHeader` to all 3 manager dashboards. Demote
   ConsultFlow's 4-card grid below it.
4. **Week 2:** Add `TeamMemberRow` lists to all 3 manager dashboards.
   This closes the largest current gap.
5. **Week 3:** Refactor ShiftFlow's `ReceptionistManagementPanel` to
   compose `ProfileForm`. Build CallFlow + ConsultFlow forms on the same
   base.
6. **Week 3:** Migrate ConsultFlow's `ScoreChart` to `TrendChart`; build
   the missing CallFlow + ShiftFlow trend views.
7. **Later:** Clean up speculative ShiftFlow surface
   (`HeuristicsPanel`, version history, etc.) and unused shadcn primitives.
   Defer `InboxNotification` adoption until the platform shell exists.
