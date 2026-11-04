# Architectural & Implementation Decisions

## DEC-001: Asset Pipeline — Procedural Building & Guided Mesh Show Residence
- **Date:** 2026-11-04
- **Context:** An inspection of the workspace and research assets confirmed that no licensed 3D building CAD/GLB models or authentic 360° equirectangular interior panoramas were supplied.
- **Decision:** As specified in Chapter 05 of the contract, implement the **Original Procedural Architectural Tower (`BuildingProcedural.tsx`)** using Three.js / React Three Fiber instancing, and author the **Guided 3D Mesh Show Residence (`InteriorScene.tsx`)** matching the Skyline architectural floor plan. Normal photographs are strictly not mapped onto spheres.
- **Consequences:** Fully independent, locally runnable, zero external CDN or API dependency. Real orbitable building and furnished 3-view interior suite delivered without licensing ambiguity.
- **Affected Requirements:** REQ-04, REQ-08, REQ-16, REQ-17.

---

## DEC-002: Navigation & Routing — Hash Routing Mode
- **Date:** 2026-11-04
- **Context:** The application is a static Single-Page Application meant to run locally via `npm run preview` or be deployed to static hosting without server-side rewrite rules.
- **Decision:** Use `createHashRouter` (`#/`, `#/explore/building`, `#/explore/floors/:floor`, `#/explore/homes/:unitId`, `#/explore/homes/:unitId/tour/:roomId`, `#/compare`).
- **Consequences:** Section jumping on the homepage uses programmatic smooth scrolling to prevent colliding with the route hash. Full deep-link compatibility and refresh durability on static file servers.
- **Affected Requirements:** REQ-02, REQ-12, REQ-16.

---

## DEC-003: Privacy & Enquiry Form State — Zero Persistence In-Memory Preview
- **Date:** 2026-11-04
- **Context:** The demo must honestly reflect that it is a concept demonstration for a prospective client, not a live property marketplace connected to a sales CRM.
- **Decision:** The viewing request form operates purely in volatile React component memory. Upon form submission, an in-memory preview summary is generated with a timestamp and honest disclosure (*"Request preview ready. This is a concept demonstration; nothing has been sent or booked"*).
- **Consequences:** Complete privacy guarantee. Zero user input (names, emails, phone numbers, notes) is written to `localStorage`, `sessionStorage`, URL queries, network endpoints, or console logs. Closing the confirmation purges all entered data.
- **Affected Requirements:** REQ-11, REQ-17.

---

## DEC-004: State Management — Pure Reducer + LocalStorage Preferences
- **Date:** 2026-11-04
- **Context:** Saved residences, comparison slots (maximum 2), and rendering preferences need to persist across browser reloads without bloated third-party state libraries.
- **Decision:** Implemented pure `experienceReducer.ts` coupled to `aurel.demo.v1` local storage with strict payload sanitization and corruption fallback. Adding a residence to comparison automatically saves it; unsaving removes it from comparison. Adding a 3rd comparison candidate triggers an explicit slot replacement modal.
- **Consequences:** Deterministic, easily testable state machine. 100% test coverage across U04–U10.
- **Affected Requirements:** REQ-06, REQ-09, REQ-10, REQ-12.

---

## DEC-005: Creative Redirection — Live Homepage 3D Scroll Choreography & Architectural Elevation Overhaul
- **Date:** 2026-11-04
- **Context:** Visual review of localhost:5173 identified major aesthetic and functional shortcomings: homepage hero lacked live 3D (static SVG lines over radial gradient), residence cards lacked imagery, materials section was an empty placeholder box, exterior facade lacked architectural contrast, district scene rendered 16 bare cubes, and an `OrbitControls` collision in `CameraRig.tsx` pushed the interior tour camera 25m into the sky looking down onto an exterior ceiling slab instead of eye level inside the furnished residence.
- **Decision:** Pivot to an editorial, cinematic architectural experience anchored by **Live 3D directly on the homepage**. Implement a 4-beat pinned scroll sequence mapping scroll progress $s \in [0, 1]$ from low-angle building hero $\rightarrow$ Level 8 terrace facade $\rightarrow$ eye-level furnished living salon $\rightarrow$ sunset horizon balcony. Fix camera ownership during tour mode by unmounting exterior `OrbitControls` and mounting an eye-level room pivot controller. Replace placeholder SVGs with rich architectural editorial assets.
- **Consequences:** Replaces static hero with high-end live 3D opening, cures the tour camera fight, restores eye-level interior navigation, and provides high-density architectural visual storytelling while preserving existing state, routing, and enquiry invariants.
- **Affected Requirements:** REQ-01, REQ-03, REQ-04, REQ-05, REQ-08, REQ-16.
