# 01 — Product contract

## 1. Product and audience

Build an original fictional single-development property website named **AUREL**. It is a demonstration for a prospective real-estate client, not a public property marketplace. The primary persona is a buyer exploring homes; the second persona is a sales presenter guiding the client through a coherent journey.

Default language: English UI. Communication with owner: English or Hinglish. No pure Hindi text. Brand name is a concept name; no trademark clearance is claimed.

The experience should demonstrate visual craft and meaningful property exploration. A working complete journey is mandatory. A static landing page, animation-only mockup, fake tour button or unfinished scaffold does not satisfy this contract.

## 2. Fixed project decisions

| Decision | Fixed default |
|---|---|
| Development | AUREL, fictional urban garden residences |
| Geography | Original illustrative district; no real city or geographic claims |
| Building | One 12-residential-floor tower above an entrance/lobby level |
| Inventory | Six example units on floors 4, 8 and 12; other floors visually present but not listed |
| Home types | Garden Residence, Skyline Residence, Terrace Penthouse |
| Currency and area | INR sample prices; m² illustrative internal area; no carpet-area claim |
| District | Five authored landmarks, no claimed travel times |
| Exterior | Genuine orbitable mesh, plus matching static fallback |
| Interior | One three-position Skyline show residence; explicitly representative for the whole concept |
| Plans | Three original schematic type plans, two unit orientations handled explicitly |
| Inventory backend | Typed local seed data |
| Saved homes | Browser local storage, versioned, no account |
| Comparison | Exactly two homes maximum |
| Enquiry | In-memory demonstration confirmation; no PII persisted or sent |
| Hosting | Build locally and prepare static output; publishing is a separate user action |
| Map APIs | None required in core build |
| Audio | Omitted from baseline; no silent nonfunctional mute control |
| Optional flourish | Day/evening appearance only after required gates pass |

## 3. Required capabilities

IDs below are referenced by implementation and acceptance files.

| ID | Requirement | Minimum observable result |
|---|---|---|
| REQ-01 | Premium homepage | Distinct architecture, strong hierarchy, immediate poster and direct CTA |
| REQ-02 | Normal navigation | Vision, Residences, Location, Amenities, Viewing links have destinations |
| REQ-03 | District exploration | Five selectable original landmarks, project marker and list equivalent |
| REQ-04 | Exterior 3D | Constrained drag/orbit, reset and three working camera presets |
| REQ-05 | Floor selection | Floors 4/8/12 selectable in scene and labelled HTML picker |
| REQ-06 | Unit discovery | Six consistent homes, type/aspect/status filters and empty state |
| REQ-07 | Unit detail | Correct ID, type, floor, area definition, status, sample price and plan |
| REQ-08 | Interior experience | Living room, bedroom, balcony; room switching, look control, reset and exit |
| REQ-09 | Saved homes | Global synchronized save state, persistence, remove and empty state |
| REQ-10 | Comparison | Two selected homes, replace/remove behaviour and useful difference table |
| REQ-11 | Viewing request | Selected context, validation, demo-only confirmation and reset |
| REQ-12 | Navigation state | Refresh/deep links, deterministic Back/Forward, recover invalid IDs |
| REQ-13 | Accessibility | Keyboard/list alternatives, focus management, semantic labels, reduced motion |
| REQ-14 | Responsive UI | Small phone, tablet and desktop compositions with readable controls |
| REQ-15 | Failure recovery | Graphics/asset/storage failure leaves usable information and enquiry |
| REQ-16 | Local independence | Production preview works without API keys and external runtime content |
| REQ-17 | Honest demonstration | Representative views, fictional status/prices and unsent requests labelled |
| REQ-18 | Handoff | Source, lockfile, asset record, runbook, QA evidence and known limitations |

## 4. User journeys

**Presentation path:** Homepage → Explore Building opens district → Enter Development opens building → Floor 8 → A0801 → View Inside opens representative Skyline suite → Bedroom → Balcony → Exit → save A0801 → compare with A0401 → Request Viewing → local demonstration confirmation.

**Buyer shortcut:** Homepage View Residences → list → select any home → plan/detail → viewing. It must work without waiting for the district or using a graphics canvas.

**No-graphics path:** Homepage poster → district illustration/list → exterior fallback with floor picker → same home details → show-residence still gallery → compare → viewing. A visible “Use simplified view” control is available; automatic failure uses the same route.

**Resume path:** Refresh a unit or interior URL → correct detail context → required scene loads lazily → sensible fallback if graphics unavailable. No mandatory intro replay.

## 5. Explicit exclusions from the baseline

No paid Google/Cesium/Mapbox activation, photoreal geographic claims, actual property address, scanned digital twin claim, real CRM, admin portal, login, payment/reservation, mortgage advice, AI chatbot, voice assistant, free-flight city simulation, multiplayer tour or unlimited property catalogue.

No real contact details or external sales messages. No fake testimonials, legal registration numbers, awards, customer logos, urgency timers or sold counters. Basic static metadata is included; a production SEO/content strategy is outside this demo.

These exclusions focus implementation. The required features must still be complete and polished.

## 6. Tour and plan truthfulness

Every unit may open the same Skyline show residence, but its action must read **Explore show residence**, with adjacent text **Representative Skyline interior; layout and view vary by home.** The tour heading is “Skyline show residence,” followed by the currently selected unit context. It must never imply the interior is an exact tour of a Garden or Penthouse unit.

Plans remain type-specific. Garden/Penthouse room labels must not open an exact-room hotspot in the Skyline suite. A separate show-residence action is available. Only Skyline plan room targets may map to the matching room; east/west orientation differences remain representative, labelled and reflected in the plan.

## 7. Required completion levels

**Functional proof:** data flow, state transitions and all core actions work with temporary assets.

**Visual candidate:** architecture, stills, interface and interiors have been refined and inspected. Temporary blockouts and missing images are gone.

**Client-ready local demo:** required acceptance scenarios pass, production build runs, assets have provenance, screenshots are reviewed and limitations are documented. Unsupported device checks remain explicitly untested; they cannot be ticked as passed.

These levels are distinct. Compilation does not establish visual quality; good screenshots do not establish interaction correctness. If the visual gate is unmet, report the app as a functional candidate and continue improving it within available capability.

## 8. Change control

Minor spacing, camera tuning and internal file refactors are builder decisions. Record substantive changes to asset route, architecture, dataset, scope or completion criteria in `docs/DECISIONS.md`. Preserve requirement IDs. Do not add optional dependencies before the required vertical slice works.

If a different actual business type becomes known, explain the consequence before redesigning the whole project. Until then, the fictional single-development contract is sufficient to proceed.
