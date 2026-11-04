# AUREL — Homepage visual quality and motion plan

Prepared 5 November 2026 after reviewing the running localhost:5173 homepage and current source. This is a homepage-focused revision brief for Anti-Gravity. Preserve the existing application, inventory, routes and working interactions; do not start another project or expand secondary pages.

## 1. Outcome and current findings

The intended experience is a premium architectural presentation: a convincing live building, a composed journey into a furnished home, and an equally crafted editorial homepage below it. The quantity of effects is secondary to geometry, material definition, lighting, camera composition and coherent visual assets.

Confirmed improvements to retain: live homepage 3D, four chapter labels, overlay-to-paper header states, active section indication, collection-specific links, added amenities, and contextual enquiry. Current blockers remain:

- Exterior is recognizable but repetitive and box-like: hard slab edges, near-solid dark railings, flat window faces, identical floor rhythm and block-shaped planting.
- Living scene shows a crude sofa/table composition and layered sky bands; the image does not match its luxury copy.
- Material swatches are more complete, but facade and collection imagery still use flat geometric artwork, visually disconnected from the 3D world.
- Collection layout improved, but supporting cards leave awkward empty zones. Penthouse shows **280 m²** on homepage while canonical project data says **192 m²** internal and **36 m²** terrace.
- Amenities are now balanced in two columns, but visual depth/detail remains weak. Location repeats an illustrated map plus five cards, with an orphaned destination and uneven vertical balance.
- A new consultation banner is followed by the older large footer conversion banner: two similar endings compete.

These observations establish the backlog. They do not mean the earlier changes should be discarded.

## 2. Source-level repairs before aesthetic expansion

### 2.1 One camera owner

`HomeScrollScene.tsx` mounts `HomeScrollCamera`, whose `useFrame` writes position/look/FOV. It also mounts `InteriorScene`, which has its own camera effect, per-frame position/look writer and pointer listeners. This is still two camera owners during homepage interior chapters, even though exterior OrbitControls were separated earlier.

Separate reusable interior geometry/materials from camera/input behaviour. Suggested boundary: pure `InteriorModel` plus `TourCameraController`; homepage uses `InteriorModel` with its own `HomeScrollCamera`, while standalone tour uses the same model with only `TourCameraController`. An explicit camera-control prop is an acceptable smaller refactor if it truly disables every competing effect/frame/input handler. Preserve hooks rules and dispose listeners on mode changes. No route should have two systems continuously correcting the same camera.

### 2.2 Deterministic exterior/interior handoff

Current camera code changes from world-scale facade targets to local interior targets at progress 0.52, while smoothing existing world coordinates toward the new local location. The scene swap can expose geometry from the wrong camera position. Current wrapper opacity only dims partly and is not a complete transition strategy.

Use a defined handoff state: fade the rendered scene out over a brief bounded progress interval, set the correct local camera/target/FOV while obscured, switch model, then fade in. Reverse scrolling must perform the inverse reliably. Keep the background behind the handoff intentionally composed; no momentary view through a ceiling, floor or distant exterior. Content chapter state must derive from the same timeline. Do not describe this as an uninterrupted physical scan.

### 2.3 Ground, glazing and geometry checks

In `BuildingProcedural.tsx`, courtyard/pool `planeGeometry` meshes are placed at ground-like Y positions without an X rotation. PlaneGeometry starts in XY; verify their normals and rotate horizontal surfaces appropriately. Check plinth/paving depth ordering and avoid coplanar flicker.

Current materials in that file are flat colours with scalar roughness/metalness; there are no material texture maps in the inspected definition. Stone comments do not make textured stone. Glazing uses very high metalness and high opacity; test a dielectric glazing approach with a controlled environment/reflection source or a cheaper authored reflection treatment. Do not make every surface metallic or use expensive transmission on hundreds of panes without profiling.

### 2.4 Runtime overhead

Homepage currently calls React `setScrollProgress` in an endless animation loop, and camera code allocates vectors/updates projection each frame. Use stable refs for high-frequency motion, change React chapter/content state only when necessary, reuse temporary vectors, and update projection only on meaningful FOV/aspect changes. Pause scene frames and DOM motion when settled/offscreen/hidden. Avoid double/triple damping that makes the camera lag behind its text label.

## 3. Building and interior craft specification

### Exterior: believable detail at three scales

**Whole building:** preserve the 12-floor concept and dimensions. Establish base, middle and crown; a readable arrival portico, coherent structural piers, facade rhythm, roof garden and sky/ground context. Fit the first camera to actual bounds and text-safe composition; show enough crown and base to understand the building. Deliberate close-up crops belong in later chapters.

**Facade:** replace uniformly razor-sharp box edges with selective bevels/chamfers where highlights matter. Add stone panel joints at consistent scale, slab-edge/soffit separation, recessed window frames and glazing, slim handrails with glass infill, balcony returns and plausible door openings. Ground glazing and upper apartment glazing should read differently. Avoid duplicated overlapping slabs and exaggerated dark solid strips on every floor.

**Lifestyle detail:** planter containers need actual foliage silhouettes—stems/leaves/canopy groupings using optimized original or licensed meshes, not green cuboids. Add sparse terrace furniture, curtains/interior depth in selected bays, entrance doors, paving joints, benches and restrained architectural lighting. Use seeded variations and purposeful occupancy; no random blinking windows. Match terrace forms to the home type when implying a specific residence.

Detail should be concentrated where cameras see it. Instance repeating frames, railings and plants; use simplified far geometry. Do not give every distant balcony a full furnished apartment.

### Interior: expertly composed room, not primitives

Create one finished Skyline suite visual standard. Sofa needs rounded cushions, seat/back separation, seams or fabric shading and believable legs/base. Add a proportionate table with bevels, a rug with thickness/material detail, curtains with folds, one coherent artwork/accessory grouping, intentional joinery and properly scaled lights. Wood needs plausible board/grain direction; stone needs controlled subtle variation; fabric must be visually distinct from painted plaster.

Recompose living camera so it shows a readable arrangement: foreground floor/rug, sofa/table in middle, glazing/terrace/background. Do not place the camera inside furniture or aim low enough that a table becomes the whole image. Balconies need slender rails, seating and planting at the edges, a clear line to a believable distant view and open negative space for copy.

Replace obvious stacked sky-colour planes with a continuous gradient/atmospheric sky and depth-separated skyline. Keep foreground glass readable without turning the entire view black. Preserve representative-tour disclosure; do not imply surveyed real views.

### Materials and light

Prepare real local texture sets or deliberate original procedural maps with appropriate repeat scale. Use base colour plus roughness/normal detail where useful. Record origin/license; actual free CC0 assets may be used after verification. Canvas-generated colour patterns are acceptable only if they produce a convincing reviewed result. No arbitrary texture URLs or unsupported claims of photorealism.

Lighting should expose form: warm side key, controlled cool fill and soft contact shadows. Protect limestone detail from clipping while avoiding black crushed balconies. Use a local environment/reflection setup for metal/glass. Add AO or other postprocessing only if measured benefit justifies cost; geometry/material/lighting are first. No bloom blanket, heavy chromatic aberration or lens distortion hiding poor assets.

**Asset decision gate:** if procedural production cannot achieve a convincing shot, evaluate an authorized optimized model or available modeling/rendering workflow. Record exact provenance/tool availability. Do not silently substitute unrelated architecture, purchase assets or install desktop software. Ask only for a truly necessary external input, while continuing independent work.

## 4. Smooth motion contract

Use one timeline source for camera, chapter label, content visibility and transition mask. Define settled keyframes, travel intervals and readable holds. Camera position/target should have smooth tangents; avoid sudden FOV jumps and excessive acceleration. Do not overshoot into walls. Tune at normal, slow, rapid and reverse scrolling, not only a scripted path.

The user retains native scroll. No global wheel interception, forced auto-scroll or drag-to-proceed. Support skip, anchor navigation, resize, browser Back and a freshly loaded mid-page position. Header state must be based on stage/section intersection and maintain text contrast at every point.

Text: use short masked heading reveals and controlled 16–32px translation/opacity for supporting panels. Important copy remains readable. Outgoing content relinquishes pointer/focus interaction when hidden; multiple invisible chapter CTAs must not remain tab-focusable. Motion does not change layout height while pinned. The fourth chapter holds long enough to see the terrace; hide chapter/scroll controls before release into Vision.

Reduced motion: strong still/settled composition with equivalent information/actions, no long empty track, no automatic camera flight. Mobile: shorter timeline, different camera framing/text positions, modest rendering quality and touch-safe controls. Do not require rotation to use the page.

## 5. Editorial sections: exact changes

### Architecture / Vision

Replace the text-heavy left column versus boxed palette pattern with one dominant architectural image and a concise story. Use a detail crop actually derived from the building. Keep the 12-level / 3-collection / entrance facts consistent and secondary. Build a precise transition from cinematic stage to paper background through spacing and image framing, rather than another tall disconnected banner.

### Craft / Materials

Show a large joinery/facade close-up with four tactile material samples. Samples should expose stone pores/joints, satin bronze, wood board/grain and glazing edge/reflections at plausible scale. A sample selection may update the matching detail image and caption, but only if all four states are finished. Otherwise use a clean static composition. Avoid three nested layers of bordered cards. Short captions, consistent image ratios and one restrained reveal sequence are sufficient.

### Residence collections

Keep one featured Skyline composition and two supporting collections, but remove dead internal white zones and make image/text proportions deliberate. Use new matching rendered stills from the finished environment, not flat decorative diagrams called renders. The Garden image must communicate planted outdoor space; Skyline must show furnished living/terrace; Penthouse must communicate top-floor terrace/crown. All should share colour grade, light and architecture.

Read bedrooms, internal area, terrace area and type IDs from canonical project selectors. Fix Penthouse to 192 m² internal +36 m² terrace; remove unsupported double-height/pergola claims unless geometry and canonical concept are explicitly revised together. Do not hard-code promotional metrics in JSX.

Each type has one clear destination, readable metadata and a subtle image/CTA hover/focus affordance. Mobile order: featured image, matching details/action, then other homes. Do not interleave a home's image with another home's metrics.

### Resident amenities

Preserve balanced four-entry composition, but move beyond identical boxes: one strong roof-garden feature and three well-composed supporting entries, or a deliberate 2×2 editorial arrangement. Use substantial new images with scene depth. Each amenity gets a brief benefit, not a catalogue of unmodeled luxury features. All text should match what is actually pictured.

Roof garden: pergola/seating/realistic planting and skyline. Lounge: furniture, shelving and warm focal light. Wellness: open floor area, mats/equipment and garden daylight. Arrival: entrance depth, canopy, planting and correctly horizontal pools. These are concept facilities; no fabricated operational concierge/valet promises or hours. Make the section useful and attractive without multiple new canvases running simultaneously.

### Surroundings / District

One large authored perspective/masterplan image with five corresponding landmarks. Use a compact numbered destination list or interactive list-to-highlight association instead of five independent blank cards with an orphaned fifth item. Label illustrative geography once clearly. No invented distances or service claims. All map/list names correspond; retain working Explore District CTA. This milestone only improves the homepage preview and shared visual asset needed for it, not a standalone map application.

### Consultation / Footer

Combine the new consultation block and old giant footer CTA into one intentional ending. Keep one primary viewing-preview action and one secondary exploration link. Pair restrained typography with a final compelling architectural crop. Remove invented gallery operating hours, claims of real appointments and duplicate paragraphs. Keep honest demo confirmation and legal/context information in the compact footer.

## 6. Homepage-wide consistency

Use one grid, maximum width, gutter, image-ratio system and section spacing rhythm. Different sections may have different compositions, but should belong to one brand. Avoid repeated giant headlines plus copy plus grid on every section. Prevent awkward empty card areas and excessive vertical padding used as a substitute for design.

Maintain accessible contrast, keyboard focus, semantic headings, correctly labelled buttons, image alt text reflecting actual content, intrinsic image dimensions and sticky-header anchor offsets. Replace generic text such as “authored concept setting” repeated in every small card with one concise relevant disclosure. Never hide essential labels just for a cleaner screenshot.

## 7. Ordered implementation and review gates

**P0 — Foundation repair.** Fix camera ownership, coordinate handoff, ground-plane normals, Penthouse metrics and duplicated CTA. Output: small source changes and reproducible working routes. Gate: exactly one camera owner per mode, accurate project facts and reversible scroll handoff.

**P1 — Approve one high-quality visual standard.** Finish one exterior establishing shot, one facade close-up and one furnished living composition. Generate real stills and inspect actual runtime. Gate: clean silhouette, modeled depth, visible material differences, readable planting/furniture and a composed light balance. If still block-like, refine assets before multiplying them across the site.

**P2 — Motion refinement.** Implement four chapters using finished assets, bounded handoffs, continuous camera curves, readable holds and synchronized editorial content. Gate: no controller fight, geometry traversal, blank chapter, late label, focusable hidden CTA or stranded controls at pin release.

**P3 — Editorial homepage completion.** Apply Section 5 to Vision, Materials, Collections, Amenities, District and final enquiry. Use matching generated imagery. Gate: no flat placeholder rendering presented as final, no orphan destination, no repeated ending, no metric contradiction.

**P4 — Responsive and performance pass.** Test desktop 1440×900, short laptop 1280×720, phone 390×844 and narrow 360px. Adjust layout/camera per available region. Verify reduced motion, denied/failed graphics, lazy loads and offscreen pause. Profile production preview: draw calls, active renderer count, frame times, image/model transfer and layout shifts. Measure targets on available hardware; do not promise universal 60fps. Static shell must remain usable while graphics load/fail.

**P5 — Evidence and handoff.** Capture initial frame, four settled chapters, handoff before/after, Vision, materials states, all three collections, all four amenities, five-landmark preview and one final enquiry/footer composition. Include full-page desktop/phone captures and a natural forward/reverse scroll recording if supported. Inspect captures; fix flaws before claiming completion. Report actual commands/results and untested devices.

## 8. Files and responsibility boundaries

Expected changes: `src/scene/BuildingProcedural.tsx`, `InteriorScene.tsx` split/model controller, `HomeScrollScene.tsx`, homepage/header/footer components, texture/material helpers, `src/pages/HomePage.tsx`, asset capture scripts, local generated images and focused browser tests. Preserve canonical `src/data/project.json` facts. Factor homepage sections into coherent components instead of growing one huge inline-style file. Update asset register, decisions, tracker and evidence. No unrelated compare/backend/admin redesign.

## 9. Acceptance statement

The next milestone is a materially better homepage, not merely another completed-feature list. Review source facts and rendered evidence separately. Build/test success proves only its tested conditions; image filenames, detailed comments and passing canvas assertions do not prove architectural quality. If a quality constraint remains, show the actual result, identify the exact asset/tool gap and propose the next concrete remedy.
