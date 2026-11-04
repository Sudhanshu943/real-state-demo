# Owner guide — get useful work from Planning mode

**Recommended workflow: audit → review → one working slice → visual checkpoint → finish and verify.** You do not need to read the 12,000-word research report or micromanage every coding task.

## 1. Set the starting mode

Open the destination project folder in Anti-Gravity. Choose Planning mode, or use `/plan` where available. For the first audit, use the artifact review policy that requests your review. Official docs describe structured planning, implementation artifacts, comments and Proceed controls. Interface wording can differ between versions. [Official /plan documentation](https://antigravity.google/docs/plan/), [artifact review](https://antigravity.google/docs/artifact-review).

Planning mode and model selection are separate decisions. This package does not assume a particular paid model tier or promise that a specific Gemini variant is best. Use an available capable model; actual assets, clear scope, feedback and verification remain essential.

## 2. Send inputs in this order

1. Send **Prompt A** from STARTUP-PROMPT. It tells the agent to wait for the package.
2. Put/attach the whole implementation-plan folder in its workspace. Preserve filenames and fixtures. If it cannot read attachments, use actual workspace files rather than pasting fragments without context.
3. Let it read and audit before app edits. Request a concise findings table with severity, issue, evidence and resolution; long paraphrasing is not useful.
4. Review its execution artifact, comment on specific points, then use the app's review/Proceed workflow and send **Prompt B** for execution.

The initial review is useful because the builder can inspect the actual runtime and assets that this planning session cannot assume. It must surface a real conflict, not ask you to choose every implementation detail already fixed here.

## 3. What to expect in the initial artifact

- Exact asset route: procedural or supplied GLB; mesh show residence or genuine panoramas.
- Workspace/toolchain assessment and stable dependency strategy.
- Requirements → phases → tests mapping.
- A small complete first slice, not twelve unrelated half-finished components.
- Explicit unresolved blockers and sensible independent work.
- Actual visual and functional acceptance checks.

If its plan says “create UI, add animations, test, done,” ask for concrete outputs and pass/fail gates. If it removes the orbitable building or offers only stock-photo cards, point to REQ-04 and the asset fallback strategy. If it assumes credentials/purchased models exist, correct that before execution.

## 4. Useful review feedback

Give specific changes: “Keep three room views; prioritize the same apartment geometry across all views,” or “This assumes real Google data; core demo must use original district assets.” Ask it to update the affected plan/data/tests consistently.

Avoid repeatedly saying “make it more premium” without pointing to a composition. At the visual checkpoint, review actual hero/explorer/interior screenshots: architecture, crop, lighting, type, spacing and clarity. Ask for one coherent improvement direction rather than unrelated effects.

## 5. After approval

Send Prompt B. Let routine implementation proceed. The builder should track progress and pass technical gates without needing your approval for every component. Tool-permission prompts and artifact-review settings are separate controls; do not change all permissions merely to stop an unnecessary planning loop. This guide does not require unrestricted command execution.

The planned visual checkpoint is the moment to correct the aesthetic direction while it is still easy to change. Ask for desktop/mobile screenshots plus the live local path/URL. A recording is helpful, but the complete path must be interactive.

## 6. Keep its context useful

Work in one coherent project context. If a new conversation is needed, give it BUILD-TRACKER, DECISIONS, the approved execution artifact and this package. Tell it to inspect existing source and resume the first unverified phase. Do not ask it to start from scratch.

Ask for concise checkpoint reports: completed, verified, next, blocked. No need for a large narrative after every minor edit. Do not allow every session to generate a new conflicting plan.

## 7. Before accepting “done”

Ask it to demonstrate: home → district → building → floor → unit → plan → three-room tour → exit → compare → enquiry preview. Then try mobile, Back/refresh and simplified mode. Its final handoff should include actual build/test results, screenshots, selected asset route, provenance, run commands and limitations.

“Build passed” is useful evidence, but does not prove premium appearance, mobile usability or that the selected home's data remains correct. Those checks are specified separately in this package.

## 8. Scope of official verification

On 4 November 2026, the official Anti-Gravity pages linked above were consulted for `/plan`, review artifacts, comments and proceed behaviour. This operator workflow is our project recommendation; it is not an official guarantee of agent output or a claim that instructions can override the app's permission system.
