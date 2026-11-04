# 03 — Technical architecture

## 1. Stack and dependency policy

Use React + TypeScript + Vite, Three.js + React Three Fiber, compatible Drei utilities, plain CSS/CSS modules, a small pure reducer, Vitest for contracts/reducer and Playwright for the important browser journeys. Use React Router with hash routing so static hosting does not require server-side route rewrites. No database, server framework or global state library is necessary for six units.

At Phase 0 inspect actual tooling. Select a stable compatible release set, record exact installed versions and commit its lockfile. For the researched stable family React 19 pairs with R3F 9; check current official compatibility before resolving. Do not move to an alpha R3F/WebGPU release to obtain novelty. Read current Vite/Node requirements instead of assuming an installed Node is sufficient. [R3F official guidance](https://r3f.docs.pmnd.rs/getting-started/introduction), [Vite setup](https://vite.dev/guide/).

Use one package manager, default npm. No `--force` or peer-dependency bypass to conceal incompatible packages. Use a compatible maintained icon package if available, otherwise original SVG icons. Include visible labels for important controls. Add GSAP only if a concrete timeline requires it; simple CSS transitions and camera interpolation can cover the baseline. Do not install multiple animation systems or panorama viewers.

For panorama route, pick one viewer and document its license; a Three.js sphere implementation is also possible within the existing renderer. Mesh route needs no panorama package. Prefer shared graphics infrastructure to two simultaneous canvases. [Three.js docs](https://threejs.org/docs/).

## 2. Planned repository structure

If the destination already contains a suitable app, adapt paths without rewriting unrelated work. In the current source workspace only documentation exists, so default app code belongs at repository root beside the preserved research/plan folders.

```text
package.json / package-lock.json
index.html
vite.config.ts / tsconfig*.json / eslint.config.*
playwright.config.ts / vitest.config.ts
public/
  assets/
    images/          # local final posters, stills and thumbnails
    models/          # only if approved GLB route selected
    textures/        # local optimized textures/HDRI
    tours/           # only if true panorama route selected
    fonts/           # WOFF2 and required license text
  licenses/
src/
  main.tsx
  app/
    App.tsx
    router.tsx
    providers.tsx
    AppErrorBoundary.tsx
  domain/
    types.ts
    validateProject.ts
    selectors.ts
    experienceReducer.ts
    navigation.ts
    storage.ts
    enquiry.ts
  data/
    project.json
    assets.json
    cameras.ts
    buildingSpec.ts
    planDefinitions.ts
  pages/
    HomePage.tsx
    ExplorePage.tsx
    NotFoundPage.tsx
  features/
    home/            # Hero, Vision, LocationPreview, Collections, Amenities
    explorer/        # Shell, floor picker, filters, unit list, detail sheet
    district/        # landmark panel and accessible illustration
    plans/           # shared SVG PlanView and enlargement
    tour/            # TourShell and selected renderer adapter
    saved/           # saved drawer, compare table, replacement choice
    enquiry/         # form and preview confirmation
  scene/
    SceneHost.tsx
    SceneBoundary.tsx
    DistrictScene.tsx
    BuildingScene.tsx
    InteriorScene.tsx # only mesh route
    BuildingModel.tsx
    BuildingProcedural.tsx
    CameraRig.tsx
    SelectionProxies.tsx
    Materials.tsx
    QualityController.tsx
    renderModes.ts
  components/
    Button.tsx / IconButton.tsx / Dialog.tsx / StatusLabel.tsx
    LoadingState.tsx / EmptyState.tsx / ErrorState.tsx
    ResponsiveImage.tsx / DemoDisclosure.tsx
  styles/
    tokens.css / global.css / layout.css / reduced-motion.css
  tests/
    data-contract.test.ts
    experienceReducer.test.ts
    navigation.test.ts
    enquiry.test.ts
e2e/
  journey.spec.ts
  recovery.spec.ts
  accessibility.spec.ts
scripts/
  validate-assets.mjs
  capture-stills.mjs
docs/
  DECISIONS.md / ASSET-REGISTER.md / QA-REPORT.md / HANDOFF.md
  RENDER-SPEC.md / VISUAL-REVIEW.md
  evidence/
BUILD-TRACKER.md
README.md
```

These are responsibility boundaries, not a command to create empty files. Create a module when its responsibility is implemented. Small supporting components can share files. Do not bury domain logic inside a huge page component or duplicate the full inventory per screen.

## 3. Routes and source of truth

Hash paths:

| Route | Meaning |
|---|---|
| `#/` | Homepage |
| `#/explore/district` | District overview; optional `landmark` query |
| `#/explore/building` | Exterior overview; optional collection/aspect/status filters |
| `#/explore/floors/8` | Explicit floor; same optional filter query |
| `#/explore/homes/A0801` | Home detail; optional `tab=plan` |
| `#/explore/homes/A0801/tour/living` | Representative suite, preserving home context |
| `#/compare` | Compare screen backed by saved/compare state |

Routes are authoritative for selected mode/floor/unit/room. Parse them to a normalized selection object; do not maintain a second independent `selectedUnit` state that can disagree. Derived selection is supplied to scene and UI. The pure reducer owns saved IDs, comparison IDs, filters where not encoded, user rendering preference and enquiry modal state. URL-encoded filters override defaults on navigation; do not blend stale filters invisibly.

Use `push` for deliberate context changes: entering district/building, selecting floor/home, entering tour, opening compare. Use `replace` for changing tour room, detail tab, filter adjustments and invalid-link normalization to avoid dozens of unhelpful history entries. Parent breadcrumb/Exit Tour uses an explicit parent route; it must work when the page was opened by direct URL and has no in-app history.

Browser Back/Forward respects actual history. Programmatic state normalization must not repeatedly add history entries or create an effect loop. Direct home routes open their home even if previous filters would exclude it; do not hide the detail with stale list filters. Unknown routes show an informative page and Home/Residences actions.

Homepage section links use element IDs and scroll after navigating home. Since hash is used by router, do not use competing raw `#section` anchors; pass section target through route state or supported query, then scroll after render.

## 4. Graphics lifecycle

Lazy-load SceneHost only inside explorer or an intentional hero enhancement. Homepage first paint is local still imagery and HTML. One active scene renderer at a time. A mode switch either reuses one Canvas with explicit group cleanup, or unmounts one renderer before mounting the next. Document the chosen method.

Wrap scene creation/loading in a boundary. Detect renderer initialization failure, explicit simplified preference, asset load errors and context loss. On context loss stop animation, preserve domain state and show static equivalent. Offer one explicit Retry 3D; no infinite remount loop.

Do not call setState on every animation frame. Camera updates use refs/renderer loop. Reduced-motion changes take effect without resetting selected homes. Demand rendering is appropriate when a scene is static; animations temporarily request frames. Avoid permanent animation when tab is hidden. Dispose only owned resources; cached shared textures/geometries should be released when no active scene owns them, not blindly on every small panel change.

No textures, fonts, models or API keys fetched from random remote URLs at runtime. Required assets resolve under the app's configured base URL. Use imported asset URLs or a centralized base-aware resolver; root-only `/assets` assumptions must not break a subdirectory preview.

## 5. Asset loading adapter

Asset IDs are stable logical names. Runtime records map them to local path, kind, readiness, attribution and fallback. Do not put external URLs in JSX as emergency replacements.

`BuildingModel` route handles GLB load and maps metadata/proxies. `BuildingProcedural` implements the same selection interface using canonical geometry. SceneHost selects exactly one route from configuration. It must not render two different buildings depending on which screen is open.

Tour adapter exposes `roomId`, `resetView()`, `onRoomChange()` and readiness/failure. Panorama and mesh implementations satisfy the same UI contract. Only the selected route needs to ship. No mysterious toggle exposing an unfinished secondary renderer.

## 6. Accessible UI infrastructure

Use accessible dialog primitives if a compatible dependency is available; otherwise implement focus trap, initial focus, Escape, focus restoration, inert/aria-hidden background and scroll locking carefully. Enquiry, mobile navigation, plan enlargement, saved drawer and replace-compare choice must share one overlay manager, so only one top-level dialog is open at a time.

The main explorer is a route, not a modal. Scene can be hidden from assistive technology when the same controls/data are exposed in HTML. Provide meaningful alternative text on posters; decorative textures are hidden. Selection/status never depends only on colour. Announce result counts and save/compare updates through a restrained polite live region.

Focus after route change goes to the main heading or stable panel heading, except room switching keeps focus on its selected control. Closing enquiry returns to its trigger if it still exists; otherwise use the current page heading. Zoomed plans should have textual room information.

## 7. Enquiry and local state

Enquiry is a demonstration form. Keep PII only in current component/provider memory. No fetch call, analytics, console logging, localStorage or URL insertion of contact details. Confirmation is a preview, not a booking.

Saved preference key: `aurel.demo.v1`. Strictly parse/validate, prune unknown IDs, enforce compare subset/capacity and recover from storage denial/quota/invalid JSON. A successful in-memory save must still work if persistence fails; show a short nonblocking “Saved for this session” notice. Reset preferences clears this key and app preferences, not all browser storage.

## 8. Scripts required at handoff

Define working scripts with these purposes: `dev`, `build`, `preview`, `typecheck`, `lint`, `test`, `test:e2e`, `validate:assets`, and `capture:stills` if the chosen asset route uses browser-generated stills. The builder chooses exact compatible commands. All scripts documented in README must actually exist and run.

Use Playwright's configured web server with a ready URL; avoid fixed sleeps. E2E tests use semantic roles/labels and IDs only where semantic targeting is insufficient. Mobile emulation is useful, but does not prove a physical iPhone GPU works. [Playwright official setup](https://playwright.dev/docs/intro).

## 9. Build and deployment

Output is the standard Vite production build, default `dist/`. Verify with production preview, not development server alone. Hash routing permits static host deep links as long as the base document and assets resolve. Do not assume a file opened directly with `file://` is equivalent to a served app.

No service worker in baseline; stale-cached assets complicate demonstration recovery. After a server is running and assets are loaded, core interactions must need no third-party network calls. A fresh visit still requires the local/static server to deliver assets; do not claim installable offline support.
