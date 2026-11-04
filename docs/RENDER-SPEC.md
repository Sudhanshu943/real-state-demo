# AUREL — 3D Scene & Rendering Specification

## 1. World Coordinate System & Axes
- **Engine:** Three.js / React Three Fiber (`@react-three/fiber` v9, `@react-three/drei` v10)
- **Unit of Measurement:** 1 unit = 1 metre ($1.0\,\text{m}$)
- **Coordinate Conventions:**
  - $+X$ = East
  - $-X$ = West
  - $+Y$ = Up (Elevation)
  - $+Z$ = South (Front Facade & Private Balconies)
  - $-Z$ = North (Rear Facade / City Perspective)
- **Tower Origin:** Centered at world $(X=0, Z=0)$. Base level plinth at $Y=0$.

---

## 2. Tower Geometry & Floor Formulas
- **Envelope Footprint:** Width $28\,\text{m}$ ($X \in [-14, 14]$), Depth $20\,\text{m}$ ($Z \in [-10, 10]$).
- **Core Zone:** Width $2\,\text{m}$ centered at $X \in [-1, 1]$.
- **Vertical Storey Dimensions:**
  - Lobby Level Ground ($G$): $Y=0$ to $Y=4.6\,\text{m}$ ($4.6\,\text{m}$ floor-to-ceiling clear height).
  - Residential Storey Height: $3.4\,\text{m}$ per level.
  - Storey $n$ Slab Base Elevation: $Y = 4.6 + (n - 1) \times 3.4\,\text{m}$.
  - Storey $n$ Camera/Highlight Center: $Y_{\text{center}} = Y_{\text{base}} + 1.7\,\text{m}$.
  - Total Residential Levels: 12.
  - Roof Slab Base: $4.6 + 12 \times 3.4 = 45.4\,\text{m}$.
  - Roof Parapet & Pergola: Rises from $Y=45.4\,\text{m}$ to $Y=48.0\,\text{m}$.

### Canonical Interactive Example Floors
- **Floor 4 (Garden Collection):** Slab base $Y = 14.8\,\text{m}$, Center $Y = 16.5\,\text{m}$. Units `A0401` (West) and `A0402` (East).
- **Floor 8 (Skyline Collection):** Slab base $Y = 28.4\,\text{m}$, Center $Y = 30.1\,\text{m}$. Units `A0801` (West) and `A0802` (East).
- **Floor 12 (Terrace Penthouse):** Slab base $Y = 42.0\,\text{m}$, Center $Y = 43.7\,\text{m}$. Units `A1201` (West) and `A1202` (East).

---

## 3. Camera Rig Presets & Clamping
- **Orbit Distance:** Clamped between $25\,\text{m}$ and $160\,\text{m}$ (exterior); $60\,\text{m}$ to $400\,\text{m}$ (district).
- **Polar Angle:** Clamped between $\pi/6$ ($30^\circ$) and $\pi/2.05$ ($87.8^\circ$) to prevent underground clipping.
- **Exterior Presets:**
  - **Overview:** Position `[65, 40, 75]`, Target `[0, 23, 0]`
  - **Arrival:** Position `[35, 8, 46]`, Target `[0, 5, 0]`
  - **Gardens:** Position `[-45, 22, 45]`, Target `[0, 17, 5]`
  - **Skyline:** Position `[55, 62, 55]`, Target `[0, 34, 0]`
  - **District Overview:** Position `[210, 170, 220]`, Target `[0, 10, 0]`

---

## 4. Guided 3D Mesh Show Residence (Skyline Suite)
- **Local Envelope:** Local $X \in [0, 12]\,\text{m}$, Local $Z \in [0, 16]\,\text{m}$ ($192\,\text{m}^2$ internal area, $2.9\,\text{m}$ ceiling height). Balcony loggia extends south from Local $Z=16\,\text{m}$ to Local $Z=18\,\text{m}$ ($24\,\text{m}^2$).
- **Authored Camera Nodes:**
  - **`interior_living` (Living Room):** Position `[3.5, 1.6, 12.8]`, Target `[5.8, 1.3, 15.7]`, FOV $50^\circ$.
  - **`interior_bedroom` (Primary Bedroom):** Position `[3.6, 1.6, 4.7]`, Target `[2.5, 1.2, 1.5]`, FOV $50^\circ$.
  - **`interior_balcony` (Outdoor Balcony):** Position `[6.0, 1.6, 16.5]`, Target `[6.0, 1.5, 28.0]`, FOV $55^\circ$.
- **Materiality:**
  - Walls: Pale lime plaster (`#EDE8DF`, roughness 0.85)
  - Flooring: Natural quarter-sawn oak (`#A5845E`, roughness 0.5)
  - Glass: Double-glazed architectural glass (`#CFE5EC`, opacity 0.4, metalness 0.85)
  - Metal: Fluted architectural bronze (`#8A6D4B`, metalness 0.7, roughness 0.35)
  - Upholstery: Linen fabric (`#D8D2C4`, roughness 0.8)
