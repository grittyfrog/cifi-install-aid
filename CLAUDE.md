# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CiFi Install Aid is an SVG generator for sci-fi spaceship installation cards. It renders a card with a honeycomb grid of numbered hexagons using inline SVG within Svelte components. The output is a visual "ship install card" — a labeled card containing 11 hexes in a 4-3-4 staggered layout.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build locally

No test runner or linter is configured.

## Tech Stack

- **Svelte 5** (using `$props()` runes syntax, not legacy `export let`)
- **Vite 7** with `@sveltejs/vite-plugin-svelte`
- **Nix flake** for dev environment (Node.js 22)
- Plain JavaScript (no TypeScript files, but `checkJs` is enabled via jsconfig.json)

## Architecture

All rendering is pure SVG — no HTML layout, no CSS grid. The app mounts a single `<svg>` element and everything inside is SVG groups and shapes.

**Component hierarchy:**

`App` → `ShipInstallCard` → `HexGroup` → `CifiHex` (×11)

- **App.svelte** — Root. Defines per-hex configuration map (keyed 1–11), wraps everything in a single `<svg>` with a fixed viewBox.
- **ShipInstallCard.svelte** — Card frame with border rect and title text. Positions the HexGroup with padding offsets.
- **HexGroup.svelte** — Arranges 11 CifiHex instances in a 4-3-4 staggered pointy-top hex grid. Contains the layout array that maps hex numbers to grid positions. Hex positions are computed from visual footprint dimensions including the outer glow/outline.
- **CifiHex.svelte** — Single hexagon with layered SVG elements: light outline (outermost), gradient fill, chevron with gradient, dark outline (gutter), divider line, color tint overlay (blend mode), and triple-rendered number text (white stroke → black stroke → white fill). Each hex has its own `<defs>` for per-instance gradients keyed by number.

**Key design details:**

- The hex grid numbering is non-sequential in spatial order (the layout array in HexGroup maps number→position)
- Font: Terminess Nerd Font is embedded as a base64 woff2 subset in `app.css`
- Color tint uses `mix-blend-mode: color` on an SVG polygon overlay
- Hex borders use a two-layer approach: a larger scaled light outline underneath, and a dark outline on top that creates a gutter effect
