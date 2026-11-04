# 02 — Design and experience specification

## 1. Art direction

Create a contemporary architectural editorial with warmth and precision. The building has pale stone, bronze-toned frames, planted balconies, a shaded entrance and a framed roof garden. Avoid generic glass towers without detail, loud neon, excessive gradients, decorative dashboard cards and random stock houses.

Use one architecture consistently across poster, explorer, amenity imagery and thumbnail. Reuse the same interior layout across tour positions and stills. The district is deliberately stylized and labelled illustrative. Visual richness comes from composition, believable materials, soft directional light and small architectural detail, not a large particle count.

## 2. Tokens and layout system

Define CSS variables in `src/styles/tokens.css`:

| Token | Starting value | Use |
|---|---|---|
| paper | `#F4F0E8` | Content ground |
| ink | `#18221F` | Primary readable text |
| green | `#28463C` | Primary action/selected UI |
| bronze | `#A8875F` | Decorative accent; not small text on ivory |
| muted | `#58625B` | Secondary text, contrast verified |
| line | `#D6D3CA` | Nonessential rules |
| white | `#FFFFFF` | Panels and text on dark |
| error | `#A72B2B` | Validation with text/icon |
| focus | `#165BC5` | Highly visible focus ring |

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Outer desktop gutter `clamp(24px, 4vw, 72px)`. Content max width roughly 1440 px. Section padding 80–128 px desktop and 48–64 px mobile. Radius 0–4 px for architectural controls; 12–20 px for mobile sheets only. Avoid rounding every image into a card.

Typography: choose a self-hosted OFL-compatible editorial serif such as Cormorant Garamond and readable sans such as Manrope, if authorized font files are available. Record font license and include it. Otherwise use explicit system serif/sans fallbacks and record this as a visual task; do not depend on remote Google Fonts at runtime. Use only necessary weights. No invisible text while fonts load.

Hero size `clamp(52px, 6.7vw, 112px)` with roughly 0.95–1.05 line height. Section headings 36–64 px; mobile 30–42 px. Body 16–18 px, 1.5–1.7 line height. UI 14–16 px, minimum 12 px only for nonessential metadata. Check uppercase tracking does not make long labels unreadable.

## 3. Homepage composition

### Header

Desktop: AUREL wordmark left, section links centre/right, Request a Viewing outlined/filled action at far right, Saved count action. Height roughly 80 px. On hero use high-contrast light text with controlled dark gradient/scrim. After scrolling switch to paper/ink rather than leaving text unreadable.

Mobile: wordmark, Saved count, Menu. Menu is a proper accessible dialog or disclosure with close, Escape and focus return. Navigation closes after destination selection. Keep CTA reachable; no giant opening form overlay.

### Hero

Height approximately `min(900px, 100svh)` with a sensible minimum of 640 px desktop and 620 px mobile; ensure content can grow rather than clipping on short screens. Full-bleed architectural poster with meaningful crop. Place heading bottom-left, short subtitle below, prominent Explore Building, secondary View Residences. Use a small right/bottom project descriptor if space permits.

Exact starting copy:

- Eyebrow: “AUREL / CONCEPT RESIDENCES”
- Heading: “A different perspective on home.”
- Supporting line: “Garden terraces. Thoughtful spaces. A quieter rhythm above the city.”
- Primary: “Explore Building”
- Secondary: “View Residences”
- Short disclosure: “An illustrative property experience.”

Do not put every phrase on the same horizontal line. Protect negative space for type in the poster. On mobile use a separately framed crop from the same scene. Opening motion is optional; the still must look excellent on its own.

### Vision section

Two-column editorial layout: short design statement left, tall facade detail right. Include three fact labels: “12 residential levels,” “Three residence collections,” “A landscaped arrival.” Do not claim a total home count; only six example homes are modeled in the inventory.

### Location section

A wide district preview and a short list of nearby illustrative places. CTA “Explore the neighbourhood” opens district mode. Caption “Illustrative setting, not a geographic map.” No fabricated minute-distance chips.

### Residences section

Three collection rows or a restrained three-column grouping; each has matching image/plan crop, type name, area/bedroom label and “Explore collection.” This action opens explorer with type filter and list visible. Include “See all six example homes.” Avoid a dense marketplace grid as the first residence impression.

### Amenities/materials

Four amenities from the seed, with original compatible stills or carefully drawn scenes: roof garden, resident lounge, wellness studio, shaded arrival. One large composition plus short text is preferable to four identical icon cards. Materials row shows stone, bronze and oak from actual scene assets.

### Closing enquiry and footer

Simple closing proposition “Find your perspective.” Actions Request a Viewing and Explore Residences. Footer contains concept disclosure, internal navigation and reset demo preferences. Do not include invented office addresses, phone numbers, social links or dead Privacy links. A local “About this demo” dialog can explain data handling honestly.

## 4. Explorer shell

Use a routed full-viewport application region with a stable header and clear exit to homepage. It is not a modal trapped inside another modal. Height uses dynamic viewport units with safe fallback. Keep the global saved action and Home/Exit visible.

Desktop ≥1024 px: scene on left/flexible area, information panel roughly 360–420 px on right, controls over scene on unobstructed edges. Breadcrumb/mode label top-left. The panel scrolls internally when needed; do not hide its footer actions below the screen.

Tablet 768–1023 px: slightly narrower panel or lower sheet; scene retains enough width for a useful building.

Phone <768 px: scene above, information bottom sheet with explicit collapsed/expanded button. Use a real button, not a drag-only gesture. Expanded sheet can scroll; selected context remains visible. Whole viewport must not get an accidental horizontal scrollbar. Controls remain reachable with browser chrome open.

## 5. District mode

Show the same tower in a simplified district. Five landmarks come from seed data. Click/tap a marker or list item to select it; open title/description in the panel and make a short camera move. Selection treatment applies both to marker and list.

Enter Development transitions to exterior mode. Back to Home remains available. The district can be skipped by View Residences or a deep link. Reset clears landmark selection and returns district overview. The simplified mode uses an original SVG illustration with equivalent buttons/list and identical data.

## 6. Exterior and floor mode

Default exterior shows all building floors but only floors 4, 8 and 12 are interactive example floors. Copy: “Explore example homes on levels 4, 8 and 12.” Other floors must not appear sold, unavailable or fake-loaded. They are contextual architecture. Floor picker labels these three floors with home type.

Camera presets: Arrival, Gardens, Skyline. Reset returns exterior overview while retaining saved/compare data. During programmed camera movement, temporarily suspend competing orbit writes; re-enable after completion/cancellation. Drag cancels the current animation and hands control to user. Touch scroll over page UI does not orbit the building.

Hover previews on desktop; click commits a floor. A drag gesture must not accidentally commit a floor on pointer-up. Use a small pointer movement threshold (~6 CSS px) to distinguish click and orbit, tuned on device. Floor selection updates the panel and outline; do not make all slabs glow permanently.

Within a selected floor, choose west/east home through large HTML cards and scene proxies. Reserved/sold homes remain inspectable, with status-specific enquiry copy. Floor change clears incompatible active unit. Global filters and floor selection combine by intersection, with a clear empty-state reset.

## 7. Detail panel and plan

Top: Home ID, collection, status text/chip. Then illustrative price, internal area definition, bedrooms, floor, aspect and terrace area separately. Include “Sample pricing and availability” near those values.

Tabs: Overview and Plan; use semantic tabs if implementing tab keyboard behaviour, otherwise ordinary labelled sections. The plan must zoom to a dialog or expanded region with accessible close and labelled schematic scale. Show “Schematic concept plan — not for measurement.” A north arrow derives from the plan orientation, not decoration.

Actions: Save Home; Add to Compare; Explore Show Residence; Request Details/Viewing depending on status. Tour disclosure is visible next to the action. Tour entry stores unit context but its room camera remains attached to the representative Skyline suite.

Sold: “Request similar homes”; reserved: “Ask about availability”; available: “Request a viewing.” Confirmation always remains demo-only. A sold home must not show “Reserve now.”

## 8. Tour mode

Required room/viewpoints: Living, Bedroom, Balcony. Panorama route supports yaw/pitch and room hotspot navigation. Mesh route uses constrained look controls at fixed camera nodes, with short transitions between nodes; no WASD/free walking baseline.

Always visible: Exit Tour, room name, room selector, Reset View and “Representative Skyline show residence.” An optional minimap highlights current node. Only render a hotspot if its target exists. Buttons/list remain available so WebGL hotspots are not the only navigation.

Reset View affects the active room orientation only. Exit returns to the unit detail and selected floor. Browser Back from tour returns to its parent unit according to the route rules. The balcony view is illustrative and consistent with the district palette, never “exact view from A0401.”

## 9. Saved and comparison

Saved drawer/list shows all saved units with data-driven status. Empty copy “Save homes to revisit them here.” Each entry has View, Compare, Remove. Removing a saved home also removes it from compare if present; tour/unit selection is unaffected.

Add to Compare also saves the home. Compare capacity is two; a third addition opens an explicit replace choice listing the current two. No silent replacement. Replacing affects compare only; all saved homes remain. At one home, show its information and prompt “Choose one more home”; do not fabricate a second column. At zero, show empty state.

At two homes, rows are collection, illustrative internal area, terrace area, floor, bedrooms, aspect, sample status, illustrative price and plan link. A “Request details for these homes” action carries both IDs into the enquiry overlay.

## 10. Viewing request

Accessible dialog, separate from full-page explorer. Do not stack on top of another open modal. Show context chips for zero, one or two homes. Zero-home request is valid and labelled general enquiry.

Fields: name, contact preference (email/phone), relevant contact field, preferred day (optional future date), preferred time window (morning/afternoon/evening/no preference), optional short message ≤500 characters. Copy: “Demo only — no request will be sent.” Primary action “Preview viewing request.”

Validation: trim name, minimum 2 and maximum 80 characters; email uses pragmatic syntax validation with browser semantics; phone allows international formatting and 7–15 digits after removing common separators, without claiming number verification. Date, if present, is today or later in the user's local calendar. No hard-coded research-date min value. Report errors next to fields, focus first invalid field and preserve typed values when validation fails.

Confirmation: “Request preview ready. This is a demo; nothing has been sent or booked.” Show selected homes and preferences. Keep contact details only in current memory; clear after closing confirmation, explicit reset or app reload. Closing an unsubmitted form can preserve it in memory until reset, but never put PII in URL/local storage, console or analytics.

## 11. Motion and loading

UI transitions 160–240 ms; scene handoffs 500–900 ms; room changes 350–650 ms. Treat these as tuning bands. No forced 10-second entrance sequence, scroll hijack or cursor replacement.

`prefers-reduced-motion` disables camera flights, auto-rotation, parallax and long animated reveals. Switch scenes with a short fade or immediate replacement; controls and content remain identical. Scene loading has useful text, immediate poster and a simplified-view option; do not show a fake percentage. If progress is unavailable, say “Preparing the building.” After ~8 seconds offer retry/simplified view; late success must not unexpectedly replace a fallback the user chose.

## 12. Visual review checklist

At hero, exterior, selected home, tour living, balcony, compare and enquiry, inspect: readable hierarchy, intentional image crop, enough space for controls, consistent architecture, no texture errors, no clipped mobile text, visible focus and no overlapping navigation.

If the procedural route looks like stacked boxes, continue detailing and lighting. Add believable facade rhythm, window recesses, railing thickness, slab edge treatment, planters, entrance depth, ground plane and soft contact shadows. Do not declare client-ready based on feature count alone.
