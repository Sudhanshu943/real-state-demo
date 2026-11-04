# 04 — Asset sources, tools and licensing

## 1. Recommended acquisition strategy

Begin with a deliberately small asset collection: one building, one coherent apartment environment, one neighbourhood scene, three interior panoramas, a small furniture/vegetation set and a restrained material palette. Build the poster, film, selector and tour from that shared visual world.

Source priority: client-owned architectural files → custom model from approved plans → carefully licensed marketplace base → procedural concept architecture. AI generation can help with concept exploration and secondary objects; it should not define a supposedly accurate floor plan.

The directories below are researched sources. No individual marketplace asset has been purchased, downloaded or approved for redistribution. Prices, formats and licensing are item-specific unless explicitly stated otherwise.

## 2. Materials, lighting and environment

| Resource | Official source and evidence | What to obtain | Decision |
|---|---|---|---|
| Poly Haven | [Asset license](https://polyhaven.com/license): assets are CC0 | HDRIs, PBR surfaces, selected models | First stop for lighting/materials |
| ambientCG | [Official library](https://ambientcg.com/): assets described as CC0, including commercial use | Stone, concrete, plaster, paving, wood | First stop for surface materials |
| Blendkit / BlenderKit | [Official library](https://www.blendkit.com/): free/paid models, materials, HDRIs and scenes | Furniture, plants, decor, base scenes | Inspect each asset's license and export suitability |
| Fab | [Official marketplace](https://www.fab.com/): buildings, environments, furniture, nature, materials and HDRIs | Larger environment or architectural packs | Per-item license, file formats and engine compatibility |

Suggested search terms: warm limestone PBR, travertine floor, brushed bronze, exterior plaster, dark anodized aluminium, clear architectural glass, terrace planter, Mediterranean shrub, neutral linen sofa, sunset HDRI, overcast courtyard HDRI.

**Proposed palette:** warm limestone facade, dark bronze frames, smoked oak, cream upholstery, muted planting and a restrained deep green accent. This is our art direction, not a requirement of any asset provider.

Prefer surfaces with base colour, normal and roughness maps. Ambient occlusion is useful when handled consistently with lighting. Do not assign metalness to stone just to make it shiny. Limit texture resolution according to screen size; loading every surface at 4K or 8K is unnecessary for a building viewed from a distance.

An HDRI used for environment lighting is not automatically the correct visible view outside an apartment. Use separate environment and background choices when needed, and keep the visible skyline consistent with the project's fictional or actual context.

## 3. Architecture, furniture and scene marketplaces

| Resource | Link | Best use | Specific inspection |
|---|---|---|---|
| CGTrader | [Official marketplace](https://www.cgtrader.com/) | Houses, skyscrapers, interiors and furniture | Runtime formats, texture inclusion, polygon count, license |
| TurboSquid | [Official marketplace](https://www.turbosquid.com/) | Architecture/interior models and low-poly alternatives | Native software dependencies, render-only materials, web distribution rights |
| Fab | [Architecture catalogue entry point](https://www.fab.com/) | Buildings and environment packs | Unreal-only assumptions, LODs, editable source, exact license |
| Blendkit | [Architecture and scene library](https://www.blendkit.com/) | Blender-friendly scenes and furnishing | Included assets, license variation, linked-file packaging |
| SketchUp 3D Warehouse | [Official site](https://3dwarehouse.sketchup.com/) | Potential architectural blockouts | Retrieval returned 403; current catalogue/license not verified here |

Search recipes rather than arbitrary asset purchases:

- Exterior: “modern residential tower low poly PBR,” “luxury apartment building glTF,” “terraced residential building Blender.”
- Interior: “modern apartment complete scene Blender,” “living bedroom balcony interior PBR,” “architectural interior baked lighting.”
- Landscape: “optimized terrace plants,” “low poly realistic trees LOD,” “courtyard furniture PBR.”
- Context: “modular city block low poly,” “urban district environment optimized.”

These phrases are suggested discovery queries; they do not identify a verified purchasable item. Before purchase, shortlist three actual candidates and compare them with the checklist below.

## 4. Model acceptance checklist

### Visual and architectural fit

- Does the building suit the intended market and landscape?
- Are balconies, doors, stairs and furniture at believable scale?
- Can the interior plausibly fit the exterior facade and floor plate?
- Are enough viewpoints available to build a consistent presentation?
- Does the model include useful facade/landscape detail without excessive invisible geometry?

### Technical fit

- What is the actual downloadable format, not just the preview renderer?
- Can it open in available software with all textures present?
- Are materials standard PBR or dependent on unavailable renderer plugins?
- Are floors/units separated or can selection proxies be added?
- Are UVs, normals, scale and coordinate orientation usable?
- Are repeated objects instanced? Are LODs included?
- Is there a manageable export path to glTF/GLB?
- Can it produce both a good still image and a performant interactive version?

### License fit

- Commercial client demonstration allowed?
- Browser delivery allowed when model data is accessible to the user?
- Is this a royalty-free license, CC0, attribution license, editorial-only item or something else?
- Are embedded third-party brands or furniture designs an issue?
- May the finished work be transferred to the client, and who needs the license?
- Are raw source redistribution and sublicensing restricted?
- Are attribution, seat, revenue-tier or subscription conditions relevant?

“Royalty-free” does not mean unlimited redistribution. Browser models can be extracted; select a license that fits this delivery method or obtain written clarification. A rendered image may have different distribution conditions from an interactive downloadable mesh.

## 5. Authoring and rendering tools

| Tool/workflow | Role | Fit for our demo |
|---|---|---|
| Blender | Model cleanup, concept architecture, materials, camera shots and export | Preferred neutral asset-preparation workflow; official homepage retrieval failed, so current release details are not asserted |
| Client's SketchUp/Revit/3ds Max source | Authoritative geometry and plans where available | Useful input; often requires cleanup/export rather than direct browser loading |
| Spline | Browser-based interactive 3D authoring with events and web delivery | Useful for stylized concept or compact scene; evaluate on real building before choosing |
| Three.js + R3F | Custom runtime scene, selection, camera and UI synchronization | Preferred for main interactive building |
| Shapespark | Architectural model to browser walkthrough | Strong alternative for interior delivery |
| Unreal Engine + Pixel Streaming | High-fidelity remotely rendered experience | Later option with explicit server/operations budget |
| glTF Transform | Runtime optimization and inspection | Include in mesh pipeline |
| model-viewer | Relatively simple interactive model display and AR | Suitable for a stand-alone building object preview; custom selector may need more control |

Official capability references: [Spline](https://spline.design/), [Three.js](https://threejs.org/), [R3F](https://r3f.docs.pmnd.rs/getting-started/introduction), [Shapespark](https://www.shapespark.com/), [Epic Pixel Streaming](https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine/?application_version=5.0), [glTF Transform](https://gltf-transform.dev/), [model-viewer](https://modelviewer.dev/).

## 6. Panorama and scan tools

| Tool | Source | Use case | Dependency |
|---|---|---|---|
| Marzipano | [Official site](https://www.marzipano.net/) | Exportable panorama tours and custom UI | We supply panoramas and integrate controls |
| Pannellum | [Official site](https://pannellum.org/) | Lightweight open-source panorama viewer | We implement room data and navigation |
| krpano | [Official site](https://krpano.com/home/) | Rich panorama/3D tour authoring | Current commercial license and configuration |
| 3DVista | [Official product](https://www.3dvista.com/en/) | Authored tours, models, guided experiences | License/export/hosting choices |
| Matterport | [Official product](https://matterport.com/) | Captured existing property and hosted digital twin | Authorized capture, account, plan and embed access |
| PlayCanvas / SuperSplat workflow | [Official guide](https://developer.playcanvas.com/user-manual/gaussian-splatting/) | Captured splat cleanup and web experience | Capture quality, reconstruction and runtime validation |

A demo can use rendered panoramas from a virtual apartment that has not been built. A Matterport-style capture of an existing property and an artist's virtual apartment are different evidence types; the interface should never imply that a concept render is an actual completed unit.

## 7. AI-assisted generation

[Meshy](https://www.meshy.ai/) and [Tripo](https://www.tripo3d.ai/) officially offer text/image-to-3D workflows. They are candidates for concept objects, decor, sculptural accents or rapid visual exploration. Their marketing speed claims are not our quality or turnaround estimates.

For architectural use, inspect straight edges, repeated windows, wall thickness, room proportions, UVs, topology and export size. Generated geometry may look convincing from one angle yet fail at close inspection. A single exterior image cannot reliably establish the true arrangement of hidden rooms.

Recommended AI role: explore a facade mood and material language, then build or source a consistent master scene. Use generated still imagery only as clearly illustrative concept content until geometry and viewpoint consistency have been checked. Review current commercial rights, plan restrictions and input-image permissions for each service.

## 8. Asset manifest to maintain during the build

Record every used asset with: internal ID, author, exact item URL, acquisition date, license text/version, purchase receipt where relevant, allowed use, attribution, source format, runtime format, optimization changes and responsible owner.

Example planned rows:

| Asset ID | Needed output | Acquisition route | Status |
|---|---|---|---|
| building-master | Original scene + runtime GLB | Custom/properly licensed | Not selected |
| apartment-master | One coherent furnished apartment | Custom/properly licensed | Not selected |
| facade-stone | PBR set | Poly Haven/ambientCG candidate | Not selected |
| environment-day | HDRI | Poly Haven candidate | Not selected |
| tour-living | Tiled panorama | Render from apartment-master | Not created |
| tour-bedroom | Tiled panorama | Render from apartment-master | Not created |
| tour-balcony | Tiled panorama + matching view | Render from shared project context | Not created |
| plan-type-a | SVG + labelled areas | Original from approved concept plan | Not created |
| neighbourhood | Original district illustration/model | Custom | Not created |

The key deliverable after research is an asset proof: load one candidate building, select one floor and display one room. That small test reveals more than purchasing an entire collection before verifying suitability.
