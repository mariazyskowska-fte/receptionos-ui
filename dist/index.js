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
  return /* @__PURE__ */ jsxs7(
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
        selectable && /* @__PURE__ */ jsx10(
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
        /* @__PURE__ */ jsx10(
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
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-0 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx10("p", { className: "text-[13px] font-medium text-ros-ink truncate", children: name }),
            deliveryStatus && /* @__PURE__ */ jsx10(
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
          subtitle && /* @__PURE__ */ jsx10("p", { className: "text-[11px] text-ros-ink-muted truncate", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
          /* @__PURE__ */ jsxs7("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx10("p", { className: "text-[10px] text-ros-ink-muted leading-none", children: metricLabel }),
            /* @__PURE__ */ jsx10("p", { className: "text-[13px] font-medium text-ros-ink leading-tight", children: metricValue })
          ] }),
          trend && /* @__PURE__ */ jsx10(Badge, { tone: trendGlyph[trend].tone, children: trendGlyph[trend].glyph }),
          status === "attention" ? /* @__PURE__ */ jsx10(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }) : /* @__PURE__ */ jsx10(Badge, { tone: "success", "aria-label": "OK", children: "\u2713" })
        ] })
      ]
    }
  );
}

// src/patterns/AppHeader.tsx
import * as React5 from "react";
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx11(
    "header",
    {
      className: cn(
        "sticky top-0 z-50 h-16 w-full bg-white border-b border-ros-border",
        className
      ),
      children: /* @__PURE__ */ jsxs8("div", { className: "flex items-center justify-between h-full px-6 max-w-full", children: [
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-6 min-w-0", children: [
          /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsx11(
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
            /* @__PURE__ */ jsxs8("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx11("span", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: appName }),
              appSubtitle && /* @__PURE__ */ jsx11("span", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: appSubtitle })
            ] })
          ] }),
          navItems && navItems.length > 0 && /* @__PURE__ */ jsx11("nav", { className: "flex items-center gap-[2px]", "aria-label": "Nawigacja g\u0142\xF3wna", children: navItems.map((item) => {
            const isActive = item.key === activeKey;
            return /* @__PURE__ */ jsxs8(
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
                  /* @__PURE__ */ jsxs8("span", { children: [
                    item.label,
                    item.badge != null && item.badge > 0 && /* @__PURE__ */ jsxs8("span", { className: "text-ros-ink-muted", children: [
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
        /* @__PURE__ */ jsxs8("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          actions,
          userName && /* @__PURE__ */ jsxs8("div", { className: "relative", ref: menuRef, children: [
            /* @__PURE__ */ jsxs8(
              "button",
              {
                type: "button",
                onClick: () => setUserMenuOpen((o) => !o),
                className: "flex items-center gap-2 pl-2 pr-2.5 py-2 rounded-input bg-white hover:bg-ros-surface-hover active:bg-ros-border transition-colors duration-150 border-none cursor-pointer",
                "aria-expanded": userMenuOpen,
                "aria-haspopup": "true",
                children: [
                  /* @__PURE__ */ jsx11(
                    "div",
                    {
                      className: cn(
                        "size-8 rounded-pill flex items-center justify-center text-white text-[14px] font-bold",
                        brandBg2[brand]
                      ),
                      children: getInitials(userName)
                    }
                  ),
                  /* @__PURE__ */ jsx11(
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
                      children: /* @__PURE__ */ jsx11("polyline", { points: "6 9 12 15 18 9" })
                    }
                  )
                ]
              }
            ),
            userMenuOpen && userMenuContent && /* @__PURE__ */ jsx11("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white rounded-input border border-ros-border shadow-card p-1 z-50", children: userMenuContent })
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
  return /* @__PURE__ */ jsxs8(
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
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
function PageHeading({
  title,
  description,
  actions,
  className
}) {
  return /* @__PURE__ */ jsxs9("div", { className: cn("flex items-start justify-between gap-4", className), children: [
    /* @__PURE__ */ jsxs9("div", { className: "flex flex-col gap-1 min-w-0", children: [
      /* @__PURE__ */ jsx12("h2", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: title }),
      description && /* @__PURE__ */ jsx12("p", { className: "text-[14px] leading-[20px] text-ros-ink-muted", children: description })
    ] }),
    actions && /* @__PURE__ */ jsx12("div", { className: "flex items-center gap-2 flex-shrink-0", children: actions })
  ] });
}

// src/patterns/ImportDropZone.tsx
import * as React6 from "react";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs10(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white p-6 flex flex-col gap-4",
        className
      ),
      children: [
        !selectedFile ? /* @__PURE__ */ jsxs10(
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
              /* @__PURE__ */ jsx13("div", { className: cn("size-10 flex items-center justify-center", brandIcon2[brand]), children: /* @__PURE__ */ jsxs10(
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
                    /* @__PURE__ */ jsx13("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                    /* @__PURE__ */ jsx13("polyline", { points: "17 8 12 3 7 8" }),
                    /* @__PURE__ */ jsx13("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs10("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx13("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: "Przeci\u0105gnij plik lub kliknij, aby wybra\u0107" }),
                acceptLabel && /* @__PURE__ */ jsx13("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted mt-1", children: acceptLabel }),
                maxSize && /* @__PURE__ */ jsxs10("p", { className: "text-[12px] leading-[16px] text-ros-ink-faint mt-0.5", children: [
                  "Maks. ",
                  formatSize(maxSize)
                ] })
              ] }),
              /* @__PURE__ */ jsx13(
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
        ) : /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between p-3 rounded-input bg-ros-surface-off border border-ros-border", children: [
          /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsx13("div", { className: cn("size-8 flex items-center justify-center flex-shrink-0", brandIcon2[brand]), children: /* @__PURE__ */ jsxs10(
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
                  /* @__PURE__ */ jsx13("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ jsx13("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxs10("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx13("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: selectedFile.name }),
              /* @__PURE__ */ jsx13("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: formatSize(selectedFile.size) })
            ] })
          ] }),
          !isUploading && /* @__PURE__ */ jsx13(
            "button",
            {
              type: "button",
              onClick: onRemove,
              disabled,
              className: "size-8 flex items-center justify-center rounded-input text-ros-ink-muted hover:text-ros-ink hover:bg-ros-surface-hover transition-colors duration-150 flex-shrink-0 border-none bg-transparent cursor-pointer",
              "aria-label": "Usu\u0144 plik",
              children: /* @__PURE__ */ jsxs10(
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
                    /* @__PURE__ */ jsx13("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ jsx13("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ]
                }
              )
            }
          )
        ] }),
        isUploading && /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsx13("div", { className: "w-full h-1.5 bg-ros-surface-off rounded-pill overflow-hidden", children: /* @__PURE__ */ jsx13(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) }),
          progressLabel && /* @__PURE__ */ jsx13("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: progressLabel })
        ] }),
        children,
        selectedFile && onSubmit && !isUploading && /* @__PURE__ */ jsx13(Button, { brand, onClick: onSubmit, disabled, className: "w-full", children: submitLabel })
      ]
    }
  );
}

// src/patterns/ImportBatchRow.tsx
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs11(
    "article",
    {
      className: cn(
        "flex items-center gap-3 p-3 rounded-input bg-white border border-ros-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsx14(
          "div",
          {
            className: cn(
              "size-8 rounded-input flex-shrink-0 flex items-center justify-center text-white",
              brandIcon3[brand]
            ),
            "aria-hidden": true,
            children: /* @__PURE__ */ jsxs11(
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
                  /* @__PURE__ */ jsx14("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ jsx14("polyline", { points: "14 2 14 8 20 8" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-0.5 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxs11("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx14("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink truncate", children: fileName }),
            /* @__PURE__ */ jsx14(Badge, { tone: cfg.tone, children: statusLabel ?? cfg.label }),
            timestamp && /* @__PURE__ */ jsx14("span", { className: "text-[12px] text-ros-ink-faint ml-auto flex-shrink-0", children: timestamp })
          ] }),
          subtitle && /* @__PURE__ */ jsx14("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted truncate", children: subtitle }),
          showProgress && /* @__PURE__ */ jsx14("div", { className: "w-full h-1 bg-ros-surface-off rounded-pill overflow-hidden mt-1", children: /* @__PURE__ */ jsx14(
            "div",
            {
              className: cn("h-full rounded-pill transition-all duration-300", `bg-brand-${brand}`),
              style: { width: `${progress}%` }
            }
          ) })
        ] }),
        ctaLabel && onCta && status !== "analyzing" && /* @__PURE__ */ jsx14("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsx14(
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
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs12("div", { className: cn("flex flex-col gap-6 max-w-2xl mx-auto", className), children: [
      /* @__PURE__ */ jsx15(PageHeading, { title, description, actions }),
      children
    ] });
  }
  return /* @__PURE__ */ jsxs12("div", { className: cn("flex gap-6 items-start", className), children: [
    /* @__PURE__ */ jsxs12("div", { className: "flex-1 min-w-0 flex flex-col gap-6", children: [
      /* @__PURE__ */ jsx15(PageHeading, { title, description, actions }),
      children
    ] }),
    /* @__PURE__ */ jsxs12("aside", { className: "w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden", children: [
      /* @__PURE__ */ jsx15("div", { className: "px-4 py-3 border-b border-ros-border", children: /* @__PURE__ */ jsx15("p", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: panelTitle }) }),
      /* @__PURE__ */ jsx15("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: panel })
    ] })
  ] });
}
var statusDot = {
  sent: { color: "bg-ros-warn-fg", title: "Wys\u0142ano" },
  read: { color: "bg-ros-success-fg", title: "Odczytano" },
  pending: { color: "bg-ros-warn-fg", title: "Oczekuje" },
  done: { color: "bg-ros-success-fg", title: "Zrealizowano" },
  analyzing: { color: "bg-ros-warn-fg", title: "Analizuj\u0119" },
  error: { color: "bg-ros-danger-fg", title: "B\u0142\u0105d" }
};
function ImportActivityRow({
  label,
  detail,
  timestamp,
  status,
  onClick,
  className
}) {
  const dot = status ? statusDot[status] : null;
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-input transition-colors duration-150",
        onClick && "cursor-pointer hover:bg-ros-surface-hover",
        className
      ),
      onClick,
      role: onClick ? "button" : void 0,
      tabIndex: onClick ? 0 : void 0,
      children: [
        dot && /* @__PURE__ */ jsx15(
          "span",
          {
            className: cn("size-2 rounded-pill flex-shrink-0", dot.color),
            title: dot.title
          }
        ),
        /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-0 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx15("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsx15("p", { className: "text-[13px] font-medium text-ros-ink truncate", children: label }) }),
          detail && /* @__PURE__ */ jsx15("p", { className: "text-[11px] text-ros-ink-muted truncate", children: detail })
        ] }),
        timestamp && /* @__PURE__ */ jsx15("span", { className: "text-[11px] text-ros-ink-faint flex-shrink-0", children: timestamp })
      ]
    }
  );
}

// src/patterns/TeamHeatmap.tsx
import * as React7 from "react";
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
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
  const areaAverages = React7.useMemo(() => {
    return areas.map((area) => {
      const scores = members.map((m) => m.scores[area]).filter((s) => s != null && s > 0);
      if (scores.length === 0) return { area, avg: 0, count: 0 };
      const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
      return { area, avg, count: scores.length };
    });
  }, [areas, members]);
  const weakest = React7.useMemo(() => {
    const scored = areaAverages.filter((a) => a.count > 0);
    if (scored.length === 0) return null;
    return scored.reduce((min, a) => a.avg < min.avg ? a : min, scored[0]);
  }, [areaAverages]);
  return /* @__PURE__ */ jsxs13(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white p-4 flex flex-col gap-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx16("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: "Obszary" }),
            weakest && weakest.avg < 75 && /* @__PURE__ */ jsxs13(Badge, { tone: scoreTone(weakest.avg), children: [
              weakest.area,
              " ",
              weakest.avg,
              "%"
            ] })
          ] }),
          suggestion && weakest && weakest.avg < 75 && onWeakestAreaClick && /* @__PURE__ */ jsxs13(
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
        /* @__PURE__ */ jsx16("div", { className: "flex gap-1.5", children: areaAverages.map(({ area, avg }) => {
          const isWeakest = weakest && area === weakest.area;
          return /* @__PURE__ */ jsxs13(
            "div",
            {
              className: cn(
                "flex-1 flex flex-col items-center gap-1 p-2 rounded-input",
                scoreBg(avg),
                isWeakest && "ring-1 ring-ros-warn-fg/40"
              ),
              children: [
                /* @__PURE__ */ jsx16("span", { className: "text-[10px] leading-[12px] font-medium text-ros-ink-muted text-center truncate w-full", children: area }),
                /* @__PURE__ */ jsx16("span", { className: cn("text-[18px] leading-none font-bold", scoreText(avg)), children: avg > 0 ? avg : "\u2014" })
              ]
            },
            area
          );
        }) }),
        /* @__PURE__ */ jsx16("div", { className: "flex flex-col gap-0.5", children: members.map((member) => /* @__PURE__ */ jsxs13("div", { className: "flex items-center gap-2 py-1", children: [
          /* @__PURE__ */ jsx16("span", { className: "text-[12px] leading-[16px] text-ros-ink-medium w-[100px] truncate flex-shrink-0", children: member.name }),
          /* @__PURE__ */ jsx16("div", { className: "flex gap-1 flex-1", children: areas.map((area) => {
            const score = member.scores[area] ?? 0;
            return /* @__PURE__ */ jsx16(
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
import * as React8 from "react";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
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
  className
}) {
  const weakestArea = React8.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => a.score < min.score ? a : min, areas[0]);
  }, [areas]);
  const visibleSuggestions = suggestions?.slice(0, maxSuggestions);
  const colClass = areas.length <= 3 ? "grid-cols-3" : areas.length <= 4 ? "grid-cols-4" : areas.length <= 6 ? "grid-cols-3 lg:grid-cols-6" : "grid-cols-3 lg:grid-cols-6";
  return /* @__PURE__ */ jsxs14(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className
      ),
      children: [
        (title || overallScore != null) && /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-between px-5 pt-5 pb-3", children: [
          title && /* @__PURE__ */ jsx17("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
          overallScore != null && /* @__PURE__ */ jsxs14("div", { className: "flex items-baseline gap-2", children: [
            previousOverallScore != null && previousOverallScore !== overallScore && /* @__PURE__ */ jsxs14("span", { className: "text-[14px] text-ros-ink-muted", children: [
              previousOverallScore,
              " \u2192"
            ] }),
            /* @__PURE__ */ jsx17("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: overallScore }),
            /* @__PURE__ */ jsx17("span", { className: "text-[12px] text-ros-ink-muted", children: "/100" })
          ] })
        ] }),
        /* @__PURE__ */ jsx17("div", { className: cn("grid gap-2 px-5 pb-5", colClass), children: areas.map((area) => {
          const isWeakest = weakestArea && area.name === weakestArea.name;
          const isPositive = area.score >= 70;
          return /* @__PURE__ */ jsxs14(
            "div",
            {
              className: cn(
                "rounded-stat p-3 flex flex-col gap-1.5",
                isWeakest ? "bg-ros-danger-bg/50 ring-1 ring-ros-danger-fg/20" : "bg-ros-surface-off"
              ),
              children: [
                /* @__PURE__ */ jsxs14("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx17("span", { className: "text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate", children: area.name }),
                  /* @__PURE__ */ jsx17("span", { className: cn("text-[11px]", scoreText2(area.score)), children: isPositive ? "\u2713" : "\u2757" })
                ] }),
                /* @__PURE__ */ jsx17("span", { className: cn("text-[20px] leading-none font-bold", scoreText2(area.score)), children: area.score > 0 ? (area.score / 10).toFixed(1) : "\u2014" }),
                /* @__PURE__ */ jsx17("div", { className: "w-full h-1 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ jsx17(
                  "div",
                  {
                    className: cn("h-full rounded-pill", barColor(area.score)),
                    style: { width: `${Math.min(100, Math.max(0, area.score))}%` }
                  }
                ) }),
                area.quote && /* @__PURE__ */ jsxs14("p", { className: "text-[10px] leading-[14px] text-ros-ink-muted italic line-clamp-2 mt-0.5", children: [
                  "\u201E",
                  area.quote,
                  '"'
                ] })
              ]
            },
            area.name
          );
        }) }),
        visibleSuggestions && visibleSuggestions.length > 0 && /* @__PURE__ */ jsxs14("div", { className: "border-t border-ros-border px-5 py-4 flex flex-col gap-2.5", children: [
          /* @__PURE__ */ jsx17("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: visibleSuggestions.length === 1 ? "Sugestia" : `Priorytety (${visibleSuggestions.length})` }),
          /* @__PURE__ */ jsx17("div", { className: "flex flex-col gap-2", children: visibleSuggestions.map((s, i) => /* @__PURE__ */ jsxs14("div", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsx17(
              Badge,
              {
                tone: scoreTone2(areas.find((a) => a.name === s.area)?.score ?? 0),
                className: "mt-0.5 flex-shrink-0",
                children: s.area
              }
            ),
            /* @__PURE__ */ jsxs14("div", { className: "flex flex-col gap-0.5 min-w-0", children: [
              /* @__PURE__ */ jsx17("p", { className: "text-[13px] leading-[18px] text-ros-ink", children: s.text }),
              s.sourceQuote && /* @__PURE__ */ jsxs14("p", { className: "text-[11px] leading-[14px] text-ros-ink-muted italic truncate", children: [
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
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var brandBg3 = {
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
  return /* @__PURE__ */ jsxs15("div", { className: cn("flex flex-col gap-6", className), children: [
    onBack && /* @__PURE__ */ jsxs15(
      "button",
      {
        type: "button",
        onClick: onBack,
        className: "flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-ros-ink-muted hover:text-ros-ink transition-colors duration-150 border-none bg-transparent cursor-pointer p-0 self-start",
        children: [
          /* @__PURE__ */ jsx18(
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
              children: /* @__PURE__ */ jsx18("polyline", { points: "15 18 9 12 15 6" })
            }
          ),
          "Powr\xF3t do zespo\u0142u"
        ]
      }
    ),
    /* @__PURE__ */ jsxs15("div", { className: "flex items-center justify-between gap-4 rounded-card border border-ros-border bg-white p-6", children: [
      /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx18(
          "div",
          {
            className: cn(
              "size-12 rounded-pill flex items-center justify-center text-white text-[16px] font-bold flex-shrink-0",
              brandBg3[brand]
            ),
            "aria-hidden": true,
            children: getInitials2(name)
          }
        ),
        /* @__PURE__ */ jsxs15("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsx18("p", { className: "text-[18px] leading-[28px] font-semibold text-ros-ink", children: name }),
          subtitle && /* @__PURE__ */ jsx18("p", { className: "text-[14px] leading-[20px] text-ros-ink-muted", children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxs15("div", { className: "flex items-center gap-4 flex-shrink-0", children: [
        deliveryBadge && /* @__PURE__ */ jsx18(
          "span",
          {
            className: cn(
              "px-3 py-1 rounded-pill text-[12px] font-medium",
              deliveryConfig[deliveryBadge].className
            ),
            children: deliveryConfig[deliveryBadge].label
          }
        ),
        overallScore != null && /* @__PURE__ */ jsxs15("div", { className: "flex items-baseline gap-2", children: [
          previousOverallScore != null && /* @__PURE__ */ jsxs15("span", { className: "text-[14px] text-ros-ink-muted", children: [
            previousOverallScore.toFixed(1),
            " \u2192"
          ] }),
          /* @__PURE__ */ jsx18("span", { className: "text-[28px] leading-none font-medium text-ros-ink", children: overallScore.toFixed(1) })
        ] }),
        metricValue && !overallScore && /* @__PURE__ */ jsxs15("div", { className: "text-right", children: [
          metricLabel && /* @__PURE__ */ jsx18("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted", children: metricLabel }),
          /* @__PURE__ */ jsx18("p", { className: "text-[28px] leading-none font-medium text-ros-ink", children: metricValue })
        ] }),
        trend && /* @__PURE__ */ jsx18(Badge, { tone: trendGlyph2[trend].tone, children: trendGlyph2[trend].glyph }),
        status === "attention" && /* @__PURE__ */ jsx18(Badge, { tone: "warn", "aria-label": "Wymaga uwagi", children: "\u2757" }),
        headerActions
      ] })
    ] }),
    children
  ] });
}

// src/patterns/ScoreCardRow.tsx
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx19("div", { className: cn("grid gap-3", gridCols, className), children: cards.map((card) => {
    const isPositive = card.score >= 70;
    return /* @__PURE__ */ jsxs16(
      "div",
      {
        className: "rounded-stat bg-ros-surface-off p-4 flex flex-col gap-2",
        children: [
          /* @__PURE__ */ jsxs16("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx19("span", { className: "text-[12px] leading-[16px] font-medium text-ros-ink-muted", children: card.name }),
            /* @__PURE__ */ jsx19("span", { className: cn("text-[12px]", indicatorColor(card.score)), children: isPositive ? "\u2713" : "\u2757" })
          ] }),
          /* @__PURE__ */ jsx19("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: formatScore(card.score, displayScale) }),
          /* @__PURE__ */ jsx19("div", { className: "w-full h-1.5 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ jsx19(
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
import * as React9 from "react";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
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
  up: { glyph: "\u2191", tone: "success" },
  down: { glyph: "\u2193", tone: "danger" },
  flat: { glyph: "\u2192", tone: "neutral" }
};
function PerformanceOverview({
  brand = "callflow",
  title = "Wyniki",
  periodLabel,
  overallAvg,
  prevOverallAvg,
  areas,
  totalReports,
  className
}) {
  const weakest = React9.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((min, a) => a.avgScore < min.avgScore ? a : min, areas[0]);
  }, [areas]);
  const strongest = React9.useMemo(() => {
    if (areas.length === 0) return null;
    return areas.reduce((max, a) => a.avgScore > max.avgScore ? a : max, areas[0]);
  }, [areas]);
  const colClass = areas.length <= 3 ? "grid-cols-3" : areas.length <= 4 ? "grid-cols-4" : "grid-cols-3 lg:grid-cols-6";
  return /* @__PURE__ */ jsxs17(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between px-5 pt-5 pb-3", children: [
          /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx20("p", { className: "text-[14px] leading-[20px] font-medium text-ros-ink", children: title }),
            periodLabel && /* @__PURE__ */ jsx20("span", { className: "text-[12px] text-ros-ink-faint", children: periodLabel }),
            totalReports != null && /* @__PURE__ */ jsxs17(Badge, { tone: "neutral", children: [
              totalReports,
              " raport\xF3w"
            ] })
          ] }),
          overallAvg != null && /* @__PURE__ */ jsxs17("div", { className: "flex items-baseline gap-2", children: [
            prevOverallAvg != null && prevOverallAvg !== overallAvg && /* @__PURE__ */ jsxs17("span", { className: "text-[14px] text-ros-ink-muted", children: [
              (prevOverallAvg / 10).toFixed(1),
              " \u2192"
            ] }),
            /* @__PURE__ */ jsx20("span", { className: "text-[24px] leading-none font-medium text-ros-ink", children: (overallAvg / 10).toFixed(1) }),
            /* @__PURE__ */ jsx20("span", { className: "text-[12px] text-ros-ink-muted", children: "/10" })
          ] })
        ] }),
        /* @__PURE__ */ jsx20("div", { className: cn("grid gap-2 px-5 pb-4", colClass), children: areas.map((area) => {
          const isWeakest = weakest && area.name === weakest.name;
          const isPositive = area.avgScore >= 70;
          const delta = area.prevAvgScore != null ? ((area.avgScore - area.prevAvgScore) / 10).toFixed(1) : null;
          const trend = area.trend;
          return /* @__PURE__ */ jsxs17(
            "div",
            {
              className: cn(
                "rounded-stat p-3 flex flex-col gap-1.5",
                isWeakest ? "bg-ros-danger-bg/50 ring-1 ring-ros-danger-fg/20" : "bg-ros-surface-off"
              ),
              children: [
                /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx20("span", { className: "text-[11px] leading-[14px] font-medium text-ros-ink-muted truncate", children: area.name }),
                  /* @__PURE__ */ jsxs17("div", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx20("span", { className: cn("text-[11px]", scoreText3(area.avgScore)), children: isPositive ? "\u2713" : "\u2757" }),
                    trend && /* @__PURE__ */ jsx20("span", { className: cn("text-[11px]", `text-ros-${trendGlyph3[trend].tone === "success" ? "success-fg" : trendGlyph3[trend].tone === "danger" ? "danger-fg" : "ink-faint"}`), children: trendGlyph3[trend].glyph })
                  ] })
                ] }),
                /* @__PURE__ */ jsx20("span", { className: cn("text-[20px] leading-none font-bold", scoreText3(area.avgScore)), children: area.avgScore > 0 ? (area.avgScore / 10).toFixed(1) : "\u2014" }),
                /* @__PURE__ */ jsx20("div", { className: "w-full h-1 bg-ros-border rounded-pill overflow-hidden", children: /* @__PURE__ */ jsx20(
                  "div",
                  {
                    className: cn("h-full rounded-pill", barColor3(area.avgScore)),
                    style: { width: `${Math.min(100, Math.max(0, area.avgScore))}%` }
                  }
                ) }),
                /* @__PURE__ */ jsx20("p", { className: "text-[10px] leading-[14px] text-ros-ink-faint", children: delta != null && parseFloat(delta) !== 0 ? `${parseFloat(delta) > 0 ? "+" : ""}${delta} vs. poprz.` : area.dataPoints != null ? `${area.dataPoints} raport\xF3w` : "" })
              ]
            },
            area.name
          );
        }) }),
        (strongest || weakest) && /* @__PURE__ */ jsxs17("div", { className: "border-t border-ros-border px-5 py-3 flex flex-wrap gap-x-6 gap-y-1", children: [
          strongest && strongest.avgScore >= 70 && /* @__PURE__ */ jsxs17("p", { className: "text-[12px] text-ros-ink-muted", children: [
            /* @__PURE__ */ jsx20("span", { className: "text-ros-success-fg font-medium", children: "Mocne:" }),
            " ",
            areas.filter((a) => a.avgScore >= 70).map((a) => a.name).join(", ")
          ] }),
          weakest && weakest.avgScore < 70 && /* @__PURE__ */ jsxs17("p", { className: "text-[12px] text-ros-ink-muted", children: [
            /* @__PURE__ */ jsx20("span", { className: "text-ros-danger-fg font-medium", children: "Do poprawy:" }),
            " ",
            weakest.name,
            weakest.trend === "down" && " (trend \u2193)"
          ] })
        ] })
      ]
    }
  );
}

// src/patterns/DashboardLayout.tsx
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
function DashboardLayout({
  children,
  panel,
  panelTitle = "Zesp\xF3\u0142",
  panelToolbar,
  panelFooter,
  className
}) {
  return /* @__PURE__ */ jsxs18("div", { className: cn("flex gap-6 items-start", className), children: [
    /* @__PURE__ */ jsx21("div", { className: "flex-1 min-w-0 flex flex-col gap-4", children }),
    /* @__PURE__ */ jsxs18("aside", { className: "w-[384px] min-w-[384px] flex-shrink-0 sticky top-[80px] max-h-[calc(100vh-96px)] flex flex-col rounded-card border border-ros-border bg-white overflow-hidden", children: [
      /* @__PURE__ */ jsx21("div", { className: "px-4 py-3 border-b border-ros-border flex items-center justify-between", children: /* @__PURE__ */ jsx21("p", { className: "text-[14px] leading-[20px] font-semibold text-ros-ink", children: panelTitle }) }),
      panelToolbar && /* @__PURE__ */ jsx21("div", { className: "px-3 py-2 border-b border-ros-border bg-ros-surface-off", children: panelToolbar }),
      /* @__PURE__ */ jsx21("div", { className: "flex-1 overflow-y-auto p-2 flex flex-col gap-1", children: panel }),
      panelFooter && /* @__PURE__ */ jsx21("div", { className: "px-3 py-2.5 border-t border-ros-border bg-white", children: panelFooter })
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
  return /* @__PURE__ */ jsx21("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs18("label", { className: "flex items-center gap-2 cursor-pointer", children: [
    /* @__PURE__ */ jsx21(
      "input",
      {
        type: "checkbox",
        checked: allSelected,
        onChange: allSelected ? onDeselectAll : onSelectAll,
        className: "size-3.5 rounded-sm border-ros-border accent-current cursor-pointer"
      }
    ),
    /* @__PURE__ */ jsx21("span", { className: "text-[12px] text-ros-ink-muted", children: selectedCount > 0 ? `${selectedCount} z ${totalCount}` : `Zaznacz wszystko` })
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
  return /* @__PURE__ */ jsxs18(
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
import * as React10 from "react";
import { jsx as jsx22, jsxs as jsxs19 } from "react/jsx-runtime";
var typeConfig = {
  report_sent: { icon: "\u{1F4C4}", tone: "success" },
  report_viewed: { icon: "\u{1F441}", tone: "success" },
  schedule_sent: { icon: "\u{1F4C5}", tone: "success" },
  schedule_confirmed: { icon: "\u2713", tone: "success" },
  absence: { icon: "\u2715", tone: "danger" },
  preference_change: { icon: "\u2699", tone: "neutral" },
  coaching_note: { icon: "\u270E", tone: "neutral" },
  suggestion: { icon: "\u{1F4A1}", tone: "warn" },
  feedback: { icon: "\u21A9", tone: "neutral" },
  custom: { icon: "\u2022", tone: "neutral" }
};
function ActivityLog({
  entries,
  maxVisible = 10,
  className
}) {
  const [expanded, setExpanded] = React10.useState(false);
  const visible = maxVisible > 0 && !expanded ? entries.slice(0, maxVisible) : entries;
  const hasMore = maxVisible > 0 && entries.length > maxVisible;
  if (entries.length === 0) {
    return /* @__PURE__ */ jsx22("div", { className: cn("rounded-card border border-ros-border bg-white p-4", className), children: /* @__PURE__ */ jsx22("p", { className: "text-[12px] text-ros-ink-muted text-center py-4", children: "Brak aktywno\u015Bci" }) });
  }
  return /* @__PURE__ */ jsxs19(
    "div",
    {
      className: cn(
        "rounded-card border border-ros-border bg-white flex flex-col",
        className
      ),
      children: [
        /* @__PURE__ */ jsx22("div", { className: "px-4 py-3 border-b border-ros-border", children: /* @__PURE__ */ jsx22("p", { className: "text-[12px] leading-[16px] font-semibold text-ros-ink-muted uppercase tracking-wide", children: "Historia" }) }),
        /* @__PURE__ */ jsx22("div", { className: "flex flex-col", children: visible.map((entry, i) => {
          const cfg = typeConfig[entry.type];
          const isLast = i === visible.length - 1;
          return /* @__PURE__ */ jsxs19(
            "div",
            {
              className: cn(
                "flex gap-3 px-4 py-2.5",
                !isLast && "border-b border-ros-border"
              ),
              children: [
                /* @__PURE__ */ jsx22("div", { className: "flex flex-col items-center pt-0.5 flex-shrink-0", children: /* @__PURE__ */ jsx22("span", { className: "text-[12px] leading-none", children: entry.iconLabel ?? cfg.icon }) }),
                /* @__PURE__ */ jsxs19("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs19("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsx22("p", { className: "text-[13px] leading-[18px] text-ros-ink", children: entry.text }),
                    /* @__PURE__ */ jsx22("span", { className: "text-[11px] text-ros-ink-faint flex-shrink-0 whitespace-nowrap", children: entry.timestamp })
                  ] }),
                  entry.detail && /* @__PURE__ */ jsx22("p", { className: "text-[12px] leading-[16px] text-ros-ink-muted mt-0.5", children: entry.detail })
                ] })
              ]
            },
            i
          );
        }) }),
        hasMore && /* @__PURE__ */ jsx22(
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
export {
  ActivityLog,
  AppHeader,
  AppHeaderMenuItem,
  Badge,
  Button,
  Card,
  DashboardHeader,
  DashboardLayout,
  EmptyState,
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
  ScoreCardRow,
  TeamHeatmap,
  TeamMemberRow,
  TeamPanelFooter,
  TeamPanelToolbar,
  TrendChart,
  tokens_exports as tokens
};
//# sourceMappingURL=index.js.map