# AntiGravity prompt — AUREL architectural realism and homepage refinement

Copy everything below the separator into AntiGravity with Plan Mode enabled. Alternatively, ask AntiGravity to read this entire file in the existing repository and follow the prompt below.

---

You are continuing an existing React/Three.js real-estate demonstration called AUREL. Act as a senior real-time architectural visualization engineer and frontend design engineer. Your task in this turn is to inspect the current implementation and produce a concrete, sequential implementation plan for the next quality upgrade.

**Start in PLAN MODE. Do not implement application changes, install packages, replace assets, or regenerate images during this planning turn.** Read the code, inspect the running website, research the specific asset/tool choices you need, and write the plan. At the end, present that plan for approval. Once implementation is subsequently authorized, execute the approved phases without repeatedly asking permission for routine file edits or checks.

## 1. Objective and design judgment

The homepage is the priority because it must sell the quality of the digital experience immediately. The existing direction is accepted: AUREL branding, elegant serif/sans fonts, forest green, ivory, muted bronze, architectural storytelling, and a live 3D hero. The user specifically likes the fonts. Preserve those font families.

The next improvement must be visible in the first viewport and in close-up architectural/interior views. The goal is believable architecture, rich but restrained materials, coherent lighting, professionally composed sections, and useful customization. Adding more primitive boxes or more effects alone is insufficient.

Do not restart the project, substitute a generic property template, replace the live hero with a flat image, or install a second rendering engine. Improve the existing work. Keep motion purposeful: readability and a clear architectural composition take priority over the number of transitions.

Distinguish visual plausibility from verified dimensional accuracy. This is currently an illustrative development, not a real building supplied with verified drawings. If no architectural source dimensions or BIM are provided, retain the concept dimensions and label the model accordingly.

Communicate in English or Hinglish, never pure Hindi.

## 2. Repository and verified baseline

- Local workspace: `C:\Users\Sudhanshu\Desktop\New Demo projects\real-state-demo`.
- Remote: `https://github.com/Sudhanshu943/real-state-demo`.
- Last verified pushed baseline: commit `13feadf850dbe82a5f2a72a3e8f8191beef761e6` on `main`, titled `Refine homepage 3D presentation and add GLB asset tooling`.
- The development site has been running at `http://localhost:5173/#/`. Check the actual current server and port rather than assuming it is still running.
- Inspect `git status` and the current diff first. Preserve any work added after the baseline. Do not reset the checkout or blindly pull over local changes.
- The most recent verified production build passed. All 17 existing unit tests passed. Model-tooling smoke tests passed for textured GLB optimization, glTF validation, and typed React component generation.
- The full browser end-to-end suite was not verified in that pass. Do not report it as passing without running it.
- The last production JS bundle was approximately 1.46 MB minified / 406 KB gzip. Vite's large-chunk warning remains; runtime performance still needs measurement.

These are baseline observations, not a claim about your current checkout. Confirm them during your audit and report any differences.

## 3. Read these files before designing the next pass

Read these in this order:

1. `package.json` and the relevant lockfile versions.
2. `implementation-plan/3D-TOOLING-QUICKSTART.md`.
3. `research/3D-LIBRARIES-AND-ASSET-PIPELINE.md`.
4. `review-output/HOMEPAGE-DETAIL-EXECUTION-PLAN.md`, including its execution record and limitations.
5. `src/pages/HomePage.tsx` and `src/scene/HomeScrollScene.tsx`.
6. `src/features/home/HomeSections.tsx`, `Header.tsx`, and `Footer.tsx`.
7. `src/styles/global.css`, `home-sections.css`, `tokens.css`, and `reduced-motion.css`.
8. `src/scene/BuildingProcedural.tsx`, `FacadeDetails.tsx`, `ArrivalGarden.tsx`, `TreeCanopy.tsx`, and `StudioLighting.tsx`.
9. `src/scene/InteriorScene.tsx`, `SalonDetails.tsx`, `TerraceDetails.tsx`, and `SkylineBackdrop.tsx`.
10. `src/scene/SceneHost.tsx`, `CameraRig.tsx`, `DistrictScene.tsx`, and `DistrictDetails.tsx`.
11. `src/pages/AssetStudio.tsx`, `scripts/capture-stills.mjs`, and `scripts/validate-assets.mjs`.
12. `src/data/project.json`, `src/data/assets.json`, the domain types, navigation, and selection reducer.
13. Relevant files under `src/tests/`, `e2e/`, and `playwright.config.ts`.

Consult the older implementation-plan files and `docs/` when useful, but reconcile them against the current code. Do not treat old QA reports, screenshots, or asset claims as current proof.

## 4. What has already been implemented

### Homepage and navigation

- A fixed deep-green header over the live stage, transitioning to ivory over lower sections; bronze primary actions.
- Reframed exterior composition, with the headline separated from the tower on desktop.
- Revised hero copy, headline line breaks, a bronze italic accent, shorter story descriptions, and clearer button hierarchy.
- A native-scroll, pinned architectural story with four beats: exterior, loggia, living salon, and terrace outlook.
- The hero's exterior/interior handoff is an obscured scene switch around progress 0.51, not a geometrically continuous walk through the actual facade. Preserve its reversibility and single-camera ownership while planning any improvement.
- Inactive story cards are inert. Reduced-motion support, skip-to-details behavior, mobile navigation, and header anchor offsets exist and must be checked rather than rebuilt blindly.

### Exterior and site

- Twelve residential levels, a 28 m × 20 m concept footprint, a 4.6 m lobby, and 3.4 m floor spacing.
- Recessed side glazing with stone piers and sills, front glazing, balcony slabs, bronze fins and rail details, and stone joints.
- Interior ceiling planes, partial curtains, simplified furniture silhouettes, and warm light strips behind glazing.
- Entrance door/frame/handle details, canopy supports and soffit lights, paving joints, reflecting pools, planting strips, seating, and trees.
- A roof garden with guardrails, seating, planting and a taller supported pergola.
- Batched small architectural details and instanced individual tree leaves.
- Procedural color textures use sRGB; stone includes bump detail. Local environment light cards provide reflections without a remote HDR dependency.

### Interiors and outlook

- A furnished representative Skyline interior with rounded sofa cushions, armrests, chaise, stone table, books, ceramics, floor lamp, curtain folds, baseboards, fluted joinery, and framed artwork.
- Terrace chairs, tables, paving joints, planters and foliage.
- A continuous sky dome and layered instanced city silhouettes replaced the old overlapping sky strips. The previous severe horizontal sky-band/z-fighting defect was repaired; do not reintroduce it.
- A separate camera controller exists for standalone interactive tours. The homepage uses its own scroll camera and the shared interior model.

### Lower homepage

- The lower sections now live in `HomeSections.tsx` with their own responsive stylesheet.
- Vision: editorial text, architectural image, facts, and a compact material strip.
- Collections: one Skyline feature and two supporting Garden/Penthouse cards.
- Amenities: a large image and a working four-option description/image selector.
- District: a rendered concept overview, numbered destinations, and an explorer link.
- Closing: a focused invitation opening the existing viewing enquiry dialog.
- Eight locally rendered PNGs exist under `public/assets/renders/`: facade, living, garden, penthouse, roof, arrival, district, and wellness.
- `AssetStudio.tsx` is a development-only composition/capture surface. Lower sections use static images; they do not each run a live WebGL scene.

These are genuine implemented features, but they remain procedural concept studies. Do not describe them as photoreal assets, verified BIM, or exact layouts for every collection.

## 5. Installed tooling: use it correctly

The existing runtime stack is React 19, TypeScript, Vite 6, Three.js, React Three Fiber 9, and Drei 10. Inspect resolved versions before relying on a particular API.

The following development tools were installed and committed:

- `@gltf-transform/cli` declared as `^4.5.1`.
- `gltfjsx` declared as `^6.5.3`.
- An override for `sharp: ^0.35.5` replaces an older vulnerable image-processing dependency.

Project commands:

```powershell
npm run model:inspect -- path/to/model.glb
npm run model:validate -- path/to/model.glb
npm run model:optimize -- path/to/source.glb public/assets/models/building.glb --texture-compress webp
npm run model:jsx -- public/assets/models/building.glb --types --output src/scene/BuildingAsset.tsx
```

These tools prepare assets; they do not create a finished building automatically. No external GLB building has been integrated yet. A desktop Blender installation was not included in the npm setup. Check available authoring tools before proposing Blender automation. Do not invent a `.blend` source or a downloaded model that is not present.

Use the existing renderer plus authored GLB components as the preferred direction. Investigate Poly Haven and ambientCG for a small coherent set of materials, HDR lighting and suitable assets. Use official documentation and actual asset pages. Record format, source, license, texture needs and expected optimization work. Do not assume all free assets have the same license.

Spline, CSG libraries and That Open/BIM tools are optional, not packages to install automatically. CSG needs a real geometry-editing requirement; BIM tooling needs actual IFC/BIM data. Adding them solely to say we used more libraries is outside this objective.

The previous production-only npm audit reported no vulnerabilities. The full audit still had development-tool findings, documented in the quickstart. Recheck if dependencies change; do not use a forced audit fix that upgrades unrelated major versions without evaluating compatibility.

## 6. Audit findings and gaps the plan must address

Inspect the entire live homepage and important shared explorer/tour views. Capture evidence before proposing changes. Separate confirmed defects from improvements that are matters of design judgment.

At minimum, investigate these known limitations:

1. The tower still reads as repeated simplified geometry at close range. Materials, fine edge profiles, contact shadows and believable glazing need more work.
2. Furniture and vegetation are improved but still visibly procedural. Detail should survive close-up views without excessive geometry.
3. Garden and Penthouse imagery uses representative studies, not their exact floor layouts. Avoid promising exact collection-specific models without an explicit asset scope.
4. The material strip uses styled CSS swatches; it is not yet a set of photographs of the proposed materials.
5. The district is illustrative massing, not a real geographic map or a photogrammetry dataset.
6. `src/data/assets.json` still references legacy assets, while the homepage directly uses newer renders. Plan to reconcile actual consumers, asset metadata and fallback routes.
7. The existing still-capture script captures page screenshots into `docs/evidence`; it is not yet a deterministic export pipeline for all eight homepage render images. It can also exit without producing a capture when the server/browser is unavailable. A successful command must not be confused with successful output generation.
8. At least one current end-to-end test expects the old hero wording `A different perspective on home.` whereas the displayed headline is now `A different perspective. On home.`. Update legitimate expectations and robust selectors; do not weaken behavioral checks merely to make tests green.
9. Homepage and explorer lighting/camera configurations are separate. Shared geometry must look coherent in both and remain selectable.
10. Physical-phone performance, GPU memory, idle rendering, context recovery, and initial network cost have not been benchmarked sufficiently.

## 7. Required next-pass design work

### A. Prove one high-quality architectural bay first

Plan a tightly scoped vertical slice before a whole-building asset replacement:

- One finished facade bay and a representative balcony, shown in both a close-up and the hero distance.
- Consistent wall thickness, recessed glass, frame profiles, stone joints, slab/soffit edges, handrail returns and believable fixing details.
- Correct surface orientation, UV scale and material boundaries; no floating pieces, exposed back faces or coplanar layers.
- Restrained surface variation, normal/roughness detail, and plausible reflections; no opaque orange window rectangles or uniformly mirror-like stone.
- Confirm the model's scale, origin, axes and fit to the existing floor/unit selection system.
- Identify exactly which pieces should remain procedural, which should become reusable GLB modules, and why.

Choose between extending the current procedural model and replacing selected parts with authored assets based on available tools and evidence. Prefer a hybrid approach when it preserves selection and avoids a risky wholesale rewrite. A model acquisition/authoring plan must be concrete: required assets, local source/delivery paths, owners or tools, and fallback if a source is unavailable.

### B. Exterior, arrival and roof

- Carry the approved bay treatment consistently around visible front, side, corner and rear elevations.
- Improve glazing depth, curtains and occupied-room variation without modeling every apartment in full.
- Resolve the arrival as a real architectural space: finished door reveals, entry framing, canopy junctions, credible support dimensions, paving edges, pool coping and layered planting.
- Improve roof proportions, support connections, guardrail continuity, seating and vegetation.
- Refine trees and planting using reusable/instanced assets with detail appropriate to distance. Avoid adding hundreds of unique shadow-casting meshes.
- Keep the hero silhouette, roof and ground composition readable at desktop, laptop and phone sizes.

### C. Interior, terrace and light

- Upgrade one representative salon using well-proportioned, web-ready furniture and coherent surfaces. Prioritize upholstery form, fabric response, joinery, real furniture contacts, curtain fullness, rugs, ceramics and fixtures.
- Make window/door tracks, reveals, floor transitions and baseboards agree with the architecture.
- Balance natural and artificial light. Plan environment lighting and any baked lighting/AO as an intentional system; do not stack random lights or use expensive real-time effects by default.
- Keep the terrace useful in the camera frame: seating, planting, floor joints, rail detail and depth to the horizon.
- Preserve a continuous sky and avoid visible backdrop edges, clipping, banding and empty horizon-only shots.
- Ensure living, bedroom and balcony tour cameras remain at believable eye level and do not pass through furniture or walls.

### D. Homepage text and all lower sections

Keep the fonts and refine hierarchy, line breaks, text widths, contrast and spacing. Avoid copying long architectural descriptions into every card.

- Hero: one clear promise, short supporting copy, obvious primary action, and a deliberate balance between text and building. Keep small disclosures legible.
- Vision: use the improved facade capture and actual approved material samples; keep the fact labels compact and credible.
- Collections: balance image/copy proportions and distinguish the three offerings. Remove dead space, awkward crops, repeated generic images and inaccurate visual claims.
- Amenities: produce appropriate compositions for roof, salon, wellness and arrival. Do not silently present a private apartment interior as a verified shared lounge. Retain the working accessible image/description selector and stable layout during image loading.
- District: improve readable context, hierarchy and visual depth while clearly identifying the setting as illustrative. No invented travel times, live services, or fake map interactions.
- Closing/footer: maintain a single strong enquiry action, clean secondary path and consistent disclosure wording.
- Identify appropriate image dimensions/aspect ratios, responsive derivatives and capture camera for every section. Reserve space to prevent layout shifts.

### E. Motion and story direction

- Review enter/exit motion, camera speed, reading time and reverse scrolling across all four beats.
- Keep one active camera controller for each active scene. Do not allow homepage and standalone tour controllers to compete.
- Treat a genuinely continuous exterior-to-interior route as a separate asset/camera problem. If retaining the obscured handoff is more reliable, improve it honestly rather than describing it as seamless traversal.
- Add section reveals or image transitions only where they clarify hierarchy. Native scroll, keyboard access, skip links and reduced motion remain essential.
- Check direct reload while scrolled, rapid scroll reversal, resize during a transition, and reduced-motion changes.

### F. Meaningful customization

Plan a small, polished set of customization controls after the base visual quality is proven:

1. A restrained choice of stone finishes.
2. Bronze/metal finish options.
3. A coordinated furniture/fabric palette.
4. A terrace planting or furnishing variant, if assets support it.

Separate material-only changes from geometry changes. Specify component boundaries, material ownership, validation and reset behavior. Do not mutate cached shared GLTF materials accidentally or couple appearance changes to unit availability/pricing. Preserve user choices across supported view changes only where intentional. Include accessible labels and mobile control placement.

Do not promise arbitrary floor-plan editing, structural changes or architectural accuracy from these controls. Such features require a separate model/data design.

## 8. Data, routes and working behavior to preserve

Use `src/data/project.json` as the current data source. Do not invent or duplicate conflicting values:

| Collection | Example level | Bedrooms | Internal area | Terrace area |
|---|---:|---:|---:|---:|
| Garden Residence | 4 | 2 | 160 m² | 24 m² |
| Skyline Residence | 8 | 3 | 192 m² | 12 m² |
| Terrace Penthouse | 12 | 3 | 192 m² | 36 m² |

Six example units are `A0401`, `A0402`, `A0801`, `A0802`, `A1201`, and `A1202`. Twelve residential levels does not mean there are only twelve homes. Keep unit status and sample pricing from the data, not from assumptions in the scene.

Preserve the homepage, district, building, floors 4/8/12, unit pages, living/bedroom/balcony tour routes, schematic plans, saved drawer, comparison, filters, browser navigation, and viewing-preview flow. The enquiry is a demonstration; nothing should become a live submission accidentally.

Keep selection proxies and stable identifiers separate from high-detail visual meshes where practical. An optimizer must not merge away the only geometry needed for floor or unit picking.

## 9. Asset and performance strategy

Propose a documented pipeline: editable source → validated export → optimized delivery GLB → typed React integration → screenshots and runtime checks.

- Keep authoring source outside the public delivery directory. Publish only required model/texture files.
- Preserve semantic node names, unit mappings, pivots and material slots where needed for selection/customization.
- Compare before/after optimization visually. Check that names, scale, normals and transforms still work.
- Inspect `model:optimize --help` before selecting flags. Default flatten/join/material transforms may not suit independently selectable architecture.
- Configure loaders for whichever Draco/Meshopt/KTX2 extensions the final assets actually use. Host needed decoder resources reliably; do not assume an external CDN will always work.
- Treat base-color/emissive textures differently from normal/roughness/AO data with the correct color-space settings.
- Reuse geometry/textures, instance repeated pieces, control shadow cost and clean up resources without disposing shared assets still in use.
- Keep one live canvas on the homepage, with static/lazy images for lower sections. Avoid preloading every interior/furniture package in the first viewport.
- Plan code splitting, adaptive quality, mobile LOD, bounded DPR, asset-load fallbacks and WebGL context recovery.
- Measure cold load, transferred bytes, draw calls, triangles, frame time, GPU texture memory estimates and idle activity. Define hardware/network conditions.
- Propose performance budgets after measuring the baseline. A desktop 60 fps / mobile 30 fps goal is a target, not proof. Do not claim physical-device verification from desktop viewport emulation.

## 10. Sequential phases and quality gates

Your plan must use a dependency order similar to this, adapted to the audit findings:

**Phase 0 — Baseline audit.** Screenshots, actual defects, performance measurements, source/asset inventory, dependency/tool availability and risks.

**Phase 1 — Visual and asset specification.** Agree the facade-bay/interior quality target, exact asset list, material palette, source/licensing approach, component boundaries and model naming/mapping.

**Phase 2 — Architectural proof of quality.** Deliver the finished bay and one representative interior composition during execution. Compare near/far and before/after images before expanding the treatment across the building. Do not spend the whole budget decorating a model whose underlying geometry is still wrong.

**Phase 3 — Shared model integration.** Integrate approved modules into hero/explorer/tour, preserve selection/cameras, implement load fallback and run functional regressions.

**Phase 4 — Homepage art direction.** Refresh section renders, material samples, spacing, text hierarchy, image crops, amenities and district presentation from the approved visual assets. Reconcile the asset register and capture pipeline.

**Phase 5 — Customization and motion polish.** Add the scoped finish/variant controls, stable state behavior, camera/story refinements and accessibility support.

**Phase 6 — Optimization, regression and delivery.** Validate assets, measure performance, test mobile/reduced-motion/failure paths, capture final evidence and document remaining limitations.

For each phase specify: purpose, exact tasks, relevant files/new components, inputs, outputs, dependencies, verification steps, visible success criteria, and rollback/fallback. Name any task blocked by missing source assets; still plan the independent work that can proceed.

## 11. Acceptance criteria and test expectations

Include concrete checks for:

- Better facade depth/material response visible in the hero and in a close-up, not only in a code diff.
- No floating furniture, unsupported pergola elements, broken glazing, visible sky edges, flicker or camera collisions.
- Cohesive views across hero, explorer, tour and the still images produced from them.
- Desktop approximately 1440 × 900, a shorter laptop viewport, and phone widths around 390 and 360 pixels. No horizontal overflow, clipped actions or header-obscured headings.
- Forward/reverse scrolling across exterior/loggia/interior/terrace handoffs, including resize and refresh.
- Keyboard navigation, visible focus, mobile menu behavior, reduced motion, and no focusable invisible story content. Do not rely only on accessibility attributes without exercising the controls.
- Working selection for supported floors and all six example units; correct plans, tour entry/exit, room changes, save/compare and enquiry preview.
- Delayed/failed model, texture, decoder and image loads; simplified mode and context-loss recovery.
- Correct asset paths/provenance and a capture pipeline that fails visibly when it produces no image.
- A customization change affects only intended objects and resets reliably.

During implementation, run `npm run build`, `npm test`, `npm run validate:assets`, appropriate model inspect/validate commands, and relevant Playwright suites. The Playwright configuration uses the production preview on port 4173; inspect its webServer settings before starting another server or conflicting with a running preview.

Use tests that exercise behavior. Update copy-dependent expectations when the UI copy intentionally changes; do not remove failing journey assertions. Report exactly what was run, what passed, what failed and what could not be checked.

## 12. Required output from THIS Plan Mode turn

Return a specific plan, not code, a generic checklist, or another huge reference catalogue. Create:

- `implementation-plan/NEXT-PASS-IMPLEMENTATION-PLAN.md` as the main execution plan.
- A separate asset/scene specification file only if needed for clarity; link it from the main plan.

The main plan must contain:

1. A concise diagnosis: what works, what is confirmed broken, what looks unfinished, and what is uncertain.
2. A priority table ranked by visible client impact, effort and dependencies.
3. The selected architecture/asset approach and reasons for rejecting unnecessary alternatives.
4. A source/delivery asset inventory, intended sources, licensing checks and concrete acquisition/authoring steps.
5. Proposed component/file changes and the floor/unit/material mapping contract.
6. A section-by-section design specification, including exact visual changes and proposed concise copy.
7. Camera/motion changes, customization behavior, accessibility and fallback behavior.
8. Sequential phases with observable completion gates and small execution checkpoints.
9. Measured baseline, proposed performance budgets and the verification matrix.
10. Risks, missing inputs, tradeoffs and the specific first implementation slice.

Finish with a short summary of the expected visible improvement and the first phase to execute after approval. Ask questions only for genuinely blocking missing information, such as paid-asset budget or actual architectural source files. For reversible design choices, state a reasonable assumption and continue planning.

**Your first action now: inspect the current repository and live website. Your deliverable for this turn is the evidence-based plan, not an unverified claim that the website is already premium or finished.**
