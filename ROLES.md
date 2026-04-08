# Role-aware components — quick reference

> This file is read by Lovable / Replit before generating screens. It maps
> the **two cross-app role families** to the components in this package and
> states which `variant` each role should use.

## Cross-app role families

There are exactly two role families across all three Layer-5 apps. Every
gherkin user story slots one persona into one of these:

### Operator
| App | Persona | Sees |
|---|---|---|
| CallFlow | **Anna** (recepcjonistka) | Her own call reports, her own trend |
| ConsultFlow | **Dr Mazur** (lekarz-konsultant) | His own consultations, his own breakdown |
| ShiftFlow | **Dr Nowak** (lekarz), **Kasia** (asystentka) | Their own assigned schedule |

Operators **never** see other people's data. ConsultFlow US-CO-03 sc.3 makes
this an explicit contract:
> "Dr Mazur nie widzi wyników konkretnych innych lekarzy"
> "benchmark pokazuje medianę — bez żadnych danych identyfikujących innych lekarzy"

### Manager
| App | Persona | Sees |
|---|---|---|
| CallFlow | **Marta** (manager kliniki) | Whole reception team, flagowane rozmowy |
| ConsultFlow | **Violetta** (manager) | All doctors' conversion, heatmap, coaching notes |
| ShiftFlow | **Tomasz** (manager) | Chair utilization, schedule generator |

Managers also have access to **Admin Panels** (ProfileForm) which operators
do not. Confirmed by US-CF-05, US-CO-04, US-SF-04 — every scenario starts
with "Marta/Violetta/Tomasz jest w panelu administracyjnym".

## Component → role matrix

| Component | `operator` | `manager` | Notes |
|---|---|---|---|
| `EmptyState` | ✅ "first report" | ✅ "first team member" | Pass `variant` prop |
| `ProfileForm` | ❌ — | ✅ admin only | Component itself is manager-gated; do not render for operators |
| `TrendChart` | ✅ own metric + own annotations | ✅ team aggregate + benchmark line | `variant` controls labelling, `benchmark` prop is manager-only |
| `DashboardHeader` | ❌ — | ✅ Manager Dashboard hero | Operators don't have a hero KPI |
| `InboxNotification` | ✅ "your report is ready" | ✅ "PILNE" / flagged conversation | `urgency="urgent"` is manager-only |
| `TeamMemberRow` | ❌ — | ✅ team list | Hard-blocked for operators by gherkin contract |

## Routing recommendation for consuming apps

```
/app/                       ← operator routes
  ├── inbox                 → InboxNotification list
  ├── reports               → ReportBreakdown (v0.2.0)
  ├── reports/:id           → ReportBreakdown detail
  └── trend                 → TrendChart variant="operator"

/app/manager/               ← manager-only routes (gate at router level)
  ├── dashboard             → DashboardHeader + TeamMemberRow list + TrendChart variant="manager"
  ├── team                  → TeamMemberRow list
  ├── team/new              → ProfileForm
  └── flagged               → InboxNotification urgency="warn|urgent"
```

The route gate is the **only** place role enforcement should happen. The
shared components themselves are dumb — they will render whatever you
pass. Role gating in components would force every consuming app to pass
auth context into the package, which violates the R1 constraint of
"package musi działać jako zwykła paczka npm".
