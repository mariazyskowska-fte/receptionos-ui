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
  ActivityLog: () => ActivityLog,
  AppHeader: () => AppHeader,
  AppHeaderMenuItem: () => AppHeaderMenuItem,
  AppSwitcher: () => AppSwitcher,
  Badge: () => Badge,
  Button: () => Button,
  Card: () => Card,
  CardStack: () => CardStack,
  DashboardHeader: () => DashboardHeader,
  DashboardLayout: () => DashboardLayout,
  EmptyState: () => EmptyState,
  FeedRow: () => FeedRow,
  ImportActivityRow: () => ImportActivityRow,
  ImportBatchRow: () => ImportBatchRow,
  ImportDropZone: () => ImportDropZone,
  ImportPageLayout: () => ImportPageLayout,
  InboxNotification: () => InboxNotification,
  Input: () => Input,
  MemberDetailView: () => MemberDetailView,
  PageHeading: () => PageHeading,
  PerformanceOverview: () => PerformanceOverview,
  ProfileForm: () => ProfileForm,
  ReportBreakdown: () => ReportBreakdown,
  ReportCard: () => ReportCard,
  ReportSection: () => ReportSection,
  ScoreCardRow: () => ScoreCardRow,
  SetupFlow: () => SetupFlow,
  SidePanel: () => SidePanel,
  StaffRosterPanel: () => StaffRosterPanel,
  StaffRosterRow: () => StaffRosterRow,
  SwipeView: () => SwipeView,
  TeamHeatmap: () => TeamHeatmap,
  TeamMemberRow: () => TeamMemberRow,
  TeamPanelFooter: () => TeamPanelFooter,
  TeamPanelToolbar: () => TeamPanelToolbar,
  TranscriptDrawer: () => TranscriptDrawer,
  TrendChart: () => TrendChart,
  WeekNavigator: () => WeekNavigator,
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

// src/patterns/TrendChart.tsx
var React5 = __toESM(require("react"), 1);

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
  series,
  benchmark,
  annotations,
  minPoints = 5,
  insufficientDataMessage,
  className
}) {
  const allSeries = React5.useMemo(() => {
    if (series && series.length > 0) return series;
    if (data && data.length > 0) {
      return [{ name: title, color: brandColors[brand], data }];
    }
    return [];
  }, [series, data, brand, title]);
  const primaryData = allSeries[0]?.data ?? [];
  const isMulti = allSeries.length > 1;
  if (primaryData.length < minPoints) {
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
            primaryData.length,
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
  const allPoints = [
    ...allSeries.flatMap((s) => s.data),
    ...benchmark ?? []
  ];
  const min = Math.min(...allPoints.map((p) => p.value));
  const max = Math.max(...allPoints.map((p) => p.value));
  const range = max - min || 1;
  const maxLen = Math.max(...allSeries.map((s) => s.data.length), benchmark?.length ?? 0);
  const x = (i) => PAD + i * (W - PAD * 2) / Math.max(maxLen - 1, 1);
  const y = (v) => H - PAD - (v - min) / range * (H - PAD * 2);
  const pathD = (points) => points.map((p, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(p.value)}`).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      "data-variant": variant,
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-[14px] font-medium text-ros-ink", children: title }),
          isMulti && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-wrap gap-x-3 gap-y-1", children: allSeries.map((s) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "span",
              {
                className: "inline-block w-3 h-[2px] rounded-pill flex-shrink-0",
                style: {
                  backgroundColor: s.color,
                  ...s.dashed ? { backgroundImage: `repeating-linear-gradient(90deg, ${s.color} 0 4px, transparent 4px 8px)`, backgroundColor: "transparent" } : {}
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[11px] text-ros-ink-muted", children: s.name })
          ] }, s.name)) }),
          !isMulti && benchmark && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[12px] text-ros-ink-muted", children: "\u2500\u2500 benchmark (anonimowy)" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full h-auto", children: [
          !isMulti && benchmark && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "path",
            {
              d: pathD(benchmark),
              fill: "none",
              stroke: palette.inkFaint,
              strokeWidth: 1.5,
              strokeDasharray: "4 4"
            }
          ),
          allSeries.map((s) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("g", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "path",
              {
                d: pathD(s.data),
                fill: "none",
                stroke: s.color,
                strokeWidth: isMulti ? 1.5 : 2,
                strokeDasharray: s.dashed ? "4 4" : void 0
              }
            ),
            !isMulti && s.data.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "circle",
              {
                cx: x(i),
                cy: y(p.value),
                r: 3,
                fill: s.color
              },
              i
            ))
          ] }, s.name)),
          annotations?.map((a, i) => {
            if (a.atIndex < 0 || a.atIndex >= maxLen) return null;
            const cx = x(a.atIndex);
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
var deliveryIcon = {
  delivered: { label: "Wys\u0142ano", className: "bg-ros-success-fg" },
  pending: { label: "Oczekuje", className: "bg-ros-warn-fg" },
  not_sent: { label: "Nie wys\u0142ano", className: "bg-ros-ink-faint" }
};
function TeamMemberRow({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status = "ok",
  deliveryStatus,
  selectable,
  selected,
  onSelect,
  onOpen,
  className
}) {
  const initials = name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  function handleCheckbox(e) {
    e.stopPropagation();
    onSelect?.(!selected);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: cn(
        "w-full flex items-center gap-2.5 p-2.5 rounded-input border transition-colors duration-150 text-left",
        selected ? "bg-ros-surface-off border-ros-ink-faint" : "bg-white border-ros-border hover:bg-ros-surface-hover",
        onOpen && "cursor-pointer",
        className
      ),
      onClick: onOpen,
      role: onOpen ? "button" : void 0,
      tabIndex: onOpen ? 0 : void 0,
      children: [
        selectable && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "input",
          {
            type: "checkbox",
            checked: selected ?? false,
            onChange: handleCheckbox,
            onClick: (e) => e.stopPropagation(),
            className: "size-4 rounded-sm border-ros-border accent-current flex-shrink-0 cursor-pointer",
            "aria-label": `Zaznacz ${name}`
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "div",
          {
            className: cn(
              "size-7 rounded-pill flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0",
              brandRing[brand]
            ),
            "aria-hidden": true,
            children: initials
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col gap-0 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[13px] font-medium text-ros-ink truncate", children: name }),
            deliveryStatus && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "span",
              {
                className: cn(
                  "size-2 rounded-pill flex-shrink-0",
                  deliveryIcon[deliveryStatus].className
                ),
                title: deliveryIcon[deliveryStatus].label
              }
            )
          ] }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[11px] text-ros-ink-muted truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "text-right", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[10px] text-ros-ink-muted leading-none", children: metricLabel }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-[13px] font-medium text-ros-ink leading-tight", children: metricValue })
          ] }),
          trend && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: trendGlyph[trend].tone, children: trendGlyph[trend].glyph }),
          status === "attention" ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "success", "aria-label": "OK", children: "\u2713" })
        ] })
      ]
    }
  );
}

// src/patterns/AppHeader.tsx
var React6 = __toESM(require("react"), 1);
var import_jsx_runtime11 = require("react/jsx-runtime");
var brandBg2 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
var brandInitial = {
  callflow: "CF",
  consultflow: "Co",
  shiftflow: "SF"
};
function getInitials(name) {
  return name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function AppHeader({
  brand = "callflow",
  appName,
  appSubtitle,
  apps,
  navItems,
  activeKey,
  onNavigate,
  userName,
  userMenuContent,
  actions,
  className
}) {
  const [userMenuOpen, setUserMenuOpen] = React6.useState(false);
  const [appMenuOpen, setAppMenuOpen] = React6.useState(false);
  const menuRef = React6.useRef(null);
  const appMenuRef = React6.useRef(null);
  React6.useEffect(() => {
    if (!userMenuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);
  React6.useEffect(() => {
    if (!appMenuOpen) return;
    function handleClick(e) {
      if (appMenuRef.current && !appMenuRef.current.contains(e.target)) {
        setAppMenuOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setAppMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [appMenuOpen]);
  const otherApps = React6.useMemo(
    () => (apps ?? []).filter((a) => a.key !== brand),
    [apps, brand]
  );
  const hasAppSwitcher = otherApps.length > 0;
  const logoInner = /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
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
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col items-start", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: appName }),
      appSubtitle && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: appSubtitle })
    ] }),
    hasAppSwitcher && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "svg",
      {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        fill: "none",
        stroke: "#a1a1aa",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: cn(
          "transition-transform duration-150",
          appMenuOpen && "rotate-180"
        ),
        "aria-hidden": true,
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("path", { d: "M4 6l4 4 4-4" })
      }
    )
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "header",
    {
      className: cn(
        "sticky top-0 z-50 h-16 w-full bg-white border-b border-ros-border",
        className
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center justify-between h-full px-6 max-w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-6 min-w-0", children: [
          hasAppSwitcher ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "relative flex-shrink-0", ref: appMenuRef, children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setAppMenuOpen((v) => !v),
                "aria-label": "Prze\u0142\u0105cz aplikacj\u0119",
                "aria-expanded": appMenuOpen,
                "aria-haspopup": "menu",
                className: cn(
                  "flex items-center gap-3 px-2 py-1 -ml-2 rounded-input",
                  "bg-transparent hover:bg-ros-surface-hover transition-colors duration-150",
                  "border-none cursor-pointer text-left"
                ),
                children: logoInner
              }
            ),
            appMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
              "div",
              {
                role: "menu",
                "aria-label": "Inne aplikacje receptionOS",
                className: cn(
                  "absolute left-0 top-[calc(100%+4px)] z-50 w-72",
                  "bg-white border border-ros-border rounded-lg shadow-lg",
                  "py-2 overflow-hidden"
                ),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "px-3 py-1.5 text-[11px] leading-[14px] uppercase tracking-wide font-semibold text-ros-ink-muted", children: "Prze\u0142\u0105cz aplikacj\u0119" }),
                  otherApps.map((app) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
                    "a",
                    {
                      href: app.url,
                      role: "menuitem",
                      className: cn(
                        "flex items-center gap-3 px-3 py-2.5 no-underline text-inherit",
                        "hover:bg-ros-surface-hover transition-colors duration-150 cursor-pointer"
                      ),
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                          "div",
                          {
                            className: cn(
                              "size-8 rounded-input flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0",
                              brandBg2[app.key]
                            ),
                            "aria-hidden": true,
                            children: brandInitial[app.key]
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex flex-col min-w-0 flex-1", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: app.label }),
                          app.description && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-[12px] leading-[16px] text-ros-ink-muted truncate", children: app.description })
                        ] })
                      ]
                    },
                    app.key
                  ))
                ]
              }
            )
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "flex items-center gap-3 flex-shrink-0", children: logoInner }),
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

// src/patterns/AppSwitcher.tsx
var React7 = __toESM(require("react"), 1);
var import_jsx_runtime12 = require("react/jsx-runtime");
var brandBg3 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
var brandInitial2 = {
  callflow: "CF",
  consultflow: "Co",
  shiftflow: "SF"
};
var DEFAULT_APPS = [
  {
    key: "callflow",
    label: "CallFlow",
    url: "https://callflowai.pages.dev",
    description: "Analiza rozm\xF3w recepcji"
  },
  {
    key: "consultflow",
    label: "ConsultFlow",
    url: "https://consultflowai.pages.dev",
    description: "Analiza konsultacji lekarskich"
  },
  {
    key: "shiftflow",
    label: "ShiftFlow",
    url: "https://shiftflowai.pages.dev",
    description: "Grafiki i zmiany w klinice"
  }
];
function AppSwitcher({
  current,
  apps = DEFAULT_APPS,
  className
}) {
  const [open, setOpen] = React7.useState(false);
  const containerRef = React7.useRef(null);
  React7.useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "div",
    {
      ref: containerRef,
      className: cn("relative inline-block", className),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            "aria-label": "Prze\u0142\u0105cz aplikacj\u0119",
            "aria-expanded": open,
            "aria-haspopup": "menu",
            className: cn(
              "flex items-center gap-2 px-3 py-2 rounded-input",
              "text-[14px] leading-[20px] font-medium text-ros-ink",
              "bg-transparent hover:bg-ros-surface-hover transition-colors duration-150",
              "border-none cursor-pointer"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(GridIcon, {}),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: "Aplikacje" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ChevronDownIcon, { className: cn("transition-transform", open && "rotate-180") })
            ]
          }
        ),
        open && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "div",
          {
            role: "menu",
            className: cn(
              "absolute right-0 top-[calc(100%+4px)] z-50 w-72",
              "bg-white border border-ros-border rounded-lg shadow-lg",
              "py-2 overflow-hidden"
            ),
            children: apps.map((app) => {
              const isCurrent = app.key === current;
              const content = /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
                "div",
                {
                  className: cn(
                    "flex items-center gap-3 px-3 py-2.5",
                    "transition-colors duration-150",
                    isCurrent ? "bg-ros-surface-hover cursor-default" : "hover:bg-ros-surface-hover cursor-pointer"
                  ),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                      "div",
                      {
                        className: cn(
                          "size-8 rounded-input flex items-center justify-center text-white text-[12px] font-bold flex-shrink-0",
                          brandBg3[app.key]
                        ),
                        "aria-hidden": true,
                        children: brandInitial2[app.key]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col min-w-0 flex-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: app.label }),
                        isCurrent && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-[11px] leading-[14px] text-ros-ink-muted font-medium", children: "\xB7 obecna" })
                      ] }),
                      app.description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-[12px] leading-[16px] text-ros-ink-muted truncate", children: app.description })
                    ] })
                  ]
                }
              );
              if (isCurrent) {
                return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { role: "menuitem", "aria-current": "true", children: content }, app.key);
              }
              return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "a",
                {
                  href: app.url,
                  role: "menuitem",
                  className: "block no-underline text-inherit",
                  children: content
                },
                app.key
              );
            })
          }
        )
      ]
    }
  );
}
function GridIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "2", y: "2", width: "4", height: "4", rx: "0.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "10", y: "2", width: "4", height: "4", rx: "0.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "2", y: "10", width: "4", height: "4", rx: "0.5" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "10", y: "10", width: "4", height: "4", rx: "0.5" })
      ]
    }
  );
}
function ChevronDownIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      "aria-hidden": true,
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M4 6l4 4 4-4" })
    }
  );
}

// src/patterns/PageHeading.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
function PageHeading({
  title,
  description,
  actions,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: cn("flex items-start justify-between gap-4", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-col gap-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: title }),
      description && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "text-[14px] leading-[20px] text-ros-ink-muted", children: description })
    ] }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex items-center gap-2 flex-shrink-0", children: actions })
  ] });
}

// src/patterns/ImportDropZone.tsx
var React8 = __toESM(require("react"), 1);
var import_jsx_runtime14 = require("react/jsx-runtime");
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
  const inputRef = React8.useRef(null);
  const [dragOver, setDragOver] = React8.useState(false);
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-4",
        className
      ),
      children: [
        !selectedFile ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: cn("size-10 flex items-center justify-center", brandIcon2[brand]), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("polyline", { points: "17 8 12 3 7 8" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
                  ]
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "text-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: "Przeci\u0105gnij plik lub kliknij, aby wybra\u0107" }),
                acceptLabel && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted mt-1", children: acceptLabel }),
                maxSize && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "text-[12px] leading-[16px] text-ros-ink-faint mt-0.5", children: [
                  "Maks. ",
                  formatSize(maxSize)
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
        ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center justify-between p-3 rounded-input bg-ros-surface-off border border-ros-border", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: cn("size-8 flex items-center justify-center flex-shrink-0", brandIcon2[brand]), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: selectedFile.name }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: formatSize(selectedFile.size) })
            ] })
          ] }),
          !isUploading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "button",
            {
              type: "button",
              onClick: onRemove,
              disabled,
              className: "size-8 flex items-center justify-center rounded-input text-ros-ink-muted hover:text-ros-ink hover:bg-ros-surface-hover transition-colors duration-150 flex-shrink-0 border-none bg-transparent cursor-pointer",
              "aria-label": "Usu\u0144 plik",
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ]
                }
              )
            }
          )
        ] }),
        isUploading && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-full h-1.5 bg-ros-surface-off rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) }),
          progressLabel && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: progressLabel })
        ] }),
        children,
        selectedFile && onSubmit && !isUploading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Button, { brand, onClick: onSubmit, disabled, className: "w-full", children: submitLabel })
      ]
    }
  );
}

// src/patterns/ImportBatchRow.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
    "article",
    {
      className: cn(
        "flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: cn(
              "size-8 rounded-input flex-shrink-0 flex items-center justify-center text-white",
              brandIcon3[brand]
            ),
            "aria-hidden": true,
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
                  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: fileName }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Badge, { tone: cfg.tone, children: statusLabel ?? cfg.label }),
            timestamp && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "text-[12px] text-ros-ink-faint ml-auto flex-shrink-0", children: timestamp })
          ] }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted truncate", children: subtitle }),
          showProgress && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "w-full h-1 bg-ros-surface-off rounded-pill overflow-hidden mt-1", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        ctaLabel && onCta && status !== "analyzing" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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

// src/patterns/FeedRow.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var dotColors = {
  green: "bg-ros-success-fg",
  orange: "bg-ros-warn-fg",
  red: "bg-ros-danger-fg",
  gray: "bg-ros-ink-faint",
  blue: "bg-brand-callflow",
  purple: "bg-brand-consultflow"
};
function FeedRow({
  text,
  detail,
  timestamp,
  dot = "gray",
  onClick,
  compact = false,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    "div",
    {
      className: cn(
        "flex items-center gap-2 rounded-sm transition-colors duration-150",
        compact ? "px-2 py-1" : "px-2.5 py-1.5",
        onClick && "cursor-pointer hover:bg-white/50",
        className
      ),
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: cn("size-1.5 rounded-pill flex-shrink-0", dotColors[dot]) }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: cn(
            "text-ros-ink-muted truncate",
            compact ? "text-[11px] leading-[15px]" : "text-[12px] leading-[16px]"
          ), children: text }),
          detail && !compact && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-[10px] leading-[14px] text-ros-ink-faint truncate", children: detail })
        ] }),
        timestamp && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: cn(
          "text-ros-ink-faint flex-shrink-0",
          compact ? "text-[10px]" : "text-[11px]"
        ), children: timestamp })
      ]
    }
  );
}

// src/patterns/ImportPageLayout.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function ImportPageLayout({
  title,
  description,
  actions,
  children,
  panel,
  panelTitle = "Aktywno\u015B\u0107",
  className
}) {
  if (!panel) {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cn("flex flex-col gap-6 max-w-2xl mx-auto", className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PageHeading, { title, description, actions }),
      children
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: cn("flex gap-6 items-start", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "flex-1 min-w-0 flex flex-col gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(PageHeading, { title, description, actions }),
      children
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("aside", { className: "w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "px-4 py-3 border-b border-ros-border", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("p", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: panelTitle }) }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: panel })
    ] })
  ] });
}
var statusToDot = {
  sent: "orange",
  read: "green",
  pending: "orange",
  done: "green",
  analyzing: "orange",
  error: "red"
};
function ImportActivityRow({
  label,
  detail,
  timestamp,
  status,
  onClick,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    FeedRow,
    {
      text: label,
      detail,
      timestamp,
      dot: status ? statusToDot[status] : "gray",
      onClick,
      className
    }
  );
}

// src/patterns/TeamHeatmap.tsx
var React9 = __toESM(require("react"), 1);
var import_jsx_runtime18 = require("react/jsx-runtime");
function scoreTone(score) {
  if (score >= 75) return "success";
  if (score >= 50) return "warn";
  if (score > 0) return "danger";
  return "neutral";
}
function scoreBg(score) {
  if (score >= 75) return "bg-ros-success-bg";
  if (score >= 50) return "bg-[#fff7ed]";
  if (score > 0) return "bg-ros-danger-bg";
  return "bg-ros-surface-off";
}
function scoreText(score) {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  if (score > 0) return "text-ros-danger-fg";
  return "text-ros-ink-faint";
}
function TeamHeatmap({
  brand = "callflow",
  areas,
  members,
  suggestion,
  onWeakestAreaClick,
  className
}) {
  const areaAverages = React9.useMemo(() => {
    return areas.map((area) => {
      const scores = members.map((m) => m.scores[area]).filter((s) => s != null && s > 0);
      if (scores.length === 0) return { area, avg: 0, count: 0 };
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return { area, avg, count: scores.length };
    });
  }, [areas, members]);
  const weakest = React9.useMemo(() => {
    const scored = areaAverages.filter((a) => a.count > 0);
    if (scored.length === 0) return null;
    return scored.reduce((min, a) => a.avg < min.avg ? a : min, scored[0]);
  }, [areaAverages]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white p-4 flex flex-col gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: "Obszary" }),
            weakest && weakest.avg < 75 && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(Badge, { tone: scoreTone(weakest.avg), children: [
              weakest.area,
              " ",
              weakest.avg,
              "%"
            ] })
          ] }),
          suggestion && weakest && weakest.avg < 75 && onWeakestAreaClick && /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            "button",
            {
              type: "button",
              onClick: () => onWeakestAreaClick(weakest.area),
              className: cn(
                "text-[12px] leading-[16px] font-medium border-none bg-transparent cursor-pointer p-0",
                brand === "callflow" && "text-brand-callflow",
                brand === "consultflow" && "text-brand-consultflow",
                brand === "shiftflow" && "text-brand-shiftflow"
              ),
              children: [
                suggestion,
                " \u2192"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex gap-1.5", children: areaAverages.map(({ area, avg }) => {
          const isWeakest = weakest && area === weakest.area;
          return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
            "div",
            {
              className: cn(
                "flex-1 flex flex-col items-center gap-1 p-2 rounded-input",
                scoreBg(avg),
                isWeakest && "ring-1 ring-ros-warn-fg/40"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-[10px] leading-[12px] font-medium text-ros-ink-muted text-center truncate w-full", children: area }),
                /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: cn("text-[18px] leading-none font-bold", scoreText(avg)), children: avg > 0 ? avg : "\u2014" })
              ]
            },
            area
          );
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex flex-col gap-0.5", children: members.map((member) => /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "flex items-center gap-2 py-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "text-[12px] leading-[16px] text-ros-ink-medium w-[100px] truncate flex-shrink-0", children: member.name }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex gap-1 flex-1", children: areas.map((area) => {
            const score = member.scores[area] ?? 0;
            return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "div",
              {
                className: cn(
                  "flex-1 h-2 rounded-pill",
                  score >= 75 ? "bg-ros-success-fg/60" : score >= 50 ? "bg-ros-warn-fg/60" : score > 0 ? "bg-ros-danger-fg/60" : "bg-ros-surface-off"
                ),
                title: `${member.name} \xB7 ${area}: ${score}`
              },
              area
            );
          }) })
        ] }, member.name)) })
      ]
    }
  );
}

// src/patterns/ReportBreakdown.tsx
var React10 = __toESM(require("react"), 1);
var import_jsx_runtime19 = require("react/jsx-runtime");
function scoreTone2(score) {
  if (score >= 75) return "success";
  if (score >= 50) return "warn";
  return "danger";
}
function barColor(score) {
  if (score >= 75) return "bg-ros-success-fg";
  if (score >= 50) return "bg-ros-warn-fg";
  return "bg-ros-danger-fg";
}
function scoreText2(score) {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}
function ReportBreakdown({
  brand = "callflow",
  title,
  overallScore,
  previousOverallScore,
  areas,
  suggestions,
  maxSuggestions = 3,
  density = "default",
  className
}) {
  const isCompact = density === "compact";
  const weakestArea = React10.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => a.score < min.score ? a : min, areas[0]);
  }, [areas]);
  const visibleSuggestions = suggestions?.slice(0, maxSuggestions);
  const colClass = areas.length <= 3 ? "grid-cols-3" : areas.length <= 4 ? "grid-cols-4" : areas.length <= 6 ? "grid-cols-3 lg:grid-cols-6" : "grid-cols-3 lg:grid-cols-6";
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className
      ),
      children: [
        (title || overallScore != null) && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center justify-between px-5 pt-5 pb-3", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
          overallScore != null && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-baseline gap-2", children: [
            previousOverallScore != null && previousOverallScore !== overallScore && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("span", { className: "text-[14px] text-ros-ink-muted", children: [
              previousOverallScore,
              " \u2192"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: overallScore }),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "text-[12px] text-ros-ink-muted", children: "/100" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: cn("grid gap-2 px-5 pb-5", colClass), children: areas.map((area) => {
          const isWeakest = weakestArea && area.name === weakestArea.name;
          const isPositive = area.score >= 70;
          return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
            "div",
            {
              className: cn(
                "rounded-stat p-3 flex flex-col gap-1.5",
                isWeakest ? "bg-ros-danger-bg/50 ring-1 ring-ros-danger-fg/20" : "bg-ros-surface-off"
              ),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-center justify-between gap-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                    "span",
                    {
                      className: cn(
                        "leading-[14px] font-medium text-ros-ink-muted truncate",
                        isCompact ? "text-[10px]" : "text-[11px]"
                      ),
                      children: area.name
                    }
                  ),
                  !isCompact && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn("text-[11px]", scoreText2(area.score)), children: isPositive ? "\u2713" : "\u2757" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: cn("text-[20px] leading-none font-bold", scoreText2(area.score)), children: area.score > 0 ? (area.score / 10).toFixed(1) : "\u2014" }),
                /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "w-full h-1 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                  "div",
                  {
                    className: cn("h-full rounded-pill", barColor(area.score)),
                    style: { width: `${Math.min(100, Math.max(0, area.score))}%` }
                  }
                ) }),
                area.quote && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("p", { className: "text-[10px] leading-[14px] text-ros-ink-muted italic line-clamp-2 mt-0.5", children: [
                  "\u201E",
                  area.quote,
                  '"'
                ] })
              ]
            },
            area.name
          );
        }) }),
        visibleSuggestions && visibleSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "border-t border-ros-border px-5 py-4 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: visibleSuggestions.length === 1 ? "Sugestia" : `Priorytety (${visibleSuggestions.length})` }),
          /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "flex flex-col gap-2", children: visibleSuggestions.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
              Badge,
              {
                tone: scoreTone2(areas.find((a) => a.name === s.area)?.score ?? 0),
                className: "mt-0.5 flex-shrink-0",
                children: s.area
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("p", { className: "text-[13px] leading-[18px] text-ros-ink", children: s.text }),
              s.sourceQuote && /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("p", { className: "text-[11px] leading-[14px] text-ros-ink-muted italic truncate", children: [
                "\u201E",
                s.sourceQuote,
                '"'
              ] })
            ] })
          ] }, i)) })
        ] })
      ]
    }
  );
}

// src/patterns/MemberDetailView.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var brandBg4 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
var trendGlyph2 = {
  up: { glyph: "\u2191", tone: "success" },
  down: { glyph: "\u2193", tone: "danger" },
  flat: { glyph: "\u2192", tone: "neutral" }
};
var deliveryConfig = {
  delivered: { label: "Gotowe", className: "bg-ros-success-bg text-ros-success-fg" },
  pending: { label: "Oczekuje", className: "bg-[#fff7ed] text-ros-warn-fg" },
  not_sent: { label: "Nie wys\u0142ano", className: "bg-ros-surface-off text-ros-ink-faint" }
};
function getInitials2(name) {
  return name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}
function MemberDetailView({
  brand = "callflow",
  name,
  subtitle,
  metricLabel,
  metricValue,
  trend,
  status,
  overallScore,
  previousOverallScore,
  deliveryBadge,
  onBack,
  headerActions,
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: cn("flex flex-col gap-6", className), children: [
    onBack && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
      "button",
      {
        type: "button",
        onClick: onBack,
        className: "flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-ros-ink-muted hover:text-ros-ink transition-colors duration-150 border-none bg-transparent cursor-pointer p-0 self-start",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("polyline", { points: "15 18 9 12 15 6" })
            }
          ),
          "Powr\xF3t do zespo\u0142u"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-center justify-between gap-4 rounded-card border border-ros-border bg-white p-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "div",
          {
            className: cn(
              "size-12 rounded-pill flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0",
              brandBg4[brand]
            ),
            "aria-hidden": true,
            children: getInitials2(name)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: name }),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-[14px] leading-[20px] text-ros-ink-muted", children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-center gap-4 flex-shrink-0", children: [
        deliveryBadge && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "span",
          {
            className: cn(
              "px-3 py-1 rounded-pill text-[12px] font-medium",
              deliveryConfig[deliveryBadge].className
            ),
            children: deliveryConfig[deliveryBadge].label
          }
        ),
        overallScore != null && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex items-baseline gap-2", children: [
          previousOverallScore != null && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("span", { className: "text-[14px] text-ros-ink-muted", children: [
            previousOverallScore.toFixed(1),
            " \u2192"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "text-[28px] leading-none font-medium text-ros-ink", children: overallScore.toFixed(1) })
        ] }),
        metricValue && !overallScore && /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "text-right", children: [
          metricLabel && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: metricLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "text-[28px] leading-none font-medium text-ros-ink", children: metricValue })
        ] }),
        trend && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Badge, { tone: trendGlyph2[trend].tone, children: trendGlyph2[trend].glyph }),
        status === "attention" && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }),
        headerActions
      ] })
    ] }),
    children
  ] });
}

// src/patterns/ScoreCardRow.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
function barColor2(score) {
  if (score >= 75) return "bg-ros-success-fg";
  if (score >= 50) return "bg-ros-warn-fg";
  return "bg-ros-danger-fg";
}
function indicatorColor(score) {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}
function formatScore(score, scale) {
  if (score === 0) return "\u2014";
  if (scale === "ten") return (score / 10).toFixed(1);
  return `${score}%`;
}
function ScoreCardRow({
  cards,
  displayScale = "ten",
  columns,
  className
}) {
  const gridCols = columns ? `grid-cols-${columns}` : cards.length <= 3 ? "grid-cols-3" : cards.length <= 4 ? "grid-cols-4" : "grid-cols-3 lg:grid-cols-6";
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: cn("grid gap-3", gridCols, className), children: cards.map((card) => {
    const isPositive = card.score >= 70;
    return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
      "div",
      {
        className: "rounded-stat bg-ros-surface-off p-4 flex flex-col gap-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "text-[12px] leading-[16px] font-medium text-ros-ink-muted", children: card.name }),
            /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: cn("text-[12px]", indicatorColor(card.score)), children: isPositive ? "\u2713" : "\u2757" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: formatScore(card.score, displayScale) }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "w-full h-1.5 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "div",
            {
              className: cn(
                "h-full rounded-pill transition-all duration-300",
                barColor2(card.score)
              ),
              style: { width: `${Math.min(100, Math.max(0, card.score))}%` }
            }
          ) })
        ]
      },
      card.name
    );
  }) });
}

// src/patterns/PerformanceOverview.tsx
var React11 = __toESM(require("react"), 1);
var import_jsx_runtime22 = require("react/jsx-runtime");
function barColor3(score) {
  if (score >= 75) return "bg-ros-success-fg";
  if (score >= 50) return "bg-ros-warn-fg";
  return "bg-ros-danger-fg";
}
function scoreText3(score) {
  if (score >= 75) return "text-ros-success-fg";
  if (score >= 50) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}
var trendGlyph3 = {
  up: { glyph: "\u2191", color: "text-ros-success-fg" },
  down: { glyph: "\u2193", color: "text-ros-danger-fg" },
  flat: { glyph: "\u2192", color: "text-ros-ink-faint" }
};
function formatScore2(score, scale) {
  if (score === 0) return "\u2014";
  if (scale === "ten") return (score / 10).toFixed(1);
  return `${score}%`;
}
function formatDelta(current, previous, scale) {
  const diff = scale === "ten" ? (current - previous) / 10 : current - previous;
  if (diff === 0) return "";
  const sign = diff > 0 ? "+" : "";
  return scale === "ten" ? `${sign}${diff.toFixed(1)} vs. poprz.` : `${sign}${Math.round(diff)}% vs. poprz.`;
}
function PerformanceOverview({
  brand = "callflow",
  mode = "aggregate",
  displayScale = "ten",
  title = "Wyniki",
  periodLabel,
  overallScore,
  previousOverallScore,
  areas,
  headerBadge,
  showSummary,
  className
}) {
  const shouldShowSummary = showSummary ?? mode === "aggregate";
  const weakest = React11.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => a.score < min.score ? a : min, areas[0]);
  }, [areas]);
  const colClass = areas.length <= 3 ? "grid-cols-3" : areas.length <= 4 ? "grid-cols-4" : "grid-cols-3 lg:grid-cols-6";
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: cn("rounded-card border border-ros-border bg-white flex flex-col", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center justify-between px-5 pt-5 pb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
        periodLabel && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-[12px] text-ros-ink-faint", children: periodLabel }),
        headerBadge && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Badge, { tone: "neutral", children: headerBadge })
      ] }),
      overallScore != null && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-baseline gap-2", children: [
        previousOverallScore != null && previousOverallScore !== overallScore && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("span", { className: "text-[14px] text-ros-ink-muted", children: [
          formatScore2(previousOverallScore, displayScale),
          " \u2192"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: formatScore2(overallScore, displayScale) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: cn("grid gap-2 px-5 pb-4", colClass), children: areas.map((area) => {
      const isWeakest = weakest && area.name === weakest.name;
      const isPositive = area.score >= 70;
      const hasDelta = area.previousScore != null && area.previousScore !== area.score;
      return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
        "div",
        {
          className: cn(
            "rounded-stat p-3 flex flex-col gap-1.5",
            isWeakest ? "bg-ros-danger-bg/50 ring-1 ring-ros-danger-fg/20" : "bg-ros-surface-off"
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate", children: area.name }),
              /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: cn("text-[11px]", scoreText3(area.score)), children: isPositive ? "\u2713" : "\u2757" }),
                mode === "aggregate" && area.trend && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: cn("text-[11px]", trendGlyph3[area.trend].color), children: trendGlyph3[area.trend].glyph })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: cn("text-[20px] leading-none font-bold", scoreText3(area.score)), children: formatScore2(area.score, displayScale) }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "w-full h-1 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
              "div",
              {
                className: cn("h-full rounded-pill", barColor3(area.score)),
                style: { width: `${Math.min(100, Math.max(0, area.score))}%` }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "text-[10px] leading-[14px] text-ros-ink-faint", children: mode === "aggregate" && hasDelta ? formatDelta(area.score, area.previousScore, displayScale) : mode === "aggregate" && area.dataPoints != null ? `${area.dataPoints} raport\xF3w` : "" })
          ]
        },
        area.name
      );
    }) }),
    shouldShowSummary && areas.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "border-t border-ros-border px-5 py-3 flex flex-wrap gap-x-6 gap-y-1", children: [
      areas.some((a) => a.score >= 70) && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-[12px] text-ros-ink-muted", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-ros-success-fg font-medium", children: "Mocne:" }),
        " ",
        areas.filter((a) => a.score >= 70).map((a) => a.name).join(", ")
      ] }),
      weakest && weakest.score < 70 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "text-[12px] text-ros-ink-muted", children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "text-ros-danger-fg font-medium", children: "Do poprawy:" }),
        " ",
        weakest.name,
        weakest.trend === "down" && " (trend \u2193)"
      ] })
    ] })
  ] });
}

// src/patterns/DashboardLayout.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
function DashboardLayout({
  children,
  sidePanel,
  panel,
  panelTitle = "Zesp\xF3\u0142",
  panelToolbar,
  panelFooter,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("flex gap-6 items-start", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex-1 min-w-0 flex flex-col gap-4", children }),
    sidePanel || /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("aside", { className: "w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "px-4 py-3 border-b border-ros-border flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: panelTitle }) }),
      panelToolbar && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "px-3 py-2 border-b border-ros-border bg-ros-surface-off", children: panelToolbar }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: panel }),
      panelFooter && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "px-3 py-2.5 border-t border-ros-border bg-white", children: panelFooter })
    ] })
  ] });
}
function TeamPanelToolbar({
  totalCount,
  selectedCount,
  onSelectAll,
  onDeselectAll
}) {
  const allSelected = selectedCount === totalCount && totalCount > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      "input",
      {
        type: "checkbox",
        checked: allSelected,
        onChange: allSelected ? onDeselectAll : onSelectAll,
        className: "size-3.5 rounded-sm border-ros-border accent-current cursor-pointer"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-[12px] text-ros-ink-muted", children: selectedCount > 0 ? `${selectedCount} z ${totalCount}` : `Zaznacz wszystko` })
  ] }) });
}
function TeamPanelFooter({
  brand = "callflow",
  selectedCount,
  actionLabel,
  onAction,
  disabled
}) {
  if (selectedCount === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    Button,
    {
      brand,
      onClick: onAction,
      disabled,
      className: "w-full",
      children: [
        actionLabel,
        " (",
        selectedCount,
        ")"
      ]
    }
  );
}

// src/patterns/ActivityLog.tsx
var React12 = __toESM(require("react"), 1);
var import_jsx_runtime24 = require("react/jsx-runtime");
var typeToDot = {
  report_sent: "green",
  report_viewed: "green",
  schedule_sent: "green",
  schedule_confirmed: "green",
  absence: "red",
  preference_change: "gray",
  coaching_note: "gray",
  suggestion: "orange",
  feedback: "blue",
  custom: "gray"
};
function ActivityLog({
  entries,
  maxVisible = 10,
  className
}) {
  const [expanded, setExpanded] = React12.useState(false);
  const visible = maxVisible > 0 && !expanded ? entries.slice(0, maxVisible) : entries;
  const hasMore = maxVisible > 0 && entries.length > maxVisible;
  if (entries.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: cn("rounded-card border border-ros-border bg-white p-4", className), children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-[12px] text-ros-ink-muted text-center py-4", children: "Brak aktywno\u015Bci" }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "px-4 py-3 border-b border-ros-border", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: "Historia" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex flex-col py-1", children: visible.map((entry, i) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          FeedRow,
          {
            text: entry.text,
            detail: entry.detail,
            timestamp: entry.timestamp,
            dot: typeToDot[entry.type]
          },
          i
        )) }),
        hasMore && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setExpanded(!expanded),
            className: "px-4 py-2 text-[12px] font-medium text-ros-ink-muted hover:text-ros-ink border-t border-ros-border bg-transparent cursor-pointer transition-colors duration-150",
            children: expanded ? "Poka\u017C mniej" : `Poka\u017C wi\u0119cej (${entries.length - maxVisible})`
          }
        )
      ]
    }
  );
}

// src/patterns/SidePanel.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function SidePanel({
  teamContent,
  teamTitle = "Zesp\xF3\u0142",
  teamCount,
  teamToolbar,
  feedContent,
  feedTitle = "Ostatnie zmiany",
  footer,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
    "aside",
    {
      className: cn(
        "w-[384px] min-w-[384px] flex-shrink-0",
        "sticky top-[80px] h-[calc(100vh-96px)]",
        "flex flex-col rounded-card border border-ros-border bg-ros-surface-off overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-col flex-[6] min-h-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "px-4 py-2.5 flex items-center gap-2 flex-shrink-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-[13px] font-semibold text-ros-ink", children: teamTitle }),
            teamCount != null && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-[11px] text-ros-ink-faint", children: teamCount })
          ] }),
          teamToolbar && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "px-3 py-1 flex-shrink-0", children: teamToolbar }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex-1 overflow-y-auto px-2 py-1 flex flex-col gap-1", children: teamContent })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "mx-4 border-t border-ros-ink-faint/15 flex-shrink-0" }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex flex-col flex-[4] min-h-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "px-4 py-2 flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-[10px] font-semibold text-ros-ink-faint uppercase tracking-widest", children: feedTitle }) }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "flex-1 overflow-y-auto px-1 pb-1 flex flex-col", children: feedContent })
        ] }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "px-3 py-2 border-t border-ros-border bg-white flex-shrink-0", children: footer })
      ]
    }
  );
}

// src/patterns/SwipeView.tsx
var React13 = __toESM(require("react"), 1);
var import_jsx_runtime26 = require("react/jsx-runtime");
var brandDot = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function SwipeView({
  pages,
  initialPage = 0,
  onPageChange,
  brand = "callflow",
  className
}) {
  const scrollRef = React13.useRef(null);
  const [activeIndex, setActiveIndex] = React13.useState(initialPage);
  React13.useEffect(() => {
    if (scrollRef.current && initialPage > 0) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollLeft = width * initialPage;
    }
  }, []);
  React13.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let ticking = false;
    function handleScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!el) return;
        const width = el.offsetWidth;
        const index = Math.round(el.scrollLeft / width);
        const clamped = Math.max(0, Math.min(index, pages.length - 1));
        setActiveIndex((prev) => {
          if (prev !== clamped) {
            onPageChange?.(pages[clamped].key, clamped);
          }
          return clamped;
        });
        ticking = false;
      });
    }
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [pages, onPageChange]);
  function scrollToPage(index) {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: "smooth" });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: cn("flex flex-col", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex items-center justify-center gap-4 py-3 px-4", children: pages.map((page, i) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => scrollToPage(i),
        className: "flex flex-col items-center gap-1 bg-transparent border-none cursor-pointer p-0",
        "aria-label": page.label,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "span",
            {
              className: cn(
                "text-[11px] leading-[14px] font-medium transition-colors duration-150",
                i === activeIndex ? "text-ros-ink" : "text-ros-ink-faint"
              ),
              children: page.label
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "div",
            {
              className: cn(
                "h-1.5 rounded-pill transition-all duration-200",
                i === activeIndex ? cn("w-6", brandDot[brand]) : "w-1.5 bg-ros-ink-faint/40"
              )
            }
          )
        ]
      },
      page.key
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
      "div",
      {
        ref: scrollRef,
        className: "flex overflow-x-auto snap-x snap-mandatory scrollbar-hide",
        style: { WebkitOverflowScrolling: "touch", scrollbarWidth: "none" },
        children: pages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "div",
          {
            className: "w-full flex-shrink-0 snap-center",
            children: page.content
          },
          page.key
        ))
      }
    )
  ] });
}

// src/patterns/ReportCard.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var statusConfig2 = {
  completed: { label: "\u2713", tone: "success" },
  analyzing: { label: "...", tone: "warn" },
  pending: { label: "\u2191", tone: "neutral" },
  error: { label: "!", tone: "danger" }
};
var brandBg5 = {
  callflow: "bg-brand-callflow/10 text-brand-callflow",
  consultflow: "bg-brand-consultflow/10 text-brand-consultflow",
  shiftflow: "bg-brand-shiftflow/10 text-brand-shiftflow"
};
function scoreColor(score) {
  if (score >= 8) return "text-ros-success-fg";
  if (score >= 6) return "text-ros-warn-fg";
  return "text-ros-danger-fg";
}
function ReportCard({
  brand = "callflow",
  label,
  date,
  subtitle,
  status,
  score,
  scoreDetails,
  onOpen,
  className
}) {
  const cfg = statusConfig2[status];
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    "button",
    {
      type: "button",
      onClick: onOpen,
      className: cn(
        "w-full text-left rounded-stat bg-white border border-ros-border p-3.5 flex items-center gap-3 transition-colors duration-150 active:bg-ros-surface-hover cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          "div",
          {
            className: cn(
              "size-10 rounded-pill flex items-center justify-center flex-shrink-0 text-[13px] font-bold",
              brandBg5[brand]
            ),
            children: label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("p", { className: "text-[14px] font-medium text-ros-ink truncate", children: [
            "Pacjent ",
            label
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center gap-2 text-[11px] text-ros-ink-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: date }),
            subtitle && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { children: [
              "\xB7 ",
              subtitle
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          scoreDetails && scoreDetails.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "hidden sm:flex gap-2", children: scoreDetails.map((d) => /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: cn("text-[12px] font-bold", scoreColor(d.value)), children: d.value.toFixed(1) }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "text-[9px] text-ros-ink-faint", children: d.label })
          ] }, d.label)) }),
          status === "completed" && score != null && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "px-2 py-0.5 rounded-input bg-ros-surface-off", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: cn("text-[16px] font-bold", scoreColor(score)), children: score.toFixed(1) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Badge, { tone: cfg.tone, children: cfg.label })
        ] })
      ]
    }
  );
}

// src/patterns/ReportSection.tsx
var import_jsx_runtime28 = require("react/jsx-runtime");
var variantStyles = {
  scores: {
    bg: "bg-white",
    accent: "bg-ros-ink-faint",
    titleColor: "text-ros-ink"
  },
  tips: {
    bg: "bg-[#fffbf5]",
    accent: "bg-ros-warn-fg",
    titleColor: "text-[#c2410c]"
  },
  strength: {
    bg: "bg-[#f7fef9]",
    accent: "bg-ros-success-fg",
    titleColor: "text-ros-success-fg"
  },
  improve: {
    bg: "bg-[#fffaf5]",
    accent: "bg-[#ea580c]",
    titleColor: "text-[#ea580c]"
  },
  recommend: {
    bg: "bg-[#faf8ff]",
    accent: "bg-[#7c3aed]",
    titleColor: "text-[#7c3aed]"
  },
  progress: {
    bg: "bg-[#fdf8ff]",
    accent: "bg-[#9333ea]",
    titleColor: "text-[#9333ea]"
  },
  neutral: {
    bg: "bg-white",
    accent: "bg-ros-ink-faint",
    titleColor: "text-ros-ink"
  }
};
function ReportSection({
  variant = "neutral",
  title,
  icon,
  headerRight,
  children,
  className
}) {
  const v = variantStyles[variant];
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border overflow-hidden flex flex-col",
        v.bg,
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: cn("h-[3px] w-full", v.accent) }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center justify-between px-5 pt-4 pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("div", { className: "flex items-center gap-2", children: [
            icon && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: cn("flex-shrink-0", v.titleColor), children: icon }),
            /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("p", { className: cn("text-[14px] leading-[20px] font-semibold", v.titleColor), children: title })
          ] }),
          headerRight
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("div", { className: "px-5 pb-5", children })
      ]
    }
  );
}

// src/patterns/CardStack.tsx
var React14 = __toESM(require("react"), 1);
var import_jsx_runtime29 = require("react/jsx-runtime");
var brandBg6 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function CardStack({
  children,
  onProgress,
  brand = "callflow",
  className
}) {
  const cards = React14.Children.toArray(children);
  const total = cards.length;
  const [activeIndex, setActiveIndex] = React14.useState(0);
  const [dragX, setDragX] = React14.useState(0);
  const [isDragging, setIsDragging] = React14.useState(false);
  const [animating, setAnimating] = React14.useState(false);
  const startX = React14.useRef(0);
  const containerRef = React14.useRef(null);
  function handleStart(clientX) {
    if (animating) return;
    startX.current = clientX;
    setIsDragging(true);
  }
  function handleMove(clientX) {
    if (!isDragging || animating) return;
    const delta = clientX - startX.current;
    if (activeIndex === 0 && delta > 0) {
      setDragX(delta * 0.3);
    } else if (activeIndex >= total - 1 && delta < 0) {
      setDragX(delta * 0.3);
    } else {
      setDragX(delta);
    }
  }
  function goTo(index) {
    const clamped = Math.max(0, Math.min(index, total - 1));
    if (clamped === activeIndex) {
      setDragX(0);
      return;
    }
    setAnimating(true);
    const width = containerRef.current?.offsetWidth || 300;
    setDragX(clamped > activeIndex ? -width : width);
    setTimeout(() => {
      setActiveIndex(clamped);
      setDragX(0);
      setAnimating(false);
      onProgress?.(clamped, total);
    }, 200);
  }
  function handleEnd() {
    if (!isDragging || animating) return;
    setIsDragging(false);
    const width = containerRef.current?.offsetWidth || 300;
    const threshold = width * 0.25;
    if (dragX < -threshold && activeIndex < total - 1) {
      goTo(activeIndex + 1);
    } else if (dragX > threshold && activeIndex > 0) {
      goTo(activeIndex - 1);
    } else {
      setDragX(0);
    }
  }
  const progress = (activeIndex + 1) / total * 100;
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: cn("flex flex-col gap-4", className), children: [
    total > 1 && /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center gap-3 px-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex-1 h-1 bg-ros-surface-hover rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
        "div",
        {
          className: cn("h-full rounded-pill transition-all duration-200", brandBg6[brand]),
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("span", { className: "text-[11px] text-ros-ink-faint flex-shrink-0", children: [
        activeIndex + 1,
        "/",
        total
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      "div",
      {
        ref: containerRef,
        className: "relative w-full overflow-hidden",
        onTouchStart: (e) => handleStart(e.touches[0].clientX),
        onTouchMove: (e) => handleMove(e.touches[0].clientX),
        onTouchEnd: handleEnd,
        onMouseDown: (e) => handleStart(e.clientX),
        onMouseMove: (e) => {
          if (isDragging) handleMove(e.clientX);
        },
        onMouseUp: handleEnd,
        onMouseLeave: () => {
          if (isDragging) handleEnd();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
          "div",
          {
            className: cn(
              "w-full",
              isDragging || animating ? "" : "transition-transform duration-200",
              animating && "transition-transform duration-200"
            ),
            style: {
              transform: `translateX(${dragX}px)`
            },
            children: cards[activeIndex]
          }
        )
      }
    ),
    activeIndex === 0 && total > 1 && !isDragging && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-center text-[11px] text-ros-ink-faint animate-pulse", children: "\u2190 przesu\u0144, aby zobaczy\u0107 wi\u0119cej" })
  ] });
}

// src/patterns/TranscriptDrawer.tsx
var React15 = __toESM(require("react"), 1);
var import_jsx_runtime30 = require("react/jsx-runtime");
function TranscriptDrawer({
  content,
  onCopy,
  label = "Transkrypcja",
  className
}) {
  const [expanded, setExpanded] = React15.useState(false);
  const [dragY, setDragY] = React15.useState(0);
  const [isDragging, setIsDragging] = React15.useState(false);
  const startY = React15.useRef(0);
  if (!content) return null;
  function handleStart(clientY) {
    startY.current = clientY;
    setIsDragging(true);
  }
  function handleMove(clientY) {
    if (!isDragging) return;
    const delta = clientY - startY.current;
    if (expanded) {
      setDragY(Math.max(0, delta));
    } else {
      setDragY(Math.min(0, delta));
    }
  }
  function handleEnd() {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60;
    if (expanded && dragY > threshold) {
      setExpanded(false);
    } else if (!expanded && Math.abs(dragY) > threshold) {
      setExpanded(true);
    }
    setDragY(0);
  }
  function handleCopy() {
    navigator.clipboard.writeText(content).catch(() => {
    });
    onCopy?.();
  }
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
    "div",
    {
      className: cn(
        "fixed inset-x-0 bottom-0 z-40 flex flex-col bg-white border-t border-ros-border rounded-t-card shadow-card transition-transform",
        isDragging ? "duration-0" : "duration-300",
        className
      ),
      style: {
        transform: expanded ? `translateY(${Math.max(0, dragY)}px)` : `translateY(calc(100% - 48px + ${Math.min(0, dragY)}px))`,
        maxHeight: "70vh"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3 cursor-pointer select-none flex-shrink-0",
            onClick: () => {
              if (!isDragging) setExpanded(!expanded);
            },
            onTouchStart: (e) => handleStart(e.touches[0].clientY),
            onTouchMove: (e) => handleMove(e.touches[0].clientY),
            onTouchEnd: handleEnd,
            onMouseDown: (e) => handleStart(e.clientY),
            onMouseMove: (e) => {
              if (isDragging) handleMove(e.clientY);
            },
            onMouseUp: handleEnd,
            onMouseLeave: () => {
              if (isDragging) handleEnd();
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "w-8 h-1 rounded-pill bg-ros-ink-faint/40 mx-auto absolute left-1/2 -translate-x-1/2 top-1.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "text-[13px] font-medium text-ros-ink-medium mt-1", children: label }),
                /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "text-[11px] text-ros-ink-faint mt-1", children: expanded ? "\u25BC" : "\u25B2" })
              ] }),
              expanded && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
                Button,
                {
                  variant: "ghost",
                  className: "text-[11px] h-7 px-2 mt-1",
                  onClick: (e) => {
                    e.stopPropagation();
                    handleCopy();
                  },
                  children: "Kopiuj"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("div", { className: "flex-1 overflow-y-auto px-4 pb-6", children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("p", { className: "text-[13px] leading-[20px] text-ros-ink-medium whitespace-pre-wrap", children: content }) })
      ]
    }
  );
}

// src/patterns/SetupFlow.tsx
var React16 = __toESM(require("react"), 1);
var import_jsx_runtime31 = require("react/jsx-runtime");
var brandBg7 = {
  callflow: "bg-brand-callflow",
  consultflow: "bg-brand-consultflow",
  shiftflow: "bg-brand-shiftflow"
};
function SetupFlow({
  steps,
  onComplete,
  completeLabel = "Gotowe",
  onCancel,
  brand = "callflow",
  className
}) {
  const [activeIndex, setActiveIndex] = React16.useState(0);
  const total = steps.length;
  const current = steps[activeIndex];
  const isLast = activeIndex >= total - 1;
  const isFirst = activeIndex === 0;
  function handleNext() {
    if (isLast) {
      onComplete();
    } else {
      setActiveIndex((i) => Math.min(i + 1, total - 1));
    }
  }
  function handleBack() {
    setActiveIndex((i) => Math.max(i - 1, 0));
  }
  function handleSkip() {
    if (current.optional && !isLast) {
      setActiveIndex((i) => Math.min(i + 1, total - 1));
    }
  }
  const progress = (activeIndex + 1) / total * 100;
  const canProceed = current.isValid !== false;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: cn("flex flex-col gap-4", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center gap-3", children: [
      onCancel && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "text-[13px] text-ros-ink-muted hover:text-ros-ink bg-transparent border-none cursor-pointer p-0 flex-shrink-0",
          children: "\u2715"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "flex-1 h-1.5 bg-ros-surface-hover rounded-pill overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        "div",
        {
          className: cn("h-full rounded-pill transition-all duration-300", brandBg7[brand]),
          style: { width: `${progress}%` }
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("span", { className: "text-[12px] text-ros-ink-faint flex-shrink-0", children: [
        activeIndex + 1,
        "/",
        total
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h3", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: current.title }),
        current.subtitle && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "text-[13px] text-ros-ink-muted mt-0.5", children: current.subtitle })
      ] }),
      current.optional && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        "button",
        {
          type: "button",
          onClick: handleSkip,
          className: "text-[13px] text-ros-ink-muted hover:text-ros-ink bg-transparent border-none cursor-pointer p-0",
          children: "Pomi\u0144 \u2192"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "rounded-card border border-ros-border bg-white p-5", children: current.content }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center justify-between", children: [
      !isFirst ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Button, { variant: "ghost", onClick: handleBack, children: "\u2190 Wstecz" }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", {}),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
        Button,
        {
          brand,
          onClick: handleNext,
          disabled: !canProceed,
          children: isLast ? completeLabel : "Dalej \u2192"
        }
      )
    ] })
  ] });
}

// src/patterns/StaffRosterRow.tsx
var import_jsx_runtime32 = require("react/jsx-runtime");
var trendGlyph4 = {
  up: "\u2191",
  down: "\u2193",
  flat: "\u2192"
};
var trendTone = {
  up: "success",
  down: "danger",
  flat: "neutral"
};
var emphasisRing = {
  none: "border-ros-border",
  warning: "border-ros-warn-fg",
  selected: "border-ros-ink-faint bg-ros-surface-off"
};
function StaffRosterRow({
  accentColor,
  name,
  subtitle,
  primaryMetric,
  metricCaption,
  trend,
  tags,
  relationLine,
  actions,
  emphasis = "none",
  density = "comfortable",
  onClick,
  className
}) {
  const isCompact = density === "compact";
  const visibleTags = (tags ?? []).slice(0, isCompact ? 2 : 3);
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
    "div",
    {
      className: cn(
        "w-full flex items-stretch rounded-input border bg-white",
        "transition-colors duration-150",
        isCompact ? "gap-2 p-2" : "gap-3 p-3",
        emphasisRing[emphasis],
        onClick && "cursor-pointer hover:bg-ros-surface-hover",
        className
      ),
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "span",
          {
            "aria-hidden": true,
            className: "w-1 rounded-pill flex-shrink-0",
            style: { backgroundColor: accentColor }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            "p",
            {
              className: cn(
                "font-medium text-ros-ink truncate",
                isCompact ? "text-[12px]" : "text-[13px]"
              ),
              children: name
            }
          ),
          subtitle && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
            "p",
            {
              className: cn(
                "text-ros-ink-muted truncate",
                isCompact ? "text-[10px]" : "text-[11px]"
              ),
              children: subtitle
            }
          ),
          !isCompact && relationLine && /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("p", { className: "text-[11px] text-ros-ink-faint truncate flex items-center gap-1 mt-0.5", children: [
            relationLine.icon,
            /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { className: "truncate", children: relationLine.text })
          ] }),
          visibleTags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("div", { className: cn("flex gap-1 flex-wrap", isCompact ? "mt-0.5" : "mt-1"), children: visibleTags.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Badge, { tone: t.tone ?? "neutral", children: t.label }, `${t.label}-${i}`)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(
          "div",
          {
            className: cn(
              "flex flex-col items-end gap-0 flex-shrink-0",
              isCompact ? "min-w-[56px]" : "min-w-[80px]"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { className: "text-[10px] text-ros-ink-muted leading-none", children: primaryMetric.label }),
              /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: "flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                  "span",
                  {
                    className: cn(
                      "font-semibold text-ros-ink leading-tight",
                      isCompact ? "text-[13px]" : "text-[15px]"
                    ),
                    children: primaryMetric.value
                  }
                ),
                !isCompact && trend && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Badge, { tone: trendTone[trend], children: trendGlyph4[trend] })
              ] }),
              metricCaption && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
                "span",
                {
                  className: cn(
                    "text-[10px] text-ros-ink-faint mt-0.5 truncate",
                    isCompact ? "max-w-[80px]" : "max-w-[120px]"
                  ),
                  children: metricCaption
                }
              )
            ]
          }
        ),
        actions && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          "div",
          {
            className: "flex items-center gap-1 flex-shrink-0",
            onClick: (e) => e.stopPropagation(),
            children: actions
          }
        )
      ]
    }
  );
}

// src/patterns/StaffRosterPanel.tsx
var React17 = __toESM(require("react"), 1);
var import_jsx_runtime33 = require("react/jsx-runtime");
var brandFocusRing = {
  callflow: "focus:border-brand-callflow",
  consultflow: "focus:border-brand-consultflow",
  shiftflow: "focus:border-brand-shiftflow"
};
function StaffRosterPanel({
  brand = "callflow",
  title,
  count,
  filters,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Szukaj\u2026",
  primaryAction,
  footer,
  emptyState,
  density = "comfortable",
  children,
  className
}) {
  const isCompact = density === "compact";
  const childCount = React17.Children.count(children);
  const isEmpty = childCount === 0;
  const showToolbar = Boolean(onSearchChange) || filters && filters.length > 0;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
    "section",
    {
      className: cn(
        "flex flex-col",
        isCompact ? "gap-2" : "gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("header", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            "h2",
            {
              className: cn(
                "font-semibold text-ros-ink",
                isCompact ? "text-[12px] uppercase tracking-wide" : "text-[14px]"
              ),
              children: [
                title,
                /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("span", { className: "text-ros-ink-faint font-normal", children: [
                  " \xB7 ",
                  count
                ] })
              ]
            }
          ),
          primaryAction && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
            Button,
            {
              brand,
              onClick: primaryAction.onClick,
              className: isCompact ? "h-7 px-2 text-[11px]" : "h-9 px-3 text-[13px]",
              children: [
                "+ ",
                primaryAction.label
              ]
            }
          )
        ] }),
        showToolbar && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex gap-2 items-center flex-wrap", children: [
          onSearchChange && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "input",
            {
              type: "search",
              value: searchValue ?? "",
              onChange: (e) => onSearchChange(e.target.value),
              placeholder: searchPlaceholder,
              "aria-label": searchPlaceholder,
              className: cn(
                "flex-1 min-w-[140px] bg-white rounded-input border border-ros-border-input shadow-subtle text-ros-ink outline-none transition-colors",
                isCompact ? "h-7 px-2 text-[11px]" : "h-9 px-3 text-[13px]",
                brandFocusRing[brand]
              )
            }
          ),
          filters?.map((f) => /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
            "button",
            {
              type: "button",
              onClick: f.onToggle,
              className: cn(
                "rounded-pill border transition-colors",
                isCompact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1.5 text-[11px]",
                f.active ? "bg-ros-ink text-white border-ros-ink" : "bg-white text-ros-ink-muted border-ros-border hover:bg-ros-surface-hover"
              ),
              "aria-pressed": f.active,
              children: f.label
            },
            f.label
          ))
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: cn("flex flex-col", isCompact ? "gap-1" : "gap-2"), children: isEmpty && emptyState ? emptyState : children }),
        footer && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
          "footer",
          {
            className: cn(
              "text-ros-ink-muted pt-2 border-t border-ros-border",
              isCompact ? "text-[10px]" : "text-[11px]"
            ),
            children: footer
          }
        )
      ]
    }
  );
}

// src/patterns/WeekNavigator.tsx
var React18 = __toESM(require("react"), 1);
var import_jsx_runtime34 = require("react/jsx-runtime");
function WeekNavigator({
  brand = "callflow",
  currentLabel,
  parityLabel,
  parityTone = "neutral",
  isReadOnly = false,
  prevDisabled = false,
  nextDisabled = false,
  previousLabel,
  nextLabel,
  onPrev,
  onNext,
  onToday,
  generateActions,
  className
}) {
  const [genOpen, setGenOpen] = React18.useState(false);
  const genRef = React18.useRef(null);
  React18.useEffect(() => {
    if (!genOpen) return;
    function onDocClick(e) {
      if (genRef.current && !genRef.current.contains(e.target)) {
        setGenOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [genOpen]);
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
    "div",
    {
      className: cn(
        "flex items-center gap-2 flex-wrap",
        className
      ),
      role: "toolbar",
      "aria-label": "Nawigacja tygodniowa",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          "button",
          {
            type: "button",
            onClick: onPrev,
            disabled: prevDisabled,
            title: previousLabel ? `Poprzedni: ${previousLabel}` : "Poprzedni tydzie\u0144",
            "aria-label": previousLabel ? `Poprzedni tydzie\u0144: ${previousLabel}` : "Poprzedni tydzie\u0144",
            className: cn(
              "h-8 px-2 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px]",
              "hover:bg-ros-surface-hover transition-colors",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            ),
            children: "\u2190"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-pill border border-ros-border bg-white",
              isReadOnly && "bg-ros-surface-off"
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "text-[13px] font-medium text-ros-ink whitespace-nowrap", children: currentLabel }),
              parityLabel && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Badge, { tone: parityTone, children: parityLabel }),
              isReadOnly && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                "span",
                {
                  className: "text-[11px] text-ros-ink-faint",
                  title: "Tydzie\u0144 historyczny \u2014 tylko podgl\u0105d",
                  "aria-label": "Tydzie\u0144 historyczny",
                  children: "\u{1F512}"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          "button",
          {
            type: "button",
            onClick: onNext,
            disabled: nextDisabled,
            title: nextLabel ? `Nast\u0119pny: ${nextLabel}` : "Nast\u0119pny tydzie\u0144",
            "aria-label": nextLabel ? `Nast\u0119pny tydzie\u0144: ${nextLabel}` : "Nast\u0119pny tydzie\u0144",
            className: cn(
              "h-8 px-2 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px]",
              "hover:bg-ros-surface-hover transition-colors",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            ),
            children: "\u2192"
          }
        ),
        onToday && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
          "button",
          {
            type: "button",
            onClick: onToday,
            className: "h-8 px-3 rounded-pill border border-ros-border bg-white text-ros-ink-muted text-[12px] hover:bg-ros-surface-hover transition-colors",
            children: "Dzi\u015B"
          }
        ),
        generateActions && generateActions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { ref: genRef, className: "relative ml-auto", children: [
          /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
            Button,
            {
              brand,
              onClick: () => setGenOpen((v) => !v),
              className: "h-8 px-3 text-[12px]",
              children: [
                "+ Zaplanuj ",
                generateActions.length > 1 && "\u25BE"
              ]
            }
          ),
          genOpen && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
            "div",
            {
              role: "menu",
              className: "absolute right-0 top-full mt-1 z-10 min-w-[180px] rounded-input border border-ros-border bg-white shadow-card overflow-hidden",
              children: generateActions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
                "button",
                {
                  type: "button",
                  role: "menuitem",
                  onClick: () => {
                    a.onClick();
                    setGenOpen(false);
                  },
                  className: "w-full text-left px-3 py-2 text-[13px] text-ros-ink hover:bg-ros-surface-hover transition-colors",
                  children: a.label
                },
                `${a.label}-${a.weeksAhead}`
              ))
            }
          )
        ] })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActivityLog,
  AppHeader,
  AppHeaderMenuItem,
  AppSwitcher,
  Badge,
  Button,
  Card,
  CardStack,
  DashboardHeader,
  DashboardLayout,
  EmptyState,
  FeedRow,
  ImportActivityRow,
  ImportBatchRow,
  ImportDropZone,
  ImportPageLayout,
  InboxNotification,
  Input,
  MemberDetailView,
  PageHeading,
  PerformanceOverview,
  ProfileForm,
  ReportBreakdown,
  ReportCard,
  ReportSection,
  ScoreCardRow,
  SetupFlow,
  SidePanel,
  StaffRosterPanel,
  StaffRosterRow,
  SwipeView,
  TeamHeatmap,
  TeamMemberRow,
  TeamPanelFooter,
  TeamPanelToolbar,
  TranscriptDrawer,
  TrendChart,
  WeekNavigator,
  tokens
});
//# sourceMappingURL=index.cjs.map