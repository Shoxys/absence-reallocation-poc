/**
 * Builds index.html from the Cursor phase1 prototype canvas.
 * Run: node build-from-canvas.mjs
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CANVAS =
  process.env.CANVAS_SRC ||
  "C:/Users/jacka/.cursor/projects/c-Downloads-Stimulate-stimulate-stimulate/canvases/absence-reallocation-phase1-prototype.canvas.tsx";

const outPath = path.join(__dirname, "index.html");

if (!fs.existsSync(CANVAS)) {
  console.error("Canvas not found:", CANVAS);
  process.exit(1);
}

let src = fs.readFileSync(CANVAS, "utf8");

// Drop cursor/canvas import block
src = src.replace(/^import\s*\{[\s\S]*?\}\s*from\s*["']cursor\/canvas["'];\s*/m, "");

// Drop export default — we'll mount manually
src = src.replace(/export\s+default\s+function\s+AbsenceReallocationPhase1Prototype/, "function AbsenceReallocationPhase1Prototype");

// Keep useCanvasState(key, init) — polyfill below shares state by key (like Cursor canvas).
src = src.replace(/useCanvasState(?:<[^>]*>)?\(/g, "useCanvasState(");

// useHostTheme() → static theme
src = src.replace(/const\s+theme\s*=\s*useHostTheme\(\s*\)\s*;/, "const theme = hostTheme;");

// Transpile TS/TSX → plain JSX-friendly JS (strip types)
const transpiled = ts.transpileModule(src, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.Preserve,
    esModuleInterop: true,
  },
  fileName: "prototype.tsx",
}).outputText;

const primitives = `const { useState, useEffect } = React;

/* Shared keyed state — mirrors Cursor useCanvasState across components */
const __canvasStore = new Map();
const __canvasListeners = new Map();

function useCanvasState(key, initial) {
  const init =
    typeof initial === "function" ? initial : () => initial;
  if (!__canvasStore.has(key)) {
    __canvasStore.set(key, init());
  }
  const [value, setLocal] = useState(() => __canvasStore.get(key));
  useEffect(() => {
    const bump = (next) => setLocal(next);
    let set = __canvasListeners.get(key);
    if (!set) {
      set = new Set();
      __canvasListeners.set(key, set);
    }
    set.add(bump);
    setLocal(__canvasStore.get(key));
    return () => set.delete(bump);
  }, [key]);
  const setValue = (action) => {
    const prev = __canvasStore.get(key);
    const next = typeof action === "function" ? action(prev) : action;
    __canvasStore.set(key, next);
    const set = __canvasListeners.get(key);
    if (set) for (const fn of set) fn(next);
  };
  return [value, setValue];
}

/* Host theme stand-in (canvas useHostTheme) */
const hostTheme = {
  kind: "light",
  accent: { primary: "#1F6FBF" },
  stroke: { secondary: "#E4E9EF", tertiary: "#EEF1F5" },
  fill: { primary: "#EEF5FC", tertiary: "#E4EAF0", quaternary: "#eceff2" },
  bg: { elevated: "#ffffff", editor: "#F6F8FA", chrome: "#F6F8FA" },
  text: { primary: "#1B2430", secondary: "#5A6572", tertiary: "#8B95A1" },
};

function Stack({ gap = 8, children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, ...style }}>
      {children}
    </div>
  );
}

function Row({ gap = 8, align = "stretch", wrap, children, style }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap,
        alignItems:
          align === "center" ? "center" : align === "stretch" ? "stretch" : align,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Spacer() {
  return <div style={{ flex: 1, minWidth: 8 }} />;
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: \`1px solid \${hostTheme.stroke.secondary}\`,
        margin: 0,
      }}
    />
  );
}

function H1({ children, style }) {
  return (
    <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1B2430", ...style }}>
      {children}
    </h1>
  );
}

function Text({ children, size = "md", weight = "normal", tone = "primary", style }) {
  const fontSize = size === "small" ? 12 : 14;
  const fontWeight = weight === "semibold" ? 600 : 400;
  const color =
    tone === "secondary"
      ? hostTheme.text.secondary
      : tone === "tertiary"
        ? hostTheme.text.tertiary
        : hostTheme.text.primary;
  return (
    <span style={{ fontSize, fontWeight, color, ...style }}>{children}</span>
  );
}

function Pill({ children, active, onClick, size = "md" }) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: sm ? "3px 8px" : "6px 12px",
        borderRadius: 999,
        border: \`1.5px solid \${active ? hostTheme.accent.primary : hostTheme.stroke.secondary}\`,
        background: active ? hostTheme.fill.primary : hostTheme.bg.elevated,
        color: hostTheme.text.primary,
        fontSize: sm ? 11 : 13,
        fontWeight: active ? 600 : 500,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </button>
  );
}

function Callout({ tone = "info", title, children }) {
  const tones = {
    info: { bg: "#EEF5FC", border: "#BBD9F2", title: "#114A81" },
    success: { bg: "#EAF6ED", border: "#6BB57A", title: "#2E7D3A" },
    warning: { bg: "#FFF4EC", border: "#F5C89A", title: "#C45F1A" },
    neutral: { bg: "#F6F8FA", border: hostTheme.stroke.secondary, title: hostTheme.text.primary },
  };
  const t = tones[tone] || tones.info;
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 8,
        border: \`1px solid \${t.border}\`,
        background: t.bg,
      }}
    >
      {title ? (
        <div style={{ fontWeight: 650, fontSize: 13, color: t.title, marginBottom: 4 }}>
          {title}
        </div>
      ) : null}
      <div style={{ fontSize: 12, color: hostTheme.text.secondary, lineHeight: 1.45 }}>
        {children}
      </div>
    </div>
  );
}
`;

const mount = `
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AbsenceReallocationPhase1Prototype />);
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Absence Reallocation — Phase 1 Prototype</title>
  <style>
    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      background: #F6F8FA;
      color: #1B2430;
      line-height: 1.45;
    }
    #root {
      min-height: 100vh;
      min-height: 100dvh;
      width: 100%;
    }
    button { font-family: inherit; }
    summary { list-style: none; }
    summary::-webkit-details-marker { display: none; }
  </style>
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.26.0/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react">
${primitives}

${transpiled}

${mount}
  </script>
</body>
</html>
`;

fs.writeFileSync(outPath, html, "utf8");
console.log("Wrote", outPath, "(" + Math.round(html.length / 1024) + " KB)");
console.log("Source:", CANVAS);
