# AUREL — Asset Provenance & License Register

This document records the provenance, licensing, local path, and fallback mapping for all 24 registered assets in the AUREL demonstration.

| Asset ID | Kind | Route | Local / Source Path | Creator / Origin | License | Provenance Evidence | Status | Fallback ID |
|---|---|---|---|---|---|---|---|---|
| `building-master` | 3D Code | Procedural | `src/scene/BuildingProcedural.tsx` | AUREL Procedural Engine | Project Original | `docs/RENDER-SPEC.md` | Ready | `exterior-fallback` |
| `district-master` | 3D Code | Procedural | `src/scene/DistrictScene.tsx` | AUREL Procedural Engine | Project Original | `docs/RENDER-SPEC.md` | Ready | `district-fallback` |
| `interior-master` | 3D Code | Mesh | `src/scene/InteriorScene.tsx` | AUREL Procedural Engine | Project Original | `docs/RENDER-SPEC.md` | Ready | `tour-living-still` |
| `exterior-hero-desktop` | SVG Image | All | `public/assets/images/hero-desktop.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | `exterior-fallback` |
| `exterior-hero-mobile` | SVG Image | All | `public/assets/images/hero-mobile.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | `exterior-hero-desktop` |
| `exterior-fallback` | SVG Image | All | `public/assets/images/exterior-elevation.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `district-fallback` | SVG Image | All | `public/assets/images/district-map.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `collection-garden` | SVG Image | All | `public/assets/images/collection-garden.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | `exterior-fallback` |
| `collection-skyline` | SVG Image | All | `public/assets/images/collection-skyline.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | `tour-living-still` |
| `collection-penthouse` | SVG Image | All | `public/assets/images/collection-penthouse.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | `exterior-fallback` |
| `plan-garden-source` | SVG Code | All | `src/data/planDefinitions.ts` | AUREL Plan Engine | Project Original | `src/data/planDefinitions.ts` | Ready | None |
| `plan-skyline-source` | SVG Code | All | `src/data/planDefinitions.ts` | AUREL Plan Engine | Project Original | `src/data/planDefinitions.ts` | Ready | None |
| `plan-penthouse-source` | SVG Code | All | `src/data/planDefinitions.ts` | AUREL Plan Engine | Project Original | `src/data/planDefinitions.ts` | Ready | None |
| `tour-living-still` | SVG Image | All | `public/assets/images/tour-living.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `tour-bedroom-still` | SVG Image | All | `public/assets/images/tour-bedroom.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `tour-balcony-still` | SVG Image | All | `public/assets/images/tour-balcony.svg` | AUREL Vector Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `tour-living-panorama` | Panorama | Panorama | None | N/A (Mesh Route Chosen) | N/A | Mesh route selected | Not-Required | `tour-living-still` |
| `tour-bedroom-panorama` | Panorama | Panorama | None | N/A (Mesh Route Chosen) | N/A | Mesh route selected | Not-Required | `tour-bedroom-still` |
| `tour-balcony-panorama` | Panorama | Panorama | None | N/A (Mesh Route Chosen) | N/A | Mesh route selected | Not-Required | `tour-balcony-still` |
| `amenity-roof` | SVG Image | All | `public/assets/images/amenity-roof.svg` | AUREL Artwork Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `amenity-lounge` | SVG Image | All | `public/assets/images/amenity-lounge.svg` | AUREL Artwork Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `amenity-wellness` | SVG Image | All | `public/assets/images/amenity-wellness.svg` | AUREL Artwork Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `amenity-arrival` | SVG Image | All | `public/assets/images/amenity-arrival.svg` | AUREL Artwork Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
| `facade-detail` | SVG Image | All | `public/assets/images/facade-detail.svg` | AUREL Artwork Engine | Project Original | `scripts/generate-stills.mjs` | Ready | None |
