# 08 — Delivery, progress and resume protocol

## 1. Working record

Maintain a live BUILD-TRACKER at app root. Mark tasks as pending, in progress, verified, failed or blocked. Every verified phase includes evidence path/command and result. Initial statuses in the supplied tracker are all pending; copying it does not complete the work.

After meaningful milestones record: current branch/workspace if relevant, selected dependency versions, asset route, completed gate, remaining tasks, known failures and exact next action. Do not keep a private plan that disappears when chat context is compacted.

## 2. Decisions

`docs/DECISIONS.md` records dated decisions with reason, consequence and affected requirement IDs. Examples: procedural model chosen because no authorized model exists; mesh tour chosen because no true panorama set exists; shadow resolution reduced after measured phone issue. No need to log every CSS change.

If a required feature cannot be completed with available tools, state what failed, evidence, attempted alternative and independent work still possible. Continue independent work. Do not silently downgrade or mark the phase complete. A concrete blocked visual asset can coexist with completed domain logic, but the final status must show the remaining gap.

## 3. Context handoff template

Before ending an unfinished session, put this in tracker:

```text
Current phase / gate:
Workspace and current app path:
What is implemented:
What is actually verified (commands/evidence):
Chosen building / tour routes:
Relevant decisions and constraints:
Current errors/blockers:
Files actively being changed:
Exact next action:
Checks to run after next change:
Unverified device / visual items:
```

Resume by reading tracker, decisions and relevant source, then inspect current run state. Do not regenerate the app, reinstall blindly, overwrite user edits or redo completed phases just because the conversation is new.

## 4. Final artifacts

- App source with lockfile and actual scripts.
- All required runtime images/fonts/models/textures locally resolvable.
- Asset register and license evidence for original/third-party material.
- RENDER-SPEC documenting coordinate conventions, cameras and selected asset route.
- QA-REPORT with test commands/results, device matrix and actual evidence paths.
- VISUAL-REVIEW with reviewed screenshots and remaining observations.
- HANDOFF and README with clean setup, dev/build/preview/test commands and deployment guidance.
- Completed tracker or explicit remaining blocked items.

No node_modules, personal account tokens, local browser profile, contact data or unrelated workspace files in a delivery ZIP. Build artifacts can be included if useful, but source and lockfile remain necessary. Do not package the owner's entire Desktop.

## 5. README content

Explain product and demo scope in two paragraphs. Then list actual prerequisites from the resolved toolchain, commands and local URLs. Document expected directory, ports and how to override them. State that hash routes are used and assets must be served over HTTP, not opened as a raw file.

List real implemented features and test commands. Document simplified mode, reset preferences and the presentation path. Avoid claiming a backend or offline app exists. Include asset route/provenance summary and the important fictional/representative limitations.

## 6. Static deployment preparation

Verify production `dist` through preview. Record whether base path is root or a subdirectory, and test base-aware URLs if the target is known. Provide generic upload/build-output instructions appropriate to the chosen framework. No API key required in baseline.

Do not publish automatically just because build succeeds. Public hosting may need brand/content review; this package authorizes preparation and local verification, not an external publication. If the owner later explicitly requests deployment, follow the authorized service workflow.

## 7. Final response format for builder

Lead with actual status: client-ready local demo, functional visual candidate or blocked with specific gap. Include:

1. App location and exact start/preview commands.
2. Chosen building and tour routes.
3. Completed main journey and features.
4. Verification summary, tested environments and screenshots/recording links.
5. Asset provenance summary and any license conditions.
6. Remaining limitations and production integrations not implemented.

Do not drown the owner in a file-by-file development diary. Link detailed logs. If a test/device was not available, say untested. If no real enquiries were sent or bookings created, state that accurately.

## 8. Three-minute presentation runbook

Start production preview with final assets, reset demo preferences and inspect the first frame. Walk through district → Floor 8 → A0801 → plan → Skyline show residence → balcony → exit. Save A0801 and compare A0401. Preview enquiry with obvious example data.

Let the client interact with a floor/room themselves. Keep the simplified route available and know how to reset. Explain real-project upgrade inputs after the experience: approved architectural assets, actual location, inventory, pricing and sales integrations.

Do not play a prerecorded film and imply the whole site was live. A recording can support explanation, but the working interaction is the central proof.
