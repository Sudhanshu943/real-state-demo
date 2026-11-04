# 05 — AUREL demo blueprint

Everything below is proposed original design. AUREL is a fictional working name. Project location, plans, areas, prices, availability, views and amenities are demonstration content until replaced by approved client information.

## 1. Creative premise

**AUREL — Residences Above the Ordinary.**

The property is presented as a place someone can choose, understand and imagine living in. A warm stone tower with planted terraces becomes the visual anchor. The user moves from its setting to a selected residence and then to an interior view.

Opening line candidate: **A different perspective on home.**

Supporting line candidate: “Thoughtfully framed spaces. A city within reach.” Keep the exact location out of hero copy until it is established. The project should have an original wordmark and one recurring visual gesture derived from its architecture, such as a terrace frame.

## 2. Visual system

| Element | Proposed direction |
|---|---|
| Background | Warm ivory `#F4F0E8` for content; deep charcoal `#18221F` for selected immersive scenes |
| Accent | Muted bronze `#A8875F`, tested for contrast before use in text/buttons |
| Secondary | Deep green `#28463C` for selection and navigation |
| Type | Editorial display face plus highly readable sans-serif; final fonts require license review |
| Composition | Large architectural frames, generous margins, carefully cropped detail photography |
| UI | Crisp controls, subtle borders, calm panels and readable plans |
| Motion | Camera transitions explaining context; restrained text reveals |
| Icons | One coherent vector set, with labels for important actions |
| Sound | Opt-in ambient atmosphere; silent experience fully functional |

Colour values are starting points, not an accessibility sign-off. Avoid thin low-contrast bronze labels over reflective glass. Keep navigation and CTAs visible against changing imagery.

## 3. Content structure

Primary navigation: The Vision · Residences · Location · Amenities · Request a Viewing.

Main experience:

1. Architectural opening.
2. Short project introduction.
3. Neighbourhood context.
4. Building and home explorer.
5. Interior tour.
6. Lifestyle and materials.
7. Saved-home comparison.
8. Viewing request.

Direct access: the user can open the residence list or enquiry without completing the introduction. “Explore Building” is the prominent hero action. Keep ordinary scroll working outside the interactive viewer.

## 4. Storyboard and interaction choreography

Durations below describe a rehearsed demonstration path, not forced waiting periods.

### Scene 01 — Arrival, first 10–15 seconds

Show an immediately visible architectural poster, project name, short proposition and Explore Building. Optional film introduces the roofline and terraces. Navigation appears promptly and remains usable.

The client should understand “luxury residential development” without interpreting a long abstract animation. A small “Concept demonstration” disclosure can sit in project information; fictional price/status labels remain explicit where shown.

### Scene 02 — Context, next 15–25 seconds

Open a curated district scene with four or five meaningful locations: park, transit, work district, culture/dining and waterfront if the fictional context supports it. Selecting a landmark opens a small card and changes camera framing.

For the first demo, labels can describe illustrative proximity rather than assert real travel times. A real location variant must verify coordinates, source travel times and provider coverage. Include a list view and a clear “Enter the development” action.

### Scene 03 — Architecture, next 15–20 seconds

Transition to the building scene. The building fills enough of the viewport to invite exploration without hiding its roof or base. Desktop supports constrained orbit and zoom; mobile gets drag plus explicit reset and preset viewpoints.

Use one subtle instruction: “Select a floor to explore.” A floor dropdown/list remains available. Add three camera presets: Arrival, Gardens, Skyline. Night mode is optional after selection is complete, and should be described as an appearance mode rather than a solar study.

### Scene 04 — Choose a floor, next 10–15 seconds

Highlight the selected floor. Show floor number, number of example homes and a list of units. Let filters narrow by home type, aspect and sample availability. Include an empty-results state with Reset filters.

For a render-based selector, use a clear side elevation/perspective and SVG overlays. For a mesh-based selector, use proxy volumes with stable unit identifiers. Both routes need a keyboard-accessible list.

### Scene 05 — Meet the home, next 20–30 seconds

Open a side sheet on desktop and a bottom sheet on mobile. Display unit ID, home type, floor, area label, aspect and demonstration status. Present the plan with readable room names, a north indicator and explicit units.

Actions: View Inside · Save Home · Compare · Request a Viewing. Preserve selection when moving between plan, tour and building. If a unit does not have a unique interior, say it uses the representative tour for its home type.

### Scene 06 — Step inside, next 20–30 seconds

Enter a full-viewport living-room panorama. Show room name, Exit Tour, Reset View, room menu and optional plan minimap. Hotspots lead to bedroom and balcony. Provide a guided viewpoint option so the presenter can reliably reveal the strongest composition.

The balcony is the emotional payoff. Its architecture and exterior view should match the selected concept. Avoid claiming it is a surveyed floor-specific view. If the interior assets are representative rather than exact, show that in the tour context.

### Scene 07 — Compare and decide, next 15–20 seconds

Compare two saved homes by type, labelled area, floor, aspect and sample price/status where included. Make differences easy to scan. Do not use a dense table of decorative “luxury” adjectives. A comparison action should return to each home while preserving the other selection.

### Scene 08 — Private viewing, next 15–20 seconds

The form carries selected unit IDs forward. Ask for name, preferred contact method, contact detail and a preferred viewing slot. Demo confirmation should say that the request was demonstrated or saved locally. Do not claim a calendar event or sales message exists unless a real integration successfully created it.

End with the selected property image and a concise next step. A paid reservation or real purchase is outside this demo scope.

## 5. Demonstration inventory

Use around six fully populated homes across three types. Suggested illustrative types: Garden Residence, Skyline Residence and Terrace Penthouse. These labels are creative proposals and should not imply real inventory.

Required data fields:

| Field | Purpose |
|---|---|
| `id`, `buildingId`, `floor` | Reliable selection and navigation |
| `type`, `bedrooms` | Discovery and comparison |
| `areaValue`, `areaUnit`, `areaDefinition` | Avoid carpet/saleable/internal-area ambiguity |
| `aspect`, `viewLabel` | Explain orientation and representative view |
| `status`, `isDemo` | Honest availability display |
| `price`, `currency`, `priceQualifier` | Optional; explicitly illustrative |
| `planAsset`, `tourId`, `sceneNodeId` | Connect data to visual assets |
| `tourIsRepresentative` | Explain shared tour content |

The same source data should populate list, detail sheet, comparison and enquiry. A status change must not require editing four separate UI components.

## 6. Feature definition of done

### Explorer

- The selected floor and apartment are visibly highlighted.
- Detail data always matches the selected unit ID.
- Reset returns to a useful view without clearing saved homes.
- Pointer, touch and keyboard/list routes work.
- Loading or model failure leads to a usable image/list alternative.

### Plans and tours

- Plans remain readable at common phone sizes.
- Panoramas use an appropriate projection and consistent room naming.
- Every visible hotspot has a destination and a way back.
- Exit retains the selected unit; no dead ends.
- Representative views are labelled accurately.

### Save and compare

- Save toggles are synchronized across all screens.
- Two homes can be compared and removed independently.
- An empty saved state has a useful return action.
- Optional local persistence is scoped to demo preferences, not claimed as an account.

### Enquiry

- Required fields have clear labels and inline errors.
- Unit context is visible before confirmation.
- The success message reflects the actual destination of the data.
- A real endpoint, if later added, handles failure and duplicate submissions.

## 7. Mobile adaptation

Mobile should be designed as a first-class route with a different composition where necessary. Use shorter headings, a bottom information sheet, a floor picker and a clear View Inside button. Do not rely on hover.

Use a poster or short lightweight intro; defer the district and model until requested. Limit pixel ratio and effects based on measured device behaviour. Allow full-screen viewing as an option, with an obvious exit and portrait-friendly controls.

Use sufficiently large touch targets, readable labels and safe-area padding. Avoid asking the user to rotate their phone before they can browse basic information. A landscape viewer may be offered for more space, but plans, details and enquiry should work in portrait.

Keyboard navigation, visible focus, dialog focus handling, semantic buttons and reduced-motion behaviour should be designed along with the visual interaction. The residence list is an equally valid entry point into the experience.

## 8. Three memorable moments worth prioritizing

**The arrival:** cinematic architectural composition resolves into a usable explorer. The same building appears throughout, reinforcing credibility.

**The choice:** a selected floor and home visibly connect to a readable plan. The interaction makes the visitor feel that the project is understandable.

**The entry:** the selected home opens into a convincing interior, then balcony. The visitor is rewarded with spatial context and atmosphere.

Optional fourth moment: a controlled day-to-evening appearance change, created from consistent assets. Do not add this until the first three work smoothly.

## 9. Client presentation script

“This is a concept for how buyers could explore your project before visiting.” Open with the building and let the client look for a few seconds.

“Let's choose a home.” Select a floor and apartment, show the plan and explain one useful difference such as aspect or terrace.

“Now we can go inside.” Open the tour and reveal the balcony. Let the client drag or choose a room themselves.

“The sales enquiry carries that exact home forward.” Save/compare two homes, then open the contextual viewing request.

After the experience, discuss what would change for their actual project: licensed architectural content, real inventory, approved pricing, CRM and the project's own brand. Explain which elements are working now and which are representative. Do not bury the strong experience under a long explanation of libraries and APIs.

## 10. What the demo should prove

The final demo should prove visual taste, architectural consistency, meaningful interaction, reliable delivery and a credible next step toward production. It does not need a nationwide property database or a custom renderer to achieve that.
