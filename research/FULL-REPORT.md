# Real Estate Demo — Research Dossier

**Prepared for Sudhanshu · 4 November 2026 · Language: English with a Hinglish executive brief**

## Start here

Bhai, recommended direction clear hai: **ek flagship luxury residential project ka interactive sales experience**, jisme visitor architecture dekhne ke saath apna floor aur home choose kar sake. Client ko presentation ke andar participate karana hai. Visual quality, camera choreography, consistent architecture aur working interactions milkar impact banayenge.

**Working concept: AUREL — Residences Above the Ordinary.** Fictional name; trademark clearance has not been performed. One coherent development, one hero building, three home types, a memorable city-to-home journey. All project details will be clearly identified as demonstration data.

This is a research and planning package. Website implementation, paid asset acquisition, subscriptions, account creation, and deployment have not been started.

## Reading order

| File | What it answers |
|---|---|
| [01 — Strategy and findings](01-strategy-and-findings.md) | What should we build, why, and where should effort go? |
| [02 — Reference atlas](02-reference-atlas.md) | 30 individually discussed property, sales-experience and visualization references; what to adopt from each |
| [03 — 3D, maps and technical research](03-3d-maps-and-architecture.md) | How the visual effects work; map-to-interior handoff; implementation architecture |
| [04 — Asset and tools directory](04-assets-tools-and-licensing.md) | Model, material, HDRI, viewer, AI and authoring resources; acquisition criteria |
| [05 — Demo blueprint](05-demo-blueprint.md) | Art direction, storyboard, interactions, data, mobile behaviour and presentation script |
| [06 — Delivery, cost and verification](06-delivery-cost-and-verification.md) | Phases, effort estimates, dependency gates, risk handling, acceptance criteria |
| [Source register](sources.csv) | Research URLs and evidence status in a reusable spreadsheet-compatible file |

## The recommendation in 90 seconds

1. Open on a beautifully composed architectural image or short film. Make the property identity immediately understandable.
2. Offer **Explore the building** without forcing a long intro.
3. Reveal a simplified neighbourhood scene with useful landmarks, then move into the project.
4. Let the visitor rotate an optimized building, select a floor, and inspect a small set of apartments.
5. Open an apartment sheet with a readable plan, area, aspect and demonstration availability.
6. Enter a consistent, high-quality interior panorama. Switch between living room, bedroom and balcony.
7. Save or compare two homes and request a private viewing with the selected home already attached.

The intended memorable moment: **“You selected this home. Now step inside.”**

## Evidence and limitations

- **LIVE:** Esteria's masterplan → building → floor → apartment details → interior panorama was exercised in an actual browser. 53 West 53's homepage was visually inspected after dismissing the consent banner.
- **PUBLISHED:** Other findings use retrieved official site content, developer documentation or the maker's own case study. A published capability is not the same as an independently tested capability.
- **PROPOSED:** Our design decisions, engineering recommendations, scores, schedules and cost allowances. These are estimates or judgments, not measurements of reference websites.
- **LIMITED:** Some domains blocked retrieval or returned very little readable content. These are called out rather than treated as fully reviewed.

The report does **not** claim to have audited every real estate website, inspected proprietary backends, measured all reference-site performance, or reverse-engineered private code. It deliberately distinguishes cinematic video, image-based selectors, panoramas, real-time meshes and streamed applications. Exact city coverage, subscription terms and asset licenses must be checked for the selected location and product before purchase or implementation.

## Five references to open first

- [Esteria live demo](https://esteria.miraistudios.co/) — closest interaction flow; personally exercised.
- [ERA maker's technical breakdown](https://videinfra.com/blog/case-study-a-triple-site-of-the-day-winner-powered-by-webgl) — architectural identity and custom WebGL research.
- [CGIKite Coast Home Selector](https://cgikite.com/coast/about) — exterior exploration and home-selection capability benchmark.
- [53 West 53](https://53w53.com/) — premium architectural presentation; homepage visually inspected.
- [Trielle by The Boundary](https://www.the-boundary.com/work/trielle) — consistent visualization pipeline and finish variants.

**Decision to carry into the build:** create one polished end-to-end property journey before expanding the number of projects, screens or experimental effects.


---

# 01 — Strategy and research findings

## 1. The actual job of this demo

The demo must help a prospective client see a credible future for their business. An impressive animation earns attention; a useful interaction shows what that attention can become. The visitor should understand the property, feel its atmosphere, choose something meaningful, and see how a qualified enquiry reaches the sales team.

Assumption for planning: the client markets new residential developments, rather than operating a nationwide resale portal. Their actual business type, location, price band and existing assets remain unknown. We can research and design around this assumption now. If the client turns out to be a broker with many unrelated listings, the experience should move toward search, map results and property details; see the alternatives below.

Success is not guaranteed by a particular visual effect. The practical ambition is a demo that creates three reactions: “This looks like our positioning,” “Our buyers could use this,” and “You can actually deliver it.”

## 2. What the evidence suggests

### A. A property journey is stronger than an effects gallery

Esteria's published case study describes a masterplan-to-apartment journey and panoramic room navigation. Its core selection flow was also verified live in this research. The useful pattern is progressive disclosure: people see the whole development before choosing a specific home. Our implementation should preserve context and a clear way back at every step. [Maker's case study](https://www.miraistudios.co/work/esteria), [live experience](https://esteria.miraistudios.co/).

### B. The building itself can supply the visual identity

ERA's maker describes using architectural details as the basis for graphic language and a custom Three.js/WebGL experience. Our takeaway is to derive framing, linework and motion from our chosen architecture. A distinctive facade, terrace rhythm or courtyard geometry can become a recurring motif across the demo. [Vide Infra technical case study](https://videinfra.com/blog/case-study-a-triple-site-of-the-day-winner-powered-by-webgl).

### C. Premium positioning also needs ordinary information

53 West 53 visibly connects design, residences, amenities, neighbourhood and availability. Its live opening pairs architectural imagery with direct navigation. These fundamentals should remain easy to access even when our visitor chooses to skip the cinematic journey. [53 West 53](https://53w53.com/).

### D. A compelling sales experience extends outside the apartment

Razorfish describes Waldorf Astoria Miami's physical sales journey from city to neighbourhood to building to living room. This is a useful sequencing reference, but it is a physical/digital sales-gallery project, not proof that an ordinary website has the same capabilities or outcomes. Our adaptation is a shorter browser journey with a few relevant neighbourhood anchors. [Razorfish case study](https://www.razorfish.com/work/waldorf-astoria-miami/).

### E. One consistent scene can generate many deliverables

The Boundary describes Trielle's real-time visualization work, finish choices, CGI imagery and virtual tours. Neoscape describes a similar multi-output pipeline for Yellowstone Club. Our inference: investing in a coherent master scene is valuable because the same architecture can support a hero image, film, selection views and interior content. Individual exports still need separate optimization. [Trielle](https://www.the-boundary.com/work/trielle), [Yellowstone Club](https://neoscape.com/work/yellowstone-club-digital-twin-experience/).

## 3. Recommended product shape

**One development. One signature building. A small but complete choice journey.**

Use a fictional high-end residential project for the first demo unless actual client content is already licensed and available. A 12–18-storey concept building gives floor selection enough meaning without requiring hundreds of unique apartments. This is a proposed scope, not a requirement imposed by a reference.

Show three home types and around six fully described demonstration units. Repeated floors can exist visually, but any unit exposed as selectable should have consistent information. It is better to make six homes work coherently than to imply that 200 empty cards represent a finished system.

The core experience should be browseable through conventional navigation as well as the cinematic route. Suggested primary actions: Explore Building, View Residences, Explore Location, Request a Viewing.

## 4. Feature priority by client impact

Scores are planning judgments on a 1–5 scale. Effort assumes assets are available; custom asset creation is additional.

| Feature | Visual impact | Sales usefulness | Effort | Recommendation |
|---|---:|---:|---|---|
| Coherent architectural hero | 5 | 4 | Medium | Essential |
| Working floor and unit selection | 5 | 5 | High | Signature interaction |
| Clear apartment plan and details | 3 | 5 | Medium | Essential |
| Three-room panorama tour | 5 | 4 | Medium | Essential if consistent panoramas exist |
| Curated neighbourhood story | 4 | 4 | Medium | Include |
| Saved homes and two-home comparison | 3 | 5 | Low–medium | Include after core flow |
| Viewing enquiry with unit context | 2 | 5 | Low–medium | Essential |
| Day/night appearance | 4 | 2 | Medium | Optional second flourish |
| Material finish choices | 4 | 3 | Medium–high | Include only if assets support it |
| Photorealistic city flight | 5 | 3 | High; coverage dependent | Conditional enhancement |
| Measured sunlight simulation | 4 | 4 | High; accuracy dependent | Production phase |
| Full free-roam interior | 5 | 4 | Very high | Only if model is ready |
| Gaussian splat room | 5 | 3 | High; capture dependent | Experimental branch |
| AR building placement | 3 | 2 | Medium | Later |
| Voice assistant | 2 | 2 | High | Later |

## 5. Three viable creative directions

### Direction A — AUREL: elevated urban living — recommended

Warm limestone, bronze frames, planted terraces, generous glazing and a memorable roofline. The opening begins at blue hour or golden hour; the explorer uses clearer daylight. Editorial typography, restrained accents and crisp technical plans keep the site composed.

Why it fits: a residential tower naturally supports floor selection, apartment aspects, views, amenity stories and an arrival-to-home narrative. The most difficult asset is one credible building with consistent interiors.

### Direction B — VELA: coastal villas

Low-rise villas, water, shaded courtyards and lush landscape. Strong fit for hospitality-style storytelling and indoor-outdoor transitions. Selection becomes villa/plot selection rather than tower floors. Water and vegetation require careful optimization; drone or aerial context must match the development.

### Direction C — ATLAS: premium brokerage

An editorial portfolio with map/list synchronization, meaningful filters, individual property pages and a flagship virtual tour. This fits a broker better than a single-project tower. Its memorable feature is discovery and curation, supported by one immersive showcase property.

Direction A is the default. Switching to B or C should follow the client's actual inventory and audience, not an arbitrary visual preference.

## 6. Where the quality will come from

**Architecture:** believable structure, scale, circulation and landscaping. Avoid a model whose facade suggests one layout while plans show another.

**Art direction:** a single time-of-day language, deliberate camera framing and controlled colour. Premium does not require black-and-gold everywhere. Whiteley and Aman are useful content references for calmer lifestyle framing. [The Whiteley](https://www.thewhiteleylondon.com/), [Aman residences](https://www.aman.com/residences).

**Motion:** short, purposeful transitions connecting selection and context. A floor should highlight because it is being selected; a camera should move to explain the next step. Keep a skip route and make reduced-motion mode coherent.

**Interaction:** obvious controls, preserved selection, instant textual feedback and an escape from fullscreen viewers. A client should be able to use the demo without instructions.

**Sound:** optional and off by default. An opt-in ambient track can support a presentation, but the entire experience must work silently. Do not tie essential feedback to audio.

**Copy:** specific, short and consistent. Fictional demonstration facts should be labeled once in context and repeated where someone could reasonably mistake them for live price or availability.

## 7. Things that can weaken the pitch

- Long entrance loaders before the visitor knows what the property is.
- A visually dramatic homepage followed by empty destinations.
- Unrelated stock interiors, changing facade geometry or incompatible landscaping.
- Fullscreen effects that hide plans, prices or the enquiry action.
- A tiny floor hover target that has no touch equivalent.
- A map flight depending on coverage that has not been tested for the selected city.
- Presenting a stylized lighting toggle as an engineering sunlight analysis.
- Calling a panorama a freely walkable digital twin.
- Forms that claim a booking or message was sent when only local state changed.
- Fake awards, client logos, sold counts or testimonials.

## 8. What remains unknown before implementation

We do not need these answers to complete research. They become implementation inputs: client business type, target city, actual project brand, available CAD/BIM/SketchUp/Blender files, authorized renders, architectural plans, target device, meeting date, public hosting needs and paid-asset budget.

Until then, design for a fictional project, desktop-led presentation, a usable mobile experience, locally held demo data and no required paid integration. This keeps the first build concrete and reviewable.


---

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


---

# 03 — 3D, maps and technical architecture

All implementation choices in this chapter are proposals. Vendor capabilities are linked to official sources. No competitor's private source or backend was accessed.

## 1. Six different things people call “3D”

| Approach | What the visitor can do | What we need | Main trade-off |
|---|---|---|---|
| Rendered film | Watch a camera journey | A finished video and poster | Excellent visual control; no arbitrary viewpoint |
| Render plus SVG hotspots | Click floors/units on a fixed perspective | Render, polygons, metadata | Sharp and efficient; camera angles are pre-authored |
| 360° panorama tour | Look around fixed positions and change rooms | Equirectangular or cube panoramas | High realism; no continuous physical movement |
| Browser-rendered mesh | Orbit, select and potentially walk | Optimized geometry, textures, lighting | Flexible; GPU, memory and asset work matter |
| Gaussian splatting | Explore a captured volume | Trained/captured splat data | Photoreal potential; capture gaps and scene editing constraints |
| Cloud-streamed 3D | Control a remotely rendered environment | GPU server, application, streaming services | Strong fidelity; recurring cost, latency and concurrency |

These can be combined. The transition must communicate where the visitor is and preserve the selected home. A panorama cannot reveal a room that was never captured or rendered. A city mesh cannot reveal private interiors.

## 2. How a cinematic hero can work

### Option A — film with an immediate poster

Start with a compressed still image. Load a short muted film when appropriate, avoiding a full-screen blocking loader. Text and navigation remain ordinary HTML. A video may be produced from Blender, an architectural renderer or an existing authorized film. Our site should be useful if the video fails to autoplay or never loads.

Choose this when the film already exists or realism is more important than user-controlled hero movement. It is also a good fallback for reduced motion and weaker devices. The first frame, crop and colour grading should match the rest of the site.

### Option B — rendered building with a camera timeline

Load a glTF/GLB building, materials and environment into a browser renderer. Animate camera position and target along a constrained path. Overlay ordinary HTML headings and controls. [Three.js](https://threejs.org/) supplies the renderer ecosystem; [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) provides a React renderer for Three.js; [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) supports scroll-linked timelines.

For our demo, keep the intro camera timeline separate from user orbit control. When exploration starts, transfer control cleanly. If the camera and user controls simultaneously modify the view, the building can jump or resist dragging. Respect reduced motion with a static or short non-travelling alternative.

### Option C — pre-rendered angle sequence

Render a set of building angles offline, then select an image based on drag position. Synchronize per-angle selection overlays. This can feel like rotation while keeping runtime lighting simple. Its hidden cost is asset count, transfer size and maintaining polygons across views. It does not provide unrestricted 3D movement.

**Proposed choice:** use a poster/film for opening polish and an optimized mesh for the main explorer. If the building mesh cannot meet quality and loading goals, use a fixed render selector for the first complete demo and describe it accurately.

## 3. Building, floor and apartment selection

### A mesh-based implementation

Author separate named selection meshes or proxy volumes for floors/units. A pointer ray intersects these proxies; the selected identifier looks up metadata. Selection meshes can be simpler than visible architecture. Show a subtle outline or translucent selection treatment and update an adjacent information panel.

Example naming convention: `building_A`, `floor_08`, `unit_A0802`, `balcony_A0802`. Prefer explicit metadata in glTF extras or a validated mapping file. Never depend on a model's arbitrary child index, because re-export can change it.

Essential behaviour:

1. Hover previews a floor on desktop; keyboard focus provides an equivalent.
2. Click/tap selects it and reveals the available unit list.
3. Unit selection synchronizes the highlight, detail card, plan and URL state.
4. Returning to the building retains the chosen floor.
5. Sold/reserved/available states have text labels and an accessible list alternative.

### A render-based implementation

Place an SVG with the same aspect ratio above the building image. Each floor/unit polygon has an ID. Use a `viewBox` so scaling stays aligned. Avoid independently cropping the background image without transforming the overlay. On narrow screens, either retain the full illustration or choose a separately authored mobile composition.

This is a credible method for a premium demo. The Esteria live building screens visibly exposed images and outlines before the panorama canvas; this suggests a mixed representation, but does not establish every implementation detail. Its maker confirms a Three.js panoramic component. [Esteria case study](https://www.miraistudios.co/work/esteria).

### Floor-plan interaction

Use a clean vector plan with room labels, orientation and area definitions. Hover/click can highlight a room and open its corresponding panorama. Keep the plan visible as a minimap inside the tour when space allows. A furnished axonometric image can complement the plan, but it should not replace readable geometry and dimensions.

## 4. The map-to-interior effect the user described

The convincing illusion is a sequence of scale changes:

**City → neighbourhood → project parcel → building → floor → apartment → room.**

It is usually an orchestration problem, not one magical API. The geographic map, architectural model and interior viewer are different datasets and may use different renderers.

### Proposed handoff

1. Begin at a curated city camera position, not an unbounded globe.
2. Animate to the project location while explaining two or three nearby anchors.
3. At a useful project scale, fade into an authored building scene that shares the same orientation.
4. Move to the chosen building/floor using the local scene.
5. Open the selected home card and plan.
6. Transition into an authorized panorama or modeled interior using the selected unit ID.

Use a short fade or architectural framing device to conceal the scene swap. Trying to make different datasets align perfectly through a window can consume disproportionate effort. A good transition gives continuity without pretending the entire city and interior are one continuous scan.

### What the datasets cannot provide automatically

Google's photorealistic city data does not supply apartment plans, unit boundaries, current sales availability or arbitrary private interiors. A future development needs its own model. A real property interior needs authorized scans, panoramas or modeled content. Coverage and visual resolution vary by place; the chosen Indian city and exact project must be tested before promising a photoreal city flight. [Google Map Tiles overview](https://mapsplatform.google.com/maps-products/map-tiles/), [Photorealistic 3D Tiles documentation](https://developers.google.cn/maps/documentation/tile/3d-tiles?hl=en).

## 5. Map platform decision

| Route | Good fit | Dependencies | Decision for this demo |
|---|---|---|---|
| Google photorealistic tiles + CesiumJS | Globe/city context using a supported 3D Tiles renderer | Coverage, key, billing, visible attribution, network | Conditional enhancement |
| Google native 3D Maps | Integrated Google 3D-map experience | Current product/API status, coverage, account and pricing | Evaluate only after location is known |
| Mapbox + custom glTF model | Styled neighbourhood map with project overlay | Token, map-load pricing, placement and rendering work | Strong production option |
| MapLibre + licensed basemap/terrain | Control over map renderer and providers | Data source, hosting, tile license and operations | Alternative when provider strategy is explicit |
| Authored local 3D district | Highly controlled, presentation-ready neighbourhood story | Original modeled context and clear illustrative label | Recommended first-demo default |
| Custom illustrated 2D map | Useful landmarks on low-end/mobile devices | Original map artwork or licensed geographic source | Mandatory fallback candidate |

CesiumJS supports 3D Tiles, terrain and glTF, and is released under Apache 2.0; imagery and hosted services have separate terms. [CesiumJS official page](https://cesium.com/platform/cesiumjs/).

Mapbox publishes a concrete Three.js custom-layer example and notes a native model-layer option. This verifies that project models can be placed on a map; it does not solve apartment-selection semantics for us. [Mapbox example](https://docs.mapbox.com/mapbox-gl-js/example/add-3d-model/).

MapLibre is an open-source renderer candidate, not a source of free unrestricted satellite imagery. The specific Three.js example URL attempted during research returned 404; no sample code from that URL should be treated as verified. Start future evaluation from the [official MapLibre site](https://maplibre.org/).

## 6. Map usage and cost boundaries

Google's current policy requires visible Google Maps attribution and applicable provider credit. It restricts prefetching, storage and offline use subject to the agreement. Do not build an offline map by downloading the tiles. Our offline presentation fallback must use original or separately licensed district assets. [Map Tiles policies](https://developers.google.com/maps/documentation/tile/policies).

Product pricing is tied to specific SKUs and usage definitions. Google currently offers subscription and pay-as-you-go information; do not estimate a photorealistic map by applying a generic “map view” price. Use the appropriate account/region and selected product's current price table. [Official pricing](https://mapsplatform.google.com/pricing/).

Before activation: restrict a client-visible API key to expected domains/APIs, apply available quotas, add budget alerts, and test expected interaction usage. Alerts alone are not a hard spending cap. Avoid mounting multiple map instances merely because a drawer opens and closes.

## 7. Interior delivery options

### Panorama — recommended initial route

Need at least a living room, bedroom and balcony view from one consistent environment. Use a sphere/cube panorama renderer, room hotspots and a room menu. Load the next likely room after the current view becomes usable. [Marzipano](https://www.marzipano.net/) exports tour applications; [Pannellum](https://pannellum.org/) is another lightweight open-source viewer.

Photorealism comes from the source images. A normal perspective photograph is not a complete 360° panorama. AI outpainting can create illustrative content, but spatial consistency must be checked and it cannot establish an accurate real apartment layout.

### Real-time mesh walkthrough

Offers continuous movement, finish changes and object interactions. Requires a web-ready interior, baked or carefully managed lighting, navigation constraints and collision or guided waypoints. Build guided camera positions first so the client cannot walk outside the model. [Shapespark](https://www.shapespark.com/) is a product alternative for architectural browser tours.

### Gaussian splatting

Useful for capturing a real furnished space. Requires capture coverage, reconstruction, cleanup and device testing. Splats are not automatically an editable BIM model or a reliable collision mesh. Mirrors, windows and previously unseen surfaces can expose artifacts. PlayCanvas provides viewing, editing and application workflows through its splat ecosystem. [Official Gaussian splatting guide](https://developer.playcanvas.com/user-manual/gaussian-splatting/).

### Unreal Pixel Streaming

The application runs on a PC/cloud server and streams frames and audio to the browser over WebRTC. Browser controls are returned to the application. This shifts rendering cost to infrastructure and introduces networking/concurrency planning. It is not equivalent to compiling a normal Unreal scene into a lightweight webpage. [Epic's official explanation](https://dev.epicgames.com/documentation/en-us/unreal-engine/pixel-streaming-in-unreal-engine/?application_version=5.0).

Choose streaming only when source assets, visual requirements and a funded operating model justify it. Benchmark one session and concurrent sessions before estimating public costs. The linked conceptual documentation is versioned 5.0; exact implementation must use documentation matching the selected engine version.

## 8. Proposed application architecture

**Default:** React + TypeScript + Vite, Three.js/React Three Fiber for the explorer, a single panorama engine, GSAP for selected camera/UI timelines, static JSON for demo inventory, ordinary HTML for property content. Next.js is a reasonable substitution when server rendering, SEO routes or backend services become part of scope.

R3F and React major versions must be paired as documented. Pin stable compatible dependencies at build time rather than adopting an alpha rendering path for novelty. [R3F compatibility guidance](https://r3f.docs.pmnd.rs/getting-started/introduction).

Keep these responsibilities separate:

- `ProjectContent`: story, location, amenities, approved copy.
- `Inventory`: unit IDs, floors, area definitions, status, plan and tour references.
- `ExperienceState`: selected floor/unit, camera mode, theme, saved units.
- `BuildingScene`: models, lights, camera and selection proxies.
- `TourViewer`: room state and panorama resources.
- `LeadFlow`: validation, selected-unit context and honest confirmation.

Scene states: `overview → building → floor → unit → tour`. Returning should preserve useful state. Errors should lead to a usable image, plan and enquiry action, not a blank canvas.

Use a single main graphics context where practical. Dispose textures, geometries and controls when changing experiences. Avoid loading the city renderer, full building and every interior simultaneously. Core copy, plans and unit list should remain accessible without the graphics scene.

## 9. Model-production pipeline

1. Obtain model ownership and export permissions.
2. Open the original scene and inspect units, transforms, missing assets and material compatibility.
3. Keep a high-quality master; create a separate runtime export.
4. Remove unseen geometry and separate selection proxies.
5. Instance repeated balcony/facade/plant geometry where appropriate.
6. Bake suitable lighting and consolidate materials without destroying selectable IDs.
7. Export glTF/GLB and validate orientation, transparency, UVs and naming.
8. Simplify/compress geometry and textures; compare appearance after each change.
9. Test runtime load, orbit, selection and tour handoff on actual devices.
10. Export a poster and fallback views from the same master scene.

[glTF Transform](https://gltf-transform.dev/) provides inspect/transform/optimization tooling including deduplication, simplification, mesh compression and texture workflows. Compression must match the renderer's configured decoders. Smaller download size does not automatically mean lower GPU memory or faster decode on every device.

## 10. Proposed performance budgets

These are initial acceptance targets, not measured competitor statistics:

| Item | Initial target |
|---|---|
| First visible architectural poster | Roughly 150–400 KB where quality permits |
| Initial non-3D page transfer | Aim below 1.5 MB compressed, excluding deferred film/model |
| Main building download | Aim 3–8 MB compressed; revise after prototype |
| First panorama | Aim 1–3 MB initial level; tile larger resolutions |
| Rendering | Aim 60 fps on presentation laptop, usable 30 fps on target mid-range phone |
| LCP / INP / CLS | Aim ≤2.5 s / ≤200 ms / ≤0.1 under an agreed test profile |
| Graphics lifecycle | No accumulated canvases or repeated full texture loads after navigation |

Model triangle counts and draw calls should be profiled rather than fixed by folklore. Start around a few hundred thousand visible triangles for the main building, minimize material switches, then use measured device behaviour to decide reductions. Transparent vegetation, full-resolution shadows and high device pixel ratio can cost more than expected.

The project needs a poster-first shell, deferred heavy assets, adjustable pixel ratio, conservative shadows, loading/error states, reduced-motion handling and image/list fallbacks. These are part of the experience design, not cleanup after the animation is finished.


---

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


---

# 05 — AUREL demo blueprint

Everything below is proposed original design. AUREL is a fictional working name. Project location, plans, areas, prices, availability, views and amenities are demonstration content until replaced by approved client information.

## 1. Creative premise

**AUREL — Residences Above the Ordinary.**

The property is presented as a place someone can choose, understand and imagine living in. A warm stone tower with planted terraces becomes the visual anchor. The user moves from its setting to a selected residence and then to an interior view.

Opening line candidate: **A different perspective on home.**

Supporting line candidate: “Thoughtfully framed spaces. A city within reach.” Keep the exact location out of hero copy until it is established. The project should have an original wordmark and one recurring visual gesture derived from its architecture, such as a terrace frame.

## 2. Visual system

| Element | Proposed direction |
|---|---|
| Background | Warm ivory `#F4F0E8` for content; deep charcoal `#18221F` for selected immersive scenes |
| Accent | Muted bronze `#A8875F`, tested for contrast before use in text/buttons |
| Secondary | Deep green `#28463C` for selection and navigation |
| Type | Editorial display face plus highly readable sans-serif; final fonts require license review |
| Composition | Large architectural frames, generous margins, carefully cropped detail photography |
| UI | Crisp controls, subtle borders, calm panels and readable plans |
| Motion | Camera transitions explaining context; restrained text reveals |
| Icons | One coherent vector set, with labels for important actions |
| Sound | Opt-in ambient atmosphere; silent experience fully functional |

Colour values are starting points, not an accessibility sign-off. Avoid thin low-contrast bronze labels over reflective glass. Keep navigation and CTAs visible against changing imagery.

## 3. Content structure

Primary navigation: The Vision · Residences · Location · Amenities · Request a Viewing.

Main experience:

1. Architectural opening.
2. Short project introduction.
3. Neighbourhood context.
4. Building and home explorer.
5. Interior tour.
6. Lifestyle and materials.
7. Saved-home comparison.
8. Viewing request.

Direct access: the user can open the residence list or enquiry without completing the introduction. “Explore Building” is the prominent hero action. Keep ordinary scroll working outside the interactive viewer.

## 4. Storyboard and interaction choreography

Durations below describe a rehearsed demonstration path, not forced waiting periods.

### Scene 01 — Arrival, first 10–15 seconds

Show an immediately visible architectural poster, project name, short proposition and Explore Building. Optional film introduces the roofline and terraces. Navigation appears promptly and remains usable.

The client should understand “luxury residential development” without interpreting a long abstract animation. A small “Concept demonstration” disclosure can sit in project information; fictional price/status labels remain explicit where shown.

### Scene 02 — Context, next 15–25 seconds

Open a curated district scene with four or five meaningful locations: park, transit, work district, culture/dining and waterfront if the fictional context supports it. Selecting a landmark opens a small card and changes camera framing.

For the first demo, labels can describe illustrative proximity rather than assert real travel times. A real location variant must verify coordinates, source travel times and provider coverage. Include a list view and a clear “Enter the development” action.

### Scene 03 — Architecture, next 15–20 seconds

Transition to the building scene. The building fills enough of the viewport to invite exploration without hiding its roof or base. Desktop supports constrained orbit and zoom; mobile gets drag plus explicit reset and preset viewpoints.

Use one subtle instruction: “Select a floor to explore.” A floor dropdown/list remains available. Add three camera presets: Arrival, Gardens, Skyline. Night mode is optional after selection is complete, and should be described as an appearance mode rather than a solar study.

### Scene 04 — Choose a floor, next 10–15 seconds

Highlight the selected floor. Show floor number, number of example homes and a list of units. Let filters narrow by home type, aspect and sample availability. Include an empty-results state with Reset filters.

For a render-based selector, use a clear side elevation/perspective and SVG overlays. For a mesh-based selector, use proxy volumes with stable unit identifiers. Both routes need a keyboard-accessible list.

### Scene 05 — Meet the home, next 20–30 seconds

Open a side sheet on desktop and a bottom sheet on mobile. Display unit ID, home type, floor, area label, aspect and demonstration status. Present the plan with readable room names, a north indicator and explicit units.

Actions: View Inside · Save Home · Compare · Request a Viewing. Preserve selection when moving between plan, tour and building. If a unit does not have a unique interior, say it uses the representative tour for its home type.

### Scene 06 — Step inside, next 20–30 seconds

Enter a full-viewport living-room panorama. Show room name, Exit Tour, Reset View, room menu and optional plan minimap. Hotspots lead to bedroom and balcony. Provide a guided viewpoint option so the presenter can reliably reveal the strongest composition.

The balcony is the emotional payoff. Its architecture and exterior view should match the selected concept. Avoid claiming it is a surveyed floor-specific view. If the interior assets are representative rather than exact, show that in the tour context.

### Scene 07 — Compare and decide, next 15–20 seconds

Compare two saved homes by type, labelled area, floor, aspect and sample price/status where included. Make differences easy to scan. Do not use a dense table of decorative “luxury” adjectives. A comparison action should return to each home while preserving the other selection.

### Scene 08 — Private viewing, next 15–20 seconds

The form carries selected unit IDs forward. Ask for name, preferred contact method, contact detail and a preferred viewing slot. Demo confirmation should say that the request was demonstrated or saved locally. Do not claim a calendar event or sales message exists unless a real integration successfully created it.

End with the selected property image and a concise next step. A paid reservation or real purchase is outside this demo scope.

## 5. Demonstration inventory

Use around six fully populated homes across three types. Suggested illustrative types: Garden Residence, Skyline Residence and Terrace Penthouse. These labels are creative proposals and should not imply real inventory.

Required data fields:

| Field | Purpose |
|---|---|
| `id`, `buildingId`, `floor` | Reliable selection and navigation |
| `type`, `bedrooms` | Discovery and comparison |
| `areaValue`, `areaUnit`, `areaDefinition` | Avoid carpet/saleable/internal-area ambiguity |
| `aspect`, `viewLabel` | Explain orientation and representative view |
| `status`, `isDemo` | Honest availability display |
| `price`, `currency`, `priceQualifier` | Optional; explicitly illustrative |
| `planAsset`, `tourId`, `sceneNodeId` | Connect data to visual assets |
| `tourIsRepresentative` | Explain shared tour content |

The same source data should populate list, detail sheet, comparison and enquiry. A status change must not require editing four separate UI components.

## 6. Feature definition of done

### Explorer

- The selected floor and apartment are visibly highlighted.
- Detail data always matches the selected unit ID.
- Reset returns to a useful view without clearing saved homes.
- Pointer, touch and keyboard/list routes work.
- Loading or model failure leads to a usable image/list alternative.

### Plans and tours

- Plans remain readable at common phone sizes.
- Panoramas use an appropriate projection and consistent room naming.
- Every visible hotspot has a destination and a way back.
- Exit retains the selected unit; no dead ends.
- Representative views are labelled accurately.

### Save and compare

- Save toggles are synchronized across all screens.
- Two homes can be compared and removed independently.
- An empty saved state has a useful return action.
- Optional local persistence is scoped to demo preferences, not claimed as an account.

### Enquiry

- Required fields have clear labels and inline errors.
- Unit context is visible before confirmation.
- The success message reflects the actual destination of the data.
- A real endpoint, if later added, handles failure and duplicate submissions.

## 7. Mobile adaptation

Mobile should be designed as a first-class route with a different composition where necessary. Use shorter headings, a bottom information sheet, a floor picker and a clear View Inside button. Do not rely on hover.

Use a poster or short lightweight intro; defer the district and model until requested. Limit pixel ratio and effects based on measured device behaviour. Allow full-screen viewing as an option, with an obvious exit and portrait-friendly controls.

Use sufficiently large touch targets, readable labels and safe-area padding. Avoid asking the user to rotate their phone before they can browse basic information. A landscape viewer may be offered for more space, but plans, details and enquiry should work in portrait.

Keyboard navigation, visible focus, dialog focus handling, semantic buttons and reduced-motion behaviour should be designed along with the visual interaction. The residence list is an equally valid entry point into the experience.

## 8. Three memorable moments worth prioritizing

**The arrival:** cinematic architectural composition resolves into a usable explorer. The same building appears throughout, reinforcing credibility.

**The choice:** a selected floor and home visibly connect to a readable plan. The interaction makes the visitor feel that the project is understandable.

**The entry:** the selected home opens into a convincing interior, then balcony. The visitor is rewarded with spatial context and atmosphere.

Optional fourth moment: a controlled day-to-evening appearance change, created from consistent assets. Do not add this until the first three work smoothly.

## 9. Client presentation script

“This is a concept for how buyers could explore your project before visiting.” Open with the building and let the client look for a few seconds.

“Let's choose a home.” Select a floor and apartment, show the plan and explain one useful difference such as aspect or terrace.

“Now we can go inside.” Open the tour and reveal the balcony. Let the client drag or choose a room themselves.

“The sales enquiry carries that exact home forward.” Save/compare two homes, then open the contextual viewing request.

After the experience, discuss what would change for their actual project: licensed architectural content, real inventory, approved pricing, CRM and the project's own brand. Explain which elements are working now and which are representative. Do not bury the strong experience under a long explanation of libraries and APIs.

## 10. What the demo should prove

The final demo should prove visual taste, architectural consistency, meaningful interaction, reliable delivery and a credible next step toward production. It does not need a nationwide property database or a custom renderer to achieve that.


---

# 06 — Delivery plan, cost model and verification

## 1. Scope tiers

All effort ranges are author planning estimates, not supplier quotes or commitments. They assume an experienced builder, timely design decisions and ready or readily adaptable assets. Custom architecture, source-file repair, panorama rendering, data approvals and client revisions can substantially extend them. A working day means a focused day of project work; rendering and external review can add elapsed time.

| Tier | Working scope | Estimated build effort with usable assets | Asset dependency |
|---|---|---|---|
| A — Polished interactive presentation | Poster/film hero, fixed-render floor selector, plans, panorama tour, enquiry | 6–10 working days | Consistent renders and panoramas |
| B — Signature hybrid demo — recommended | Tier A plus real-time building orbit/selection, authored district, save/compare and device polish | 12–20 working days | Web-ready building and coherent interior content |
| C — Expanded digital sales environment | Detailed free-roam interiors, finish variants, richer city integration, live systems | 25–45+ working days | Full environment production and integration access |

The asset-production estimate is intentionally separate: simple original concept architecture and furnishing may add roughly 5–15 working days; detailed custom architectural modeling, verified views or multiple apartment types can take much longer and should be quoted from actual source files. A captured tour also depends on property access and capture scheduling.

## 2. Recommended phase plan

### Phase 0 — Inputs and chosen route

Confirm business type, project concept, target device and available assets. Select the initial building/interior candidates. Record rights, formats and missing content. Choose whether the map is authored or provider-backed. Deliver a short art-direction sheet and final demo feature list.

Exit condition: one coherent visual world is feasible, with an authorized source path. If the client has no usable architectural assets, choose original concept architecture before promising a real-project reconstruction.

### Phase 1 — Asset proof and one interaction

Load one building or render, select one floor, display one home card and enter one panorama. Test on the intended laptop and a mid-range phone. Capture asset sizes, frame behaviour and quality issues.

Exit condition: there is a credible path to acceptable realism and usability. This is the earliest point to reject an attractive but unusable marketplace model.

### Phase 2 — Visual foundation

Create typography, spacing, navigation, buttons, detail sheets and the architectural hero. Produce the matching poster and mobile crop. Implement basic responsive layouts and demo disclosures.

Exit condition: the opening and core content look intentional even before all motion is added.

### Phase 3 — Complete property journey

Connect district, building, floor, unit, plan and interior states. Add six coherent units and three home types. Make all back/exit/reset routes work. Use a single inventory source for every screen.

Exit condition: a new visitor can complete the entire main path without coaching or dead links.

### Phase 4 — Sales utility

Implement saving, two-home comparison, contextual enquiry, validation and truthful confirmation. Add optional shareable unit routes. For the demo, avoid external message/calendar side effects unless specifically included in scope.

Exit condition: the selected property context survives from discovery to enquiry.

### Phase 5 — Choreography and device polish

Tune camera transitions, lighting, image crops, loading, error handling, touch controls and reduced motion. Optimize materials and texture memory. Add the optional appearance toggle only if the main experience is stable.

Exit condition: target-device performance and usability meet the agreed acceptance profile.

### Phase 6 — Rehearsal and handoff

Run the exact meeting sequence on the presentation device and network. Keep a usable fallback with original/licensed local assets. Deliver a hosted preview if authorized, source, asset manifest and a clear production roadmap.

Exit condition: the presenter can confidently show the full experience and accurately explain what is demonstration data.

## 3. Cost model

Separate four categories: build labour, asset creation/licensing, service subscriptions/API usage and ongoing operation. A low hosting bill says little about the cost of producing excellent architectural content.

### Proposed out-of-pocket planning allowances

These INR bands are internal budgeting allowances chosen for planning, not verified market averages, currency conversions or vendor prices. They exclude labour, taxes and extensive custom modeling. Do not buy anything solely because it fits a band.

| Route | Suggested initial allowance | What it is for |
|---|---:|---|
| Original geometry + CC0 materials | ₹0–₹5,000 | Small incidental licensing/hosting needs; substantial labour remains |
| Licensed hybrid asset collection | ₹5,000–₹25,000 | A suitable building/interior base and supporting assets, subject to actual listings |
| More extensive premium assets/tools | ₹25,000–₹75,000+ | Larger scenes, commercial tour tools or additional outputs, subject to quote |
| Custom commissioned environment | Quote required | Geometry, interiors, landscaping, renders and revisions |
| Streamed real-time experience | Usage model and quote required | GPU infrastructure, streaming services, concurrency and support |

Before a purchase, collect the exact item price, applicable taxes, license class, web-delivery terms, required seats, recurring charges and refund conditions. A cheap asset that requires days of repair may cost more than a purpose-built simple model.

### Current pricing sources to consult

- [Google Maps Platform pricing](https://mapsplatform.google.com/pricing/) — choose the exact map/tiles/3D SKU and applicable region/account terms.
- [Spline pricing](https://spline.design/pricing) — linked from the retrieved official homepage; plan/export requirements should be checked before commitment.
- [Shapespark](https://www.shapespark.com/) — confirm current authoring, hosting and deployment terms.
- [3DVista](https://www.3dvista.com/en/) — official page describes a one-time purchase proposition; hosting and related services are separate decisions.
- [Matterport](https://matterport.com/) — quote the required active spaces, access, capture and export/embed capabilities, not just a headline plan.
- Marketplace item pages on [Fab](https://www.fab.com/), [CGTrader](https://www.cgtrader.com/), [TurboSquid](https://www.turbosquid.com/) and [Blendkit](https://www.blendkit.com/) — actual chosen-item prices remain uncollected.

Exact numerical vendor rates are deliberately not reproduced because the correct bill depends on selected items, product tiers and usage. No paid services were activated in this research.

## 4. Service usage estimation

For a map, estimate sessions, map openings per session, billable events defined by the chosen SKU, and cache behaviour allowed by the provider. Compare those inputs against the current official table. Separate panorama/3D downloads on our CDN from third-party API usage.

For streaming, estimate GPU instance/session cost, concurrency, warm capacity, session duration, bandwidth and support. One beautiful single-user demo is not evidence that a public deployment can support many simultaneous users economically.

For ordinary hosting, estimate transferred asset size multiplied by sessions and repeat-navigation behaviour, then account for provider-specific caching and pricing. Test image/video range requests and compression. Avoid loading the complete asset collection on every landing-page visit.

## 5. Key risks and responses

| Risk | Early signal | Response |
|---|---|---|
| Model quality is unsuitable | Missing textures, no floor separation, huge scene | Asset proof before purchase/commitment; simple custom proxies or replacement |
| Interiors do not match exterior | Different window spacing/view direction | Shared scene/camera bible and cross-view review |
| Photoreal map has poor coverage | Site looks flat or incomplete at project coordinate | Use authored district and independently useful location content |
| Mid-range phone struggles | Input delay, context loss, severe frame drops | Reduce effects/resolution; defer scene; maintain image/list path |
| Film or panorama blocks entry | Blank page, giant initial download | Poster-first shell and progressive loading |
| Selector fails on touch | Tiny targets or hover dependence | Floor picker and unit list alongside visual selection |
| Availability contradicts itself | Different values across cards/compare | Single validated inventory source |
| Booking seems live when it is not | Generic “booking confirmed” message | Explicit demonstration/local-save confirmation |
| License does not fit browser model delivery | Raw-model redistribution restrictions | Alternate license, permission or render/panorama route |
| Map outage during presentation | Tiles/API unavailable | Original local district fallback, never cached provider tiles |
| Scope expands into a full portal | Accounts/search/admin distract from showcase | Complete the agreed flagship journey first |

## 6. Verification plan

Use checks that can catch real failures. Avoid tests that merely repeat component implementation.

### Data and interaction checks

- Every selectable unit ID maps to a valid floor, plan and tour or explicitly documented representative tour.
- Filtering can return both results and an understandable empty state.
- Changing floor clears an incompatible active unit while preserving saved homes.
- Detail, comparison and enquiry use identical unit facts.
- Save/remove and compare work from more than one entry point.
- Back, Exit Tour and Reset restore useful context.
- Forms distinguish invalid input, local demo confirmation, real request success and network failure as applicable.

### Visual checks

- Hero, exterior, plan and interior describe the same concept.
- Desktop and mobile crops preserve important architecture and text.
- Glass, shadows, tone mapping and materials look coherent after compression.
- Panoramas have no obvious seams or incorrect projection.
- Selection highlights are readable and do not hide architectural information.
- Loading and errors look designed rather than exposing raw technical messages.

### Device and accessibility checks

- Actual presentation laptop/browser on the expected network.
- At least one mid-range Android phone and one iPhone/Safari when available.
- Keyboard path through navigation, unit selection, sheet, tour controls and enquiry.
- Focus stays visible and returns sensibly after closing dialogs.
- Reduced-motion mode preserves content and actions.
- Slow-network and failed-asset cases remain usable.
- Repeated viewer open/close does not accumulate graphics contexts or unusable memory growth.

### Performance evidence

Record test device, browser, viewport, network profile, cold/warm cache, asset transfer sizes and measured metrics. Report results with those conditions. Do not call a desktop-only smooth render “optimized for all devices.” Apply Chapter 03's proposed budgets and revise them only with explicit trade-off reasoning.

## 7. Production upgrade path

After the demo is approved as a direction, replace fictional project facts with approved content. Add real inventory through a CMS or CRM, selected-unit lead handling, consent/privacy text, spam protection, analytics and monitoring. Integrate actual viewing availability only when the scheduling source is authoritative.

For an Indian project, production content needs approved area definitions, pricing qualifications and project disclosures. This report is not a legal compliance review; applicable RERA and state-specific advertising requirements must be verified for the actual project before public marketing. No registration numbers or statutory claims should be invented for a fictional demo.

SEO, indexable property routes, structured content, accessible plans, asset ownership, renewal costs and maintenance responsibilities should be part of the production proposal. The immersive experience should remain an enhancement to a clear property-information product.

## 8. Final scope recommendation

Proceed with Tier B if a suitable building and interior scene can be obtained. The initial acceptance package is:

1. Original premium identity and cinematic hero.
2. Curated authored neighbourhood scene.
3. One interactive building with floor selection.
4. Six coherent demonstration units across three types.
5. Readable plans and a three-room representative tour.
6. Save and two-home comparison.
7. Context-aware viewing request with honest demo confirmation.
8. Mobile, keyboard, reduced-motion and asset-failure routes.
9. Source, asset manifest and a presentation-ready build.

The strongest next implementation step is the building-to-home asset proof. It tests the central promise of the experience before the project spends time on secondary flourishes.

