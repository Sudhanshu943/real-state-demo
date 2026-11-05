# AntiGravity startup prompt — exterior realism only

Work in PLAN MODE first. Inspect the current repository and running website before proposing changes. Produce an executable resource-backed plan for improving the existing building exterior. Do not implement until I approve that plan. Once approved, execute the stages below in order and provide visual evidence.

## Objective and strict scope

Make AUREL's existing interactive exterior feel like believable architectural visualization. Preserve its identity, dimensions, floor/unit IDs, picking, selected-floor highlighting, scroll flow and navigation. Do not replace it with an unrelated downloaded tower or a static image. Do not claim full photorealism just because textures or a library were installed.

Interior work is explicitly deferred: do not redesign living room, bedroom, interior furniture or interior lighting. Preserve existing on-demand room loading and tinted exterior glazing. If shared scene settings affect interiors, isolate the exterior settings rather than changing interior appearance. Existing photographic homepage sections remain in place.

Read review-output/LIVE-DESIGN-REVIEW.md and review-output/CONSOLIDATED-STATUS-REPORT.md. Treat their observations as starting points and verify current behavior yourself.

## Existing implementation to inspect

- src/scene/BuildingProcedural.tsx
- src/scene/FacadeBayModule.tsx
- src/scene/FacadeDetails.tsx
- src/scene/ArrivalGarden.tsx and TreeCanopy.tsx
- src/scene/HomeScrollScene.tsx and SceneHost.tsx
- src/scene/textureGenerators.ts
- src/data/assets.json and the existing model pipeline

React Three Fiber, Drei, Three.js, glTF Transform CLI and gltfjsx already exist. Reuse compatible installed tooling; do not add packages or change versions without a concrete need. Confirm APIs against the installed versions rather than copying examples from newer documentation.

## Real resources, not generic realism promises

Source candidates:

1. HDRI: https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky — an initial daylight sky candidate, not a guaranteed final choice. Also inspect an outdoor environment with surrounding landscape/buildings if pure sky does not give the facade convincing reflection detail. Download a modest resolution and compare in the actual scene.
2. Exterior PBR surfaces: https://polyhaven.com/textures and https://ambientcg.com/ — select pale honed stone/travertine or suitable limestone, paving/concrete and appropriate wood. Find the exact asset pages and inspect samples before choosing; do not invent asset IDs.
3. Botanical/exterior props: https://polyhaven.com/models — inspect suitable nature and architecture models. Do not assume a small potted plant can replace a mature tree. If a suitable free tree is unavailable, state the gap and propose a scoped alternative instead of using another cartoon blob or unlicensed asset.
4. Licenses: https://polyhaven.com/license and https://docs.ambientcg.com/license/ . Verify selected assets and maintain provenance even for CC0 sources.
5. Material reference: https://threejs.org/docs/pages/MeshStandardMaterial.html . Use installed-version-compatible PBR rendering with an environment map.
6. Optimization: https://gltf-transform.dev/cli . Use the existing inspect/validate/optimize scripts; configure the required decoder before shipping compressed assets.

Your plan must include an asset manifest with exact source URL, asset ID, license, download format, chosen resolution, download size, runtime delivery size, destination and intended use. Distinguish downloaded, integrated, visibly verified and still-proposed resources. Keep original sources outside public/ and serve optimized local assets; avoid runtime dependence on third-party image hosts.

## Implementation stages after approval

### 1. Baseline and a representative exterior bay

Capture matching desktop and mobile hero views, one facade close-up and the existing exterior scroll angles. Record the actual viewport and performance environment. Measure current draw calls, triangles, transfer size and frame time under repeatable conditions. Do not invent performance numbers.

Use a representative facade bay to establish correct stone scale, glass, frame depth and shadows before repeating the treatment across all floors. Fix mismatched UVs/repetition, penetrations, flicker and coplanar surfaces here first.

### 2. Lighting and texture pipeline

Use an HDR environment for reflections and coherent exterior illumination, with a deliberate sun direction and restrained fill. Keep exposure and tone mapping consistent between exterior views. Avoid using bloom, fog or crushed blacks to conceal missing detail.

Use real albedo/base-color, normal and roughness maps where useful. Base-color uses the appropriate color space; data maps remain non-color data. Set UV tiling in real-world scale, normal orientation and anisotropy deliberately. Reuse textures and materials; avoid heavy displacement across the entire tower. Start with 1K/2K textures and raise resolution only where close-up evidence justifies it.

### 3. Glazing and architectural geometry

Preserve opaque smoke-tinted exterior glazing to avoid unnecessary room rendering. Tune environment reflections, roughness and subtle window variation so panes do not look like identical black holes. Glass is a dielectric: do not turn metalness up just to force a shiny appearance. Balustrades remain a separate transparent material.

Improve visible window reveals, bronze frames, sills, slab edges, balcony rail fixings, entrance canopy and roof silhouette with consistent proportions. Add tiny geometry only where it survives at the intended viewing distance. Keep decorative geometry out of floor/unit hit testing. Use shared geometry/instancing where it fits the picking architecture.

### 4. Ground and landscaping

Replace the toy-like site plinth impression with believable paving, curb/planter relationships, planting soil, drainage/shadow separation and a composed entrance. Use suitable optimized vegetation with convincing leaf shape, density, scale and material response. Verify the intended model is actually rendering rather than silently showing a fallback.

### 5. Camera, responsive composition and validation

Give the mobile hero its own composition so the facade does not compete with the headline or CTAs. Keep the tower's identity visible. Check the scene badge below the header across the scroll sequence. Preserve existing typography and interactions.

Show a polished hero plus representative facade close-up for review before expanding cosmetic detail to every angle. Then validate all exterior scroll angles, building selection, floor navigation and mobile layout. Smoke-check that interior entry still works without redesigning it.

## Deliverables and completion criteria

- Resource-backed plan and exact asset manifest before implementation.
- Exterior-only changes with a clear account of files changed and any shared-setting isolation.
- Before/after captures at matching views; no changed lighting/camera tricks that prevent comparison.
- Working floor/unit picking, CTA navigation and scroll behavior.
- No missing textures, unresolved decoder errors, accidental fallback models or visible geometry flicker in reviewed paths.
- Build, appropriate unit/asset validation and browser checks. Keep 4174 strict for an isolated preview if needed; do not stop unrelated services.
- Repeatable before/after rendering measurements and asset bytes, with device/viewport information and limitations. Report regressions honestly.
- A final report separating complete, visually verified and pending items. Do not commit or push unless I explicitly ask.

The reusable outcome for a later interior pass is the asset sourcing/licensing/optimization workflow and calibrated PBR conventions. Interior lighting, textures and geometry will require their own choices and review; they will not become realistic automatically from the exterior work.
