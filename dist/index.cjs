"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppHeader: () => AppHeader,
  AppHeaderMenuItem: () => AppHeaderMenuItem,
  Badge: () => Badge,
  Button: () => Button,
  Card: () => Card,
  DashboardHeader: () => DashboardHeader,
  EmptyState: () => EmptyState,
  ImportBatchRow: () => ImportBatchRow,
  ImportDropZone: () => ImportDropZone,
  ImportPageLayout: () => ImportPageLayout,
  InboxNotification: () => InboxNotification,
  Input: () => Input,
  PageHeading: () => PageHeading,
  ProfileForm: () => ProfileForm,
  TeamMemberRow: () => TeamMemberRow,
  TrendChart: () => TrendChart,
  tokens: () => tokens_exports
});
module.exports = __toCommonJS(index_exports);

// src/primitives/Button.tsx
var React = __toESM(require("react"), 1);

// src/utils/cn.ts
var import_clsx = __toESM(require("clsx"), 1);
function cn(...inputs) {
  return (0, import_clsx.default)(inputs);
}

// src/primitives/Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var brandBg = {
  callflow: "bg-brand-callflow hover:bg-[#1d4ed8]",
  consultflow: "bg-brand-consultflow hover:bg-[#6d28d9]",
  shiftflow: "bg-brand-shiftflow hover:bg-[#15803d]"
};
var Button = React.forwardRef(
  function Button2({ variant = "primary", brand = "callflow", className, children, ...rest }, ref) {
    const base = "inline-flex items-center justify-center gap-2 px-4 py-2 h-10 rounded-pill text-[14px] leading-[20px] font-medium whitespace-nowrap transition-colors duration-150 shadow-subtle disabled:opacity-50 disabled:cursor-not-allowed";
    const variantCls = variant === "primary" ? cn(brandBg[brand], "text-white border-none") : variant === "ghost" ? "bg-white text-ros-ink border border-ros-border hover:bg-ros-surface-hover" : "bg-transparent text-ros-danger-fg hover:bg-ros-danger-bg";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { ref, className: cn(base, variantCls, className), ...rest, children });
  }
);

// src/primitives/Card.tsx
var React2 = __toESM(require("react"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var Card = React2.forwardRef(function Card2({ variant = "standard", className, ...rest }, ref) {
  const cls = variant === "stat" ? "bg-ros-surface-off rounded-stat p-4 flex flex-col justify-between" : "bg-white rounded-card border border-ros-border shadow-card";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref, className: cn(cls, className), ...rest });
});

// src/primitives/Badge.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var React3 = __toESM(require("react"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
var Input = React3.forwardRef(
  function Input2({ label, error, id, className, ...rest }, ref) {
    const inputId = id ?? React3.useId();
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "label",
        {
          htmlFor: inputId,
          className: "text-[14px] font-medium text-ros-ink leading-none",
          children: label
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
      error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      "data-variant": variant,
      className: cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: cn(
              "size-10 rounded-pill flex items-center justify-center",
              brandIconBg[brand]
            ),
            "aria-hidden": true,
            children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DefaultIcon, {})
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
        description && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted max-w-sm", children: description }),
        ctaLabel && onCta && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Button, { brand, onClick: onCta, children: ctaLabel }) })
      ]
    }
  );
}
function DefaultIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "12", y1: "8", x2: "12", y2: "12" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })
      ]
    }
  );
}

// src/patterns/ProfileForm.tsx
var React4 = __toESM(require("react"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "form",
    {
      onSubmit: handleSubmit,
      className: cn("flex flex-col gap-5 max-w-md", className),
      noValidate: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            Input,
            {
              label: "Imi\u0119",
              value: value.firstName,
              onChange: (e) => patch("firstName", e.target.value),
              error: errors.firstName
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            Input,
            {
              label: "Nazwisko",
              value: value.lastName,
              onChange: (e) => patch("lastName", e.target.value)
            }
          )
        ] }),
        extraFieldLabel && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Input,
          {
            label: extraFieldLabel,
            value: value.extraField ?? "",
            onChange: (e) => patch("extraField", e.target.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("fieldset", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("legend", { className: "text-[14px] font-medium text-ros-ink leading-none mb-1", children: "Kana\u0142 powiadomie\u0144" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex gap-2", children: Object.keys(channelLabels).map((ch) => {
            const selected = value.notificationChannel === ch;
            return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
          errors.notificationChannel && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-danger-fg", children: errors.notificationChannel })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
          onCancel && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { variant: "ghost", type: "button", onClick: onCancel, children: "Anuluj" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Button, { type: "submit", brand, children: "Zapisz" })
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
var import_jsx_runtime7 = require("react/jsx-runtime");
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
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        "data-variant": variant,
        className: cn(
          "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-2",
          className
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-[14px] font-medium text-ros-ink", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-[12px] text-ros-ink-muted", children: insufficientDataMessage ?? `Trend b\u0119dzie widoczny po co najmniej ${minPoints} analizach` }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-[12px] text-ros-ink-faint", children: [
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      "data-variant": variant,
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-[14px] font-medium text-ros-ink", children: title }),
          benchmark && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[12px] text-ros-ink-muted", children: "\u2500\u2500 benchmark zespo\u0142u (anonimowy)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full h-auto", children: [
          benchmark && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "path",
            {
              d: path(benchmark),
              fill: "none",
              stroke: palette.inkFaint,
              strokeWidth: 1.5,
              strokeDasharray: "4 4"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { d: path(data), fill: "none", stroke, strokeWidth: 2 }),
          data.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx: x(i, data.length), cy: y(p.value), r: 3, fill: stroke }, i)),
          annotations?.map((a, i) => {
            if (a.atIndex < 0 || a.atIndex >= data.length) return null;
            const cx = x(a.atIndex, data.length);
            return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("g", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("circle", { cx, cy: PAD, r: 4, fill: palette.warnFg })
            ] }, i);
          })
        ] }),
        annotations?.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-[12px] text-ros-ink-muted", children: [
          "\u2691 ",
          a.text
        ] }, i))
      ]
    }
  );
}

// src/patterns/DashboardHeader.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "header",
    {
      className: cn(
        "rounded-card bg-white border border-ros-border border-l-4 p-6 flex items-start justify-between gap-6",
        brandAccent[brand],
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-[12px] uppercase tracking-wide text-ros-ink-muted", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-[12px] text-ros-ink-muted", children: metricLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-end gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-[28px] leading-none font-medium text-ros-ink", children: metricValue }),
            delta && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Badge, { tone, children: delta })
          ] }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted max-w-xl", children: subtitle })
        ] }),
        actions && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-2", children: actions })
      ]
    }
  );
}

// src/patterns/InboxNotification.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "article",
    {
      "data-variant": variant,
      className: cn(
        "flex items-start gap-3 p-4 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex flex-col gap-1 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2", children: [
            appLabel && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-[12px] font-medium text-ros-ink-medium", children: appLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Badge, { tone: badge.tone, children: badge.label }),
            timestamp && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "text-[12px] text-ros-ink-faint ml-auto", children: timestamp })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: title }),
          body && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted line-clamp-2", children: body })
        ] }),
        ctaLabel && onCta && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex-shrink-0 self-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Button, { brand, onClick: onCta, children: ctaLabel }) })
      ]
    }
  );
}

// src/patterns/TeamMemberRow.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: cn(
        "w-full flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border hover:bg-ros-surface-hover transition-colors duration-150 text-left",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[14px] font-medium text-ros-ink truncate", children: name }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[12px] text-ros-ink-muted truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "text-right", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[12px] text-ros-ink-muted", children: metricLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[14px] font-medium text-ros-ink", children: metricValue })
          ] }),
          trend && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: trendGlyph[trend].tone, children: trendGlyph[trend].glyph }),
          status === "attention" ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "success", "aria-label": "OK", children: "\u2713" })
        ] })
      ]
    }
  );
}

// src/patterns/AppHeader.tsx
var React5 = __toESM(require("react"), 1);
var import_jsx_runtime11 = require("react/jsx-runtime");
var brandBg2 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function getInitials(name) {
  return name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function AppHeader({
  brand = "callflow",
  appName,
  appSubtitle,
  navItems,
  activeKey,
  onNavigate,
  userName,
  userMenuContent,
  actions,
  className
}) {
  const [userMenuOpen, setUserMenuOpen] = React5.useState(false);
  const menuRef = React5.useRef(null);
  React5.useEffect(() => {
    if (!userMenuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "header",
    {
      className: cn(
        "sticky top-0 z-50 h-16 w-full bg-white border-b border-ros-border",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center justify-between h-full px-6 max-w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-6 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "div",
              {
                className: cn(
                  "size-8 rounded-input flex items-center justify-center text-white text-[12px] font-bold",
                  brandBg2[brand]
                ),
                "aria-hidden": true,
                children: appName.split(/(?=[A-Z])/)[0]?.slice(0, 2).toUpperCase() ?? "??"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: appName }),
              appSubtitle && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: appSubtitle })
            ] })
          ] }),
          navItems && navItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("nav", { className: "flex items-center gap-[2px]", "aria-label": "Nawigacja g\u0142\xF3wna", children: navItems.map((item) => {
            const isActive = item.key === activeKey;
            return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => onNavigate?.(item.key),
                className: cn(
                  "flex items-center gap-1.5 px-3 py-2.5 rounded-input text-[14px] leading-[20px] font-medium transition-colors duration-150 border-none bg-transparent cursor-pointer",
                  isActive ? "text-ros-ink-medium" : "text-ros-ink-muted hover:bg-ros-surface-hover"
                ),
                "aria-current": isActive ? "page" : void 0,
                children: [
                  item.icon,
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { children: [
                    item.label,
                    item.badge != null && item.badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "text-ros-ink-muted", children: [
                      " (",
                      item.badge,
                      ")"
                    ] })
                  ] })
                ]
              },
              item.key
            );
          }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          actions,
          userName && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "relative", ref: menuRef, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => setUserMenuOpen((o) => !o),
                className: "flex items-center gap-2 pl-2 pr-2.5 py-2 rounded-input bg-white hover:bg-ros-surface-hover active:bg-ros-border transition-colors duration-150 border-none cursor-pointer",
                "aria-expanded": userMenuOpen,
                "aria-haspopup": "true",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                    "div",
                    {
                      className: cn(
                        "size-8 rounded-pill flex items-center justify-center text-white text-[14px] font-bold",
                        brandBg2[brand]
                      ),
                      children: getInitials(userName)
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "#a1a1aa",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      "aria-hidden": true,
                      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("polyline", { points: "6 9 12 15 18 9" })
                    }
                  )
                ]
              }
            ),
            userMenuOpen && userMenuContent && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white rounded-input border border-ros-border shadow-card p-1 z-50", children: userMenuContent })
          ] })
        ] })
      ] })
    }
  );
}
function AppHeaderMenuItem({
  danger,
  icon,
  children,
  className,
  ...rest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "button",
    {
      type: "button",
      className: cn(
        "w-full flex items-center gap-2 px-3 py-2 rounded-[6px] text-[14px] leading-[20px] font-medium text-left transition-colors duration-150 border-none bg-transparent cursor-pointer",
        danger ? "text-ros-danger-fg hover:bg-ros-danger-bg" : "text-ros-ink hover:bg-ros-surface-hover",
        className
      ),
      ...rest,
      children: [
        icon,
        children
      ]
    }
  );
}

// src/patterns/PageHeading.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function PageHeading({
  title,
  description,
  actions,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: cn("flex items-start justify-between gap-4", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col gap-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-[14px] leading-[20px] text-ros-ink-muted", children: description })
    ] }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex items-center gap-2 flex-shrink-0", children: actions })
  ] });
}

// src/patterns/ImportDropZone.tsx
var React6 = __toESM(require("react"), 1);
var import_jsx_runtime13 = require("react/jsx-runtime");
var brandAccent2 = {
  callflow: "border-brand-callflow/30 bg-blue-50/30",
  consultflow: "border-brand-consultflow/30 bg-purple-50/30",
  shiftflow: "border-brand-shiftflow/30 bg-green-50/30"
};
var brandIcon2 = {
  callflow: "text-brand-callflow",
  consultflow: "text-brand-consultflow",
  shiftflow: "text-brand-shiftflow"
};
function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}
function ImportDropZone({
  brand = "callflow",
  accept,
  acceptLabel,
  maxSize,
  selectedFile,
  progress = 0,
  progressLabel,
  onFileSelect,
  onRemove,
  submitLabel = "Wgraj",
  onSubmit,
  disabled,
  children,
  className
}) {
  const inputRef = React6.useRef(null);
  const [dragOver, setDragOver] = React6.useState(false);
  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect?.(file);
  }
  function handleDragOver(e) {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  }
  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onFileSelect?.(file);
  }
  const isUploading = progress > 0 && progress < 100;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-4",
        className
      ),
      children: [
        !selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
          "div",
          {
            onDrop: handleDrop,
            onDragOver: handleDragOver,
            onDragLeave: () => setDragOver(false),
            onClick: () => !disabled && inputRef.current?.click(),
            className: cn(
              "flex flex-col items-center justify-center gap-3 py-10 px-6 rounded-input border-2 border-dashed cursor-pointer transition-colors duration-150",
              dragOver ? brandAccent2[brand] : "border-ros-border hover:border-ros-ink-faint hover:bg-ros-surface-off",
              disabled && "opacity-50 cursor-not-allowed"
            ),
            role: "button",
            tabIndex: 0,
            "aria-label": "Wybierz plik",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: cn("size-10 flex items-center justify-center", brandIcon2[brand]), children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("polyline", { points: "17 8 12 3 7 8" }),
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
                  ]
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: "Przeci\u0105gnij plik lub kliknij, aby wybra\u0107" }),
                acceptLabel && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted mt-1", children: acceptLabel }),
                maxSize && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "text-[12px] leading-[16px] text-ros-ink-faint mt-0.5", children: [
                  "Maks. ",
                  formatSize(maxSize)
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "input",
                {
                  ref: inputRef,
                  type: "file",
                  accept,
                  onChange: handleChange,
                  disabled,
                  className: "hidden",
                  "aria-hidden": true
                }
              )
            ]
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center justify-between p-3 rounded-input bg-ros-surface-off border border-ros-border", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: cn("size-8 flex items-center justify-center flex-shrink-0", brandIcon2[brand]), children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
              "svg",
              {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: selectedFile.name }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: formatSize(selectedFile.size) })
            ] })
          ] }),
          !isUploading && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "button",
            {
              type: "button",
              onClick: onRemove,
              disabled,
              className: "size-8 flex items-center justify-center rounded-input text-ros-ink-muted hover:text-ros-ink hover:bg-ros-surface-hover transition-colors duration-150 flex-shrink-0 border-none bg-transparent cursor-pointer",
              "aria-label": "Usu\u0144 plik",
              children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                "svg",
                {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ]
                }
              )
            }
          )
        ] }),
        isUploading && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "w-full h-1.5 bg-ros-surface-off rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) }),
          progressLabel && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: progressLabel })
        ] }),
        children,
        selectedFile && onSubmit && !isUploading && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Button, { brand, onClick: onSubmit, disabled, className: "w-full", children: submitLabel })
      ]
    }
  );
}

// src/patterns/ImportBatchRow.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var statusConfig = {
  pending: { tone: "neutral", label: "Oczekuje" },
  analyzing: { tone: "warn", label: "Analizuj\u0119..." },
  completed: { tone: "success", label: "Gotowe" },
  error: { tone: "danger", label: "B\u0142\u0105d" }
};
var brandIcon3 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function ImportBatchRow({
  brand = "callflow",
  fileName,
  subtitle,
  status,
  progress,
  statusLabel,
  timestamp,
  ctaLabel,
  onCta,
  ctaLoading,
  className
}) {
  const cfg = statusConfig[status];
  const showProgress = status === "analyzing" && progress != null;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "article",
    {
      className: cn(
        "flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "div",
          {
            className: cn(
              "size-8 rounded-input flex-shrink-0 flex items-center justify-center text-white",
              brandIcon3[brand]
            ),
            "aria-hidden": true,
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "svg",
              {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: fileName }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Badge, { tone: cfg.tone, children: statusLabel ?? cfg.label }),
            timestamp && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[12px] text-ros-ink-faint ml-auto flex-shrink-0", children: timestamp })
          ] }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted truncate", children: subtitle }),
          showProgress && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-full h-1 bg-ros-surface-off rounded-pill overflow-hidden mt-1", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        ctaLabel && onCta && status !== "analyzing" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          Button,
          {
            brand,
            onClick: onCta,
            disabled: ctaLoading,
            className: "text-[12px] px-3 h-8",
            children: ctaLoading ? "..." : ctaLabel
          }
        ) })
      ]
    }
  );
}

// src/patterns/ImportPageLayout.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function ImportPageLayout({
  title,
  description,
  actions,
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: cn("flex flex-col gap-6 max-w-2xl mx-auto", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(PageHeading, { title, description, actions }),
    children
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppHeader,
  AppHeaderMenuItem,
  Badge,
  Button,
  Card,
  DashboardHeader,
  EmptyState,
  ImportBatchRow,
  ImportDropZone,
  ImportPageLayout,
  InboxNotification,
  Input,
  PageHeading,
  ProfileForm,
  TeamMemberRow,
  TrendChart,
  tokens
});
//# sourceMappingURL=index.cjs.map