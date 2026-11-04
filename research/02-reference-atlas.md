# 02 — Reference atlas: 30 focused references

The first 20 entries cover property brands, developments and real-estate sales experiences. Entries 21–30 cover visualization studios and tour products. Technical documentation and asset libraries are listed separately in Chapters 03–04. This is a curated global sample, not a census or a claim that every site has real-time 3D.

**Evidence key:** LIVE = browser exercise/visual inspection; PUBLISHED = readable official page or maker case study; LIMITED = insufficient accessible content. “Adaptation” always describes our proposed implementation, not a verified competitor stack. No reference assets are licensed to us merely because their website is public.

## Most relevant interactive benchmarks

### 01. Esteria — Mirai Studios

**Evidence: LIVE + PUBLISHED.** [Live demo](https://esteria.miraistudios.co/), [maker's explanation](https://www.miraistudios.co/work/esteria).

Observed live: Start Experience opens an aerial masterplan; selecting the highlighted development opens a perspective building; selecting a floor reveals unit outlines; selecting a unit opens details and an Apartment Walkthrough button; the walkthrough opens a full-viewport interior panorama with Exit and Reset View controls. The inspected unit was labelled Center Residence 201. Its sample metrics were not validated and should not be copied as real project information.

Implementation evidence: the interior page exposed one canvas, one image, one SVG and a bundled script path ending in `/assets/index-CgaFPvmp.js` during inspection. That is evidence of rendered structure, not proof of an entire framework or of a downloadable building mesh. The maker explicitly mentions Three.js and panoramic navigation.

**Adaptation:** borrow the progression and persistent return controls. Create our own visuals and larger touch targets. Add a conventional list alternative and a plan so the flow is useful outside a guided pitch. Priority: highest.

### 02. ERA — Tekta / Vide Infra

**Evidence: PUBLISHED maker's technical breakdown.** [Case study](https://videinfra.com/blog/case-study-a-triple-site-of-the-day-winner-powered-by-webgl).

The article documents a custom neighbourhood scene, interactive floor filtering, high-resolution render exploration and a Three.js-based visual approach. It also explains simplification and specialized line rendering for its opening effect.

**Adaptation:** establish a repeated architectural motif; build a small authored neighbourhood scene; keep property information connected to the visual narrative. We should use standard loaders and simple shading first, adding custom shaders only after the experience works. Priority: highest. Its code was not independently audited.

### 03. Coast Home Selector — CGIKite

**Evidence: PUBLISHED product case page.** [Home Selector](https://cgikite.com/coast/about).

The maker presents rotating building exploration, floor/apartment selection, layouts, prices, availability and walkthrough viewpoints. CRM-connected information is described as a capability; no CRM integration was tested in this research.

**Adaptation:** keep architecture and unit metadata linked through stable identifiers. A floor pick must update both the scene and apartment list. Price and status should have clear text labels in addition to colour. Priority: highest.

### 04. Waldorf Astoria Miami — Razorfish

**Evidence: PUBLISHED physical/digital sales-gallery case study.** [Case study](https://www.razorfish.com/work/waldorf-astoria-miami/).

The documented experience includes a neighbourhood model, large physical models, apartment-view imagery and tablet customization. It illustrates how spatial storytelling can support an expensive purchase. Published commercial outcomes are maker/client claims; they are not a controlled estimate of website conversion.

**Adaptation:** use city → neighbourhood → building → living room as the browser storyboard. Our demo can translate the sequence into a few short scenes without implying it reproduces a large installation. Priority: high.

### 05. Trielle — Mirvac / The Boundary

**Evidence: PUBLISHED visualization case study.** [Project](https://www.the-boundary.com/work/trielle).

The maker describes Unreal Engine-based visualization, interactive finish options and imagery derived from real-time environments. This is a useful asset-production benchmark; it does not establish that the public website runs Unreal locally in a browser.

**Adaptation:** reuse a coherent master scene for imagery and tours. If offering two finishes, create both from the same camera positions so the difference is easy to understand. Priority: high; full streaming is optional.

### 06. Yellowstone Club digital twin — Neoscape

**Evidence: PUBLISHED maker case study.** [Project](https://neoscape.com/work/yellowstone-club-digital-twin-experience/).

The maker describes an unbuilt development presented through a digital twin, tours, VR nodes, films and an iPad app. The article discusses a staged game-development pipeline and sales information within the environment.

**Adaptation:** build one complete vertical slice before expanding scope. Reuse architecture across outputs but test each delivery format independently. Priority: high for production planning.

## Single-development and branded-residence references

### 07. 53 West 53 — New York

**Evidence: LIVE homepage + PUBLISHED official content.** [Website](https://53w53.com/).

Observed: full-width skyline imagery, restrained white navigation, large lower-left type and direct Availability/Inquire access. The opening initially appeared blank while loading, then resolved; no timing benchmark was recorded. The page groups residences, rooms, amenities and neighbourhood content.

**Adaptation:** use strong architectural composition, readable navigation and editorial hierarchy. Avoid an empty first impression by showing an immediate poster. Backend and animation libraries remain unverified. Priority: highest for visual direction.

### 08. 432 Park Avenue — New York

**Evidence: PUBLISHED official page content.** [Website](https://www.432parkavenue.com/).

The retrieved navigation separates residences, views, lifestyle/services, wellness, dining, films and availability.

**Adaptation:** treat the view as a meaningful product attribute. Add a balcony scene and clear aspect information for a selected home. Any floor-specific view must match verified imagery in production; a generic panorama cannot represent every elevation. Priority: high.

### 09. 15 Hudson Yards — New York

**Evidence: PUBLISHED official content.** [Website](https://www.15hudsonyards.com/).

Its information architecture joins story, lifestyle, residences, neighbourhood and floor plans, supported by named architecture/design contributors.

**Adaptation:** connect plans to the larger property story. Use a simple “The architecture / Your home / Your neighbourhood” structure. Only credit actual collaborators. Priority: medium–high.

### 10. The Whiteley — London

**Evidence: PUBLISHED official content.** [Website](https://www.thewhiteleylondon.com/).

The development connects heritage, architecture, residence collections, designers, amenities and Six Senses.

**Adaptation:** give different home types their own identity while preserving the development brand. A restrained materials section can create more credibility than an unrelated particle effect. Priority: high for tone and content.

### 11. Aman Residences — global

**Evidence: PUBLISHED official residence page.** [Residences](https://www.aman.com/residences).

Useful as a residence-and-hospitality positioning reference rather than evidence of a 3D selector.

**Adaptation:** frame services, privacy, landscape and daily ritual alongside architecture. Write a short morning-to-evening lifestyle sequence using assets consistent with our building. Priority: high for editorial direction; technical stack unverified.

### 12. Six Senses Residences — global

**Evidence: PUBLISHED official residence page.** [Residences](https://www.sixsenses.com/en/residences/).

The residence offering lives within a broader hospitality and wellness ecosystem.

**Adaptation:** show the benefit of amenities through concrete scenes: a shaded terrace, wellness room or garden walk. Keep enquiry separate from hotel room booking so the buyer understands the action. Priority: medium.

### 13. Bugatti Residences by Binghatti — Dubai

**Evidence: PUBLISHED official project page.** [Project](https://www.bugattiresidences.com/).

Useful as a reference for a distinct branded property proposition, linked from Binghatti's official site. No walkthrough or underlying implementation was exercised.

**Adaptation:** let one clear architectural character shape the entire presentation. Do not borrow automotive trademarks or imply a brand partnership for a fictional demo. Priority: medium for positioning.

## Developer websites: useful commercial patterns

### 14. Emaar — UAE

**Evidence: PUBLISHED official content.** [Website](https://www.emaar.com/en).

The retrieved site exposes communities, launches and filters by property type, availability, bedroom count and price band.

**Adaptation:** if the client has multiple developments, organize first by community, then project and home. In the single-project demo, retain only a small useful filter set. Priority: high for scalable information architecture.

### 15. Sobha Realty — UAE

**Evidence: PUBLISHED official content.** [Website](https://sobharealty.com/).

The site emphasizes communities, craftsmanship, design and quality. Its large catalogue highlights the need for clear project hierarchy.

**Adaptation:** connect facade and interior details to material close-ups, then surface community amenities. Keep the demo navigation much smaller than a corporate catalogue. Priority: high for craft narrative.

### 16. OMNIYAT — Dubai

**Evidence: PUBLISHED official content.** [Website](https://omniyat.com/).

Its property framing connects individual developments with design, destination and bespoke services.

**Adaptation:** present our signature building as a coherent designed object, supported by architecture and location sections. Every premium claim should have visual or factual support. Priority: high for brand structure.

### 17. Binghatti — Dubai

**Evidence: PUBLISHED official content.** [Website](https://www.binghatti.com/).

The retrieved page includes branded collections, project/property/community discovery, an enquiry form and a mortgage calculator link.

**Adaptation:** make the property collection identifiable at a glance. Keep enquiry fields concise; any calculator added later needs explicit assumptions and proper local inputs. Priority: medium.

### 18. Lodha — India

**Evidence: PUBLISHED official content.** [Website](https://www.lodhagroup.com/).

The site separates signature developments, residential, townships and business spaces, and describes hospitality services.

**Adaptation:** combine aspirational architecture with familiar Indian-market enquiry paths and clear area conventions. For the demo, avoid copying unverifiable claims about delivery or service. Priority: high for local-market fit.

### 19. Godrej Properties — India

**Evidence: PUBLISHED official content.** [Website](https://www.godrejproperties.com/).

Visible content includes location-led project discovery, enquiry, site visit and WhatsApp routes.

**Adaptation:** carry selected property context into a viewing request; show whether it is a demonstration confirmation or a real request. The demo can present the WhatsApp action without sending a message. Priority: high for conversion flow.

### 20. DLF — India

**Evidence: PUBLISHED official content.** [Website](https://www.dlf.in/).

The corporate site separates homes, offices, retail and hospitality and includes guided contact prompts.

**Adaptation:** establish trust with real project facts and a short buyer journey. Avoid overwhelming a one-project demo with corporate sections. Priority: medium; useful context for Indian developer expectations.

## Visualization studios and sales platforms

### 21. The Boundary / Realspace

**Evidence: PUBLISHED official platform page.** [Realspace](https://www.the-boundary.com/realspace).

The platform describes centralized content, CMS, CRM connections, tours and personalized sales storytelling.

**Adaptation:** separate visual assets, unit metadata and presentation state in our architecture so the demo can evolve into a maintainable sales tool. Priority: high for future product planning. No commercial contract or pricing was obtained.

### 22. Brick Visual

**Evidence: PUBLISHED studio site.** [Studio](https://www.brickvisual.com/).

Its official offering spans architectural visualization, film, real-time experiences, VR, sales tools and branding.

**Adaptation:** prepare an art-direction brief before assembling assets. Evaluate compositions, atmosphere and narrative as one system. Treat the studio portfolio as reference material; it is not a free asset catalogue. Priority: high for visual ambition.

### 23. DBOX

**Evidence: PUBLISHED studio site.** [Studio](https://dbox.com/).

DBOX frames its work across branding, real estate, hospitality and marketing environments.

**Adaptation:** build a recognizable property identity and consistent messaging across hero, brochure and enquiry. A coherent campaign makes interactive content easier to remember. Priority: medium–high; code and production workflow unverified.

### 24. VisEngine

**Evidence: PUBLISHED service and portfolio content.** [Studio](https://visengine.com/).

The retrieved catalogue includes interactive masterplans, digital twins, panoramas, real-time rendering and sales applications, including a Sobha Hartland masterplan listing.

**Adaptation:** give amenity hotspots real descriptions and connect plan-based navigation to visual views. Distinguish an app capability from a feature independently tested on a specific deployment. Priority: high for masterplan scope.

### 25. Elite Residence — MindShare Solution

**Evidence: PUBLISHED maker case study.** [Project](https://mindsharesolution.com/portfolio/elite-residence).

The maker identifies Unity WebGL/WebAssembly and browser-based apartment walkthroughs, delivered through a gallery.

**Adaptation:** consider a game-engine route if an existing Unity environment is available. For our initial demo, a smaller browser-native scene likely gives more control over integration and loading. That comparison is an engineering judgment, not a measured benchmark of this project. Priority: medium.

### 26. Matterport

**Evidence: PUBLISHED official product site.** [Product](https://matterport.com/).

Matterport presents digital twins, tours, floor plans and property-marketing workflows.

**Adaptation:** suitable for an already-built property with an authorized capture. Do not substitute somebody else's public tour for a licensed client asset. An embed can shorten development but comes with account, access and plan dependencies. Priority: high if scans exist.

### 27. Shapespark

**Evidence: PUBLISHED official product explanation.** [Product](https://www.shapespark.com/).

Shapespark turns architectural models into browser walkthroughs and describes baking global illumination, embedding and model import workflows.

**Adaptation:** a serious alternative when a good architectural model exists and a configurable interior is required. Test model import, mobile performance, branding and hosting terms before committing. Priority: high as a buy-versus-build candidate.

### 28. 3DVista

**Evidence: PUBLISHED official product page.** [Product](https://www.3dvista.com/en/).

The product page presents panorama tours, GLB/glTF models, Gaussian splat support and guided tours.

**Adaptation:** useful for authoring rich tours without implementing every hotspot and interface control from scratch. Check current license, export and hosting terms separately. Priority: medium–high for a panorama-led delivery route.

### 29. Marzipano

**Evidence: PUBLISHED official tool and demo documentation.** [Tool](https://www.marzipano.net/).

Its browser tool generates a tour from panoramas and exports a web application; example sources are linked publicly.

**Adaptation:** a practical self-hosted route for three to five interior viewpoints with custom branding. We still need licensed panoramas, accessibility controls and consistent scene transitions. Priority: high for the recommended hybrid demo.

### 30. krpano

**Evidence: PUBLISHED official documentation.** [Product](https://krpano.com/home/).

The official site lists panorama, depth-map, 3D, map and Gaussian splatting features, along with scripting and JavaScript interfaces.

**Adaptation:** evaluate when the tour needs more advanced authoring and multiresolution imagery. Capability breadth also adds configuration and licensing work. Priority: medium; avoid adding it alongside another panorama engine without a specific need.

## Secondary commercial references

These were also retrieved but are not counted toward the 30 above:

| Reference | Evidence | Useful lesson |
|---|---|---|
| [The Agency](https://www.theagencyre.com/) | PUBLISHED | Location/agent search, regions, featured properties; useful for brokerage variant |
| [Compass](https://www.compass.com/) | PUBLISHED | Clear buyer/renter/seller entry points and neighbourhood discovery |
| [Douglas Elliman](https://www.elliman.com/) | PUBLISHED | Search, new development, market/editorial resources |

## Retrieval limitations

[Sotheby's International Realty](https://www.sothebysrealty.com/) returned a 405 during retrieval. [DAMAC](https://www.damacproperties.com/) returned 403. [One High Line](https://www.onehighline.com/), [111 West 57th](https://www.111w57.com/) and [The 42](https://www.the42.in/) were inaccessible through the retrieval tool. [Hayes Davidson](https://www.hayesdavidson.com/) yielded contact text only. These remain potential manual follow-up references; no interaction or design findings are asserted for them.

## Reference combination to carry forward

Our proposed combination is Esteria's progressive selection, 53 West 53's architectural hierarchy, CGIKite's unit-centric sales utility, Trielle's consistent visualization production and local enquiry patterns from Indian developers. These are patterns to reinterpret through original design and authorized assets.
