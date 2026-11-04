# Startup prompts — audit first, then execute

Use Prompt A with Planning mode before supplying the folder. After the initial artifact is reviewed, use Prompt B. Do not send both together: they describe different stages. The separate [operator guide](00-ANTIGRAVITY-PLAN-MODE.md) explains the handoff.

## Prompt A — initial audit in Planning mode

```text
/plan

I will provide an implementation-plan folder next. Wait for it before
planning or coding. Once it is available, read its README, all numbered
specifications, both fixture JSON files, tracker and plan audit. Inspect
the actual workspace read-only.

Audit the package; do not merely paraphrase it or make it longer.
Identify contradictions, missing assets, dependencies, unverified
assumptions, implementation risks, missing tests and fallback paths.
Separate genuine blockers from routine decisions covered by defaults.
Preserve required features and visual ambition; no silent scope cuts.

Produce a reviewable execution artifact with ordered phases, affected
files, prerequisites, deliverables and pass/fail gates. Map requirement
IDs to phases and tests. Recommend the smallest complete building →
floor → home → interior slice that proves the central experience.

Use the package's original procedural building and guided mesh interior
route if no usable authorized model/panorama set is supplied. Do not
assume paid assets, credentials or true panoramas already exist.

Before presenting your artifact, check it once for inconsistent IDs,
geometry/plan mismatches, impossible dependencies, privacy leaks and
weak verification. Resolve routine issues and record substantive changes.

Do not modify application code until this initial audit and execution
artifact have been reviewed. Ask only material questions not already
answered by the package. Communicate in English or Hinglish.
```

## Prompt B — after reviewing the initial artifact

```text
The initial implementation artifact is reviewed. Implement the approved AUREL demo using the supplied `implementation-plan` package and recorded audit resolutions. Treat that package as the specification. If this is a resumed session, read the approved artifact, tracker, decisions and relevant source before editing.

The chosen product is AUREL, a fictional luxury residential development. The complete working path is: premium architectural homepage → authored neighbourhood/district → orbitable 3D building → floor → apartment details and plan → guided interior show residence → save/compare → contextual demo viewing request.

I want the finished demo to feel like a carefully art-directed luxury property experience. Protect architecture, lighting, composition, typography, responsive behaviour and interaction quality. Do not deliver a generic template, floating-card dashboard, random stock-photo collage or an unfinished 3D blockout.

Use the fixed decisions and contracts in the package. Work sequentially through Phase 0–10 in `06-SEQUENTIAL-IMPLEMENTATION.md`. Start by inspecting the existing workspace, preserve unrelated files, create the prescribed application structure if it is empty, then prove one building → home → interior interaction before polishing everything. Update BUILD-TRACKER.md and your decision/asset/QA records as you proceed. Gates require actual evidence; a checklist tick is not evidence.

Read `fixtures/project.seed.json` as the canonical fictional dataset. Keep all IDs consistent across scene selection, plans, tours, saved homes, compare, URL state and enquiry. Every visible action must work and every result must reflect the same underlying data. Show demonstration labels where prices, availability or booking could be mistaken for live information.

No purchased assets, panoramas or API credentials are supplied. Follow the asset decision tree. Prefer a usable authorized consistent model/panorama set if available. Otherwise create the specified original procedural building and guided mesh show residence; do not pretend that a normal photograph is a 360 panorama. The required 3D building cannot be silently downgraded to a flat image. Include a polished 2D/list fallback for graphics failure and low-power use. Quality of the final assets must pass the visual acceptance gate; do not call a blockout client-ready.

Use stable compatible dependencies and the specified architecture. Verify the current Node/tooling requirements from official documentation before installation. Pin the successful resolution in a lockfile. Do not use an alpha stack just for novelty. Core execution must work without paid APIs, external embeds, runtime stock-image URLs, login or a backend.

Do the implementation and necessary verification autonomously, one phase at a time. Do not repeatedly ask me for approval for ordinary coding decisions. Do not purchase, publish, create accounts, activate paid services, submit external enquiries or send messages. If a truly essential external dependency is unavailable, complete independent authorized work, document the exact blocker and do not invent a successful result.

Test the main journey, invalid/deep links, Back/Forward, keyboard, mobile layouts, reduced motion, graphics failure, corrupt local storage, reserved/sold unit behaviour, compare limits, tour cleanup and honest demo enquiry confirmation. Use the acceptance scenarios in the package. Capture and inspect real browser screenshots; passing TypeScript and a build is not enough. Report actual test environments and any untested devices accurately.

When context becomes short or work is interrupted, update the tracker with the last verified state, exact next task, commands, decisions and blockers. Resume from that record without rebuilding completed work. Do not stop after producing a plan—the plan is already provided. Implement until the defined demo and verification are complete, or report a concrete unresolved blocker honestly.

Communicate in English or Hinglish, never pure Hindi. Keep progress updates concise. Final handoff must include run commands, completed features, chosen asset route, asset provenance, tests/evidence, limitations and deployment instructions. Do not claim that real bookings, live inventory, verified views or photorealistic city mapping exist when they do not.

Begin Phase 0 or resume the first unverified phase. Continue routine implementation without approval at every phase. At the agreed visual checkpoint, provide real screenshots and identify any material design decision for review; continue independent work while feedback is pending. Do not assume silence approves a material change. No repeated planning loop is needed after the initial review.
```

## If sending the folder is difficult

Send this file first, then README, numbered files 01–08, both fixture JSON files, BUILD-TRACKER and PLAN-AUDIT. Keep filenames intact. The combined plan, if included in a delivery ZIP, is a reading convenience; individual files and fixtures remain authoritative.
