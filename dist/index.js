var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/primitives/Button.tsx
import * as React from "react";

// src/utils/cn.ts
import clsx from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/primitives/Button.tsx
import { jsx } from "react/jsx-runtime";
var brandBg = {
  callflow: "bg-brand-callflow hover:bg-[#1d4ed8]",
  consultflow: "bg-brand-consultflow hover:bg-[#6d28d9]",
  shiftflow: "bg-brand-shiftflow hover:bg-[#15803d]"
};
var Button = React.forwardRef(
  function Button2({ variant = "primary", brand = "callflow", className, children, ...rest }, ref) {
    const base = "inline-flex items-center justify-center gap-2 px-4 py-2 h-10 rounded-pill text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors duration-150 shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed";
    const variantCls = variant === "primary" ? cn(brandBg[brand], "text-white border-none") : variant === "ghost" ? "bg-white text-ros-ink border border-ros-border hover:bg-ros-surface-hover" : "bg-transparent text-ros-danger-fg hover:bg-ros-danger-bg";
    return /* @__PURE__ */ jsx("button", { ref, className: cn(base, variantCls, className), ...rest, children });
  }
);

// src/primitives/Card.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = React2.forwardRef(function Card2({ variant = "standard", className, ...rest }, ref) {
  const cls = variant === "stat" ? "bg-ros-surface-off rounded-stat p-4 flex flex-col justify-between" : "bg-white rounded-card border border-ros-border shadow-card";
  return /* @__PURE__ */ jsx2("div", { ref, className: cn(cls, className), ...rest });
});

// src/primitives/Badge.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var toneCls = {
  success: "bg-ros-success-bg text-ros-success-fg",
  danger: "bg-ros-danger-bg text-ros-danger-fg",
  warn: "bg-[#fff7ed] text-ros-warn-fg",
  neutral: "bg-ros-surface-hover text-ros-ink-muted"
};
function Badge({
  tone = "neutral",
  className,
  children,
  ...rest
}) {
  return /* @__PURE__ */ jsx3(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-0.5 rounded-pill text-[12px] leading-[16px] font-medium",
        toneCls[tone],
        className
      ),
      ...rest,
      children
    }
  );
}

// src/primitives/Input.tsx
import * as React3 from "react";
import { jsx as jsx4, jsxs } from "react/jsx-runtime";
var Input = React3.forwardRef(
  function Input2({ label, error, id, className, ...rest }, ref) {
    const inputId = id ?? React3.useId();
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx4(
        "label",
        {
          htmlFor: inputId,
          className: "text-[14px] font-medium text-ros-ink leading-none",
          children: label
        }
      ),
      /* @__PURE__ */ jsx4(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "h-10 px-3 bg-white rounded-input border border-ros-border-input shadow-subtle text-[14px] leading-[20px] text-ros-ink outline-none focus:border-brand-callflow",
            error && "border-ros-danger-fg focus:border-ros-danger-fg",
            className
          ),
          "aria-invalid": Boolean(error),
          "aria-describedby": error ? `${inputId}-error` : void 0,
          ...rest
        }
      ),
      error && /* @__PURE__ */ jsx4(
        "p",
        {
          id: `${inputId}-error`,
          className: "text-[12px] leading-[16px] text-ros-danger-fg",
          children: error
        }
      )
    ] });
  }
);

// src/patterns/EmptyState.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var brandIconBg = {
  callflow: "bg-blue-50 text-brand-callflow",
  consultflow: "bg-purple-50 text-brand-consultflow",
  shiftflow: "bg-green-50 text-brand-shiftflow"
};
function EmptyState({
  variant = "operator",
  title,
  description,
  ctaLabel,
  onCta,
  brand = "callflow",
  icon,
  className
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      "data-variant": variant,
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsx5(
          "div",
          {
            className: cn(
              "size-10 rounded-pill flex items-center justify-center",
              brandIconBg[brand]
            ),
            "aria-hidden": true,
            children: icon ?? /* @__PURE__ */ jsx5(DefaultIcon, {})
          }
        ),
        /* @__PURE__ */ jsx5("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
        description && /* @__PURE__ */ jsx5("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted max-w-sm", children: description }),
        ctaLabel && onCta && /* @__PURE__ */ jsx5("div", { className: "pt-2", children: /* @__PURE__ */ jsx5(Button, { brand, onClick: onCta, children: ctaLabel }) })
      ]
    }
  );
}
function DefaultIcon() {
  return /* @__PURE__ */ jsxs2(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsx5("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ jsx5("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ]
    }
  );
}

// src/patterns/ProfileForm.tsx
import * as React4 from "react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var channelLabels = {
  sms: "SMS",
  email: "E-mail",
  app: "Aplikacja"
};
function ProfileForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  extraFieldLabel,
  brand = "callflow",
  className
}) {
  const [errors, setErrors] = React4.useState({});
  function handleSubmit(e) {
    e.preventDefault();
    const next = {};
    if (!value.firstName.trim()) next.firstName = "Imi\u0119 jest wymagane";
    if (!value.notificationChannel)
      next.notificationChannel = "Wybierz kana\u0142 powiadomie\u0144";
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit(value);
  }
  function patch(key, v) {
    onChange({ ...value, [key]: v });
  }
  return /* @__PURE__ */ jsxs3(
    "form",
    {
      onSubmit: handleSubmit,
      className: cn("flex flex-col gap-5 max-w-md", className),
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsx6(
            Input,
            {
              label: "Imi\u0119",
              value: value.firstName,
              onChange: (e) => patch("firstName", e.target.value),
              error: errors.firstName
            }
          ),
          /* @__PURE__ */ jsx6(
            Input,
            {
              label: "Nazwisko",
              value: value.lastName,
              onChange: (e) => patch("lastName", e.target.value)
            }
          )
        ] }),
        extraFieldLabel && /* @__PURE__ */ jsx6(
          Input,
          {
            label: extraFieldLabel,
            value: value.extraField ?? "",
            onChange: (e) => patch("extraField", e.target.value)
          }
        ),
        /* @__PURE__ */ jsxs3("fieldset", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx6("legend", { className: "text-[14px] font-medium text-ros-ink leading-none mb-1", children: "Kana\u0142 powiadomie\u0144" }),
          /* @__PURE__ */ jsx6("div", { className: "flex gap-2", children: Object.keys(channelLabels).map((ch) => {
            const selected = value.notificationChannel === ch;
            return /* @__PURE__ */ jsx6(
              "button",
              {
                type: "button",
                onClick: () => patch("notificationChannel", ch),
                className: cn(
                  "px-4 h-9 rounded-pill text-[14px] font-medium border transition-colors duration-150",
                  selected ? "bg-ros-ink text-white border-ros-ink" : "bg-white text-ros-ink border-ros-border hover:bg-ros-surface-hover"
                ),
                "aria-pressed": selected,
                children: channelLabels[ch]
              },
              ch
            );
          }) }),
          errors.notificationChannel && /* @__PURE__ */ jsx6("p", { className: "text-[12px] leading-[16px] text-ros-danger-fg", children: errors.notificationChannel })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
          onCancel && /* @__PURE__ */ jsx6(Button, { variant: "ghost", type: "button", onClick: onCancel, children: "Anuluj" }),
          /* @__PURE__ */ jsx6(Button, { type: "submit", brand, children: "Zapisz" })
        ] })
      ]
    }
  );
}

// src/tokens/index.ts
var tokens_exports = {};
__export(tokens_exports, {
  brandColors: () => brandColors,
  palette: () => palette,
  radii: () => radii,
  spacing: () => spacing
});
var brandColors = {
  callflow: "#2563eb",
  consultflow: "#7c3aed",
  shiftflow: "#16a34a"
};
var palette = {
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
  statusActive: "#22c55e"
};
var radii = {
  pill: 9999,
  card: 24,
  stat: 14,
  input: 8
};
var spacing = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40];

// src/patterns/TrendChart.tsx
import { jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function TrendChart({
  variant = "operator",
  brand = "callflow",
  title,
  data,
  benchmark,
  annotations,
  minPoints = 5,
  insufficientDataMessage,
  className
}) {
  const stroke = brandColors[brand];
  if (data.length < minPoints) {
    return /* @__PURE__ */ jsxs4(
      "div",
      {
        "data-variant": variant,
        className: cn(
          "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-2",
          className
        ),
        children: [
          /* @__PURE__ */ jsx7("p", { className: "text-[14px] font-medium text-ros-ink", children: title }),
          /* @__PURE__ */ jsx7("p", { className: "text-[12px] text-ros-ink-muted", children: insufficientDataMessage ?? `Trend b\u0119dzie widoczny po co najmniej ${minPoints} analizach` }),
          /* @__PURE__ */ jsxs4("p", { className: "text-[12px] text-ros-ink-faint", children: [
            data.length,
            " z ",
            minPoints,
            " rejestracji"
          ] })
        ]
      }
    );
  }
  const W = 480;
  const H = 160;
  const PAD = 24;
  const all = [...data, ...benchmark ?? []];
  const min = Math.min(...all.map((p) => p.value));
  const max = Math.max(...all.map((p) => p.value));
  const range = max - min || 1;
  const x = (i, len) => PAD + i * (W - PAD * 2) / Math.max(len - 1, 1);
  const y = (v) => H - PAD - (v - min) / range * (H - PAD * 2);
  const path = (series) => series.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i, series.length)} ${y(p.value)}`).join(" ");
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      "data-variant": variant,
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsx7("p", { className: "text-[14px] font-medium text-ros-ink", children: title }),
          benchmark && /* @__PURE__ */ jsx7("span", { className: "text-[12px] text-ros-ink-muted", children: "\u2500\u2500 benchmark zespo\u0142u (anonimowy)" })
        ] }),
        /* @__PURE__ */ jsxs4("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full h-auto", children: [
          benchmark && /* @__PURE__ */ jsx7(
            "path",
            {
              d: path(benchmark),
              fill: "none",
              stroke: palette.inkFaint,
              strokeWidth: 1.5,
              strokeDasharray: "4 4"
            }
          ),
          /* @__PURE__ */ jsx7("path", { d: path(data), fill: "none", stroke, strokeWidth: 2 }),
          data.map((p, i) => /* @__PURE__ */ jsx7("circle", { cx: x(i, data.length), cy: y(p.value), r: 3, fill: stroke }, i)),
          annotations?.map((a, i) => {
            if (a.atIndex < 0 || a.atIndex >= data.length) return null;
            const cx = x(a.atIndex, data.length);
            return /* @__PURE__ */ jsxs4("g", { children: [
              /* @__PURE__ */ jsx7(
                "line",
                {
                  x1: cx,
                  x2: cx,
                  y1: PAD,
                  y2: H - PAD,
                  stroke: palette.warnFg,
                  strokeDasharray: "2 3"
                }
              ),
              /* @__PURE__ */ jsx7("circle", { cx, cy: PAD, r: 4, fill: palette.warnFg })
            ] }, i);
          })
        ] }),
        annotations?.map((a, i) => /* @__PURE__ */ jsxs4("p", { className: "text-[12px] text-ros-ink-muted", children: [
          "\u2691 ",
          a.text
        ] }, i))
      ]
    }
  );
}

// src/patterns/DashboardHeader.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var brandAccent = {
  callflow: "border-l-brand-callflow",
  consultflow: "border-l-brand-consultflow",
  shiftflow: "border-l-brand-shiftflow"
};
function autoTone(delta) {
  if (!delta) return "neutral";
  if (delta.trim().startsWith("+")) return "success";
  if (delta.trim().startsWith("-")) return "danger";
  return "neutral";
}
function DashboardHeader({
  brand = "callflow",
  title,
  metricLabel,
  metricValue,
  delta,
  deltaTone,
  subtitle,
  actions,
  className
}) {
  const tone = deltaTone ?? autoTone(delta);
  return /* @__PURE__ */ jsxs5(
    "header",
    {
      className: cn(
        "rounded-card bg-white border border-ros-border border-l-4 p-6 flex items-start justify-between gap-6",
        brandAccent[brand],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-[12px] uppercase tracking-wide text-ros-ink-muted", children: title }),
          /* @__PURE__ */ jsx8("p", { className: "text-[12px] text-ros-ink-muted", children: metricLabel }),
          /* @__PURE__ */ jsxs5("div", { className: "flex items-end gap-3", children: [
            /* @__PURE__ */ jsx8("p", { className: "text-[28px] leading-none font-medium text-ros-ink", children: metricValue }),
            delta && /* @__PURE__ */ jsx8(Badge, { tone, children: delta })
          ] }),
          subtitle && /* @__PURE__ */ jsx8("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted max-w-xl", children: subtitle })
        ] }),
        actions && /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-2", children: actions })
      ]
    }
  );
}

// src/patterns/InboxNotification.tsx
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var brandIcon = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
var urgencyBadge = {
  info: { tone: "success", label: "Nowe" },
  warn: { tone: "warn", label: "Sprawd\u017A" },
  urgent: { tone: "danger", label: "PILNE" }
  // gherkin literal, US-SF-03
};
function InboxNotification({
  variant = "operator",
  brand = "callflow",
  appLabel,
  title,
  body,
  timestamp,
  urgency = "info",
  ctaLabel,
  onCta,
  className
}) {
  const badge = urgencyBadge[urgency];
  return /* @__PURE__ */ jsxs6(
    "article",
    {
      "data-variant": variant,
      className: cn(
        "flex items-start gap-3 p-4 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150",
        className
      ),
      children: [
        /* @__PURE__ */ jsx9(
          "div",
          {
            className: cn(
              "size-8 rounded-pill flex-shrink-0 flex items-center justify-center text-white",
              brandIcon[brand]
            ),
            "aria-hidden": true,
            children: appLabel?.charAt(0) ?? "\u2022"
          }
        ),
        /* @__PURE__ */ jsxs6("div", { className: "flex flex-col gap-1 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs6("div", { className: "flex items-center gap-2", children: [
            appLabel && /* @__PURE__ */ jsx9("span", { className: "text-[12px] font-medium text-ros-ink-medium", children: appLabel }),
            /* @__PURE__ */ jsx9(Badge, { tone: badge.tone, children: badge.label }),
            timestamp && /* @__PURE__ */ jsx9("span", { className: "text-[12px] text-ros-ink-faint ml-auto", children: timestamp })
          ] }),
          /* @__PURE__ */ jsx9("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: title }),
          body && /* @__PURE__ */ jsx9("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted line-clamp-2", children: body })
        ] }),
        ctaLabel && onCta && /* @__PURE__ */ jsx9("div", { className: "flex-shrink-0 self-center", children: /* @__PURE__ */ jsx9(Button, { brand, onClick: onCta, children: ctaLabel }) })
      ]
    }
  );
}

// src/patterns/TeamMemberRow.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var trendGlyph = {
  up: { glyph: "\u2191", tone: "success" },
  down: { glyph: "\u2193", tone: "danger" },
  flat: { glyph: "\u2192", tone: "neutral" }
};
var brandRing = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function TeamMemberRow({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status = "ok",
  onOpen,
  className
}) {
  const initials = name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /* @__PURE__ */ jsxs7(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: cn(
        "w-full flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150 text-left",
        className
      ),
      children: [
        /* @__PURE__ */ jsx10(
          "div",
          {
            className: cn(
              "size-8 rounded-pill flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0",
              brandRing[brand]
            ),
            "aria-hidden": true,
            children: initials
          }
        ),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx10("p", { className: "text-[14px] font-medium text-ros-ink truncate", children: name }),
          subtitle && /* @__PURE__ */ jsx10("p", { className: "text-[12px] text-ros-ink-muted truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ jsxs7("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx10("p", { className: "text-[12px] text-ros-ink-muted", children: metricLabel }),
            /* @__PURE__ */ jsx10("p", { className: "text-[14px] font-medium text-ros-ink", children: metricValue })
          ] }),
          trend && /* @__PURE__ */ jsx10(Badge, { tone: trendGlyph[trend].tone, children: trendGlyph[trend].glyph }),
          status === "attention" ? /* @__PURE__ */ jsx10(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }) : /* @__PURE__ */ jsx10(Badge, { tone: "success", "aria-label": "OK", children: "\u2713" })
        ] })
      ]
    }
  );
}
export {
  Badge,
  Button,
  Card,
  DashboardHeader,
  EmptyState,
  InboxNotification,
  Input,
  ProfileForm,
  TeamMemberRow,
  TrendChart,
  tokens_exports as tokens
};
//# sourceMappingURL=index.js.map