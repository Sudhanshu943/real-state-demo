# AUREL — Implementation handoff for Anti-Gravity

**Version 1.0 · 4 November 2026 · Status: specification, not implemented software**

Owner's intent: create a remarkable, premium real-estate demonstration that a prospective client can operate. This package converts the research into a single chosen product and a sequential implementation contract. It is portable: copy this entire folder into the destination repository and use the included startup prompt.

## The decision

Build **AUREL**, a fictional luxury residential development: an editorial architectural homepage plus an immersive district → building → floor → apartment → interior journey, saved homes, comparison and a contextual viewing request.

**Default delivery:** locally runnable static frontend, no paid API, no account, no backend and no external message sending. Use React/TypeScript/Vite, Three.js/React Three Fiber, a reducer-driven experience and explicit demo data. Select the asset route in Phase 1 using the criteria below; keep the product/data contracts unchanged.

The implementation must have a real orbitable building. Fixed-image selection is an accessible/failure fallback, not a silent replacement for the signature interaction. For interiors, an authorized, consistent panorama set is preferred; if unavailable, build an original guided mesh show residence. Both are explicitly specified. A flat photo stretched onto a sphere is not an acceptable panorama.

## Files and reading order

| Order | File | Purpose |
|---|---|---|
| Guide | [00-ANTIGRAVITY-PLAN-MODE.md](00-ANTIGRAVITY-PLAN-MODE.md) | Owner's short audit/review/execution workflow |
| 0 | [STARTUP-PROMPT.md](STARTUP-PROMPT.md) | Prompt A before folder; Prompt B after initial plan review |
| 1 | [01-PRODUCT-CONTRACT.md](01-PRODUCT-CONTRACT.md) | Fixed scope, requirements, explicit exclusions and decisions |
| 2 | [02-DESIGN-AND-EXPERIENCE.md](02-DESIGN-AND-EXPERIENCE.md) | Page layout, art direction, precise interaction behaviour and copy |
| 3 | [03-TECHNICAL-ARCHITECTURE.md](03-TECHNICAL-ARCHITECTURE.md) | Stack, file tree, modules, navigation, lifecycle, state and accessibility |
| 4 | [04-DATA-AND-STATE-CONTRACTS.md](04-DATA-AND-STATE-CONTRACTS.md) | Inventory, schemas, reducer actions, invariants and validation |
| 5 | [05-ASSET-AND-3D-PIPELINE.md](05-ASSET-AND-3D-PIPELINE.md) | Geometry, coordinate system, plans, camera, materials and fallback routes |
| 6 | [06-SEQUENTIAL-IMPLEMENTATION.md](06-SEQUENTIAL-IMPLEMENTATION.md) | Ordered build tasks, dependencies, outputs and exit gates |
| 7 | [07-TESTING-AND-ACCEPTANCE.md](07-TESTING-AND-ACCEPTANCE.md) | Concrete automated/manual scenarios and completion evidence |
| 8 | [08-DELIVERY-AND-RESUME.md](08-DELIVERY-AND-RESUME.md) | Progress protocol, resuming, packaging and final handover |
| Data | [fixtures/project.seed.json](fixtures/project.seed.json) | Canonical fictional project, six units, types, rooms, landmarks and amenities |
| Assets | [fixtures/asset-register.template.json](fixtures/asset-register.template.json) | Required asset IDs and honest initial readiness states |
| Tracking | [BUILD-TRACKER.md](BUILD-TRACKER.md) | Phase checklist to copy/update during implementation |
| Audit | [PLAN-AUDIT.md](PLAN-AUDIT.md) | Consistency checks and known uncertainty in this planning package |

## Precedence and interpretation

Explicit user instructions and applicable repository instructions take precedence. Within this package: Product Contract establishes scope; Data Contracts plus seed file establish identifiers/data; Asset Pipeline establishes scene geometry; Sequential Implementation establishes execution order; Acceptance establishes verification. Resolve a discrepancy by preserving these responsibilities and recording the resolution. Do not quietly reinterpret a required feature as optional.

The research is rationale, not an additional feature backlog. Optional research ideas do not override this implementation scope. The new fixed concept uses 12 floors rather than an open 12–18-floor range. Interior route selection is an explicit response to the fact that research acquired no actual models or panoramas.

## Execution policy

Read all normative files once and inspect the workspace read-only. In the initial Planning stage, audit the package and present the execution artifact for review before application edits. After that review, work one phase at a time, updating tracker/evidence. Do not ask the owner to choose CSS spacing, libraries already specified, or ordinary reversible implementation details. Continue with defaults. Ask only when an actual missing input prevents authorized work, a material change requires direction, or a consequential external action is needed. A visual checkpoint supplies concrete screenshots for feedback; it is not approval for each routine file edit.

No file here authorizes purchases, paid API activation, account creation, publishing, contacting a person, or changing external services. Build and test locally; prepare reviewable deployment instructions. Do not stop at scaffolding, a screenshot or a hero-only landing page.

## What the owner needs to do

1. Copy Prompt A from the startup file into Anti-Gravity with Planning mode enabled.
2. Attach or place this entire `implementation-plan` folder in its workspace.
3. Review its short audit and execution artifact, then send Prompt B and let it implement through the gates.

The owner does not need to read the full research report. The startup prompt and this package contain the build decisions. No plan guarantees visual quality by itself; the Phase 1 asset proof and later visual gates deliberately require evidence instead of allowing a builder to declare success from compilation alone.
