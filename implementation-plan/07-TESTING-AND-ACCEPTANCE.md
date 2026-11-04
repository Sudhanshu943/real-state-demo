# 07 — Verification and acceptance contract

## 1. Evidence rules

Report what actually ran, in which browser/device/build and with which result. Do not claim tests passed because files were created. Screenshots prove appearance, not all behaviour. Browser automation emulating a phone proves layout/interaction under that engine, not a physical device GPU.

Use targeted tests for contracts and cross-feature behaviour. Avoid a large suite of snapshots that simply repeats markup. A minimal meaningful suite below is mandatory because state/navigation/graphics/fallback interactions are central to the demo.

## 2. Contract and reducer tests

| Test | Input/action | Expected result |
|---|---|---|
| U01 Seed | Canonical JSON | Six unique units, three floors/types, all refs valid |
| U02 Broken ref | Unknown plan/tour/scene ID | Validator identifies path and fails readiness |
| U03 Metrics | Negative/NaN-like invalid field or unsupported enum | Validation rejects, never silently displays |
| U04 Save | Save same ID twice | One saved membership |
| U05 Compare | Add A0801, A0401 | Both saved; two compare IDs |
| U06 Capacity | Add A1201 to full compare | Replacement overlay; existing pair unchanged |
| U07 Replace | Replace A0401 with A1201 | Correct pair; A0401 still saved |
| U08 Unsave | Unsave compared A0801 | Removed from saved/compare; active unit route unaffected |
| U09 Hydrate | Duplicate/unknown IDs and oversized compare | Deterministic valid payload, compare ≤2/subset |
| U10 Storage | Denied/malformed storage | In-memory state works; no startup exception |
| U11 Filters | Floor 4 + Skyline filter | Empty result; Clear Filters retains floor |
| U12 Unknown route | Invalid floor/unit/room | Correct normalizing route/notice with replace |
| U13 Enquiry | Invalid name/contact/past date | Field errors; no successful preview |
| U14 Enquiry | Valid optional-empty date and email/phone | In-memory summary, no network/persistence |
| U15 Date | Local day near UTC rollover | Today accepted using local calendar |
| U16 Context | Open for two IDs; compare changes later | Open form context stays captured |

Data mutation tests use cloned fixtures; do not modify canonical seed. Avoid random dates/IDs that make failures nondeterministic. Freeze a test clock for date validation where necessary; use real current local date in product runtime.

## 3. Browser scenarios

### E01 — Complete client demonstration

Fresh storage. Open Home → Explore Building → select Garden Park → Enter Development → Floor 8 → A0801 → Plan → Explore Show Residence → Bedroom → Balcony → Reset View → Exit → Save → add A0401 to Compare → compare two → open viewing request → valid preview.

Expected: correct labels/data throughout, representative tour visible, no missing assets/dead ends; two unit contexts in preview; confirmation says nothing sent/booked. Capture desktop evidence at key states. Verify browser console has no unexplained application exceptions.

### E02 — Direct residence shortcut

Home View Residences bypasses district into building/list. Open Garden collection and select A0401. Details show 160 m² internal and 24 m² terrace, not the Skyline dimensions. Show residence explicitly representative. Direct enquiry works without loading tour.

### E03 — Status rules

Open reserved A0402 and sold A0802. Status and sample-price disclosure visible. Reserved action asks about availability; sold asks for similar homes. Both can be inspected/saved/compared. Available-only filter excludes them. No Reserve/Payment control exists.

### E04 — Navigation and refresh

Open direct `#/explore/homes/A0801/tour/bedroom` in a fresh session, refresh, exit to A0801. Use browser Back/Forward after home/floor/unit transitions. Change rooms repeatedly; Back should follow documented replace behaviour, not unwind every room change. Unknown unit routes recover to building; unknown room normalizes to living. No redirect loops.

### E05 — Comparison edge cases

Add first home, open Compare and see one-home prompt. Add second; compare correct rows. Add third; choose cancel, then retry/replace a named slot. Remove comparison membership without unsaving. Unsave compared item and verify it leaves compare. Reload and verify sanitized persistence. Reset preferences clears only app-owned key and returns Home.

### E06 — Enquiry validation and privacy

Submit empty form, then invalid email, then switch to phone and enter formatted valid digit count. Test optional date empty/today/past and message limit. Verify inline errors/focus; original typed values survive errors. Submit twice quickly and see one confirmation. Observe network: no request submission. Inspect app-owned local storage and URL: no name, email, phone or message. Close success and reopen: no old PII.

### E07 — Simplified rendering

Choose Use Simplified View from a selected unit and confirm selection remains. District illustration/list, floor picker, home details, plan, room still gallery, compare and enquiry all work. Retry 3D only on user action. Reload restores simplified preference; Reset restores auto.

### E08 — Graphics initialization/context failure

Use a documented test/dev injection at renderer creation, or a supported browser failure mechanism. Do not fake success by skipping the scene assertion. On error: poster/list and concise notice appear, no infinite spinner, all domain actions preserved. If context-loss simulation is unavailable, record it as untested and still test initialization failure through the adapter. Test-only hooks are unavailable in ordinary production UI and do not expose arbitrary script execution.

### E09 — Asset and network failure

Block a chosen optional texture/model/panorama/still request with browser tooling. Verify applicable error recovery and stable layout. Panorama failure does not show empty hotspots; fallback gallery remains available. Block all third-party origins: core production journey should still run after same-origin files load. Test first visit from local server with no remote-font/stock-image dependency.

### E10 — Keyboard and overlay behaviour

Tab through primary navigation, floor picker, unit list, detail actions, tour room controls, saved/compare and form. Enter/Space activates proper controls. All focus visible. Escape closes top overlay, focus returns, background not tab-focusable while modal open. Never two active modal focus traps. Tour/explorer Exit reachable. Automated accessibility scan can assist but does not replace this flow.

### E11 — Reduced motion

Emulate/enable reduced motion before load and during a session. No auto-orbit, long camera flight, parallax or hidden-until-animation content. All selection/tour/compare/enquiry actions still work and room orientation resets sensibly.

### E12 — Repeated lifecycle and resize

Open/exit tour at least ten times, select different homes, resize, rotate emulated viewport, hide/show tab. No growing canvas count, duplicate listeners, stuck body scroll locks or multiple render loops. Inspect available renderer/resource metrics over cycles; record limitations if precise GPU memory cannot be measured. Persistent caches alone are not a leak; increasing unbounded owned resources is.

## 4. Viewport matrix

Minimum browser captures: 1440×900 desktop, 1280×720 short desktop, 768×1024 tablet, 390×844 phone and 360×740 small phone. Also inspect 844×390 phone landscape for viewer controls. Use responsive layout, not per-screenshot fixed positions.

Browser matrix: available Chromium plus WebKit/Firefox automation if tools support them. Actual physical Android/iPhone is strongly recommended for graphics; record available devices, OS, browser and results. Do not list Safari as tested just because a Chrome viewport was resized to iPhone width.

Required screenshot states: hero desktop/mobile, full homepage desktop/mobile, district, exterior overview, selected floor/unit, enlarged plan in both orientations, tour living/bedroom/balcony, two-home comparison, invalid form, preview confirmation, empty filter result and simplified fallback. Save under `docs/evidence/` with meaningful names. Do not include real personal details in captured form inputs; use obvious example test data.

## 5. Visual quality gate

Each item must be inspected, with corrections recorded where needed:

1. Architecture has believable scale, facade depth, planting, entrance and railings. It is no longer a stack of generic primitive slabs.
2. Hero crop supports typography, same tower appears in explorer and district, mobile crop is intentional.
3. Interior views share layout, furniture/materials and exterior context. No ordinary photo misrepresented as 360°.
4. Material lighting looks controlled; no white blowouts, flickering transparent glass, severe shadow acne or missing textures.
5. Plans have correct room counts, terrace labels, orientation and normal text; labels do not overlap at mobile size.
6. Status, sample prices, area definition and representative-tour disclosure are readable without dominating the design.
7. Header/panel/tour controls do not cover key information; no bottom actions behind safe-area/browser chrome.
8. Typography/spacing are coherent across Home, explorer, compare and enquiry. No unexplained template-like mismatch.
9. Loading/error/empty states are composed and useful, not blank browser output.
10. No nonworking action, fake social link or unfinished placeholder appears in the client path.

If aesthetic quality is uncertain, supply screenshots and call it a visual candidate for owner review; do not invent a numerical “luxury score” to declare success. Owner feedback on the visual direction can refine the candidate, while functional and data acceptance remains objective.

## 6. Performance gate

Measure production preview. Record browser/device, viewport, cold/warm cache, network settings, major asset sizes and measured Web Vitals or lab proxies. Target LCP≤2.5s, INP≤200ms, CLS≤0.1 on an explicitly agreed/recorded profile. A short lab run may not establish INP; label the measurement method correctly.

Target initial non-3D compressed payload≤1.5MB and hero roughly≤400KB where quality permits. Explain any deliberate exceptions. Frame targets: ~60 fps presentation laptop; usable ≥30 fps on tested phone under active orbit. If hardware unavailable, report unmeasured instead of extrapolating a guarantee.

No initial full-city/tower/interior simultaneous load. Test long transition cancellation and current action response while media loads. A beautiful animation with frozen controls does not pass usability.

## 7. Requirement traceability

| Requirements | Build phases | Primary verification |
|---|---|---|
| REQ-01, REQ-02 | 3,9 | Homepage captures, navigation shortcuts, visual gate |
| REQ-03 | 4 | E01/E07, five marker/list equivalence |
| REQ-04, REQ-05 | 1,4,8 | G1/E01/E08/E12, orbit/click/numbering |
| REQ-06, REQ-07 | 2,4,5 | U01–03/U11, E02/E03, plan captures |
| REQ-08 | 1,5,8 | E01/E04/E09/E12, true renderer and three rooms |
| REQ-09, REQ-10 | 2,6 | U04–10, E05 |
| REQ-11 | 7 | U13–16, E06 |
| REQ-12 | 2,4–6 | U12, E04/E05 |
| REQ-13, REQ-14 | 3–9 | E10/E11, viewport matrix and device record |
| REQ-15, REQ-16 | 1,4,5,8,9 | E07–09/E12, local assets and production preview |
| REQ-17 | All | Disclosures/status/privacy assertions and screenshot review |
| REQ-18 | 10 | Runbook, provenance, evidence and reproducible commands |

## 8. Release blocking issues

Block client-ready status for: broken primary journey, wrong unit details, nonexistent required assets, fake representative-tour claims, unlabelled fictional pricing/booking, unusable mobile controls, missing graphics fallback, known PII transmission/persistence, required unresolved license, crashing routes or a bare visual blockout.

Record nonblocking limitations separately: untested physical device, optional night mode omitted, no real map/CRM, representative rather than unit-exact interior. These are not bugs if they match this contract, but they must be disclosed in handoff.
