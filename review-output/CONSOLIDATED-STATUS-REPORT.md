# AUREL — consolidated implementation status

Reviewed: 5 November 2026. This report combines the latest AntiGravity scene changes with the real-photography homepage update. Current source was inspected and build/unit/asset checks were rerun. The newest tinted-glass appearance was not independently reviewed in the browser during this report pass.

## Completed in source

### AntiGravity: exterior and interior rendering

- Exterior tower windows now use three smoke-green PBR material variants, including restrained warm emissive variation. They are opaque approximations of tinted reflective glazing; they hide the interior rather than simulate physically accurate transparent glass.
- Balcony and roof balustrades retain separate transparent glass materials.
- Living-room furnishings mount only for the living view; bedroom furnishings mount only for the bedroom view. Terrace geometry remains in living and balcony views because it is visible from both. Some shared room-envelope geometry remains mounted.
- Homepage switches from the exterior scene to the interior at scroll progress 0.51, with a short fade around the handoff. Plant preloading starts at progress 0.40 in normal-motion mode.
- A detailed facade bay and an optimized potted-plant GLB have been added. A decorative-asset fallback and scene-readiness handling are present.
- A rendering-cost measurement script exists. Its presence alone does not establish an FPS, memory, or draw-call improvement; no fresh benchmark was run for this report.

### Homepage: real photographic previews

- Nine real reference photographs replace the large model-rendered previews across architecture, residence collections, amenities and surroundings.
- Eighteen local responsive WebP files provide 640px/1280px variants, with lazy loading, alt text, photographer credits and source links.
- Photographs are disclosed as reference imagery, not actual AUREL property photography. Material swatches remain the existing CSS treatments.
- This photography pass did not modify the interactive 3D model.

## Verification

| Check | Current result |
| --- | --- |
| Production TypeScript/Vite build | Passed |
| Unit tests | 17 passed across 4 files |
| Asset register | All 51 registered assets validated |
| JavaScript delivery | Main chunk 1,541.76 kB; 428.08 kB gzip; Vite size warning remains |
| Photo desktop/narrow-layout review | Completed in the preceding photography pass; screenshots in review-output |
| Latest tinted-glass browser review | Not rerun in this report pass |
| Full end-to-end regression suite | Not rerun in this report pass |
| Latest performance benchmark | Not run; no quantified speedup claimed |

## What still needs attention

1. Visually verify the latest exterior glazing under the actual scene lighting. Dark materials and environment intensity alone do not guarantee convincing reflections.
2. Improve the remaining procedural furniture and vegetation. Bedroom bedding/pillows still use box geometry, so the scene should not yet be described as photorealistic.
3. Review the exterior-to-interior handoff, balcony framing, text contrast and mobile camera composition after the newest scene edits.
4. Measure draw calls, triangles, memory and frame time before claiming a performance improvement. Then address the large JavaScript bundle with appropriate lazy loading/code splitting.
5. Run the full browser regression suite before a client presentation. Existing screenshot byte-size checks are not equivalent to visual-difference testing.
6. Keep reference-photo disclosures and credits when publishing; these images do not establish the appearance or location of a real development.

## Delivery state

The changes are present locally and remain uncommitted/unpushed. This report task did not commit or push them. The latest checked-in baseline is 13feadf850dbe82a5f2a72a3e8f8191beef761e6.

Assessment: the tinted-glass/on-demand-room strategy is implemented in source, and the photographic homepage previews are complete. Technical checks pass. The remaining work is visual realism, fresh scene-level browser verification and measured performance—not a claim that the entire experience is finished.
