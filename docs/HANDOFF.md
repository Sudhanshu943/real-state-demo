# AUREL — Presentation & Delivery Handoff

## 1. Executive Summary & Delivery Status
- **Status:** **Client-Ready Local Demonstration**
- **Project Concept:** AUREL — Fictional Luxury Residential Development
- **Application Type:** 100% Self-Contained Local Static Single-Page Application (Zero paid APIs, zero tracking, zero external network dependencies)
- **Asset Strategy Delivered:** Original Procedural 3D Tower (`BuildingProcedural.tsx`) + Guided 3D Mesh Show Residence (`InteriorScene.tsx`). Fully responsive 2D SVG elevations and schematic maps for low-power/accessibility fallback.

---

## 2. Quickstart Runbook & Commands

### Prerequisites
- Node.js `v20+` (tested and verified on Node.js `v25.8.0`, npm `11.11.0` on Windows 11)
- Modern WebGL-capable browser (Chrome, Edge, Firefox, Safari)

### Run & Build Commands
```bash
# 1. Run development server (serves at http://localhost:5173/#/)
npm run dev

# 2. Compile strict TypeScript and production Vite bundle
npm run build

# 3. Serve optimized production build locally (serves at http://localhost:4173/#/)
npm run preview

# 4. Run automated Vitest unit/contract test suite (17 tests covering U01–U16)
npm test

# 5. Run asset registration validator (asserts 24/24 assets resolve)
npm run validate:assets

# 6. Run Playwright end-to-end browser journeys (E01–E12)
npm run test:e2e
```

---

## 3. Verified User Journeys & Core Capabilities
1. **Editorial Homepage:** Architectural poster hero, vision statement with 3 metric highlights, residence collections overview, location highlights, and curated amenities.
2. **Authored District Explorer (`#/explore/district`):** 5 synchronized landmark destinations (`garden-park`, `transit-square`, `arts-court`, `market-lane`, `work-quarter`) with 3D camera transitions and seamless transition into development.
3. **Orbitable 3D Tower (`#/explore/building`):** 12 architectural storeys with ground canopy, limestone piers, bronze mullions, double-glazed window bays, and planted loggias. Drag threshold prevents accidental selection while orbiting.
4. **Floor & Unit Selection (`#/explore/floors/8` $\rightarrow$ `#/explore/homes/A0801`):** Interactive example levels 4, 8, and 12. Contextual levels clearly displayed. West and East residences selectable through 3D proxies or HTML list.
5. **Architectural Plans (`tab=plan`):** Scaled SVG concept plans with West/East mirroring without text inversion. North arrow strictly points up. Modal zoom with schematic scale disclaimer.
6. **Guided Show Residence Tour (`#/explore/homes/A0801/tour/living`):** 3 authored viewpoints (Living Room, Primary Bedroom, Balcony) with look controls, 3D room hotspots, and prominent representative Skyline disclaimer.
7. **Saved Residences & 2-Home Comparison (`#/compare`):** Persistent localStorage (`aurel.demo.v1`) holding saved residences. Comparison capacity capped at exactly 2 homes; 3rd candidate triggers slot replacement modal.
8. **Contextual Viewing Request:** In-memory demo preview capturing up to 2 referenced units, contact method toggle, local date validation, and honest preview confirmation with zero PII retention.
9. **Simplified 2D Fallback:** 1-click toggle to lightweight SVG elevations, schematic map, and still gallery for low-power or WebGL failure states.

---

## 4. Asset Provenance & License Summary
- **Building Geometry & Scenes:** Original procedural algorithms authored in Three.js / React Three Fiber.
- **Interior Suite:** Original 3D mesh architecture modeled programmatically matching the Skyline envelope ($12 \times 16\,\text{m}$, $192\,\text{m}^2$).
- **Vector Stills & Schematics:** Original SVG illustrations in `/public/assets/images/`.
- **Typography:** Web-safe editorial serif (`Cormorant Garamond` / system serif) and sans (`Manrope` / system sans) with zero runtime CDN font calls.
- **Licenses:** All runtime assets are Project Original with unencumbered rights.

---

## 5. Honest Limitations & Boundaries
- **Fictional Data:** All unit prices (in INR), internal floor areas ($m^2$), and availability statuses are illustrative concept demo data.
- **Single Show Residence:** The 3D interior tour represents the Skyline suite ($192\,\text{m}^2$). As disclosed throughout the UI, it is an illustrative representation; private layouts vary by collection.
- **Demo Booking:** Viewing requests generate an in-memory preview only. No CRM integration or message sending is performed.
- **Hardware Variation:** While WebGL 3D runs at 60 fps on desktop hardware, low-power devices can seamlessly switch to the included 2D simplified mode.

---

## 6. Three-Minute Presentation Script for Clients
1. **0:00 – 0:30 (Hero & Concept):** Start on Homepage (`#/`). Scroll through the editorial poster, Vision statement, and Residence collections. Highlight the warm bronze and limestone art direction.
2. **0:30 – 1:15 (District & Building):** Click *"Explore Building"*. Orbit the 12-storey tower to showcase depth and facade planting. Switch to *"District"* to highlight the 5 neighbourhood landmarks, then click *"Enter Development"*.
3. **1:15 – 2:00 (Floor 8 & Residence A0801):** Select Level 8 from the floor picker. Click Residence A0801 on the west facade. Review the $192\,\text{m}^2$ internal area, sample price (₹5.60 Cr), and open the Schematic Plan tab to zoom into the architectural layout.
4. **2:00 – 2:30 (Skyline Show Residence Tour):** Click *"Enter 3D"* to step into the representative Skyline suite. Look around the furnished Living Room, transition to the Primary Bedroom, and step out onto the Balcony loggia. Note the representative interior disclosure. Exit back to A0801.
5. **2:30 – 3:00 (Save, Compare & Viewing Preview):** Save A0801 and add to Compare. Navigate to A0401 on Floor 4 and compare both. Open `#/compare` to show the side-by-side metric matrix. Click *"Request Details for Both Homes"*, fill the demo form, and demonstrate the instant in-memory preview with transparent no-booking disclosure.
