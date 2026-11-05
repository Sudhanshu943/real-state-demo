# More accurate and customizable 3D for AUREL

Research checked against official documentation on 5 November 2026.

## Recommendation

Keep React Three Fiber, Drei, and Three.js. The project already uses them. The largest next improvement is an asset-authoring pipeline: Blender-authored architectural components and furniture, scanned PBR materials, meaningful object names, compressed GLB delivery, and React-driven customization. Installing another rendering engine alone will not produce more realistic architecture.

Use two sources of truth: architectural dimensions/data for layout and authored meshes/materials for appearance. A model can look convincing while being dimensionally wrong; actual accuracy requires drawings, dimensions, or BIM from the project team.

## Shortlist and fit

| Tool or library | Category | How we would use it | Recommendation |
|---|---|---|---|
| Blender | Authoring application, not a JS library | Build facade modules, accurate window returns, bevels, doors, roof structure, upholstery and UVs; export GLB | Best next addition to the workflow |
| React Three Fiber + Drei | Browser rendering and React integration | Load models, manage picking, cameras, repeated components and interactions | Keep the existing stack |
| gltfjsx | Asset-to-React tooling | Turn named GLTF nodes/materials into reusable React components | Use for component-level model customization |
| Poly Haven | Asset library | CC0 models, photographed materials, and HDR lighting | First asset source to inspect |
| ambientCG | Asset/material library | CC0 stone, wood, paving, plaster and fabric material sets | First material source to inspect |
| glTF Transform | Optimization toolkit | Inspect, validate, deduplicate, resize textures and compress meshes | Use before shipping model assets |
| @react-three/csg | Boolean geometry library | Parameterized door/window openings and section cuts | Add only for a concrete editing requirement |
| That Open Components / Fragments / web-ifc | BIM tooling | Import IFC, inspect building elements and properties, select architectural elements | Use when the client supplies actual IFC/BIM |
| Spline | Visual interactive 3D authoring platform | Prototype composed scenes, materials, events and camera interactions | Optional alternative authoring workflow |
| Blendkit, formerly BlenderKit | Asset library integrated with Blender | Detailed furniture, lights, fixtures and scene dressing | Useful optional source; review each asset's license and exportability |

### 1. Blender: accurate model authoring

Blender provides modeling, materials, animation and rendering tools, and supports GLB/glTF export. For AUREL, author one finished facade bay with real wall thickness, window frame sections, sill, soffit and railing fixings. Repeat the approved module across floors rather than adding arbitrary decorative geometry. Author furniture at real scale and bake unsupported procedural material details into texture maps for export.

Preserve an editable source file. Exported GLB is a delivery asset, not a replacement for the source model. Use named collections and objects so floors, window frames, glass, planters and furniture remain identifiable after export. Validate the exported result in the actual browser, since a Blender render and a real-time GLB renderer do not produce identical lighting or materials.

Sources: [Blender features](https://www.blender.org/features/), [Blender file-format pipeline](https://www.blender.org/features/pipeline/).

### 2. R3F, Drei and gltfjsx: customization in the existing application

R3F documents GLTF loading and reusable GLTF-to-JSX components. Named geometry and materials can be exposed as application controls: stone palette, bronze finish, glazing tint, furniture package, selected floor or terrace planting. Reuse geometry and instance repeated parts. Keep the unit IDs and floor-selection proxies tied to the existing project data.

Do not merge all materials or flatten all nodes during optimization when those nodes must remain selectable. Clone only the materials that need per-instance customization; otherwise changing a shared material can unintentionally update multiple homes.

Sources: [Loading models](https://r3f.docs.pmnd.rs/tutorials/loading-models), [Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

### 3. Poly Haven and ambientCG: surface realism and lighting

These are asset sources, not engines that generate a building. Poly Haven supplies CC0 assets including HDRIs, materials and models; ambientCG also publishes its assets under CC0. We should start with a small, coherent material set: pale limestone or travertine, satin metal, oak, plaster, woven fabric and exterior paving. Use base color, roughness and normal maps as appropriate; avoid relying on a color texture alone to communicate surface depth.

For browser use, select resolution by visible detail. One approved HDR environment can improve glass and metal reflections more than many additional tiny meshes. Download selected assets into the project and record source/author/license metadata. Poly Haven's live API has its own attribution terms, distinct from the CC0 asset license; a runtime API integration is not necessary here.

Sources: [Poly Haven asset license](https://polyhaven.com/license), [Poly Haven API terms](https://github.com/Poly-Haven/Public-API), [ambientCG license](https://docs.ambientcg.com/license/).

### 4. glTF Transform: keeping detailed assets practical

The official toolkit supports inspection, validation, mesh compression, texture resizing and texture compression including WebP and KTX2 workflows. Use inspection before optimizing; a large file can be texture-heavy, geometry-heavy, or split into too many draw calls. Those problems need different fixes.

Suggested process: inspect the unoptimized GLB, remove unused objects, deduplicate resources, reduce unnecessary material slots, resize textures, select compatible compression, and validate the output. Compare screenshots before and after. Configure Draco/Meshopt/KTX2 decoding in the loader when the selected output format requires it. Preserve floor/unit names and application metadata during transformations.

Sources: [glTF Transform](https://gltf-transform.dev/), [CLI documentation](https://gltf-transform.dev/cli).

### 5. CSG: live geometric customization

`@react-three/csg` provides addition, subtraction and intersection operations around Three.js geometry. It could support changing a window opening or creating a cutaway apartment view. Its own documentation advises avoiding frequent complex recomputation. Compute on parameter changes or pre-author variants instead of rerunning complex booleans every animation frame. It improves geometric control, not automatic architectural correctness.

Source: [Official react-three-csg repository](https://github.com/pmndrs/react-three-csg).

### 6. That Open: when accuracy means BIM

That Open's Components and Fragments tooling is intended for BIM data and provides IFC import tooling. This is relevant if the client can supply IFC from an architectural workflow. It enables a model connected to building elements and their properties, rather than a manually approximated exterior. It is more than this marketing demo currently needs, so add it as a separate architectural-data path when source BIM exists. Do not treat a hand-built GLB as verified construction data.

Sources: [Getting started](https://docs.thatopen.com/components/getting-started), [Fragments and IFC importer](https://docs.thatopen.com/Tutorials/Fragments/).

### 7. Optional visual editors and furniture libraries

Spline supports browser-based scene modeling, materials, lighting, animation and interactivity. It can be useful for art-directed prototypes. My recommendation is to retain R3F for this project's existing floor selection and state management rather than introduce a second runtime solely for the homepage.

Blendkit, formerly BlenderKit, offers assets integrated into Blender. Its license page distinguishes royalty-free and CC0 assets. For a directly downloadable web model, confirm the selected asset's allowed distribution and whether its material can be exported/baked into a browser-compatible form. Do not assume that a native Blender material will survive GLB export unchanged.

Sources: [Spline documentation](https://docs.spline.design/), [Blendkit licenses](https://www.blendkit.com/docs/licenses/), [Blendkit FAQ](https://www.blendkit.com/faq-frequently-asked-questions/).

## Concrete adoption sequence for this demo

1. Model one highly finished facade bay in Blender, using the current building dimensions as the concept baseline.
2. Create one polished representative living room: rounded upholstery, correct joinery, curtain folds, fixtures and coherent UVs.
3. Choose a small CC0 material and HDR set; record exact asset pages and licenses in an asset manifest.
4. Export separate exterior, interior and landscape GLBs with stable object names. Keep interactive unit proxies separate from visual meshes.
5. Inspect and optimize each model while preserving nodes needed by the UI.
6. Integrate with the existing R3F scene, camera story and selection reducer; maintain a lightweight fallback.
7. Expose a small customization panel: stone finish, metal finish, furniture palette and planting option. Geometry edits require explicit dimension parameters or authored variants.
8. Test loading, memory and interaction on real target devices. Set budgets after measuring the baseline, not from file size alone.
9. If real building plans or IFC arrive, reconcile the concept dimensions with those inputs before claiming dimensional accuracy.

No new packages, accounts, paid assets, or external services were installed as part of this research. This document recommends a pipeline; it does not claim that the shortlisted tools have already been integrated or that their current releases have been compatibility-tested against this project's dependency versions.
