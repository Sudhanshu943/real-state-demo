# 03 — 3D, maps and technical architecture

All implementation choices in this chapter are proposals. Vendor capabilities are linked to official sources. No competitor's private source or backend was accessed.

## 1. Six different things people call “3D”

| Approach | What the visitor can do | What we need | Main trade-off |
|---|---|---|---|
| Rendered film | Watch a camera journey | A finished video and poster | Excellent visual control; no arbitrary viewpoint |
| Render plus SVG hotspots | Click floors/units on a fixed perspective | Render, polygons, metadata | Sharp and efficient; camera angles are pre-authored |
| 360° panorama tour | Look around fixed positions and change rooms | Equirectangular or cube panoramas | High realism; no continuous physical movement |
| Browser-rendered mesh | Orbit, select and potentially walk | Optimized geometry, textures, lighting | Flexible; GPU, memory and asset work matter |
| Gaussian splatting | Explore a captured volume | Trained/captured splat data | Photoreal potential; capture gaps and scene editing constraints |
| Cloud-streamed 3D | Control a remotely rendered environment | GPU server, application, streaming services | Strong fidelity; recurring cost, latency and concurrency |

These can be combined. The transition must communicate where the visitor is and preserve the selected home. A panorama cannot reveal a room that was never captured or rendered. A city mesh cannot reveal private interiors.

## 2. How a cinematic hero can work

### Option A — film with an immediate poster

Start with a compressed still image. Load a short muted film when appropriate, avoiding a full-screen blocking loader. Text and navigation remain ordinary HTML. A video may be produced from Blender, an architectural renderer or an existing authorized film. Our site should be useful if the video fails to autoplay or never loads.

Choose this when the film already exists or realism is more important than user-controlled hero movement. It is also a good fallback for reduced motion and weaker devices. The first frame, crop and colour grading should match the rest of the site.

### Option B — rendered building with a camera timeline

Load a glTF/GLB building, materials and environment into a browser renderer. Animate camera position and target along a constrained path. Overlay ordinary HTML headings and controls. [Three.js](https://threejs.org/) supplies the renderer ecosystem; [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) provides a React renderer for Three.js; [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports scroll-linked timelines.

For our demo, keep the intro camera timeline separate from user orbit control. When exploration starts, transfer control cleanly. If the camera and user controls simultaneously modify the view, the building can jump or resist dragging. Respect reduced motion with a static or short non-travelling alternative.

### Option C — pre-rendered angle sequence

Render a set of building angles offline, then select an image based on drag position. Synchronize per-angle selection overlays. This can feel like rotation while keeping runtime lighting simple. Its hidden cost is asset count, transfer size and maintaining polygons across views. It does not provide unrestricted 3D movement.

**Proposed choice:** use a poster/film for opening polish and an optimized mesh for the main explorer. If the building mesh cannot meet quality and loading goals, use a fixed render selector for the first complete demo and describe it accurately.

## 3. Building, floor and apartment selection

### A mesh-based implementation

Author separate named selection meshes or proxy volumes for floors/units. A pointer ray intersects these proxies; the selected identifier looks up metadata. Selection meshes can be simpler than visible architecture. Show a subtle outline or translucent selection treatment and update an adjacent information panel.

Example naming convention: `building_A`, `floor_08`, `unit_A0802`, `balcony_A0802`. Prefer explicit metadata in glTF extras or a validated mapping file. Never depend on a model's arbitrary child index, because re-export can change it.

Essential behaviour:

1. Hover previews a floor on desktop; keyboard focus provides an equivalent.
2. Click/tap selects it and reveals the available unit list.
3. Unit selection synchronizes the highlight, detail card, plan and URL state.
4. Returning to the building retains the chosen floor.
5. Sold/reserved/available states have text labels and an accessible list alternative.

### A render-based implementation

Place an SVG with the same aspect ratio above the building image. Each floor/unit polygon has an ID. Use a `viewBox` so scaling stays aligned. Avoid independently cropping the background image without transforming the overlay. On narrow screens, either retain the full illustration or choose a separately authored mobile composition.

This is a credible method for a premium demo. The Esteria live building screens visibly exposed images and outlines before the panorama canvas; this suggests a mixed representation, but does not establish every implementation detail. Its maker confirms a Three.js panoramic component. [Esteria case study](https://www.miraistudios.co/work/esteria).

### Floor-plan interaction

Use a clean vector plan with room labels, orientation and area definitions. Hover/click can highlight a room and open its corresponding panorama. Keep the plan visible as a minimap inside the tour when space allows. A furnished axonometric image can complement the plan, but it should not replace readable geometry and dimensions.

## 4. The map-to-interior effect the user described

The convincing illusion is a sequence of scale changes:

**City → neighbourhood → project parcel → building → floor → apartment → room.**

It is usually an orchestration problem, not one magical API. The geographic map, architectural model and interior viewer are different datasets and may use different renderers.

### Proposed handoff

1. Begin at a curated city camera position, not an unbounded globe.
2. Animate to the project location while explaining two or three nearby anchors.
3. At a useful project scale, fade into an authored building scene that shares the same orientation.
4. Move to the chosen building/floor using the local scene.
5. Open the selected home card and plan.
6. Transition into an authorized panorama or modeled interior using the selected unit ID.

Use a short fade or architectural framing device to conceal the scene swap. Trying to make different datasets align perfectly through a window can consume disproportionate effort. A good transition gives continuity without pretending the entire city and interior are one continuous scan.

### What the datasets cannot provide automatically

Google's photorealistic city data does not supply apartment plans, unit boundaries, current sales availability or arbitrary private interiors. A future development needs its own model. A real property interior needs authorized scans, panoramas or modeled content. Coverage and visual resolution vary by place; the chosen Indian city and exact project must be tested before promising a photoreal city flight. [Google Map Tiles overview](https://mapsplatform.google.com/maps-products/map-tiles/), [Photorealistic 3D Tiles documentation](https://developers.google.cn/maps/documentation/tile/3d-tiles?hl=en).

## 5. Map platform decision

| Route | Good fit | Dependencies | Decision for this demo |
|---|---|---|---|
| Google photorealistic tiles + CesiumJS | Globe/city context using a supported 3D Tiles renderer | Coverage, key, billing, visible attribution, network | Conditional enhancement |
| Google native 3D Maps | Integrated Google 3D-map experience | Current product/API status, coverage, account and pricing | Evaluate only after location is known |
| Mapbox + custom glTF model | Styled neighbourhood map with project overlay | Token, map-load pricing, placement and rendering work | Strong production option |
| MapLibre + licensed basemap/terrain | Control over map renderer and providers | Data source, hosting, tile license and operations | Alternative when provider strategy is explicit |
| Authored local 3D district | Highly controlled, presentation-ready neighbourhood story | Original modeled context and clear illustrative label | Recommended first-demo default |
| Custom illustrated 2D map | Useful landmarks on low-end/mobile devices | Original map artwork or licensed geographic source | Mandatory fallback candidate |

CesiumJS supports 3D Tiles, terrain and glTF, and is released under Apache 2.0; imagery and hosted services have separate terms. [CesiumJS official page](https://cesium.com/platform/cesiumjs/).

Mapbox publishes a concrete Three.js custom-layer example and notes a native model-layer option. This verifies that project models can be placed on a map; it does not solve apartment-selection semantics for us. [Mapbox example](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/).

MapLibre is an open-source renderer candidate, not a source of free unrestricted satellite imagery. The specific Three.js example URL attempted during research returned 404; no sample code from that URL should be treated as verified. Start future evaluation from the [official MapLibre site](https://maplibre.org/).

## 6. Map usage and cost boundaries

Google's current policy requires visible Google Maps attribution and applicable provider credit. It restricts prefetching, storage and offline use subject to the agreement. Do not build an offline map by downloading the tiles. Our offline presentation fallback must use original or separately licensed district assets. [Map Tiles policies](https://developers.google.com/maps/documentation/tile/policies).

Product pricing is tied to specific SKUs and usage definitions. Google currently offers subscription and pay-as-you-go information; do not estimate a photorealistic map by applying a generic “map view” price. Use the appropriate account/region and selected product's current price table. [Official pricing](https://mapsplatform.google.com/pricing/).

Before activation: restrict a client-visible API key to expected domains/APIs, apply available quotas, add budget alerts, and test expected interaction usage. Alerts alone are not a hard spending cap. Avoid mounting multiple map instances merely because a drawer opens and closes.

## 7. Interior delivery options

### Panorama — recommended initial route

Need at least a living room, bedroom and balcony view from one consistent environment. Use a sphere/cube panorama renderer, room hotspots and a room menu. Load the next likely room after the current view becomes usable. [Marzipano](https://www.marzipano.net/) exports tour applications; [Pannellum](https://pannellum.org/) is another lightweight open-source viewer.

Photorealism comes from the source images. A normal perspective photograph is not a complete 360° panorama. AI outpainting can create illustrative content, but spatial consistency must be checked and it cannot establish an accurate real apartment layout.

### Real-time mesh walkthrough

Offers continuous movement, finish changes and object interactions. Requires a web-ready interior, baked or carefully managed lighting, navigation constraints and collision or guided waypoints. Build guided camera positions first so the client cannot walk outside the model. [Shapespark](https://www.shapespark.com/) is a product alternative for architectural browser tours.

### Gaussian splatting

Useful for capturing a real furnished space. Requires capture coverage, reconstruction, cleanup and device testing. Splats are not automatically an editable BIM model or a reliable collision mesh. Mirrors, windows and previously unseen surfaces can expose artifacts. PlayCanvas provides viewing, editing and application workflows through its splat ecosystem. [Official Gaussian splatting guide](https://developer.playcanvas.com/user-manual/gaussian-splatting/).

### Unreal Pixel Streaming

The application runs on a PC/cloud server and streams frames and audio to the browser over WebRTC. Browser controls are returned to the application. This shifts rendering cost to infrastructure and introduces networking/concurrency planning. It is not equivalent to compiling a normal Unreal scene into a lightweight webpage. [Epic's official explanation](https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine/?application_version=5.0).

Choose streaming only when source assets, visual requirements and a funded operating model justify it. Benchmark one session and concurrent sessions before estimating public costs. The linked conceptual documentation is versioned 5.0; exact implementation must use documentation matching the selected engine version.

## 8. Proposed application architecture

**Default:** React + TypeScript + Vite, Three.js/React Three Fiber for the explorer, a single panorama engine, GSAP for selected camera/UI timelines, static JSON for demo inventory, ordinary HTML for property content. Next.js is a reasonable substitution when server rendering, SEO routes or backend services become part of scope.

R3F and React major versions must be paired as documented. Pin stable compatible dependencies at build time rather than adopting an alpha rendering path for novelty. [R3F compatibility guidance](https://r3f.docs.pmnd.rs/getting-started/introduction).

Keep these responsibilities separate:

- `ProjectContent`: story, location, amenities, approved copy.
- `Inventory`: unit IDs, floors, area definitions, status, plan and tour references.
- `ExperienceState`: selected floor/unit, camera mode, theme, saved units.
- `BuildingScene`: models, lights, camera and selection proxies.
- `TourViewer`: room state and panorama resources.
- `LeadFlow`: validation, selected-unit context and honest confirmation.

Scene states: `overview → building → floor → unit → tour`. Returning should preserve useful state. Errors should lead to a usable image, plan and enquiry action, not a blank canvas.

Use a single main graphics context where practical. Dispose textures, geometries and controls when changing experiences. Avoid loading the city renderer, full building and every interior simultaneously. Core copy, plans and unit list should remain accessible without the graphics scene.

## 9. Model-production pipeline

1. Obtain model ownership and export permissions.
2. Open the original scene and inspect units, transforms, missing assets and material compatibility.
3. Keep a high-quality master; create a separate runtime export.
4. Remove unseen geometry and separate selection proxies.
5. Instance repeated balcony/facade/plant geometry where appropriate.
6. Bake suitable lighting and consolidate materials without destroying selectable IDs.
7. Export glTF/GLB and validate orientation, transparency, UVs and naming.
8. Simplify/compress geometry and textures; compare appearance after each change.
9. Test runtime load, orbit, selection and tour handoff on actual devices.
10. Export a poster and fallback views from the same master scene.

[glTF Transform](https://gltf-transform.dev/) provides inspect/transform/optimization tooling including deduplication, simplification, mesh compression and texture workflows. Compression must match the renderer's configured decoders. Smaller download size does not automatically mean lower GPU memory or faster decode on every device.

## 10. Proposed performance budgets

These are initial acceptance targets, not measured competitor statistics:

| Item | Initial target |
|---|---|
| First visible architectural poster | Roughly 150–400 KB where quality permits |
| Initial non-3D page transfer | Aim below 1.5 MB compressed, excluding deferred film/model |
| Main building download | Aim 3–8 MB compressed; revise after prototype |
| First panorama | Aim 1–3 MB initial level; tile larger resolutions |
| Rendering | Aim 60 fps on presentation laptop, usable 30 fps on target mid-range phone |
| LCP / INP / CLS | Aim ≤2.5 s / ≤200 ms / ≤0.1 under an agreed test profile |
| Graphics lifecycle | No accumulated canvases or repeated full texture loads after navigation |

Model triangle counts and draw calls should be profiled rather than fixed by folklore. Start around a few hundred thousand visible triangles for the main building, minimize material switches, then use measured device behaviour to decide reductions. Transparent vegetation, full-resolution shadows and high device pixel ratio can cost more than expected.

The project needs a poster-first shell, deferred heavy assets, adjustable pixel ratio, conservative shadows, loading/error states, reduced-motion handling and image/list fallbacks. These are part of the experience design, not cleanup after the animation is finished.
