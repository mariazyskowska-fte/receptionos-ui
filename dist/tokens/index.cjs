"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tokens/index.ts
var tokens_exports = {};
__export(tokens_exports, {
  brandColors: () => brandColors,
  palette: () => palette,
  radii: () => radii,
  spacing: () => spacing
});
module.exports = __toCommonJS(tokens_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  brandColors,
  palette,
  radii,
  spacing
});
//# sourceMappingURL=index.cjs.map