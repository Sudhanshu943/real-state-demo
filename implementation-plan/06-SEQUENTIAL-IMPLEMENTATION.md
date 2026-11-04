# 06 — Sequential implementation runbook

## How to execute

This is a dependency-ordered build, not a set of independent pages. Complete each phase's core output and verify its gate before expanding dependent work. A gate is a technical/visual check, not a request for owner approval at every phase. The initial plan review and the agreed visual checkpoint are the human review points; ordinary coding continues autonomously within approved scope.

Phases may share small implementation work where dependencies require it. Do not spend days perfecting all homepage animations before the building-to-interior proof exists. Conversely, do not leave the final homepage as an unreviewed placeholder because the data flow works.

## Initial review — before Phase 0 writes

Use the audit-first startup prompt. Read the full package and inspect the workspace read-only. Identify conflicts, missing dependencies and actual asset availability. Produce an execution artifact with requirement/phase/test mapping and explicit assumptions. Request the initial review before writing application code. Planning artifacts may be written if the user's tool policy permits it.

After the owner approves that plan or instructs execution, proceed through Phase 0–10. The README/startup workflow governs this one initial pause; it is not permission to keep asking after every file.

## Phase 0 — Workspace and toolchain

**Dependencies:** initial execution plan reviewed.

Tasks:

1. Inspect current directory, repository state, applicable instructions and existing package files. Preserve `research/`, `implementation-plan/`, user work and unrelated assets. Do not delete or reinitialize a repository blindly.
2. Record existing tooling, Node/npm versions and available browser/capture tools. Check current official Node requirement for chosen Vite release.
3. Create or adapt the Vite React TypeScript application. Configure strict TypeScript, lint, build, Vitest and Playwright as needed. Lock compatible stable versions.
4. Create the responsibility structure progressively. Copy seed/template into appropriate data locations; preserve originals for traceability.
5. Add README commands, BUILD-TRACKER and initial decision/asset/QA logs. Make a simple app shell with an error boundary and local concept disclosure.
6. Establish base-aware asset resolution and hash routing before deep-link features are built.

**Outputs:** working local server/build, lockfile, toolchain record, app shell and initial tracker.

**Gate G0:** install succeeds without dependency bypasses; `typecheck` and `build` pass; development and production preview both load. No missing dependencies hidden by casts/ignored errors. No claims of visual completion.

## Phase 1 — Assets and one complete technical slice

**Dependencies:** G0. Requirements REQ-04/05/07/08/15/17.

Tasks:

1. Inspect actual media and choose GLB/procedural building and panorama/mesh interior via asset decision tree. Record rights and missing content. With no supplied assets, default original procedural tower + mesh show residence.
2. Implement canonical building dimensions and Floor 8 proxy. Add west unit A0801 proxy and basic data panel.
3. Render enough Skyline interior to prove living-room view and a working Exit; temporary furniture/blockout is explicitly marked in tracker.
4. Add constrained camera and correct pointer click/drag distinction. Add an HTML floor/home shortcut so selection does not depend only on raycasting.
5. Connect `building → floor 8 → A0801 → tour living → exit A0801` using real routes and normalized selection.
6. Create a temporary original fallback poster and simplified list path. Force graphics failure once to verify state remains usable.
7. Capture proof and basic renderer stats. Review scale and coordinate orientation before propagating geometry.

**Outputs:** actual end-to-end slice, selected asset routes, first render spec and evidence.

**Gate G1:** same ID survives through scene/card/tour/exit; no dead navigation; floor numbering correct; one active renderer; representative tour label visible; fallback is usable. This is a functional proof only, not the client-ready visual gate.

If a candidate GLB fails loading or cannot align floors, use procedural route rather than burning the entire project on asset repair. Do not stop because a paid model is unavailable when the specified original route remains possible.

## Phase 2 — Data contracts and navigation foundation

**Dependencies:** G1; use lessons from slice. REQ-06/09/10/12/17.

Tasks:

1. Implement runtime validation for canonical project, references and asset logical IDs. Add six inventory units and three collections exactly.
2. Implement pure selectors for filters, counts, ordering, status copy, currency and area labels.
3. Finalize route parsing/normalization for district/building/floor/home/tour/compare and queries. Add invalid-path recovery with replace semantics.
4. Implement reducer for saved/compare/overlays/render preference, safe persistence and hydration. Add actual contract/reducer tests for edge cases in Chapter 07.
5. Make a single overlay manager and accessible dialog foundation. Add focus restoration and scroll-lock cleanup.
6. Verify Back/Forward, direct URL and refresh without intro dependencies.

**Gate G2:** seed validates; key invariants tested; malformed route/storage cannot crash the shell; no second conflicting selection source. Direct A0801/tour route works on production preview.

## Phase 3 — Design system and homepage visual candidate

**Dependencies:** G1 geometry identity and G2 routing. REQ-01/02/14/17.

Tasks:

1. Implement design tokens, fonts/licenses, buttons, labels, image handling and global spacing. Check contrast and visible focus.
2. Refine building facade, landscape, materials and exterior lighting sufficiently to create a strong hero composition. Generate desktop/mobile matching posters through actual scene capture/export.
3. Build header/mobile navigation, hero, Vision, LocationPreview, Collections, Amenities, closing CTA and footer with real destinations.
4. Implement immediate poster loading, intrinsic image dimensions and no layout jump. Defer heavy scene code away from first homepage paint.
5. Use meaningful original local amenity/detail compositions; no broken thumbnail slots or unrelated stock homes.
6. Inspect hero and full page at desktop and phone widths. Correct type hierarchy, crop and overflow before adding elaborate motion.

**Outputs:** complete homepage, final-candidate exterior hero and reusable UI primitives.

**Gate G3:** visually coherent and responsive homepage; every action navigates; immediate useful first frame; real images exist locally. A generic repeated-card layout or primitive tower massing is not enough. Request the planned visual checkpoint once there is a reviewable composition, not after only a scaffold.

## Phase 4 — Complete district and exterior explorer

**Dependencies:** G2/G3. REQ-03/04/05/06/12/13/14/15.

Tasks:

1. Build authored district with five seed landmarks and shared tower geometry. Add marker/list synchronization, panel descriptions, reset and Enter Development.
2. Build desktop/tablet/mobile explorer shell, breadcrumbs, stable exit and simple-view control.
3. Finish all twelve visual floors and only three example floor targets. Add floor picker, hover/focus preview and selected state.
4. Add unit proxies/list, collection/aspect/status filters, counts and empty states. Inspect reserved/sold units as specified.
5. Implement camera presets, selection framing, gesture cancellation and resize-aware fit. Prevent panel scrolling from controlling scene.
6. Finish matching 2D district/exterior fallback, with HTML floor/home controls and mode-preserving recovery.

**Gate G4:** all six units reachable through scene and list; exactly five landmarks work; no phantom inventory; camera never goes underground; no accidental select after orbit; mobile controls usable; simple mode retains current home/floor where applicable.

## Phase 5 — Plans, home details and complete interior

**Dependencies:** G4. REQ-07/08/13/15/17.

Tasks:

1. Build all three original schematic plans from structured definitions. Match width, room count, terrace and orientation; render text normally after mirroring.
2. Complete detail panel, status-specific actions, area/price disclosures, plan enlargement and representative-tour action.
3. Refine full Skyline show residence or verify the chosen genuine panorama set. Implement living/bedroom/balcony, room controls, valid hotspots, Reset and Exit.
4. Create matching tour stills for simplified mode. Create the plan minimap if it improves clarity without crowding mobile controls.
5. Test every collection's tour entry copy: Garden/Penthouse must clearly open representative Skyline suite, not an exact invented tour.
6. Verify room failures, retry, reduced-motion transitions and renderer cleanup. Update asset/provenance records.

**Gate G5:** all plans readable and coherent; no mirrored text; tour three rooms work; correct exit context; no fake 360 projection; no room switching through walls; interior is furnished and visually reviewed rather than a bare box.

## Phase 6 — Saved homes and comparison

**Dependencies:** G2/G5. REQ-09/10/12/13.

Tasks:

1. Add synchronized Save controls in list/detail and global Saved count.
2. Complete saved drawer/list, remove, empty state and view routes.
3. Complete two-home compare screen and one/zero-home variants.
4. Implement explicit replace-one choice for third compare addition. Preserve saved items and selection as specified.
5. Carry two-home context to enquiry entry; test reload/storage errors and reset preferences.

**Gate G6:** no duplicate or unknown IDs; compare max two; unsave removes compare membership; cancel third-home replacement leaves original compare; all data matches detail; refresh persistence works without PII.

## Phase 7 — Contextual viewing request

**Dependencies:** G6 and overlay foundation. REQ-11/13/17.

Tasks:

1. Build context-aware form for general, one-unit and two-unit enquiry. Snapshot context at opening.
2. Implement contact preference switch, validation, optional date/time/message and inline errors. Current local date determines min date.
3. Implement in-memory preview confirmation with accurate no-send/no-booking wording. Clear PII at specified boundaries.
4. Test valid/invalid submissions, double-click, status-specific copy, focus behaviour and backdrop/Escape/close.
5. Verify no submission network call, contact logging or persistence. Add an About This Demo explanation.

**Gate G7:** all enquiries are honest previews; chosen unit context correct; no contact data in URL/storage/log; keyboard works end to end; closing confirmation clears sensitive input from app memory.

## Phase 8 — Motion, performance and failure hardening

**Dependencies:** G3–G7. REQ-13/14/15/16.

Tasks:

1. Tune purposeful camera/UI motion and reduced-motion equivalence. Cancel stale animations on route/mode changes.
2. Profile actual transfer size, scene draw calls and frames on available equipment. Optimize repeated geometry, texture size, shadows and DPR.
3. Test slow load, missing image/model/panorama, graphics creation failure, context loss and user-chosen simplified mode. No infinite spinner.
4. Prevent unexpected fallback auto-upgrade, memory growth on repeated tour entry, event-listener leaks and scroll-lock leftovers.
5. Generate final local stills/thumbnail assets and record dimensions/sizes. Required asset validator has no unresolved placeholder records.
6. Add appearance toggle only if everything else is complete and it can share geometry/quality. Otherwise omit it cleanly.

**Gate G8:** documented performance profile, graceful recovery, local asset independence and controlled graphics lifecycle. Optional effects cannot degrade required experience. Evidence distinguishes emulation from real devices.

## Phase 9 — Full QA and visual acceptance

**Dependencies:** G8. All requirements.

Tasks:

1. Run typecheck/lint/build/data-asset checks and meaningful unit/E2E tests.
2. Exercise Chapter 07's exact presentation path and alternative/failure paths on production preview.
3. Capture and inspect all required desktop/mobile states. Correct overlap, crop, empty states, typography and scene composition.
4. Verify direct link in a fresh browser state and refresh a deep route. Confirm no runtime external assets/keys required.
5. Re-run only affected checks after fixes. Record remaining unsupported devices/limitations honestly.

**Gate G9:** required acceptance scenarios pass with evidence; no blocking error/dead control; final visual gate passes. If physical devices are unavailable, call that out rather than marking them tested. An unresolved core interaction or unfinished asset prevents client-ready designation.

## Phase 10 — Package and presentation handoff

**Dependencies:** G9 or explicit honest partial-status report if blocked.

Tasks:

1. Write final README, HANDOFF, QA-REPORT, ASSET-REGISTER, DECISIONS and tracker completion details.
2. Document clean setup, run, test, preview and static deployment configuration. Verify commands from a reproducible dependency install where practical; do not destroy current user work to simulate a clean machine.
3. Provide a concise presenter script and limitations: fictional district/prices/status, representative suite, local preview request, actual tested devices.
4. Keep source/build outputs organized. Exclude node_modules, credentials, personal data and temporary browser profiles from any delivery archive.
5. Prepare deployment steps without publishing unless explicitly authorized by owner.

**Gate G10:** owner can run the project from instructions; evidence paths exist; asset rights/provenance traceable; final report names the actual selected routes and limitations. No unfinished phase is silently checked off.
