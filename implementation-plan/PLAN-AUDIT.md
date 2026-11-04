# Plan audit and unresolved assumptions

## What this package resolves

- Product is fixed to one fictional development, twelve residential floors and six explicit example units.
- Every unit has stable floor, collection, scene, plan, status, price and tour identifiers in a canonical fixture.
- No actual media is falsely claimed to exist. Original procedural building and guided mesh suite are specified when usable licensed media is absent.
- A real orbitable exterior remains required; static view is a failure/accessibility alternative.
- Shared representative Skyline tour is disclosed for all homes; Garden/Penthouse plans do not pretend to have exact matching room tours.
- Internal area and terrace metrics are separate; Penthouse retains 192 m² internal area, with a larger terrace.
- Scene axes, storey formula, floor numbering, unit halves, terraces and plan orientations are defined.
- Original Skyline room zoning includes corridors and explicit door connections so a bedroom is not accessible only through a bathroom.
- Route source of truth, invalid URLs, Back/Forward, filters, compare capacity and overlay rules are specified.
- Enquiry is an in-memory preview with no external transmission or PII persistence.
- Initial Anti-Gravity workflow is audit/review first, then execution; the two prompts cannot be confused as simultaneous instructions.
- Every requirement maps to build phases and observable verification.

## Automated package checks

Run `python validate-package.py` from this folder. The script reads only specification/fixture content and writes `package-validation.json`. It checks IDs, six-unit consistency, floor/type metrics, reference resolution, asset declarations/fallback IDs, local Markdown links, requirement coverage, phase presence and the Skyline zoning rectangle area/non-overlap.

See [validation output](package-validation.json) for actual results. These checks do not test a website, shader, installed package, visual quality, door compliance, physical-device performance or legal rights of assets not yet selected.

## Manual consistency review

The planning review aligned the following: only example floors are interactive, architectural lobby is not Floor 1, unit proxy naming matches fixture IDs, east/west mirroring preserves north and readable text, room transitions avoid interpolating through walls, and asset readiness is a build gate rather than a presumed input.

The previous broad research recommendation for three-room panoramas is refined into a conditional panorama route with a fully specified mesh alternative. This is a deliberate decision caused by missing media, not an unnoticed scope reduction. The district uses original geometry rather than assuming real-city tile coverage or keys.

## Uncertainty that remains for the implementer

1. Destination workspace may contain an existing app or actual assets. Inspect before scaffolding or choosing routes.
2. Installed runtime/dependency availability must be verified. A lockfile is generated during implementation, not invented here.
3. No final models, textures, posters, font files or panoramas are bundled. Their creation/acquisition and quality require work.
4. The procedural instructions define a concept, not construction drawings or a legal area certification.
5. Premium appearance cannot be guaranteed by specification. The visual gate requires real renders/screenshots and refinement.
6. Device/network performance must be measured on actual available equipment; emulation limitations remain explicit.
7. AUREL is a working concept name, not a cleared trademark; all pricing/availability/location is fictional.
8. Public deployment, real inventory, actual views, CRM, booking and production legal content require later inputs/authorization.

The initial Anti-Gravity audit should challenge these assumptions against the real workspace, resolve routine matters and surface only material remaining questions. It should not rewrite the package into a vague plan or add unneeded infrastructure.
