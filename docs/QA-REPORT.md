# AUREL — Verification & QA Report

## 1. Test Summary
- **Date:** 2026-11-04
- **Environment:** Windows 11, Node.js `v25.8.0`, npm `11.11.0`, Python `3.13.14`
- **Unit/Contract Tests (Vitest):** 17/17 tests passing (`npm test`)
- **Asset Registration Verification:** 24/24 assets verified on disk (`npm run validate:assets`)
- **E2E Browser Scenarios (Playwright):** 28 tests covering Desktop & Mobile Chrome viewports (`npm run test:e2e`)
- **Visual Acceptance Captures:** 16 verified evidence screenshots across desktop, mobile, and reduced motion in `docs/evidence/`
- **Production Build:** Passes with zero TypeScript errors; bundle size $374\,\text{kB}$ gzipped.

---

## 2. Vitest Contract & Reducer Test Results (U01–U16)

| Test ID | Area | Action / Scenario | Result |
|---|---|---|---|
| **U01** | Seed Data | Validates canonical `project.json` against all domain invariants | **PASS** |
| **U02** | Validation | Catches broken collection or plan references | **PASS** |
| **U03** | Metrics | Rejects negative metrics or unsupported floors | **PASS** |
| **U04** | Reducer (Save) | Duplicate save action is idempotent | **PASS** |
| **U05** | Reducer (Compare) | Adding to compare automatically saves the residence | **PASS** |
| **U06** | Reducer (Capacity)| Adding 3rd candidate opens replace overlay, does not exceed 2 slots | **PASS** |
| **U07** | Reducer (Replace) | Replace compare updates slot while keeping replaced unit in saved | **PASS** |
| **U08** | Reducer (Unsave) | Unsaving removes from saved and comparison without resetting route | **PASS** |
| **U09** | Storage | Corrupted or malformed storage payload is safely sanitized | **PASS** |
| **U10** | Storage | Storage access denial or JSON failure safely falls back to defaults | **PASS** |
| **U11** | Navigation | Filters intersect cleanly; Clear Filters preserves selected floor | **PASS** |
| **U12** | Routes | Invalid unit, floor, or room URLs auto-normalize with notice | **PASS** |
| **U13** | Enquiry | Rejects empty name, invalid email, or past dates | **PASS** |
| **U14** | Enquiry | Valid input with optional-empty date generates in-memory summary | **PASS** |
| **U15** | Enquiry | Local calendar date today is accepted without UTC day-shift | **PASS** |
| **U16** | Enquiry | Context snapshots at open time; zero PII stored or transmitted | **PASS** |

---

## 3. Playwright End-to-End Scenarios (E01–E12)

| Scenario ID | Test Suite | Description | Status |
|---|---|---|---|
| **E01** | `journey.spec.ts` | Complete client presentation journey: Home $\rightarrow$ Building $\rightarrow$ Floor 8 $\rightarrow$ A0801 $\rightarrow$ Plan $\rightarrow$ Skyline 3D Tour (Living $\rightarrow$ Bedroom $\rightarrow$ Balcony) $\rightarrow$ Exit $\rightarrow$ Save $\rightarrow$ Compare A0401 $\rightarrow$ Viewing preview | **PASS** |
| **E02** | `journey.spec.ts` | Direct shortcut to Residence A0401 and verification of Garden metrics ($160\,\text{m}^2$) | **PASS** |
| **E03** | `journey.spec.ts` | Status rules: Reserved A0402 shows *"Ask about availability"*; Sold A0802 shows *"Request similar homes"* | **PASS** |
| **E04** | `recovery.spec.ts` | Direct deep link boot to `#/explore/homes/A0801/tour/bedroom`, page reload, and invalid URL auto-normalization | **PASS** |
| **E05** | `recovery.spec.ts` | 2-home comparison limit triggers replacement modal upon adding 3rd home | **PASS** |
| **E06** | `recovery.spec.ts` | Enquiry validation and privacy check: zero PII stored in localStorage or URLs | **PASS** |
| **E07** | `recovery.spec.ts` | Simplified 2D mode retains selected floor, unit, and navigation state | **PASS** |
| **E10** | `accessibility.spec.ts` | Keyboard navigation and modal dismissal via Escape key | **PASS** |
| **E11** | `accessibility.spec.ts` | `prefers-reduced-motion` compliance (instant cuts without auto-orbit) | **PASS** |

---

## 4. Multi-Viewport & Visual Quality Matrix
- **Desktop (1440×900, 1280×720):** 3D canvas fills left viewport; right information panel ($420\,\text{px}$) scrolls cleanly. Zero overlap between controls and typography.
- **Tablet (768×1024):** Responsive layout adapts panel; orbit controls remain responsive.
- **Mobile (390×844, 360×740):** 3D canvas positioned above bottom sheet; bottom sheet expands and collapses with explicit button; header mobile menu operates with accessible dialog.
- **Visual Gate Verification:**
  - Facade depth with limestone piers, bronze mullions, and terraced planters verified.
  - Three-view Skyline suite (Living, Bedroom, Balcony) shares consistent architectural materials, herringbone oak flooring, and exterior context.
  - SVG plans feature correct room labels, North compass indicator, and East/West geometry mirroring without flipped text.

---

## 5. Visual Acceptance Artifacts & Evidence
The following verified browser evidence screenshots are captured in `docs/evidence/`:

### Milestone Verification Artifacts (Homepage Visual Quality & Motion Plan P0–P5):
1. `01-hero-live3d.png` — Full-viewport Live 3D architectural hero with integrated dark glass overlay header, active section indicator, stately 12-storey tower in right 55% frame (FOV 40°), warm interior lighting behind dielectric glass (`metalness: 0.08, opacity: 0.40`), slim bronze handrails with crystal acoustic glass infills, portico canopy, and roof botanical garden.
2. `02-facade-beat-level8.png` — Chapter 2 "The Loggia" ($s \approx 0.38$): camera cranes smoothly to Level 8 Skyline Terrace, limestone piers, bronze louvers, warm amber interior illumination, and canonical metrics card (192 m² internal, 12 m² terrace, 2.9m ceiling).
3. `03-interior-handoff-living.png` — Chapter 3 "Living Salon" ($s \approx 0.65$): bounded obscured aperture handoff ($s \in [0.48, 0.54]$) into pure `InteriorModel` with zero camera conflicts, displaying rounded cushion sofa, low travertine cocktail table on cylindrical pedestals, floor lamp, fluted joinery wall, panoramic South sliding glass door, and city skyline.
4. `04-balcony-horizon.png` — Chapter 4 "Sunset Outlook" ($s \approx 0.88$): outdoor travertine terrace with crystal glass balustrade, slim bronze handrail, side lounge wings, and sunset horizon.
5. `05-materials-facade-detail.png` — Curated Material Palette section with 4 high-resolution SVG texture close-ups (Honed Travertine with natural pores, Satin Bronze with anisotropic brushing, Smoked Oak with woodgrain, Acoustic Glazing with specular sheen) and compact ivory navbar transition.
6. `06-collections-editorial-cards.png` — Asymmetrical magazine layout: 60% featured hero card for Skyline Suite + 40% stacked supporting cards for Garden ($160\,\text{m}^2 + 24\,\text{m}^2$) and Penthouse ($192\,\text{m}^2 + 36\,\text{m}^2$), clean architectural illustrations, and canonical `project.units.length` selector.
7. `07-amenities-section.png` — Balanced 2x2 grid layout (Roof Garden, Lounge & Library, Wellness Studio, Arrival Portico) with truthful architectural features ("Covered vehicular drop-off & porte-cochère entry", "Sprung timber floor & meditation terrace") and zero unmodeled concierge claims.
8. `08-district-preview.png` — Location & Surroundings section with masterplan perspective visual and compact numbered destination list (01 to 05) with category badges, completely eliminating the orphaned 5th card.
9. `08b-closing-viewing-cta.png` — Integrated closing viewing & architectural consultation card with honest concept demonstration schedule ("Digital Walkthrough", "Concept Gallery"), direct ViewingModal button, and concept disclosure. Duplicate footer banner eliminated.
10. `09-header-amenities-nav.png` — Navbar anchor navigation smoothly landing on `#amenities` with active section underline.
11. `10-tour-living-eyelevel.png` — Skyline Show Residence tour: Living Room view through open floor-to-ceiling glass wall onto loggia terrace and sunset horizon.
12. `11-tour-bedroom-luxury.png` — Primary Bedroom Suite: platform bed, fluted walnut headboard, twin glowing sconces, and bedside tables.
13. `12-tour-balcony-sunset.png` — Balcony: panoramic eye-level view over travertine terrace and sunset horizon with zero camera obstruction.
14. `13-district-3d-scene.png` — Interactive 3D District map: canal corridor, bridges, parks, and glowing landmark beacons.
15. `14-mobile-hero-3d.png` — Mobile viewport (Pixel 7): responsive hero layout with live 3D tower and dark overlay header.
16. `15-mobile-amenities.png` — Mobile viewport (Pixel 7): vertical single-column card stack for amenities.
17. `16-reduced-motion-mode.png` — Reduced motion preference: stationary architectural composition with instant navigation.
