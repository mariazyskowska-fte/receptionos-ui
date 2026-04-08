# Patterns ↔ Gherkin user stories

> Each pattern in this package is anchored to specific gherkin scenarios.
> When you (Lovable / Replit / human) need to render one of these screens
> in CallFlow / ConsultFlow / ShiftFlow, **always import from
> `@receptionos/ui` instead of building locally**.

## 1. `EmptyState`

| App | User story | Scenario | Quote |
|---|---|---|---|
| CallFlow | US-CF-02 | sc.3 — "Empty state dla nowej recepcjonistki" | *"Twój pierwszy raport pojawi się po pierwszej przeanalizowanej rozmowie"* |
| ConsultFlow | US-CO-02 | sc.4 — "Empty state dla lekarza bez żadnych analiz" | *"Twój pierwszy raport pojawi się po przesłaniu i przeanalizowaniu nagrania"* |
| ShiftFlow | US-SF-02 | sc.3 — "Empty state dla nowego lekarza bez przypisanego grafiku" | *"Twój grafik pojawi się po zatwierdzeniu przez managera"* |

**Cross-app contract** (verbatim from all 3 gherkins):
> *"But nie widzi pustej tabeli ani komunikatu błędu"*

So: never render an empty table or error message in this position. Always
render `<EmptyState />`.

---

## 2. `ProfileForm`

| App | User story | Scenario |
|---|---|---|
| CallFlow | US-CF-05 | sc.1 — Dodanie profilu recepcjonistki / sc.2 — walidacja kanału powiadomień |
| ConsultFlow | US-CO-04 | sc.1 — Dodanie profilu lekarza / sc.3 — walidacja kanału powiadomień |
| ShiftFlow | US-SF-04 | sc.1 — Dodanie profilu lekarza ze specjalizacją + dostępnością |

**Cross-app contract** — the validation message string is **literal**:
> *"formularz wyświetla błąd walidacji: 'Wybierz kanał powiadomień'"*
> *"But pozostałe pola formularza nie są czyszczone"*

Component preserves form state on validation failure (controlled mode via
`value` / `onChange`).

---

## 3. `TrendChart`

| App | User story | Scenario | Notes |
|---|---|---|---|
| CallFlow | US-CF-03 | sc.1 — Empathy Score 30 dni | sc.2 — empty state "5 rozmów" |
| ConsultFlow | US-CO-03 | sc.1 — Overall Score 6 tygodni | sc.2 — regression warning, sc.3 — anonymized benchmark |
| ShiftFlow | US-SF-05 | sc.1 — Utilizacja foteli (manager) | trend over time |

**Cross-app contracts:**
- *"system wyświetla: 'Trend będzie widoczny po co najmniej 5 analizach'"* —
  `minPoints` prop controls this.
- *"adnotacja: 'Wzrost o [X] pkt po zastosowaniu sugestii z dnia [data]'"* —
  `annotations` prop carries the marker text.
- *"benchmark pokazuje medianę — bez żadnych danych identyfikujących innych
  lekarzy"* — `benchmark` prop carries an anonymized series; never include
  identifying labels.

---

## 4. `DashboardHeader`

| App | User story | Scenario | Headline metric |
|---|---|---|---|
| CallFlow | US-CF-04 | sc.1 — Manager Dashboard | "Team Health Score" |
| ConsultFlow | US-CO-05 | sc.1 — Manager Dashboard | "Avg Conversion Rate: [X]%" |
| ShiftFlow | US-SF-05 | sc.1 — Manager Dashboard | "Utilizacja foteli: [X]%" |

**Manager-only.** All three scenarios open with *"Given Marta/Violetta/Tomasz
jest zalogowana jako Manager"*. Do not render this for operators.

---

## 5. `InboxNotification`

| App | User story | Scenario | Quote |
|---|---|---|---|
| CallFlow | US-CF-02 | sc.1 — Recepcjonistka otwiera raport z Inboxu | *"Twój nowy raport z rozmowy jest gotowy"* + CTA [Otwórz raport] |
| ConsultFlow | US-CO-02 | sc.1 — Lekarz otwiera gotowy raport z Inboxu | *"Raport z konsultacji [data] jest gotowy"* + CTA [Otwórz raport] |
| ShiftFlow | US-SF-02 | sc.1 — Lekarz otrzymuje powiadomienie | *"Twój grafik na tydzień [daty] jest gotowy"* + CTA [Zobacz grafik] |
| ShiftFlow | US-SF-03 | sc.1 — Pilna nieobecność | *"PILNE"* — manager-side, `urgency="urgent"` |

**Cross-app contract** — in every "report ready" scenario the gherkin says:
> *"po kliknięciu CTA [Otwórz raport] przechodzi bezpośrednio do raportu"*
> *"But nie musi szukać raportu ręcznie w menu"*

So: every notification must have exactly one CTA that deep-links to the
record. No "view in menu" indirection.

---

## 6. `TeamMemberRow`

| App | User story | Scenario |
|---|---|---|
| CallFlow | US-CF-04 | sc.1 — *"listę recepcjonistek z: aktualnym Empathy Score, trendem ↑/↓ i statusem ✓/❗"* |
| ConsultFlow | US-CO-05 | sc.1 — *"listę lekarzy z: aktualnym wynikiem, trendem ↑/↓ i statusem ✓/❗"* |
| ShiftFlow | US-SF-05 | sc.1 — *"listę lekarzy z ich utilizacją, trendem ↑/↓ i statusem ✓/❗"* |

**Manager-only and gherkin-enforced isolation:** ConsultFlow US-CO-03 sc.3
explicitly forbids operators from seeing this list. Implementing this
component on an operator route is a **direct contract violation** — it
must be hard-blocked at the router level.
