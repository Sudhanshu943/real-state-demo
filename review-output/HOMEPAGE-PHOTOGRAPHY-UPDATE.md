# Real-photography homepage previews

Implemented on 5 November 2026, scoped to homepage sections from Vision onward. No scene/model source files were edited for this pass.

- Replaced model-rendered section previews with nine selected photographs: facade, living, garden, penthouse interior inspiration, roof, shared lounge, fitness, arrival, and neighbourhood.
- Local 640px and 1280px WebP versions support responsive selection. Images are lazy-loaded and use the existing fixed section layouts.
- The shared lounge now has its own photograph rather than reusing the private living-room image.
- Updated captions, alt text and image disclosures to identify the real photographs as references, not evidence of an actual AUREL development. The Amsterdam park image is not labeled as a geographic masterplan.
- Added expandable photographer credits and source links. Complete metadata is in src/data/homePhotography.json, with source JPGs and a source README outside public/.
- Added scripts/prepare-home-photography.mjs for cached local preparation; registered all 18 delivery files in the existing asset register.

Verification: production build passed (existing large-JS-chunk warning remains); all 17 unit tests passed; all 51 registered assets passed validation. Browser review confirmed local photo loading, all four amenities image states, credit links, desktop composition, and a narrow phone layout without horizontal overflow or failed loaded photos. Full end-to-end suite was not run for this photographic update.

Evidence: homepage-real-photos-vision.png, homepage-real-photos-residences.png, homepage-real-photos-mobile.png in review-output/.

All selected source pages indicate the Unsplash License. Source-page camera metadata and the images were reviewed for photographic suitability; no images were generated for this pass. Original material swatches remain the existing CSS palette treatments; this pass replaces the large photographic section previews.
