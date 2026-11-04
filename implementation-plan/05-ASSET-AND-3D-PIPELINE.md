# 05 — Asset and 3D production pipeline

## 1. Honest starting state

No actual building GLB, finished film, panorama set or architectural plans were acquired in research. The implementation package supplies data and design decisions, not those media files. The asset template marks requirements `planned`; it is not a manifest of existing deliverables.

The builder must make original assets or use demonstrably authorized sources. Public portfolio imagery is reference, not permission to redistribute. Do not hotlink reference-site images, copy their models or scrape map tiles. No purchase/API subscription is assumed.

## 2. Asset route decision tree — finish in Phase 1

1. Inspect workspace for supplied assets and their provenance. A file is usable only if its origin/use is clear, it loads, and it fits the design/data.
2. If a compatible building mesh exists, inspect it with all materials. Map floors/units using explicit proxies and document coordinate conversion. It must support our twelve-floor/six-example contract or require a recorded revision to all affected data; never pretend a ten-floor model has twelve.
3. If no suitable asset exists, create the original procedural tower below. The same scene provides exterior, district tower, posters, fallback and collection crops. No generic remote building image substituted for the hero.
4. If a coherent authorized Skyline panorama set exists, use panorama route. Verify true projection and shared room layout.
5. Otherwise create the guided original mesh show residence below. This is a legitimate interior alternative, not a claim that a panorama has been supplied.
6. Record `buildingRoute: procedural|glb`, `tourRoute: mesh|panorama`, inputs, rights and quality gaps in DECISIONS/RENDER-SPEC. Only selected routes are required to ship.

This route choice needs no routine owner approval if it remains within the original local/no-purchase scope. A failure to achieve final visual quality is a genuine remaining task; document it and improve the scene rather than redefining “premium.”

## 3. Canonical world geometry

Units are metres. Three.js axes: X east, Y up, Z south; north is negative Z. Tower centred at X/Z zero. Building envelope width 28 m (X -14…14), base depth 20 m (Z -10…10). Lobby ground is Y=0, lobby ceiling/residential start Y=4.6. Residential storey height 3.4.

Floor `n` slab/base: `4.6 + (n - 1) * 3.4`. Floor centre for highlighting/camera: base +1.7. Roof base: `4.6 + 12*3.4 = 45.4`. Lobby is level G, never residential floor 1. A parapet/roof planting may rise above 45.4; it does not create a thirteenth residential floor.

Each storey has a central/core separator around X -1…1. Two half-building residence zones lie west/east. Selection proxies must match this geometry; west is negative X, east positive X. Unit scene names exactly `unit_A0401` etc. Do not use transient object array indices as IDs.

Only floors 4/8/12 receive clickable example floor proxies. Remaining floors have facade detail but no fake inventory. Main floor proxy covers the full floor footprint and is active only before floor selection. When a floor is selected, deactivate its broad proxy and activate two unit proxies, preventing overlapping hit targets from swallowing unit clicks. Raycastable proxies must actually be raycastable: do not set a parent `visible=false` and assume hits still work. Use dedicated interaction layers or transparent non-colour-writing geometry configured/tested for the selected renderer.

## 4. Procedural tower specification

Build modularly from shared geometries and material instances:

- Rectangular structural volume with a clear central rhythm, shallow window recesses and stone piers.
- 0.20–0.28 m visual slab edge, slightly projecting balcony edges and a ground-level canopy.
- Bronze window mullions; avoid a single flat uninterrupted blue face.
- Glazing with conservative reflectivity, visible warm interiors on some bays, no expensive full physical transmission on every pane.
- Railings around 1.05 m high, believable thickness; simplified glass/bronze treatment.
- Planter boxes, repeated shrub groups, terrace seating, a framed roof pergola, roof garden and lobby entrance doors.
- Ground plane, paths, low planting, a few benches and warm entrance lighting.

Use instancing/batching for repeated mullions, planters and plants. Seed any procedural randomness so builds/screenshots remain consistent. Add facade variation deliberately rather than random window brightness every render. Keep terraces tied to the type geometry below. Avoid heavy transparent leaf layers filling the screen.

### Residence zone and terrace consistency

The suite's local plan coordinates are X=0…width, Z=0…16. Internal areas are conceptual rectangles: Garden width 10 m ×16 m =160 m², Skyline/Penthouse width 12 m ×16 m =192 m². These are schematic internal envelopes, not net areas after walls; the disclosure remains mandatory.

Place the west residence with its east edge at global X=-1, so `globalX = localX - 1 - width`. East residence mirrors it using `globalX = 1 + width - localX`. Both use `globalZ = localZ - 8`, so the internal south edge is Z=8. East/west layouts mirror X, while north stays negative Z. Use core-side access in both orientations.

Terrace extends from local Z=16 southward over the 12 m facade span used by each half-envelope: Garden depth 2 m =24 m², Skyline depth 1 m =12 m², Penthouse depth 3 m =36 m². Garden has a 10 m internal width plus an adjacent 2 m planted setback within the half-envelope; its 12 m terrace span intentionally includes that planted edge. At floor 12 the terrace may extend to global Z=11, a 1 m cantilever beyond the base envelope; match visible support/edge treatment. Other contextual floors can follow Skyline balcony depth. Keep rooftop garden separate from private terrace metrics.

Do not enlarge internal Penthouse area just because it is a penthouse. The canonical concept has the same illustrative internal area as Skyline, a larger terrace and a top-floor position.

## 5. Plans and shared interior geometry

Maintain `planDefinitions.ts` as structured polygons/rectangles for room boundaries, names, doors and camera nodes. Render SVG plans and mesh walls from the same definitions for the Skyline suite. Export/record plan sources as original code assets; fixed plans need not be external purchased SVGs.

Skyline local 12×16 starting room partition:

| Room | X range | Z range |
|---|---|---|
| Living/dining | 0–7 | 10–16 |
| Kitchen | 7–12 | 10–16 |
| Primary bedroom | 0–7 | 0–6 |
| Bedroom 2 | 7–12 | 0–6 |
| Bedroom 3 / study-bedroom | 0–5 | 6–10 |
| Bathroom 1 | 7–9 | 6–7.5 |
| Bathroom 2 | 7–9 | 7.5–9 |
| Central corridor | 5–7 | 6–10 |
| Entry zone | 9–12 | 6–9 |
| Cross corridor | 7–12 | 9–10 |
| Balcony | 0–12 | 16–17 |

This partition covers the 12×16 envelope without overlapping room areas. Put primary-bedroom door on Z=6 at X≈5.2–6.2 into central corridor; bedroom-2 door on Z=6 at X≈10–11 into entry; bedroom-3 door on X=5 at Z≈8–8.9 into central corridor. Both bathrooms open east into entry; cross corridor joins central corridor and entry. Living opens from central corridor at Z=10 around X≈5.2–6.2; kitchen opens from cross corridor around X≈10–11 at Z=10; living/kitchen boundary can be open-plan. External entry is on X=12 around Z≈8–8.9. Door widths here are concept starting values; check swing/furniture clearance visually. Share all final openings between SVG and mesh. No bedroom is accessed through a bathroom. This remains a schematic concept, not a code-compliant construction plan.

Garden plan is an original two-bedroom 10×16 derivative: larger living area, two bedrooms north, kitchen/circulation/bathrooms central, south terrace. Penthouse uses the Skyline three-bedroom envelope with a larger south terrace and altered living styling. These two do not need full 3D interiors in baseline. Label every plan schematic and never present it as approved architecture.

Mirroring plans: mirror room geometry in coordinates and recompute text positions; render text normally. North arrow remains up/top for negative Z, not flipped down by mirroring. West/east aspect is a horizontal relationship. SVG viewBox must include terraces, labels and margins so they cannot be clipped.

## 6. Mesh show residence

Build one complete Skyline environment with ceiling height around 2.9 m within a 3.4 m storey. Walls have thickness, window reveals and floor contact. The three showcase views must be from this same environment. Furniture: sofa, textured rug, coffee/dining table, kitchen cabinetry, island if circulation permits, primary bed, bedside tables, curtains, planters and balcony seating. Avoid blank rooms with one primitive chair.

Materials: pale plaster, warm oak, quiet stone, cream fabric and bronze detailing. Use original procedural PBR-friendly surfaces or authorized local textures. If procedural textures are generated, keep them deterministic and record provenance as original. A low-resolution roughness/normal detail can improve material definition more than bloom.

Initial local camera nodes (adjust for furniture and compose deliberately):

| Node | Position | Target | Vertical FOV |
|---|---|---|---|
| interior_living | [3.5,1.6,12.8] | [5.8,1.3,15.7] | 50° |
| interior_bedroom | [3.6,1.6,4.7] | [2.5,1.2,1.5] | 50° |
| interior_balcony | [6,1.6,16.5] | [6,1.5,28] | 55° |

Apply room-specific yaw/pitch constraints around each node. No camera through a wall, below floor, outside balcony railing or above ceiling. Node switches fade out, change position and fade in when a straight interpolation would cross walls. Reduced motion changes immediately or with a minimal fade. Do not implement free walking/collision physics unless required later.

Background view is an illustrative version of the district from the same north/south orientation and skyline style. Do not show ocean outside one room and an inland city outside another. All tours are representative; do not offset the entire interior to the exact selected floor and then claim a verified real view.

## 7. Panorama route, only if genuine assets exist

Accept equirectangular 2:1 sources or a valid cubemap/multiresolution export. Inspect seams, vertical alignment, tripod artifacts, exposure and room continuity. Initial room still and panorama must show the same place. Store hotspot yaw/pitch per room only after visual placement; do not guess coordinates from the seed, which specifies destinations only.

Use one selected viewer, local assets and room data from seed. Clamp pitch if the source has missing poles. Create a useful initial view per room and reset to it. If a room asset fails, retain the previous valid view and show an accessible retry/still-gallery alternative; never show a black viewer with functioning invisible hotspots.

Panorama assets are optional for mesh route and must be marked `not-required` with route reason. Do not mark them ready or fabricate paths. Both routes require local stills for the no-graphics experience.

## 8. Exterior/district cameras

Starting positions in building world coordinates, to be composition-tested:

| Preset | Position | Target |
|---|---|---|
| Exterior overview | [65,40,75] | [0,23,0] |
| Arrival | [35,8,46] | [0,5,0] |
| Gardens | [-45,22,45] | [0,17,5] |
| Skyline | [55,62,55] | [0,34,0] |
| District overview | [210,170,220] | [0,10,0] |

Use perspective FOV roughly 40–50° exterior. Fit bounds to available scene viewport, excluding panels; do not assume the full browser width is unobstructed. Clamp orbit distance roughly 35–140 m outside, polar angle to prevent underground/straight-down views, and target around building. Floor focus derives from floor centre and maintains adequate framing; tune on short desktop and phone layouts. Respect the user's gesture cancellation of camera animation.

Landmark positions are in seed world coordinates. District ground spans about 360×300 m with authored blocks/paths. Render the main tower through shared building geometry at lower detail; no duplicate inconsistent tower model. Simplified SVG uses a documented projection of these positions or a labelled schematic layout, not made-up coordinates called a real map.

## 9. Stills and poster generation

Required output: desktop hero (~1920×1200), mobile hero (~900×1200), exterior fallback, district fallback, three collection thumbnails, three tour stills, four amenity images and one facade/material detail. Optimize final formats with appropriate alternative if the selected environment cannot encode AVIF/WebP.

For original procedural route, create an internal capture mode available only in development/capture configuration. It renders the actual scene with specified camera, hides UI and emits an explicit ready marker after assets, lighting and several stable frames. `capture-stills.mjs` uses a local server and Playwright or equivalent supported local browser tooling to capture each composition. Capture tools should not wait by arbitrary long sleeps. The app's normal homepage must use generated files, not trigger this expensive capture at runtime.

Capture stills before UI motion testing, then inspect them. Use the same material/color management in runtime and captures. If high-end offline rendering software exists, it can produce better posters from the same master; document the scene/source and keep architecture consistent. The initial asset proof may use a temporary original SVG poster, but it must be replaced with the final matching composition for client-ready status.

No required path may remain a broken placeholder. A model loaded at runtime does not replace the static fallback requirement. If screenshot tooling is unavailable, document that exact gap, continue other work and use an honest available capture/export route; do not invent screenshot evidence.

## 10. Lighting, quality and performance

Use one main directional light, soft ambient/environment contribution and controlled shadows. Tone mapping/exposure must be tested with paper-white UI nearby. Avoid blown-out stone and mirror-black glass. Shadow maps around 1024–2048 where justified; no dozens of shadow-casting point lights. Trim mobile shadows/effects before sacrificing useful interaction.

Quality tiers: standard with conservative shadows and DPR cap 1.5–2; low with lower DPR around 1 and fewer decorative details/shadows; simplified with static illustrations/stills and full HTML controls. Automatically choose conservative initial settings, then respond to repeated measured frame pressure rather than rapidly toggling quality every frame. The user can always choose simplified.

Targets: poster roughly ≤400 KB where quality permits, initial non-3D transfer ≤1.5 MB compressed, deferred GLB roughly 3–8 MB if used, no required giant video. Aim smooth 60 fps on a presentation laptop and usable ≥30 fps on an available representative phone. Record test conditions; these are targets, not guaranteed facts. Procedural geometry also has costs: draw calls, shadows, texture memory and JS generation must be profiled.

## 11. Asset provenance

Use the asset template as the initial checklist. Each final record has ID, kind, selected route, local path or code source, original creator/provider, license, evidence/receipt path where relevant, modifications, readiness and fallback ID. Include font and texture licensing, not only the hero.

CC0 material sources researched: [Poly Haven license](https://polyhaven.com/license), [ambientCG](https://ambientcg.com/). Check the actual selected asset and local file; asset acquisition is not complete merely because a library is named in this plan. Never bundle an HDRI or model whose rights are unknown.
