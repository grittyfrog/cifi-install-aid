# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CiFi Install Aid is an SVG generator for sci-fi spaceship installation cards. It renders a card with a honeycomb grid of numbered hexagons using uhtml tagged template literals. The build produces a single self-contained HTML file with pre-rendered SVG (works without JS) and client-side uhtml for progressive enhancement.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/` (single HTML file)
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Tech Stack

- **uhtml v4** — Tagged template literals for SVG/HTML rendering (client + build-time)
- **Vite 7** with custom prerender plugin + `vite-plugin-singlefile`
- **Nix flake** for dev environment (Node.js 22)
- Plain JavaScript (no TypeScript files, but `checkJs` is enabled via jsconfig.json)

## Architecture

All rendering is pure SVG — no HTML layout, no CSS grid. Components are plain JS functions that accept `svg` (or `html`/`svg`) tagged template functions as their first argument, plus a props object. The same functions run at build time (via `uhtml/init` + `uhtml/dom`) and at runtime (via regular `uhtml`).

**Component hierarchy:**

`App` → `ShipInstallCard` → `HexGroup` → `CifiHex` (×11)

- **App.js** — Root. Defines per-hex configuration map (keyed 1–11), wraps everything in `<main>` + `<svg>` with a fixed viewBox. Takes `html` and `svg` as arguments.
- **ShipInstallCard.js** — Card frame with border rect and title text. Positions the HexGroup with padding offsets.
- **HexGroup.js** — Arranges 11 CifiHex instances in a 4-3-4 staggered pointy-top hex grid. Contains the layout array that maps hex numbers to grid positions.
- **CifiHex.js** — Single hexagon with layered SVG elements: light outline (outermost), gradient fill, chevron with gradient, dark outline (gutter), divider line, color tint overlay (blend mode), boost indicators, and triple-rendered number text. Each hex has its own `<defs>` for per-instance gradients keyed by number.

**Entry points:**

- **main.js** — Client entry. Imports `uhtml`, calls `render(document.body, App(html, svg))`.
- **prerender.js** — Build-time entry. Uses `uhtml/init` + `uhtml/dom` to render into a fake document, exports `getPrerenderedHTML()`.

**Build pipeline:**

1. Vite prerender plugin uses `ssrLoadModule` to load `prerender.js` through Vite's pipeline (resolves `?inline` asset imports)
2. Pre-rendered HTML replaces `<!--PRERENDER-->` in `index.html`
3. `vite-plugin-singlefile` inlines all JS and CSS into the HTML
4. Output: one self-contained `.html` file

**Key design details:**

- The hex grid numbering is non-sequential in spatial order (the layout array in HexGroup maps number→position)
- Font: Terminess Nerd Font is embedded as a base64 woff2 subset in `app.css`
- Color tint uses `mix-blend-mode: color` on an SVG polygon overlay
- Hex borders use a two-layer approach: a larger scaled light outline underneath, and a dark outline on top that creates a gutter effect
- Component functions thread `svg` as first argument so the same code works with both runtime uhtml and build-time `uhtml/init`
