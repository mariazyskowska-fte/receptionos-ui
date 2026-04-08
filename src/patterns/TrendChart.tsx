import * as React from "react";
import { cn } from "../utils/cn";
import { brandColors, palette } from "../tokens";

/**
 * TrendChart — line chart for tracking a single metric over time, with
 * optional event annotations and "insufficient data" empty state.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-03 sc.1 — Empathy Score, 30 dni, adnotacja
 *                 "Wzrost o [X] pkt po zastosowaniu sugestii z dnia [data]"
 *                 + sc.2 empty state "Trend będzie widoczny po co najmniej
 *                 5 analizach" / "2 z 5 rozmów zarejestrowanych"
 *  - ConsultFlow: US-CO-03 sc.1 — Overall Score, 6 tygodni; sc.2
 *                 ostrzeżenie regresji (odcinek wyróżniony pomarańczowy);
 *                 sc.3 anonimowy benchmark zespołu
 *  - ShiftFlow:   US-SF-05 sc.1 — utilizacja w czasie (manager dashboard)
 *
 * Role variants:
 *  - operator: shows ONLY their own series. Annotations describe their
 *    own actions ("po wdrożeniu sugestii z dnia X"). Optional anonymized
 *    benchmark line, never identifying others (gherkin US-CO-03 sc.3).
 *  - manager: shows aggregate (team average). Annotations describe team
 *    events like "szkolenie z Obsługa obiekcji" (US-CO-05 sc.4).
 *
 * The component is intentionally pure SVG with no chart-lib dependency,
 * because R1 plan says: paczka musi działać jako zwykła paczka npm bez
 * przepisywania backendu (cytat z planu R1+R2 / Krok 3).
 */
export interface TrendPoint {
  /** Display label, e.g. "1 mar" or "Tydz. 12". */
  label: string;
  value: number;
}

export interface TrendAnnotation {
  /** Index into `data` to anchor the annotation marker. */
  atIndex: number;
  text: string;
}

export interface TrendChartProps {
  variant?: "operator" | "manager";
  brand?: "callflow" | "consultflow" | "shiftflow";
  title: string;
  data: TrendPoint[];
  /** Anonymized benchmark line (US-CO-03 sc.3). Manager dashboards may
   *  also use this to show "before training" baseline. */
  benchmark?: TrendPoint[];
  annotations?: TrendAnnotation[];
  /** Minimum number of points required before the chart is rendered.
   *  Below this, an "insufficient data" message replaces the chart
   *  (US-CF-03 sc.2). */
  minPoints?: number;
  insufficientDataMessage?: string;
  className?: string;
}

export function TrendChart({
  variant = "operator",
  brand = "callflow",
  title,
  data,
  benchmark,
  annotations,
  minPoints = 5,
  insufficientDataMessage,
  className,
}: TrendChartProps) {
  const stroke = brandColors[brand];

  if (data.length < minPoints) {
    return (
      <div
        data-variant={variant}
        className={cn(
          "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-2",
          className,
        )}
      >
        <p className="text-[14px] font-medium text-ros-ink">{title}</p>
        <p className="text-[12px] text-ros-ink-muted">
          {insufficientDataMessage ??
            `Trend będzie widoczny po co najmniej ${minPoints} analizach`}
        </p>
        <p className="text-[12px] text-ros-ink-faint">
          {data.length} z {minPoints} rejestracji
        </p>
      </div>
    );
  }

  const W = 480;
  const H = 160;
  const PAD = 24;

  const all = [...data, ...(benchmark ?? [])];
  const min = Math.min(...all.map((p) => p.value));
  const max = Math.max(...all.map((p) => p.value));
  const range = max - min || 1;

  const x = (i: number, len: number) =>
    PAD + (i * (W - PAD * 2)) / Math.max(len - 1, 1);
  const y = (v: number) => H - PAD - ((v - min) / range) * (H - PAD * 2);

  const path = (series: TrendPoint[]) =>
    series
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i, series.length)} ${y(p.value)}`)
      .join(" ");

  return (
    <div
      data-variant={variant}
      className={cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3",
        className,
      )}
    >
      <div className="flex items-baseline justify-between">
        <p className="text-[14px] font-medium text-ros-ink">{title}</p>
        {benchmark && (
          <span className="text-[12px] text-ros-ink-muted">
            ── benchmark zespołu (anonimowy)
          </span>
        )}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {benchmark && (
          <path
            d={path(benchmark)}
            fill="none"
            stroke={palette.inkFaint}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )}
        <path d={path(data)} fill="none" stroke={stroke} strokeWidth={2} />
        {data.map((p, i) => (
          <circle key={i} cx={x(i, data.length)} cy={y(p.value)} r={3} fill={stroke} />
        ))}
        {annotations?.map((a, i) => {
          if (a.atIndex < 0 || a.atIndex >= data.length) return null;
          const cx = x(a.atIndex, data.length);
          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={PAD}
                y2={H - PAD}
                stroke={palette.warnFg}
                strokeDasharray="2 3"
              />
              <circle cx={cx} cy={PAD} r={4} fill={palette.warnFg} />
            </g>
          );
        })}
      </svg>
      {annotations?.map((a, i) => (
        <p key={i} className="text-[12px] text-ros-ink-muted">
          ⚑ {a.text}
        </p>
      ))}
    </div>
  );
}
