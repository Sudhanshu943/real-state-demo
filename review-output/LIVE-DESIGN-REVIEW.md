# AUREL — live visual review

Date: 5 November 2026. Reviewed the running website at http://localhost:5173/#/ using the browser, including desktop and a narrow responsive viewport. This is a design review, not a full functional or performance certification. No application code was changed during this review.

## Client-facing verdict

The homepage now has a coherent brand, attractive typography, improved photographic sections and a working interactive interior tour. It is a credible concept demo. However, the 3D scenes still read as stylized architectural visualization rather than realistic luxury property imagery. The contrast between the polished reference photographs and the simplified interactive rooms is the biggest remaining weakness.

## Findings in priority order

| Priority | Area | Observed problem | Recommended change and acceptance condition |
| --- | --- | --- | --- |
| High | Bedroom | Pillows, mattress, runner and bedside tables look like hard rectangular blocks. The dark headboard is a large plain panel. | Replace the hero bed with an optimized detailed asset or substantially improve soft geometry, fabric texture, seams and bedding folds. The bed must read as upholstered furniture at the default camera distance. |
| High | Mobile hero | Building sits directly behind the heading and body text; window grids compete with the copy. Building is cropped on the right. | Use a mobile-specific camera/composition and stronger localized text scrim, or separate the model and copy vertically. Keep the heading, description and both CTAs readable without the facade crossing their primary reading area. |
| High | Plants and balcony composition | Visible leaves are oversized, smooth and sparse. A foreground pot/plant dominates the center of the standalone balcony view. | Verify which plant asset actually renders, including whether a fallback is showing. Improve botanical geometry/materials and move the camera or pot so the outlook is the focal point. Installing a GLB alone is not proof that it is being shown. |
| High | Exterior glass | Tint successfully conceals the interior, but most windows look nearly black and fairly flat. | Tune reflections against a suitable environment, add subtle roughness/normal variation and restrained frame depth. Preserve the opaque-glass optimization; do not rebuild every apartment just to improve the exterior. |
| Medium | Living room | Rounded cushions are an improvement, but upholstery, coffee table and decor still look uniformly smooth. The striped rug and broad surfaces feel simplified. | Add convincing fabric/wood response, soft contact shadows and a small number of high-quality details. Avoid adding many low-detail props. |
| Medium | Skyline and outdoor lighting | Repeated teal block buildings and a simple sun disc make the view feel like an illustration. | Use a more convincing distant skyline/environment with atmospheric depth and a consistent lighting direction. Keep it lightweight; the skyline does not require detailed interiors. |
| Medium | Interior copy overlay | The translucent panel sits over bright furniture/floor and loses separation during the scroll sequence. | Give the panel a steadier dark backing or move it into a calmer part of the frame. Check body copy and CTA readability throughout the transition, not only at one final frame. |
| Medium | Scene badge/header | In one desktop sunset-scroll frame the scene badge was partially covered by the fixed header. | Review sticky-scene and badge offsets across the whole sequence. Confirm the badge stays below the header at multiple scroll positions and heights. |
| Medium | Photographic art direction | Photographs improve realism substantially, but the architectural reference, roof garden and interiors have visibly different styles from one another and the tower. | Curate a tighter material, lighting and architecture direction while keeping reference disclosures. A single development should feel consistent even when images are illustrative. |
| Low | Supporting text | Small, muted labels and descriptions are visually delicate, particularly on dark amenities backgrounds. | Review actual font sizes and contrast at normal browser scale. Retain the existing font family and heading hierarchy. This was a visual observation, not a measured WCAG audit. |

## What is working well

- Dark green hero navigation and gold primary action now match the overall palette; the earlier grey header problem is substantially improved.
- Desktop hero copy and tower have distinct areas and both main actions are visible.
- Vision, residence collections, amenities and neighbourhood sections feel more editorial and less like generic bordered cards.
- Real photographs load in the reviewed sections. The amenities accordion switched from the roof-garden reference to the residents' lounge reference successfully.
- Header section navigation reached the selected sections after its scroll animation settled.
- Living, bedroom and balcony tour buttons navigated to their respective routes and each room rendered visibly. No blank room was observed in this manual walkthrough.
- The tested narrow viewport had no horizontal document overflow: inner width 355 CSS px, document width 341 CSS px. This does not establish physical-device performance or every mobile breakpoint.

## Recommended implementation order

1. Fix mobile hero text/model separation and the interior overlay/header badge collisions.
2. Confirm the active plant asset and remove the balcony foreground obstruction.
3. Upgrade the bedroom bed and textiles, then the living-room upholstery and contact shadows.
4. Tune exterior glazing, environment lighting and the distant skyline together.
5. Tighten photograph art direction and review supporting text contrast.
6. Capture matching desktop/mobile before-and-after frames and run browser regressions plus a measured performance pass before client presentation.

Do not add more sections or more effects until these visible quality gaps are resolved. The next pass should improve the existing experience rather than enlarge its scope.

## Evidence and limits

Screenshots saved in this folder:

- review-latest-hero.png
- review-latest-interior.png
- review-latest-collections.png
- review-latest-bedroom.png
- review-latest-balcony.png
- review-latest-mobile.png

The review used sampled scroll positions and screenshots, so frame pacing and transition smoothness were not benchmarked. Device-size overrides were reset afterward. No enquiry was submitted. District explorer, comparison, saved-home persistence and all apartment variants were not exhaustively tested here. Build/unit/asset results are documented in CONSOLIDATED-STATUS-REPORT.md; they were not rerun merely for this read-only visual review.
