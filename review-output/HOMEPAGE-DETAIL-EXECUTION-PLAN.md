# AUREL homepage detail execution plan

## Objective
Keep the existing serif/sans font families. Make the homepage read as a coherent architectural presentation, rather than a collection of primitive model previews. Preserve routes, saved homes, comparison, enquiry, and project data.

## 1. Repair visible rendering defects
- Replace the coplanar, overlapping sunset strips with one continuous sky surface. Put buildings in front of it, not behind it. Include layered skyline silhouettes, modest window lights, and an eye-level horizon.
- Recompose the balcony camera to include terrace furniture and planting, instead of pointing at an empty sky and rail.
- Improve text card contrast and shorten paragraphs. Keep interior furniture visible behind the story.

## 2. Give the exterior real architectural depth
- Break the blank side elevations into recessed glazed bays and stone piers.
- Add returns, sills, bronze mullions, and corner articulation. Avoid drawing windows on solid walls.
- Show floor depth, interior ceilings, partial curtains, and furniture silhouettes behind transparent glazing.
- Detail the entrance with doors, transoms, handles, slender canopy supports, and illuminated soffit panels.
- Add terrace furniture, richer planting, and a structurally supported roof pergola.
- Batch repeated small geometry; share geometry/materials and dispose owned resources.

## 3. Make the interior furnished, not blocked out
- Rounded upholstery with separate cushions and seams, side tables, books, ceramics, wall art, curtain folds, baseboards, ceiling coves, and joinery rhythm.
- Add lighting contrast without turning the entire scene orange.
- Maintain real room scale and collision-free camera positions.

## 4. Replace placeholder homepage imagery
- Use locally rendered views of the actual procedural scenes for residence, facade, roof, arrival, and district images.
- Capture dedicated compositions; do not present unrelated stock photos as the building.
- Keep images static below the hero to avoid multiple continuously running WebGL canvases.
- Label representative concept imagery honestly; floor plans remain schematic.

## 5. Recompose every lower section
- Vision: editorial two-column layout, one architectural close-up, compact material samples, clear facts.
- Collections: one expansive feature and two deliberately sized supporting cards; no large empty card bottoms.
- Amenities: a larger lead image and compact secondary stories with consistent captions.
- District: a detailed site overview, legible numbered destinations and useful links; remove repeated launch buttons.
- Closing enquiry: restrained invitation with one clear primary action.
- Use numbered chapter labels, consistent spacing, subtle rules, and concise descriptions throughout.

## 6. Motion and responsive behavior
- Keep native scrolling and the existing camera story. Add restrained entrance transitions only where they help hierarchy.
- Respect reduced motion. No scroll blocking, flashing, or decorative animation over copy.
- Check desktop and 390px phone layout; prevent fixed-width grids from overflowing.
- Sticky header must not obscure anchor headings or story cards.

## 7. Acceptance checks
- Production build and existing unit tests pass.
- Visually inspect exterior, loggia, living, balcony, vision, collections, amenities, district, and closing section.
- Verify primary navigation, mobile drawer, explore links, and enquiry opening.
- Save updated screenshots for review. Record remaining limitations honestly: procedural real-time architecture is not a photogrammetry scan or a path-traced production render.

## Execution record

Implemented on 5 November 2026:
- Replaced the side walls with recessed glazed bays, stone piers and sills; added room ceilings, curtains, furniture silhouettes, entrance frames/handles, canopy supports and soffit lighting.
- Added roof guardrails, taller supported pergola, seating and individually instanced tree leaves. Exterior stone now includes bump detail; procedural color textures use sRGB.
- Replaced the overlapping sky strips with one continuous sky dome and instanced city layers. Reframed the balcony camera.
- Replaced block sofa geometry with rounded cushions, armrests, chaise, tables, books, ceramics, curtains, trims, wall art and joinery. Added detailed terrace chairs, tables, paving joints and plants.
- Rebuilt vision, collections, amenities, district and closing sections in HomeSections.tsx with responsive layouts and preserved font families.
- Added eight local scene-rendered images. AssetStudio is a development-only capture route; the production homepage uses static section images and one live hero scene.
- Amenities now switch images and descriptions; header residence navigation scrolls to the homepage section. Mobile menu fixed positioning and accessible expansion state were corrected. Invisible story cards are inert.

Verification:
- Final `npm run build` passed, including TypeScript. Vite retains a large-bundle warning (approximately 1.46 MB minified JS / 406 KB gzip); code splitting remains a performance follow-up.
- All 17 existing unit tests passed. No claim is made that the full end-to-end suite was run.
- Browser checks covered exterior and dedicated facade/interior/terrace/roof/arrival/district/wellness compositions, desktop section layout, narrower phone layout, mobile menu opening/closing, section navigation, amenity switching, and enquiry dialog opening/closing.
- Checked the loaded homepage image elements: no failed images. Phone document width stayed within its viewport.
- Saved review screenshots: homepage-detailed-final.png and homepage-amenities-detailed.png.

Limitations: this is still a procedural concept model, not a dimensionally verified BIM model or photoreal architectural production asset. The studio views are representative studies; Garden and Penthouse cards do not claim to depict their exact floor layouts. Real-time device performance has not been benchmarked on physical phones. The next asset-authoring recommendation is documented in research/3D-LIBRARIES-AND-ASSET-PIPELINE.md.
