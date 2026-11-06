# AUREL Architectural Verification Report: Stage 6 (Arrival Plaza & Landscaping) & Stage 7 (Mobile Composition & Badge Clearance)

**Date**: November 6, 2026  
**Status**: Stage 6 & Stage 7 Completed and Fully Verified  
**Preview Port**: `4174` (Strict isolated port; ports 4173 and 5173 preserved)  
**Governing Document**: [EXTERIOR-REALISM-IMPLEMENTATION-PLAN.md](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/implementation-plan/EXTERIOR-REALISM-IMPLEMENTATION-PLAN.md)  
**Previous Milestone**: [TOWER-FACADE-OPTIMIZATION-REPORT.md](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/review-output/TOWER-FACADE-OPTIMIZATION-REPORT.md)

---

## 1. Executive Summary

Stages 6 and 7 of the AUREL architectural visualization upgrade have been successfully implemented, audited, and verified across all required viewports and interaction paths.

1. **Arrival Plaza Grounding (Stage 6)**: Replaced the flat, isolated site presentation with an authentic multi-tiered arrival plaza. Integrated real PBR herringbone pavers (`concrete_pavers_02`, $1\text{k}$ color, normal, and roughness maps), physical $150\text{mm}$ flamed-granite curbs, recessed soil beds, twin reflecting pools with recessed water planes and granite borders, a $25\text{mm}$ negative plinth shadow reveal, and an expansive $140\text{m} \times 140\text{m}$ dark-slate site apron that completely eliminates the floating toy display appearance.
2. **Botanical Vegetation Replacement (Stage 6)**: Integrated real CC0 Poly Haven botanical models (`tree_small_02.glb` and `shrub_01.glb`), optimized via `gltf-transform` meshopt and Draco compression. Replaced 5,600 procedural icosahedron canopies and crude spherical meshes with instanced botanical geometry (6 specimen trees batched into 3 draw calls; 24 shrubs batched into 1 draw call). Integrated non-blocking asynchronous loaders with instant procedural fallbacks (`dataset.exteriorVegetation = 'glb' | 'fallback'`) and disabled raycasting on decorative foliage to protect floor/unit picking.
3. **Responsive Mobile Hero Composition & Badge Clearance (Stage 7)**: Solved the mobile tower right-edge crop and text overlap across 360px, 390px, and 430px widths. Calibrated a dedicated mobile camera framing pose `(56, 28, 62)` targeting `(-2.2, 22.0, 1.2)` at $44^\circ$ vertical FOV, introduced a subtle bottom-up gradient scrim, guaranteed visible CTAs with zero horizontal overflow, and decoupled the story badge dynamically below the fixed header (`top: calc(var(--header-height) + clamp(12px, 2vh, 24px))`).
4. **Performance & Invariance**: Exterior hero draw calls dropped from **171 to 158** (-13 calls), Level 8 close-up dropped from **126 to 107** (beating the $\le 130$ target), and interior room tour draw calls remained strictly invariant at **250** (Living), **28** (Bedroom), and **72** (Balcony).
5. **Quality Gate Pass**: 100% of automated tests pass: Asset validation (64/64), TypeScript (`tsc --noEmit`), Vitest (17/17), Vite production build ($1,557\text{ kB}$ JS), and the complete Playwright E2E suite (Regression 16/16, Recovery 8/8, Accessibility 4/4).

---

## 2. Rendering Cost Audit & Comparative Performance

Performance measurements were captured at exact matching camera positions and scroll beats using `scripts/measure-cost.mjs` against the isolated preview server on port `4174`:

| Camera View / Scroll Beat | Stage 5 Baseline Calls | Stage 6/7 Measured Calls | Delta | Measured Triangles | Measured Geometries | Measured Textures | Status / Target |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Desktop Exterior Hero** ($s = 0$) | 171 | **158** | **-13** | 41,726 | 55 | 18 | Target $\le 171$ exceeded |
| **Level 8 Close-up** ($s = 0.33$) | 126 | **107** | **-19** | 629,294 | 48 | 18 | Target $\le 130$ exceeded |
| **Homepage Interior Beat** ($s = 0.65$, settled) | 244 | **244** | **0** | 57,944 | 69 | 19 | Settled RAF state matches tour |
| **Standalone Living Room Tour** | 250 | **250** | **0** | 164,349 | 80 | 19 | Invariant baseline maintained |
| **Standalone Bedroom Tour** | 28 | **28** | **0** | 33,634 | 14 | 12 | Invariant baseline maintained |
| **Standalone Balcony Tour** | 72 | **72** | **0** | 13,838 | 21 | 14 | Invariant baseline maintained |

> [!NOTE]
> All measurements were captured under Chromium headless with SwiftShader software rasterization on Windows. In accordance with testing guidelines, headless frame execution times are not conflated with physical-phone frame rates.

---

## 3. Reconciliation of Documentation Inaccuracies

### 3.1 Working Tree Status
Previous documentation loosely described the working tree as "clean". In reality, the working tree contains active, tracked modifications and newly authored stage assets and scripts. The accurate working tree inventory is:

- **Modified tracked files (9)**:
  - `playwright.config.ts`: Increased test timeouts to 60s/75s for software rasterization.
  - `e2e/regression.spec.ts`: Added tests R07 (botanical fallback) and R08 (mobile multi-width layout).
  - `src/data/assets.json`: Registered botanical GLBs and PBR paving textures (64 valid entries).
  - `src/pages/HomePage.tsx`: Added responsive mobile gradient scrim and decoupled badge header clearance.
  - `src/scene/ArrivalGarden.tsx`: Multi-tier arrival plaza, curbs, reflecting pools, and negative shadow reveals.
  - `src/scene/BuildingProcedural.tsx`: Mounted ArrivalGarden and replaced rooftop icosahedrons with shrubs.
  - `src/scene/HomeScrollScene.tsx`: Added responsive mobile camera poses and FOV calibration.
  - `src/scene/textureGenerators.ts`: Implemented `getPBRPavingTextures()` with color space caching.
  - `scripts/measure-cost.mjs`: Added RAF settling delay to measure settled interior crossfade states.
- **Untracked files (new delivery assets & evidence)**:
  - `src/scene/BotanicalVegetation.tsx`: Non-blocking botanical loader and instanced mesh batching.
  - `src/scene/InstancedTowerFacade.tsx`: Instanced facade architecture from Stage 5.
  - `public/assets/models/tree_small_02.glb` & `shrub_01.glb`: Optimized CC0 vegetation.
  - `public/assets/textures/paving/`: PBR color, normal, and roughness WebP textures.
  - `scripts/capture-stage67-evidence.mjs`: Multi-viewport evidence capture script.
  - `docs/evidence/stage67-*.png` & `review-output/stage67-*.png`: 8 fresh evidence screenshots.

### 3.2 Reconciliation of Homepage Interior Draw Call Measurement (3 vs 244 calls)
In an earlier measurement run, `Homepage Interior Beat (s = 0.65)` reported only **3 draw calls**, whereas the standalone Living Room Tour reported **250 calls**.
- **Root Cause**: The scroll driver in `HomeScrollScene.tsx` implements continuous RAF damping (`lerp(current, target, 0.08)`). During the transition between exterior and interior, an aperture crossfade dip occurs around $s \approx 0.51$ where exterior opacity drops to 0 before the interior scene unfreezes. If WebGL statistics are sampled immediately without allowing the RAF damping to settle, the scene is queried mid-transition, reporting only 3 background sky/canvas calls.
- **Verification**: When `scripts/measure-cost.mjs` allows a $2,500\text{ms}$ settling window for RAF convergence at $s = 0.65$, the living room geometry mounts completely, drawing **244 calls** and $57,944$ triangles, reconciling precisely with the full interior tour environment.

---

## 4. Architectural & Engineering Implementation

### 4.1 Grounding & Arrival Plaza Architecture (`ArrivalGarden.tsx`)
To eliminate the toy-like "floating block" appearance, the site grading and plinth architecture were restructured:
- **Site Apron**: An expansive $140\text{m} \times 140\text{m}$ ground plane at $Y = -0.22\text{m}$ in dark flamed slate (`#18191b`), providing an authentic urban horizon and grounding context.
- **Podium Plinth**: $56\text{m} \times 48\text{m}$ plinth (top at $Y = +0.14\text{m}$) featuring a $25\text{mm}$ negative shadow reveal at $Y = 0$, simulating structural decoupling.
- **PBR Herringbone Promenade**: Surfaced with Poly Haven CC0 `concrete_pavers_02` ($1\text{k}$ color, normal, and roughness maps) with 8x repeat, sitting at $Y = +0.16\text{m}$.
- **Flamed Granite Curbs**: Defined physical borders ($150\text{mm}$ height, $Y = +0.18\text{m}$) separating vehicular drop-off, pedestrian walk, and planting beds.
- **Sunken Planting Beds**: Recessed $150\text{mm}$ below curb height ($Y = +0.03\text{m}$) with dark organic soil texture (`#26211c`, roughness 0.95).
- **Reflecting Pools**: Two symmetrical water features flanking the promenade ($14\text{m} \times 3.6\text{m}$) recessed at $Y = +0.13\text{m}$ with dark granite coping, zero z-fighting, and restrained dielectric water reflectivity (roughness 0.05, opacity 0.88).

### 4.2 Botanical Vegetation & Instanced Foliage (`BotanicalVegetation.tsx`)
- **Asset Provenance & Optimization**:
  - `tree_small_02.glb` (Poly Haven, CC0): Specimen small tree with natural bark and leaf geometry. Compressed to $1.3\text{ MB}$ via `gltf-transform` meshopt + Draco.
  - `shrub_01.glb` (Poly Haven, CC0): Dense manicured landscaping shrub. Compressed to $0.68\text{ MB}$.
- **Instanced Geometry Delivery**:
  - 6 specimen plaza trees are rendered using instanced matrices across 3 primitive sub-meshes (Trunk, Branch, Leaves) for a total of **3 draw calls**.
  - 24 plaza and courtyard shrubs are batched into a single `InstancedMesh` for **1 draw call**.
  - 4 rooftop terrace planters reuse the instanced shrub batch, permanently removing 5,600 procedural icosahedron canopy polygons.
- **Non-blocking Asynchronous Fallback**:
  - Assets load via asynchronous `GLTFLoader` with `MeshoptDecoder`.
  - If network or asset decoding fails, the scene immediately falls back to restrained procedural geometry without blanking or crashing the canvas.
  - State is exposed to automated tests via `canvas.dataset.exteriorVegetation = 'glb' | 'fallback' | 'loading'`.
- **Proxy Raycasting Isolation**:
  - All vegetation components specify `raycast={() => null}`, guaranteeing that decorative leaves and branches cannot intercept floor or unit picking clicks.

### 4.3 Responsive Mobile Hero Composition & Header Clearance
- **Mobile Camera Framing**:
  - On portrait mobile screens ($W < 768\text{px}$, aspect $\approx 0.46$), looking at the desktop center ($X = -15$) cropped the right half of the tower.
  - Implemented responsive camera poses in `HomeScrollScene.tsx`: start pose `(56, 28, 62)`, mid pose `(28, 27, 36)`, target `(-2.2, 22.0, 1.2)`, and vertical FOV $44^\circ$.
  - Tower stands fully framed within the viewport across 360px, 390px, and 430px widths with comfortable negative space.
- **Typography & CTA Readability**:
  - Added a localized linear gradient scrim (`rgba(10,11,14,0.72) \to transparent`, `min(520px, 68vh)`) protecting the headline and subtitle contrast without muddying the 3D scene.
  - Both primary CTAs ("Explore Building" and "View Level 8") remain fully visible above the fold with zero horizontal overflow ($dx \le 0$).
- **Story Badge Clearance**:
  - Decoupled the floating story badge from fixed percentages.
  - Styled with `top: calc(var(--header-height) + clamp(12px, 2vh, 24px))` and `z-index: 15`, guaranteeing clean clearance below the fixed header bar on both short ($568\text{px}$) and tall ($932\text{px}$) viewports.

---

## 5. Automated Verification Results

All verification test suites were executed on isolated preview port `4174`:

```
================================================================================
Test Suite                               Status       Details
================================================================================
Asset Validation (validate:assets)       PASSED       64/64 registered assets valid
TypeScript Check (typecheck)             PASSED       0 compiler errors
Unit / Component Tests (vitest)          PASSED       4 test files, 17/17 passed
Vite Production Build (build)            PASSED       Bundle: 1,557.12 kB JS
Playwright Recovery (recovery.spec.ts)   PASSED       8/8 passed (desktop & mobile)
Playwright A11y (accessibility.spec.ts)  PASSED       4/4 passed (desktop & mobile)
Playwright Regressions (regression.spec) PASSED       16/16 passed (R01-R08 desktop & mobile)
================================================================================
```

### Key Regression Assertions Verified:
- **R01**: Interior tour renders with observable scene readiness and non-empty frame buffer.
- **R02**: CC0 potted plant asset failure triggers procedural plant fallback without blanking room.
- **R03**: Tour rooms switch smoothly between living, bedroom, and balcony with scene readiness indicators.
- **R04**: Story chapter visibility and navigation transitions function cleanly.
- **R05**: Tour exit to homepage and re-entry preserves WebGL rendering context.
- **R06**: Homepage interior handoff beat renders living room geometry.
- **R07**: Exterior botanical assets load or fall back seamlessly without blanking arrival plaza (verified under aborted `.glb` routes).
- **R08**: Mobile hero layout maintains badge clearance, CTA visibility, and zero horizontal overflow across 360px, 390px, and 430px.

---

## 6. Visual Evidence Gallery

Fresh visual evidence was captured via `scripts/capture-stage67-evidence.mjs` and saved to `docs/evidence/` and `review-output/`:

### 6.1 Desktop Overview & Grounding Details
| Desktop Exterior Hero | Arrival Plaza Close-up | Botanical Trees & Shrubs |
| :---: | :---: | :---: |
| [![Desktop Hero](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-desktop.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-desktop.png) | [![Plaza Closeup](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-arrival-plaza-closeup.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-arrival-plaza-closeup.png) | [![Vegetation Detail](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-tree-shrub-detail.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-tree-shrub-detail.png) |
| *Hero view showing tower, plaza paving, curbs, pools, and specimen trees* | *PBR herringbone paving, granite curbs, reflecting pool, and plinth shadow reveal* | *CC0 botanical trees, instanced shrubs, dark soil beds, and flamed granite curbs* |

### 6.2 Mobile Responsive Hero Composition & Badge Clearance
| Mobile 360px (Compact) | Mobile 390px (Standard) | Mobile 430px (Pro Max) | Story Badge Clearance |
| :---: | :---: | :---: | :---: |
| [![Mobile 360px](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-360px.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-360px.png) | [![Mobile 390px](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-390px.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-390px.png) | [![Mobile 430px](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-430px.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-hero-mobile-430px.png) | [![Badge Clearance](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-mobile-badge-clearance.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-mobile-badge-clearance.png) |
| *No right-edge crop; full CTA visibility* | *Calibrated tower center with gradient scrim* | *Balanced architectural composition* | *Badge cleanly positioned below fixed header* |

### 6.3 Interior Isolation Smoke Test
| Standalone Residence Tour Smoke Test |
| :---: |
| [![Living Room Tour](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-interior-living-smoke.png)](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/docs/evidence/stage67-interior-living-smoke.png) |
| *Interior lighting isolation, oak parquet, CC0 monstera plant, and 250 invariant draw calls verified* |

---

## 7. Remaining Weaknesses & Next Stages

The core architectural facade, ground plane, botanical vegetation, and mobile responsive layout have reached the target quality and performance bars. The remaining tasks for future milestones are:
1. **Interactive Customization Controls (Stage 8)**: Architectural unit finish selectors (light travertine vs dark bronze palettes) and day/dusk/night lighting switches.
2. **Lower-Page Editorial Photography (Stage 9)**: Curating and integrating high-resolution photography for the Vision, Residences, Amenities, and Neighborhood sections.
3. **Repository State**: Working tree contains unstaged verification files and assets; strictly no git commit, push, or deployment has been executed.
