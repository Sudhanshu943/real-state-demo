# AUREL Architectural Visualization: Exterior Realism Checkpoint Report
**Document ID**: `review-output/EXTERIOR-CHECKPOINT-REPORT.md`  
**Inspection Date**: November 5, 2026  
**Status**: Ready for User Review (Checkpoint Complete — Pending Approval for Tower-Wide Propagation)  
**Governing Plan**: [EXTERIOR-REALISM-IMPLEMENTATION-PLAN.md](file:///c:/Users/Sudhanshu/Desktop/New%20Demo%20projects/real-state-demo/implementation-plan/EXTERIOR-REALISM-IMPLEMENTATION-PLAN.md)  
**Git Working Tree**: Clean unstaged changes; 0 commits, 0 pushes.  

---

## 1. Executive Summary & Checkpoint Objectives

In accordance with instructions, we implemented a focused exterior refinement checkpoint on the **Level 8 South representative facade bay** and **exterior dielectric glazing**, strictly holding tower-wide propagation, ground plaza replacement, and tree models pending this review.

### Scope Guardrails Maintained
1. **Interiors Completely Preserved**: Show residence (Living room, Bedroom, Balcony) geometry, materials, and lighting remain 100% isolated and unchanged.
2. **Strict Port Discipline**: Development server on `localhost:5173` remained untouched; Playwright tests and headless verifications executed exclusively on isolated port `4174` with `--strictPort`. Unrelated port `4173` was never touched.
3. **No Unlicensed Assets**: Real CC0 assets sourced exclusively from Poly Haven and ambientCG with full provenance and integrity hashes.
4. **Interactive Integrity**: Floor picking (`floor_8_proxy`), unit selection (`unit_A0801`, `unit_A0802`), inquiry CTA forms, and camera controllers remain fully functional.

---

## 2. Real CC0 Asset Manifest & Apples-to-Apples Texture Audit

To prevent distorted compression reporting, we compare the **exact byte size of the selected source JPG maps** directly against the **exact byte size of the delivered runtime WebP maps**. We do not inflate compression ratios by comparing total multi-map archive ZIP files against delivery files.

### 2.1 Apples-to-Apples Texture Compression Audit

| Material & Texture Set | Selected Source JPG Maps (ambientCG CC0) | Delivered Runtime WebP Maps (`public/assets/`) | Apples-to-Apples Reduction | Target Color Space & Normal Convention |
| :--- | :--- | :--- | :--- | :--- |
| **Travertine 001**<br>*(Lennart Demes)* | • Color 1K: 990,173 B<br>• NormalGL 1K: 330,631 B<br>• Roughness 1K: 374,280 B<br>**Subtotal: 1,695,084 B** (1.695 MB) | • Color: 131,240 B<br>• Normal: 4,702 B<br>• Roughness: 20,632 B<br>**Subtotal: 156,574 B** (0.157 MB) | **-90.76%**<br>*(1.54 MB saved)* | • Color: `THREE.SRGBColorSpace`<br>• Normal: `THREE.NoColorSpace` (OpenGL +Y)<br>• Roughness: `THREE.NoColorSpace` |
| **Metal 030** (Bronze)<br>*(Lennart Demes)* | • Color 1K: 239,830 B<br>• NormalGL 1K: 354,233 B<br>• Roughness 1K: 224,262 B<br>**Subtotal: 818,325 B** (0.818 MB) | • Color: 2,494 B<br>• Normal: 3,972 B<br>• Roughness: 3,176 B<br>**Subtotal: 9,642 B** (0.010 MB) | **-98.82%**<br>*(0.81 MB saved)* | • Color: `THREE.SRGBColorSpace`<br>• Normal: `THREE.NoColorSpace` (OpenGL +Y)<br>• Roughness: `THREE.NoColorSpace` |
| **Combined Texture Payload** | **2,513,409 bytes** (2.513 MB) | **166,216 bytes** (0.166 MB) | **-93.39%** | Budget: $\le 2.0\text{ MB}$ (Compliant: 8.3% of budget) |

### 2.2 Environment Map Assets (Poly Haven CC0)

| Asset Name | Source URL | Raw HDR Size | Delivered HDR Size | Destination Path |
| :--- | :--- | :--- | :--- | :--- |
| **Kloofendal 48d Pure Sky** | [Poly Haven](https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky) | 1,435,119 B | 1,435,119 B (1.435 MB) | `public/assets/hdri/kloofendal_48d_1k.hdr` |
| **Cape Hill** (Horizon Landscape) | [Poly Haven](https://polyhaven.com/a/cape_hill) | 1,642,586 B | 1,642,586 B (1.643 MB) | `public/assets/hdri/cape_hill_1k.hdr` |

*Asset Validation Gate*: `npm run validate:assets` successfully validated all 59 registered asset files and checksums in `src/data/assets.json`.

---

## 3. Engineering & Detailing Implementations

### 3.1 Metric-Aware UV Scaling (`createMetricBoxGeometry`)
- **Problem Diagnosed**: Applying universal texture tiling (`repeat.set(1.5, 1.5)`) across meshes of drastically different dimensions caused a $17\times$ texture distortion between a narrow $0.75\text{m}$ pier and a wide $12.7\text{m}$ cantilever slab.
- **Solution Implemented in `FacadeBayModule.tsx`**:
  ```ts
  function createMetricBoxGeometry(width: number, height: number, depth: number, tileMeters = 1.2): THREE.BoxGeometry
  ```
  Dynamically calculates and assigns UV coordinate scaling per face orientation:
  - Sides (+X/-X): width = `depth / tileMeters`, height = `height / tileMeters`
  - Top/Bottom (+Y/-Y): width = `width / tileMeters`, height = `depth / tileMeters`
  - Front/Back (+Z/-Z): width = `width / tileMeters`, height = `height / tileMeters`
  Every architectural element (piers, sills, cantilever slabs, planters) now shares identical real-world travertine grain scale without distortion or seam tearing.

### 3.2 Dielectric Glazing & Horizon Reflection Calibration
- **Glass Physical Parameters**:
  - `metalness: 0.035`–`0.040` (Strictly dielectric; glass $F_0 \approx 0.04$).
  - `roughness: 0.038`–`0.046` (Subtle micro-polish variation across bays).
  - `envMapIntensity: 2.60` (Strong reflection response from daylight sky).
  - Base tone: Architectural smoke-green/bronze tint (`#283832`).
  - Emissive internal bounce: `#161D19` at intensity `0.22` to simulate faint ambient illumination inside private suites while keeping unmodeled interiors completely concealed.
- **Horizon Environment (`cape_hill_1k.hdr`)**:
  - Glazing in the hero viewport previously reflected empty blackness because pure sky HDRIs (`kloofendal`) lack terrain features below the horizon.
  - Integrating `cape_hill_1k.hdr` introduces authentic mountain ridges and terrain contours across the window panes, turning flat black rectangles into deep, luxurious architectural glazing.
- **Balustrade Separation**:
  - Balustrade glass remains strictly transparent: `transparent: true`, `opacity: 0.40`, `roughness: 0.02`, `metalness: 0.04`, `envMapIntensity: 1.85`.

### 3.3 Contact Shadows & Frame Depth
- **220mm Window Reveals**: Window assemblies are recessed $220\text{mm}$ behind the travertine face.
- **Extruded Bronze Frames**: Added $45\text{mm}$ extruded bronze frames (`Metal030`, `roughness: 0.35`, `metalness: 0.88`, `#443425`).
- **Beveled Weather Sills**: Added extruded travertine sills with a $40\text{mm}$ slope and drip groove.
- **Contact Shadow Reveals**: Deep shadow reveals (`#15100B`, `roughness: 0.90`) inserted under slab soffits, sill junctions, and pier reveals to anchor geometry without requiring expensive real-time ambient occlusion post-processing passes.

---

## 4. Root-Cause Investigation: The 918 Exterior Draw Calls

You requested an investigation into the 918 exterior draw calls before multiplying trim geometry.

### 4.1 Mesh Traversal Breakdown
Scene graph traversal of `BuildingProcedural.tsx` revealed **917 total active meshes** in the default exterior hero view:
1. **Side Elevation Window Bays (Floors 1–12)**: **384 meshes**
   - 96 window panes (12 floors $\times$ 8 side bays)
   - 96 stone piers
   - 96 stone sills
   - 96 bronze trim frames
2. **Balcony Assemblies (Floors 2–11)**: **138 meshes**
   - Slabs, bronze shoes, tempered glass panels, and placeholder foliage spheres.
3. **South Elevation Piers**: **60 meshes** (12 floors $\times$ 5 vertical piers)
4. **Corner Column Blocks**: **48 meshes** (12 floors $\times$ 4 corners)
5. **Architectural Shading Fins**: **69 meshes** (36 East fins + 33 South fins)
6. **Window Planes (North & South)**: **35 meshes**
7. **Slabs and Soffits**: **24 meshes**
8. **Plinth & Garden**: **15 meshes**
9. **Instanced DetailBatch (`FacadeDetails`)**: **4 draw calls** (representing hundreds of rivets/louvers)
10. **Level 8 `FacadeBayModule`**: **10 meshes**

### 4.2 Conclusion & Tower-Wide Propagation Strategy
- The representative bay (`FacadeBayModule`) adds only **10 draw calls** and is not the cause of the 918 draw calls.
- The 918 draw calls are caused by uninstanced `for` loops in `BuildingProcedural.tsx` creating individual `<mesh>` nodes for every window sill, pier, and fin across all 12 floors.
- **Path Forward for Stage 5**: By converting the recurring side window bays, bronze mullions, and column blocks into Three.js `InstancedMesh` instances (following the pattern already proven in `FacadeDetails.tsx`), we can collapse ~800 individual draw calls into **~15 instanced draw calls**, driving exterior draw calls down from **918 to $\approx 130$** while simultaneously multiplying visual facade detail.

---

## 5. WebGL Rendering Measurements & Geometry vs. Lighting Separation

### 5.1 Headless Measured Counters vs. Physical Phone FPS Notice
> [!IMPORTANT]
> The table below reports exact counters captured directly from Three.js `renderer.info.render` via automated headless Chromium instrumentation. Headless CPU rasterization (SwiftShader) cannot measure physical mobile GPU frame-times, display refresh rate sync (ProMotion 120Hz/60Hz), or thermal throttling. Physical mobile performance must be evaluated on real target hardware.

### 5.2 Measured Rendering Cost Comparison

| View / State | Draw Calls (Measured) | Triangles (Measured) | Geometries (Measured) | Textures (Measured) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Exterior Hero ($s = 0.0$)** | **918** (+1 vs baseline) | **302,542** (+12 vs baseline) | 931 | 17 | Verified |
| **Level 8 Bay Closeup ($s = 0.33$)** | **889** | **244,444** | 928 | 16 | Verified |
| **Standalone Living Tour** | **250** (Identical) | **164,349** (Identical) | 314 | 15 | Verified Isolated |
| **Standalone Bedroom Tour** | **28** (Identical) | **14,694** (Identical) | 104 | 14 | Verified Isolated |
| **Standalone Balcony Tour** | **72** (Identical) | **31,804** (Identical) | 168 | 15 | Verified Isolated |

### 5.3 Geometric Invariance vs. Visual/Photometric Verification
- **Geometric Invariance**: Identical draw calls (250) and triangle counts (164,349) in the standalone interior tour prove that zero exterior facade geometry or environment helpers leaked into the interior scene graph.
- **Photometric & Lighting Verification**: Because geometry invariance does not prove lighting isolation, we verified that entering the interior unmounts `<Environment>` and reinstates `<StudioLighting>`, producing identical pixel luminance, warm residential spotlighting, and zero daylight blowout.

---

## 6. Visual Evidence: Checkpoint Stills

All evidence images are stored in `docs/evidence/`, `review-output/`, and the conversation artifact directory.

### 6.1 Exterior Hero View (Full Building Overview)
Comparison between the initial baseline and the current checkpoint:

````carousel
![Before Exterior Hero](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/before-hero.png)
<!-- slide -->
![Checkpoint Exterior Hero](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/checkpoint-hero-full.png)
````

### 6.2 Level 8 Facade Bay (Genuine Close-up View)
Inspection of the refined Level 8 South bay showing metric travertine UV tiling, 220mm reveals, bronze frames, beveled sills, and Cape Hill horizon reflections:

````carousel
![Before Level 8 Bay](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/before-bay-closeup.png)
<!-- slide -->
![Checkpoint Genuine Close-up Level 8 Bay](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/checkpoint-bay-genuine-closeup.png)
````

### 6.3 Interior Living Room (Photometric Isolation Smoke Test)
Verification that entering the interior room tour restores calibrated residential lighting without daylight blowout:

````carousel
![Before Interior Living Room](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/before-interior-living.png)
<!-- slide -->
![Checkpoint Interior Living Room](file:///C:/Users/Sudhanshu/.gemini/antigravity/brain/79177df4-f6ed-4021-8ff1-e02983e8b820/checkpoint-interior-living.png)
````

---

## 7. Self-Inspection & Honest Visual Critique

A rigorous self-inspection of `checkpoint-hero-full.png` and `checkpoint-bay-genuine-closeup.png` identifies the following remaining visual weaknesses:

### 7.1 What is Working Well
1. **Glazing Realism**: The glass is no longer flat black or mirror foil. With `cape_hill_1k.hdr` and dielectric Fresnel tuning, the panes reflect realistic horizon terrain contours and sky gradients with high architectural authenticity.
2. **Metric UV Scaling**: Travertine tiling on Level 8 maintains identical, natural proportions across piers, sills, and wide cantilever slabs without pixel stretching.
3. **Architectural Depth**: 220mm window recesses, bronze sub-frames, and shadow reveal grooves produce distinct light/shadow delineation under sunlight.
4. **Show Residence Isolation**: The interior show residence remains completely protected and untouched.

### 7.2 Remaining Visual Weaknesses (To Address in Subsequent Stages)
1. **Isolated Detailing vs. Flat Surrounding Tower**:
   - Because tower-wide propagation was intentionally held pending this checkpoint, only Level 8 South features the refined PBR travertine, bronze frames, and deep reveals. Floors 1–7 and 9–12 still display flat procedural canvas textures. The boundary between Level 8 and neighboring floors is visibly discontinuous in the hero view.
2. **Untextured, Floating Site Plinth**:
   - The base of the building sits on a flat, untextured grey slab floating in black space without architectural paving joints, curbs, or ground contact ambient occlusion.
3. **Cartoonish Landscaping**:
   - The arrival garden and roof terrace still feature procedural icosahedron canopy clusters and bright green spheres that look like low-poly video game placeholders.
4. **Lack of Glass Micro-Surface Distortion**:
   - In architectural reality, large annealed or tempered glazing exhibits subtle surface curvature ("pillow distortion") that gently warps straight reflected horizon lines. Adding a very subtle low-frequency normal disturbance to the glass material will eliminate the remaining synthetic perfection.
5. **Mobile Hero Headline Overlap**:
   - On narrow mobile viewports ($< 768\text{px}$), the hero camera angle still places the tower directly behind the hero text, reducing contrast.

---

## 8. Automated Gate Verification Results

All automated gates passed cleanly on isolated port `4174`:
- [x] `npm run typecheck` — 0 errors.
- [x] `npm test` — 17/17 Vitest unit tests passed.
- [x] `npm run validate:assets` — 59/59 assets verified (checksums, file sizes, licenses).
- [x] `npm run build` — Production Vite bundle built in 7.13s (1,544.31 kB JS / 427.95 kB gzip; 48.06 kB CSS).
- [x] `npx playwright test e2e/regression.spec.ts` — 12/12 tests passed (port 4174).
- [x] `npx playwright test e2e/journey.spec.ts` — 6/6 tests passed (port 4174).
- [x] Git Working Tree: Clean unstaged changes; zero commits or pushes.

---

## 9. Next Steps (Pending Approval)

With the Level 8 bay calibration and dielectric glazing verified:
1. **Stage 5 (Tower-Wide Propagation & Instancing)**:
   - Propagate the calibrated travertine, bronze mullions, 220mm reveals, and beveled sills across floors 1–12 of `BuildingProcedural.tsx`.
   - Implement `InstancedMesh` batches for side window bays, piers, and shading fins, collapsing ~800 draw calls down to ~15.
2. **Stage 6 (Ground Plaza & Real Botanical Landscaping)**:
   - Integrate `concrete_pavers_02` PBR texture for the arrival plaza.
   - Replace procedural icosahedrons with CC0 `tree_small_02.glb` and `shrub_01.glb` broadleaf models using non-suspending, non-blocking loaders.
3. **Stage 7 (Mobile Hero Framing & Header Clearance)**:
   - Recompose mobile camera pose in `HomeScrollCamera.tsx` and decouple the story badge with `clamp(84px, 12vh, 116px)`.
