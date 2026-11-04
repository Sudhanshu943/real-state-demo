# AUREL — Luxury Residential Development Demonstration

AUREL is a client-ready, art-directed web demonstration for a fictional luxury residential tower. It provides an immersive architectural journey designed with contemporary editorial elegance: warm paper (`#F4F0E8`), deep ink (`#18221F`), forest green (`#28463C`), and brushed bronze (`#A8875F`).

---

## 1. Core User Journey
1. **Architectural Homepage (`#/`):** Editorial hero, development vision, curated residence collections (Garden, Skyline, Penthouse), district framing, and architectural amenities.
2. **Authored District Map (`#/explore/district`):** 3D urban context featuring 5 authored landmarks with distance, transit times, and walking radii.
3. **Orbitable 3D Procedural Tower (`#/explore/building`):** 12-storey limestone tower ($28 \times 20 \times 45.4\,\text{m}$) with bronze mullions, reveal slabs, perimeter planters, and interactive floor proxies for Levels 4, 8, and 12.
4. **Floor & Residence Selection (`#/explore/floors/:floor`, `#/explore/homes/:unitId`):** Synchronized 3D focus, residence metrics, status badges (*Available*, *Reserved*, *Sold*), and scaled vector floor plans with compass indicators.
5. **Skyline Show Residence 3D Tour (`#/explore/homes/:unitId/tour/:roomId`):** Guided mesh interior walkthrough across 3 vantage nodes: **Living Room**, **Primary Bedroom**, and **Balcony**, complete with interactive hotspots and representative architectural disclaimers.
6. **Save & Compare (`#/compare`):** Side-by-side comparison matrix strictly capped at 2 homes, with an accessible replacement choice dialog upon selecting a 3rd candidate.
7. **In-Memory Viewing Request:** Contextual enquiry modal that auto-populates viewed homes, validates inputs, and presents an honest demonstration preview with zero PII persistence or external transmission.

---

## 2. Technical Stack & Invariants

- **UI & Routing:** React 19, TypeScript 5.7, Vite 6, React Router DOM (Hash Routing for universal static hosting).
- **3D Graphics & Canvas:** Three.js r174, `@react-three/fiber` v9, `@react-three/drei` v10.
- **Testing:** Vitest 3 (`happy-dom`), Playwright 1.50 (Desktop & Mobile viewports).
- **Styling:** Vanilla CSS design tokens (`src/styles/tokens.css`, `global.css`, `reduced-motion.css`).
- **Invariants:**
  - **Zero External Paid APIs:** No Mapbox, Google Maps, or Cesium credentials required.
  - **Zero External CDNs / Runtime Stock Images:** 100% self-contained local assets.
  - **No Fake Panoramas:** Authentic procedural 3D building and guided 3D mesh show residence.
  - **Full 2D Fallback:** Complete SVG elevation and 2D room gallery for graphics failure or low-power modes.
  - **Strict Privacy:** Viewing request data is ephemeral in-memory only; zero PII is written to `localStorage` or transmitted over the wire.
  - **Transparent Concept Disclosures:** Every price, availability status, and booking action clearly displays demonstration labels.

---

## 3. Getting Started

### Prerequisites
- Node.js `20+` (verified on Node `v25.8.0`)
- npm `10+` (verified on npm `11.11.0`)

### Installation & Execution
```bash
# Install dependencies
npm install

# Start local development server (http://localhost:5173)
npm run dev

# Build production bundle with strict TypeScript checking
npm run build

# Preview production build (http://localhost:4173)
npm run preview
```

### Verification & Testing
```bash
# Run Vitest unit & domain contract tests (17 tests)
npm test

# Validate 24 registered assets against schema and disk
npm run validate:assets

# Run full Playwright E2E test suite (18 tests: 9 Desktop + 9 Mobile)
npm run test:e2e

# Capture visual acceptance screenshots into docs/evidence/
npm run capture:stills
```

---

## 4. Route Architecture & Canonical IDs

All navigation uses hash routing to ensure compatibility with static file servers and local file protocols:

| Route Pattern | View / Description |
|---|---|
| `#/` | Editorial Homepage |
| `#/explore/building` | 3D Procedural Tower (Full Building View) |
| `#/explore/district` | 3D Authored District Context (5 Landmarks) |
| `#/explore/floors/:floor` | Filtered Floor Elevation (Levels 4, 8, or 12) |
| `#/explore/homes/:unitId` | Residence Detail View & Scaled Schematic Plan |
| `#/explore/homes/:unitId/tour/:roomId` | Skyline Show Residence 3D Tour (`living`, `bedroom`, `balcony`) |
| `#/compare` | 2-Home Comparison Matrix |

Canonical Residences (`fixtures/project.seed.json`):
- `A0401` — The Garden Suite (Level 4, 2 Bed, 160 m², ₹14.5 Cr, *Available*)
- `A0402` — The Garden Suite (Level 4, 2 Bed, 160 m², ₹14.5 Cr, *Reserved*)
- `A0801` — The Skyline Suite (Level 8, 3 Bed, 192 m², ₹19.8 Cr, *Available*)
- `A0802` — The Skyline Suite (Level 8, 3 Bed, 192 m², ₹19.8 Cr, *Sold*)
- `A1201` — The Aurel Penthouse (Level 12, 4 Bed, 310 m², ₹36.0 Cr, *Available*)
- `A1202` — The Aurel Penthouse (Level 12, 4 Bed, 310 m², ₹36.0 Cr, *Available*)

---

## 5. Documentation & Project Artifacts

- [**`docs/HANDOFF.md`**](file:///docs/HANDOFF.md): Client presentation script (3-minute flow), runbook, and deployment guidelines.
- [**`docs/QA-REPORT.md`**](file:///docs/QA-REPORT.md): Complete test matrix covering 17 Vitest contract tests and 18 Playwright scenarios.
- [**`docs/DECISIONS.md`**](file:///docs/DECISIONS.md): Architectural Decision Records (DEC-001 through DEC-004).
- [**`docs/ASSET-REGISTER.md`**](file:///docs/ASSET-REGISTER.md): Provenance, licenses, and fallbacks for all 24 registered assets.
- [**`docs/RENDER-SPEC.md`**](file:///docs/RENDER-SPEC.md): Three.js coordinate system, lighting ratios, camera presets, and materials.
- [**`BUILD-TRACKER.md`**](file:///BUILD-TRACKER.md): Phase-by-phase implementation and acceptance gate status.
- [**`docs/evidence/`**](file:///docs/evidence): Captured high-resolution visual acceptance screenshots.
