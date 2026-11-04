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
