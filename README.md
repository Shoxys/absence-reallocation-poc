# Absence Reallocation — Phase 1 Prototype (static)

Interactive UI reference for STIMulate Goal 2 Phase 1 (matched leave→join moves, PLF + SSP overrides, design lab).

**Live:** https://shoxys.github.io/absence-reallocation-poc/

Open `index.html` locally in a browser (no install), or use the GitHub Pages URL above.

## What’s in this POC

- **PLF Move:** choose leave hours → match the same number of joins → confirm (Right Sidebar / sticky tray lab)
- **SSP:** Active Overrides + Assign Override (PLF search, read-only MATH roster)
- **Ship defaults (current):** Green Capacity cell skin, Rose ⚠ Needs MATH, Right Sidebar confirm
- **Design Variations** panel (lab only — not a product setting)

Source of truth for behaviour: Cursor canvas  
`absence-reallocation-phase1-prototype.canvas.tsx`  
Plan: `absence_reallocation_phase_1_a7499538.plan.md`

## Rebuild from the canvas

When the Cursor canvas changes, regenerate this static file:

```bash
npm install
npm run build
```

That runs `build-from-canvas.mjs`, which reads the canvas path (override with `CANVAS_SRC=...`) and writes `index.html`.

## Notes

- Mock-only: no auth, analytics, or backend
- Fluid layout: fullscreen desktop + mobile viewport toggle
- Shared keyed state polyfill mirrors Cursor `useCanvasState` so Assign → Active Overrides stays in sync
