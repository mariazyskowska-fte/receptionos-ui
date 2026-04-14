import * as React from "react";
import { cn } from "../utils/cn";
import { brandColors, palette } from "../tokens";

/**
 * TrendChart — line chart for tracking metrics over time.
 *
 * Supports two modes:
 * 1. Single line: `data` prop (backward compatible)
 * 2. Multi-line: `series` prop — multiple named lines on one chart
 *    with color-coded legend, for comparing areas side by side.
 *
 * Source user stories:
 *  - CallFlow:    US-CF-03 sc.1 — Empathy Score trend
 *  - ConsultFlow: US-CO-03 sc.1 — Overall Score + area breakdown lines
 *  - ShiftFlow:   US-SF-05 sc.1 — chair utilization trend
 *
 * Pure SVG, no chart-lib dependency.
 */

export interface TrendPoint {
  label: string;
  value: number;
}

export interface TrendSeries {
  /** Series name shown in legend. */
  name: string;
  /** Line color (hex). */
  color: string;
  /** Data points — must share the same labels/x-axis as other series. */
  data: TrendPoint[];
  /** Dashed line style (for benchmarks). */
  dashed?: boolean;
}

export interface TrendAnnotation {
  atIndex: number;
  text: string;
}

export interface TrendChartProps {
  variant?: "operator" | "manager";
  brand?: "callflow" | "consultflow" | "shiftflow";
  title: string;
  /** Single line mode (backward compatible). */
  data?: TrendPoint[];
  /** Multi-line mode — multiple series on one chart. */
  series?: TrendSeries[];
  /** Benchmark line (single-line mode only). */
  benchmark?: TrendPoint[];
  annotations?: TrendAnnotation[];
  minPoints?: number;
  insufficientDataMessage?: string;
  className?: string;
}

const SERIES_COLORS = [
  "#2563eb", "#7c3aed", "#16a34a", "#ea580c", "#e11d48", "#0ea5e9",
];

export function TrendChart({
  variant = "operator",
  brand = "callflow",
  title,
  data,
  series,
  benchmark,
  annotations,
  minPoints = 5,
  insufficientDataMessage,
  className,
}: TrendChartProps) {
  // Normalize to series format
  const allSeries: TrendSeries[] = React.useMemo(() => {
    if (series && series.length > 0) return series;
    if (data && data.length > 0) {
      return [{ name: title, color: brandColors[brand], data }];
    }
    return [];
  }, [series, data, brand, title]);

  const primaryData = allSeries[0]?.data ?? [];
  const isMulti = allSeries.length > 1;

  if (primaryData.length < minPoints) {
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
          {primaryData.length} z {minPoints} rejestracji
        </p>
      </div>
    );
  }

  const W = 480;
  const H = 160;
  const PAD = 24;

  // Compute global min/max across all series + benchmark
  const allPoints = [
    ...allSeries.flatMap((s) => s.data),
    ...(benchmark ?? []),
  ];
  const min = Math.min(...allPoints.map((p) => p.value));
  const max = Math.max(...allPoints.map((p) => p.value));
  const range = max - min || 1;

  const maxLen = Math.max(...allSeries.map((s) => s.data.length), benchmark?.length ?? 0);

  const x = (i: number) => PAD + (i * (W - PAD * 2)) / Math.max(maxLen - 1, 1);
  const y = (v: number) => H - PAD - ((v - min) / range) * (H - PAD * 2);

  const pathD = (points: TrendPoint[]) =>
    points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.value)}`)
      .join(" ");

  return (
    <div
      data-variant={variant}
      className={cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3",
        className,
      )}
    >
      {/* Header + legend */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-[14px] font-medium text-ros-ink">{title}</p>
        {isMulti && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {allSeries.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span
                  className="inline-block w-3 h-[2px] rounded-pill flex-shrink-0"
                  style={{
                    backgroundColor: s.color,
                    ...(s.dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${s.color} 0 4px, transparent 4px 8px)`, backgroundColor: "transparent" } : {}),
                  }}
                />
                <span className="text-[11px] text-ros-ink-muted">{s.name}</span>
              </div>
            ))}
          </div>
        )}
        {!isMulti && benchmark && (
          <span className="text-[12px] text-ros-ink-muted">
            ── benchmark (anonimowy)
          </span>
        )}
      </div>

      {/* SVG chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Benchmark (single-line mode) */}
        {!isMulti && benchmark && (
          <path
            d={pathD(benchmark)}
            fill="none"
            stroke={palette.inkFaint}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )}

        {/* Series lines */}
        {allSeries.map((s) => (
          <g key={s.name}>
            <path
              d={pathD(s.data)}
              fill="none"
              stroke={s.color}
              strokeWidth={isMulti ? 1.5 : 2}
              strokeDasharray={s.dashed ? "4 4" : undefined}
            />
            {/* Dots only for single-line or on hover area */}
            {!isMulti &&
              s.data.map((p, i) => (
                <circle
                  key={i}
                  cx={x(i)}
                  cy={y(p.value)}
                  r={3}
                  fill={s.color}
                />
              ))}
          </g>
        ))}

        {/* Annotations */}
        {annotations?.map((a, i) => {
          if (a.atIndex < 0 || a.atIndex >= maxLen) return null;
          const cx = x(a.atIndex);
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

      {/* Annotation text */}
      {annotations?.map((a, i) => (
        <p key={i} className="text-[12px] text-ros-ink-muted">
          ⚑ {a.text}
        </p>
      ))}
    </div>
  );
}
