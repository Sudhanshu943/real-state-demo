# 04 — Data and state contracts

## 1. Canonical dataset

Copy [fixtures/project.seed.json](fixtures/project.seed.json) into application data and validate it at startup/build time. IDs and values in that file are the single source of truth. Do not create extra apparent inventory, infer sold floors, or change prices independently inside components.

Six units: A0401/A0402 Garden on floor 4, A0801/A0802 Skyline on floor 8, A1201/A1202 Penthouse on floor 12. The rendered building has twelve residential levels but only these six example units are offered for exploration. Collection labels describe concept positioning. Floors not in the seed are architecture only.

All numeric areas are illustrative internal area, not legal carpet or saleable area. Terrace is separate and not added to internal area in the UI. Use `Intl.NumberFormat` for INR and area display. Prices are integers in INR, not crores stored as floating point. Display a concise crore-format helper if desired, with full accessible amount available. Never auto-convert m² to sq ft without a correctly labelled, consistently rounded alternative.

## 2. Required TypeScript concepts

Implement equivalent types; do not silence unsafe casts with `any`:

```ts
type UnitStatus = 'available' | 'reserved' | 'sold';
type CollectionId = 'garden' | 'skyline' | 'penthouse';
type RoomId = 'living' | 'bedroom' | 'balcony';
type Aspect = 'west' | 'east';
type RenderPreference = 'auto' | 'simplified';
type PlanOrientation = 'west' | 'east';

interface Unit {
  id: string;
  buildingId: 'aurel-a';
  floor: number;
  collectionId: CollectionId;
  position: Aspect;
  bedrooms: number;
  internalAreaM2: number;
  terraceAreaM2: number;
  areaDefinition: 'illustrative-internal';
  status: UnitStatus;
  samplePriceINR: number;
  planId: string;
  planOrientation: PlanOrientation;
  sceneNodeId: string;
  tourId: 'skyline-show-residence';
  tourRelationship: 'representative';
  isDemo: true;
}

type Selection =
  | { kind: 'district'; landmarkId?: string }
  | { kind: 'building' }
  | { kind: 'floor'; floor: number }
  | { kind: 'unit'; unitId: string; tab: 'overview' | 'plan' }
  | { kind: 'tour'; unitId: string; roomId: RoomId }
  | { kind: 'compare' };
```

JSON parsing must verify structure before treating it as those types. A small explicit validator is sufficient; a schema library is optional if it materially reduces ambiguity. TypeScript types alone do not validate runtime JSON/storage/route data.

## 3. Domain invariants

INV-01: All IDs unique within their collection. All references resolve: building, collection, plan, tour, room/hotspot, asset ID and scene node.

INV-02: Unit floor is one of 4/8/12, within building residential range. Each example floor has exactly two units, west/east. Each unit maps to one stable selection proxy. Scene and unit data share the same floor-height formula.

INV-03: Internal area, terrace area, bedrooms and price are positive finite values; status is a supported enum; `isDemo` true. Numbers have explicit units and definitions.

INV-04: Plan ID matches collection. East/west orientation is rendered explicitly; mirror geometry, not text glyphs or north-arrow meaning. Room descriptions remain appropriate to the plan.

INV-05: Saved IDs are unique known units, max six. Compare IDs are unique known units, max two, and a subset of saved IDs. Adding to compare saves the home. Unsave removes it from compare.

INV-06: Route-derived unit/floor/tour is valid. A tour context always has a known unit, a known tour and a valid room. Unknown room normalizes to living with `replace`; unknown unit returns to building with a small informative notice. Unsupported floor normalizes to building without pretending inventory exists.

INV-07: Modal enquiry context is a deduplicated zero-to-two-unit list captured when opened. Later compare changes do not silently change an open form. If needed the user can close/reopen or explicitly edit context.

INV-08: Enquiry contact data never enters persistent preference state, URL or logs. Demo submit has no network side effect. Closing success clears contact data.

INV-09: All tour entry points disclose representative Skyline content. Only Skyline plan room mapping may jump to matching show-residence nodes. Other collections enter living through a clearly labelled representative action.

INV-10: Filters affect the visible list by intersection. Global filters do not invalidate a directly opened unit detail. Result count describes example homes, never all homes in the building.

## 4. Reducer-owned state

```ts
interface Filters {
  collection: CollectionId | 'all';
  aspect: Aspect | 'all';
  status: UnitStatus | 'all';
}
interface Preferences {
  savedIds: string[];
  compareIds: string[];
  renderPreference: RenderPreference;
}
interface UiState {
  preferences: Preferences;
  activeOverlay:
    | null
    | { kind: 'saved' }
    | { kind: 'plan'; unitId: string }
    | { kind: 'replace-compare'; candidateId: string }
    | { kind: 'enquiry'; unitIds: string[] }
    | { kind: 'about-demo' }
    | { kind: 'mobile-menu' };
  notice: string | null;
}
```

Filters may be parsed from route query rather than reducer, as described in architecture. Do not persist current modal, enquiry fields, hover state, camera transition progress or temporary loading errors. Saved/compare IDs and chosen simplified preference are the entire persistent preference payload, with a schema version.

## 5. Actions and edge cases

| Action | Required result |
|---|---|
| SAVE(unitId) | Add known ID once; no duplicate |
| UNSAVE(unitId) | Remove from saved and compare; preserve active route |
| ADD_COMPARE(unitId) | Save unit; if capacity available add once; if full open replacement choice |
| REPLACE_COMPARE(oldId,newId) | Replace only requested compare slot; retain old home in saved |
| REMOVE_COMPARE(unitId) | Remove compare membership only; retain saved |
| OPEN_ENQUIRY(ids) | Validate/copy ≤2 known IDs; close other overlay |
| OPEN_PLAN(unitId) | Validate ID; close other overlay |
| OPEN_SAVED | One overlay only |
| CLOSE_OVERLAY | Close with sensible focus return; no route reset |
| SET_RENDER_PREFERENCE | Switch rendering deliberately; persist preference safely |
| RESET_DEMO | Clear saved/compare/render preference, close overlays, clear in-memory enquiry; navigate Home via explicit effect |
| HYDRATE_PREFERENCES | Validate/prune known IDs, enforce subset/capacity, recover safely |

Reducers are pure; localStorage, navigation and analytics-like effects do not occur inside them. A small controller layer performs effects. Camera selection derives from normalized route and explicit camera intent; hovering never changes the URL.

If a third compare candidate is already saved, opening replacement does not unsave anything. Cancel leaves previous comparison unchanged and candidate remains saved due to Add Compare semantics. Explain this consistently through the save state; do not surprise the user with silent deletion.

## 6. Filters and sorting

Default all filters. Floor route adds an implicit floor condition; collection/aspect/status are the visible filters. Sort by floor ascending, then west before east. Do not implement price sliders for six examples.

When no matches: “No example homes match these filters.” Provide Clear Filters and, if inside a floor, “See all example floors.” Clear Filters keeps the current floor. See All removes the floor constraint and opens building/list. Reserved/sold are inspectable; “Available only” removes them as expected.

## 7. Persistence format and failure

Persist `{version:1,savedIds:[],compareIds:[],renderPreference:'auto'}` under `aurel.demo.v1`. Unknown version resets only this payload. Invalid JSON, non-array IDs, unknown IDs, duplicates, too many compare IDs and disallowed enum values are sanitized or reset deterministically and never crash startup.

If a compare ID is valid but absent from saved in stored content, prune it rather than silently saving unexpected homes. Add Compare in current UI uses the explicit save rule. Storage failures keep session state; no blocking alert. Test both denied storage and malformed payload.

## 8. Enquiry validation contract

Fields and rules follow design specification. Validation returns field-keyed errors, not an exception. Treat phone normalization as syntax acceptance only. Preferred date is a plain local `YYYY-MM-DD` date; compare calendar dates without UTC conversion causing a day shift. Optional empty date is valid. Do not seed a date from this document's preparation date.

On valid preview, create an in-memory summary with timestamp for display, selected context and entered preferences. Success copy states nothing was sent/booked. Do not create a random “confirmed reservation” ID. Double-clicking submit produces one visible summary. Rendering safe text avoids interpreting a message as HTML.

## 9. Asset reference checks

The seed uses logical asset IDs, not pretend-existing file paths. The asset register begins with `planned` entries. At build completion every required runtime asset has a local path or a declared original procedural source. Referenced posters/stills must exist on disk; a procedural source alone cannot satisfy a required static fallback image.

Asset validation fails release readiness on missing required files, unresolved IDs, `planned`/`placeholder` records, unsupported licenses or unresolved provenance. Temporary placeholders are acceptable during Phase 1 only and must remain marked.
