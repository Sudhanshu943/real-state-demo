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
