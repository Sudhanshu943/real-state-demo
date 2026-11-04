import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'assets', 'images');

fs.mkdirSync(outDir, { recursive: true });

function writeSvg(filename, svgContent) {
  const filePath = path.join(outDir, filename);
  fs.writeFileSync(filePath, svgContent.trim() + '\n', 'utf8');
  console.log(`Generated: ${filename}`);
}

// 1. Hero Desktop (1920x1200) - Cinematic architectural dusk perspective
writeSvg('hero-desktop.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1200" width="1920" height="1200">
  <defs>
    <radialGradient id="skyGrad" cx="70%" cy="30%" r="80%">
      <stop offset="0%" stop-color="#2D3D36"/>
      <stop offset="45%" stop-color="#1B2823"/>
      <stop offset="85%" stop-color="#111A17"/>
      <stop offset="100%" stop-color="#0B1210"/>
    </radialGradient>
    <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C77D55" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#E8A87C" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="travertine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D5CEBF"/>
      <stop offset="50%" stop-color="#C2B8A5"/>
      <stop offset="100%" stop-color="#AEA390"/>
    </linearGradient>
    <linearGradient id="bronzeLustre" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8A6D4B"/>
      <stop offset="60%" stop-color="#5E4632"/>
      <stop offset="100%" stop-color="#3D2E20"/>
    </linearGradient>
    <linearGradient id="windowWarm" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE0B2" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#E29C46" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="waterReflect" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A2D25"/>
      <stop offset="100%" stop-color="#0E1914"/>
    </linearGradient>
  </defs>

  <!-- Sky Backdrop -->
  <rect width="1920" height="1200" fill="url(#skyGrad)"/>
  <rect x="0" y="700" width="1920" height="400" fill="url(#horizonGlow)"/>

  <!-- Distant City Silhouette -->
  <path d="M 0 950 L 300 950 L 300 910 L 380 910 L 380 930 L 520 930 L 520 890 L 640 890 L 640 950 L 900 950 L 900 920 L 1050 920 L 1050 950 L 1920 950 L 1920 1200 L 0 1200 Z" fill="#141E1A" opacity="0.8"/>

  <!-- Ground Plinth & Reflecting Pool -->
  <rect x="700" y="980" width="1220" height="220" fill="#16201C"/>
  <rect x="800" y="1030" width="340" height="120" fill="url(#waterReflect)"/>

  <!-- AUREL Tower Composition (Framed right 55%) -->
  <g transform="translate(1120, 140)">
    <!-- Main Tower Mass -->
    <rect x="0" y="0" width="560" height="880" fill="url(#travertine)" rx="2"/>

    <!-- Floor Slabs & Shadow Reveals -->
    ${Array.from({ length: 13 })
      .map(
        (_, i) => `
      <rect x="-18" y="${i * 68}" width="596" height="16" fill="#EDE7DA" />
      <rect x="-18" y="${i * 68 + 16}" width="596" height="4" fill="#6A5A48" opacity="0.6" />
    `
      )
      .join('')}

    <!-- Vertical Fluted Travertine Piers -->
    ${[30, 130, 230, 330, 430, 520]
      .map(
        (x) => `
      <rect x="${x}" y="0" width="16" height="880" fill="url(#travertine)" />
      <rect x="${x + 14}" y="0" width="2" height="880" fill="#3D2E20" opacity="0.4" />
    `
      )
      .join('')}

    <!-- Bronze Vertical Louvers & Fins -->
    ${[75, 175, 275, 375, 475]
      .map(
        (x) => `
      <rect x="${x}" y="0" width="6" height="880" fill="url(#bronzeLustre)" />
    `
      )
      .join('')}

    <!-- Illuminated Window Bays (Even floors dusk lit, odd reflective) -->
    ${Array.from({ length: 12 })
      .map(
        (_, f) => `
      <rect x="48" y="${f * 68 + 20}" width="78" height="46" fill="${f % 2 === 0 ? 'url(#windowWarm)' : '#24342E'}" opacity="0.9" />
      <rect x="148" y="${f * 68 + 20}" width="78" height="46" fill="${f % 3 === 0 ? 'url(#windowWarm)' : '#24342E'}" opacity="0.9" />
      <rect x="248" y="${f * 68 + 20}" width="78" height="46" fill="${f % 2 !== 0 ? 'url(#windowWarm)' : '#24342E'}" opacity="0.9" />
      <rect x="348" y="${f * 68 + 20}" width="78" height="46" fill="${f % 4 === 0 ? 'url(#windowWarm)' : '#24342E'}" opacity="0.9" />
    `
      )
      .join('')}

    <!-- Balcony Terraces & Bronze Railings -->
    ${Array.from({ length: 12 })
      .map(
        (_, f) => `
      <rect x="-35" y="${f * 68 + 48}" width="250" height="12" fill="#D5CEBF" />
      <rect x="-35" y="${f * 68 + 28}" width="250" height="20" fill="none" stroke="url(#bronzeLustre)" stroke-width="2" />
      <!-- Planter Greenery -->
      <rect x="-35" y="${f * 68 + 36}" width="30" height="12" fill="#28463C" rx="2" />
    `
      )
      .join('')}

    <!-- Crown Pergola Structure (Level 13) -->
    <rect x="-24" y="-35" width="608" height="35" fill="none" stroke="url(#bronzeLustre)" stroke-width="6" />
    ${[40, 140, 240, 340, 440, 540]
      .map(
        (x) => `
      <rect x="${x}" y="-35" width="8" height="35" fill="url(#bronzeLustre)" />
    `
      )
      .join('')}
  </g>
</svg>
`);

// 2. Collection 1: Garden Residence (800x520) - Ground terrace, pergola, water reflection, lush planting
writeSvg('collection-garden.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="gardSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A2823"/>
      <stop offset="100%" stop-color="#34463E"/>
    </linearGradient>
    <linearGradient id="warmInterior" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE2B8"/>
      <stop offset="100%" stop-color="#E8A85C"/>
    </linearGradient>
    <linearGradient id="travertineG" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#DFD8CB"/>
      <stop offset="100%" stop-color="#C2B7A3"/>
    </linearGradient>
    <linearGradient id="bronzeG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#7B6145"/>
      <stop offset="100%" stop-color="#4A3827"/>
    </linearGradient>
    <linearGradient id="poolG" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1D332B"/>
      <stop offset="100%" stop-color="#0E1A15"/>
    </linearGradient>
  </defs>

  <!-- Background Sky -->
  <rect width="800" height="520" fill="url(#gardSky)"/>

  <!-- Interior Salon Background (Warm Glow) -->
  <rect x="80" y="80" width="440" height="260" fill="url(#warmInterior)"/>
  <!-- Interior Fluted Timber Wall -->
  <rect x="80" y="80" width="120" height="260" fill="#4E3929"/>
  <!-- Interior Low Sofa & Lounge -->
  <rect x="220" y="240" width="180" height="50" fill="#D8D2C5" rx="4"/>
  <rect x="240" y="270" width="90" height="30" fill="#BFAF9B" rx="2"/>

  <!-- Bronze Floor-to-Ceiling Glazing Mullions -->
  <g stroke="url(#bronzeG)" stroke-width="4" fill="none">
    <rect x="80" y="80" width="440" height="260" />
    <line x1="220" y1="80" x2="220" y2="340" />
    <line x1="360" y1="80" x2="360" y2="340" />
  </g>
  <!-- Architectural Fluted Travertine Column -->
  <rect x="60" y="60" width="36" height="300" fill="url(#travertineG)"/>
  <rect x="500" y="60" width="36" height="300" fill="url(#travertineG)"/>

  <!-- Cantilevered Timber & Bronze Pergola Overhang -->
  <rect x="40" y="48" width="540" height="24" fill="url(#bronzeG)"/>
  ${[60, 140, 220, 300, 380, 460, 540]
    .map(
      (x) => `
    <rect x="${x}" y="30" width="8" height="42" fill="#5A432F" />
  `
    )
    .join('')}

  <!-- Private Garden Terrace (24 m2) -->
  <rect x="0" y="340" width="800" height="180" fill="url(#travertineG)"/>
  <!-- Paving Joint Grid -->
  <line x1="0" y1="400" x2="800" y2="400" stroke="#ABA08E" stroke-width="1.5"/>
  <line x1="0" y1="460" x2="800" y2="460" stroke="#ABA08E" stroke-width="1.5"/>
  ${[120, 240, 360, 480, 600, 720]
    .map(
      (x) => `
    <line x1="${x}" y1="340" x2="${x}" y2="520" stroke="#ABA08E" stroke-width="1.5" />
  `
    )
    .join('')}

  <!-- Reflecting Garden Pool with Submerged Uplighting & Stone Coping -->
  <rect x="500" y="360" width="280" height="135" fill="url(#poolG)" rx="2"/>
  <rect x="496" y="356" width="288" height="6" fill="#EDE7DA"/>
  <ellipse cx="640" cy="425" rx="80" ry="25" fill="#3D7A68" opacity="0.35"/>

  <!-- Lush Garden Planters & Tiered Botanical Foliage -->
  <g fill="#243F31">
    <ellipse cx="560" cy="310" rx="45" ry="55" />
    <ellipse cx="620" cy="285" rx="60" ry="70" />
    <ellipse cx="680" cy="315" rx="50" ry="58" />
    <ellipse cx="740" cy="295" rx="55" ry="65" />
    <!-- Planter Boxes in Fluted Travertine -->
    <rect x="500" y="325" width="280" height="35" fill="#D5CEBF" rx="2" />
    <line x1="500" y1="340" x2="780" y2="340" stroke="#B8AD9C" stroke-width="1.5"/>
  </g>

  <!-- Outdoor Teak Lounge Setting on Terrace -->
  <rect x="180" y="375" width="80" height="55" fill="#E2DDD2" rx="4" stroke="#4A3827" stroke-width="2"/>
  <rect x="190" y="385" width="60" height="35" fill="#C8BEAE" rx="2"/>
  <rect x="280" y="375" width="80" height="55" fill="#E2DDD2" rx="4" stroke="#4A3827" stroke-width="2"/>
  <rect x="290" y="385" width="60" height="35" fill="#C8BEAE" rx="2"/>
  <circle cx="390" cy="405" r="22" fill="#5A432F"/>
  <circle cx="390" cy="405" r="18" fill="#75563D"/>
</svg>
`);

// 3. Collection 2: Skyline Residence (800x520) - Level 8 living salon, sunset terrace, horizon vista
writeSvg('collection-skyline.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="skySunset" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E2A26"/>
      <stop offset="50%" stop-color="#C77D55"/>
      <stop offset="100%" stop-color="#EDB07E"/>
    </linearGradient>
    <linearGradient id="salonOak" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A5845E"/>
      <stop offset="100%" stop-color="#8B6C47"/>
    </linearGradient>
    <linearGradient id="walnutPanels" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#483626"/>
      <stop offset="100%" stop-color="#342519"/>
    </linearGradient>
  </defs>

  <!-- Panoramic Sunset Vista Outside -->
  <rect width="800" height="340" fill="url(#skySunset)"/>

  <!-- Distant Skyline Silhouette -->
  <path d="M 0 280 L 120 280 L 120 240 L 180 240 L 180 280 L 320 280 L 320 220 L 380 220 L 380 280 L 520 280 L 520 250 L 600 250 L 600 280 L 800 280 L 800 340 L 0 340 Z" fill="#202A26"/>
  <!-- Skyline Window Beacons -->
  ${[140, 160, 340, 360, 540, 570]
    .map(
      (x) => `
    <rect x="${x}" y="250" width="6" height="4" fill="#FFDF9E" />
  `
    )
    .join('')}

  <!-- Balcony Glass Railing & Handrail -->
  <rect x="0" y="270" width="800" height="60" fill="rgba(194,220,228,0.25)"/>
  <rect x="0" y="268" width="800" height="5" fill="#6A5038"/>

  <!-- Interior Living Room Salon (Level 8) -->
  <!-- Smoked Oak Parquetry Floor -->
  <rect x="0" y="330" width="800" height="190" fill="url(#salonOak)"/>
  <g stroke="#785C3A" stroke-width="1" opacity="0.6">
    <line x1="0" y1="380" x2="800" y2="380"/>
    <line x1="0" y1="440" x2="800" y2="440"/>
  </g>

  <!-- Fluted Walnut Feature Wall (Left) -->
  <rect x="0" y="60" width="220" height="320" fill="url(#walnutPanels)"/>
  ${Array.from({ length: 18 })
    .map(
      (_, i) => `
    <line x1="${i * 12 + 6}" y1="60" x2="${i * 12 + 6}" y2="380" stroke="#251A10" stroke-width="2"/>
  `
    )
    .join('')}

  <!-- Finished Travertine Ceiling -->
  <rect x="0" y="0" width="800" height="60" fill="#FAF7F2"/>
  <rect x="0" y="58" width="800" height="4" fill="#4E3A28"/>

  <!-- Living Room Luxury Furniture -->
  <!-- Wool Rug -->
  <rect x="220" y="370" width="460" height="120" fill="#C8C0B2" rx="4"/>
  <!-- Low-Slung L-Sofa -->
  <rect x="260" y="360" width="280" height="65" fill="#DDD7CB" rx="4"/>
  <rect x="490" y="380" width="70" height="85" fill="#DDD7CB" rx="4"/>
  <!-- Honed Travertine Cocktail Table -->
  <rect x="330" y="420" width="130" height="40" fill="#E4DED4" rx="2" stroke="#8C775D" stroke-width="1.5"/>

  <!-- Architectural Bronze Reading Floor Lamp -->
  <line x1="240" y1="300" x2="240" y2="410" stroke="#7E6044" stroke-width="3"/>
  <polygon points="230,300 250,300 240,285" fill="#7E6044"/>

  <!-- Terracotta Olive Planter on Balcony -->
  <rect x="710" y="275" width="45" height="50" fill="#A86244" rx="3"/>
  <circle cx="732" cy="250" r="28" fill="#2E4A3B"/>
</svg>
`);

// 4. Collection 3: Penthouse Sky Residence (800x520) - Double-height volume, private rooftop plunge pool, pergola
writeSvg('collection-penthouse.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="800" height="520">
  <defs>
    <linearGradient id="twilightSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141E1A"/>
      <stop offset="45%" stop-color="#22322A"/>
      <stop offset="85%" stop-color="#7C4E3A"/>
      <stop offset="100%" stop-color="#C27A52"/>
    </linearGradient>
    <linearGradient id="plungePool" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D5A50"/>
      <stop offset="100%" stop-color="#16312B"/>
    </linearGradient>
  </defs>

  <!-- Twilight Sky Arc -->
  <rect width="800" height="360" fill="url(#twilightSky)"/>

  <!-- Distant City Horizon Silhouette -->
  <path d="M 0 310 L 200 310 L 200 270 L 280 270 L 280 310 L 480 310 L 480 250 L 550 250 L 550 310 L 800 310 L 800 360 L 0 360 Z" fill="#18221D"/>

  <!-- Penthouse Wrap-around Sky Terrace (36 m2) -->
  <rect x="0" y="340" width="800" height="180" fill="#D2CABA"/>
  <line x1="0" y1="410" x2="800" y2="410" stroke="#ABA08E" stroke-width="1.5"/>

  <!-- Private Rooftop Infinity Plunge Pool -->
  <rect x="460" y="355" width="300" height="135" fill="url(#plungePool)" rx="3"/>
  <rect x="456" y="351" width="308" height="6" fill="#EDE7DA"/>

  <!-- Cantilevered Bronze Crown Pergola Over Sky Terrace -->
  <rect x="40" y="60" width="440" height="20" fill="#6A4E35"/>
  ${[60, 130, 200, 270, 340, 410, 470]
    .map(
      (x) => `
    <rect x="${x}" y="40" width="8" height="40" fill="#4B3624" />
  `
    )
    .join('')}
  <!-- Pergola Support Columns -->
  <rect x="60" y="80" width="16" height="270" fill="#4B3624"/>
  <rect x="440" y="80" width="16" height="270" fill="#4B3624"/>

  <!-- Double-Height Penthouse Glass Aperture (Left) -->
  <rect x="80" y="80" width="350" height="260" fill="rgba(255,224,180,0.85)"/>
  <!-- Bronze Mullions -->
  <line x1="195" y1="80" x2="195" y2="340" stroke="#4B3624" stroke-width="4"/>
  <line x1="310" y1="80" x2="310" y2="340" stroke="#4B3624" stroke-width="4"/>
  <line x1="80" y1="210" x2="430" y2="210" stroke="#4B3624" stroke-width="4"/>

  <!-- Interior Penthouse Chandelier -->
  <circle cx="250" cy="140" r="14" fill="#FFF2DF" filter="drop-shadow(0 0 8px #FFDCA8)"/>
  <line x1="250" y1="80" x2="250" y2="130" stroke="#6A4E35" stroke-width="1.5"/>

  <!-- Terrace Outdoor Daybed & Loungers -->
  <rect x="180" y="390" width="110" height="70" fill="#EAE5DC" rx="4" stroke="#5A432F" stroke-width="2"/>
  <rect x="310" y="400" width="90" height="55" fill="#EAE5DC" rx="4" stroke="#5A432F" stroke-width="2"/>
</svg>
`);

// 5. Facade Detail Architectural Close-up (600x800)
writeSvg('facade-detail.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="600" height="800">
  <defs>
    <linearGradient id="stoneClose" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EDE7DB"/>
      <stop offset="60%" stop-color="#DCD5C6"/>
      <stop offset="100%" stop-color="#C5BCAB"/>
    </linearGradient>
    <linearGradient id="bronzeProfile" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7B6145"/>
      <stop offset="40%" stop-color="#5E4632"/>
      <stop offset="100%" stop-color="#3D2E20"/>
    </linearGradient>
  </defs>

  <rect width="600" height="800" fill="#202A26"/>

  <!-- Massive Honed Travertine Pier (Left 220px) -->
  <rect x="0" y="0" width="220" height="800" fill="url(#stoneClose)"/>
  <!-- Travertine Fluting & Chamfer Details -->
  ${[30, 70, 110, 150, 190]
    .map(
      (x) => `
    <line x1="${x}" y1="0" x2="${x}" y2="800" stroke="#ABA08E" stroke-width="2" />
    <line x1="${x + 2}" y1="0" x2="${x + 2}" y2="800" stroke="#FFF" stroke-width="1" opacity="0.4" />
  `
    )
    .join('')}

  <!-- Bronze Reveal Channel (Shadow Gap) -->
  <rect x="220" y="0" width="24" height="800" fill="url(#bronzeProfile)"/>

  <!-- Floor Slab Edge with Deep Shadow -->
  <rect x="220" y="360" width="380" height="48" fill="url(#stoneClose)"/>
  <rect x="220" y="408" width="380" height="12" fill="#2C231A"/>

  <!-- High-Performance Acoustic Glazing with Warm Interior Glow -->
  <rect x="244" y="40" width="356" height="320" fill="#283A34"/>
  <rect x="244" y="420" width="356" height="340" fill="#E8B574" opacity="0.85"/>

  <!-- Bronze Mullion & Louver Profile -->
  <rect x="360" y="0" width="16" height="800" fill="url(#bronzeProfile)"/>
  <rect x="376" y="0" width="4" height="800" fill="#1C150E"/>

  <!-- Cantilevered Bronze Glass Balustrade -->
  <rect x="244" y="320" width="356" height="40" fill="rgba(200,230,240,0.3)"/>
  <rect x="244" y="318" width="356" height="6" fill="url(#bronzeProfile)"/>

  <!-- Inset Annotation Labels -->
  <rect x="24" y="730" width="280" height="42" fill="rgba(18,26,23,0.9)" rx="3"/>
  <text x="40" y="756" fill="#F4EFE6" font-family="sans-serif" font-size="12" font-weight="600" letter-spacing="0.5">
    FACADE REVEAL &amp; MULLION DETAIL
  </text>
</svg>
`);

// 6. Amenities: Roof Sky Garden (600x400)
writeSvg('amenity-roof.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="skyRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#182420"/>
      <stop offset="60%" stop-color="#A56445"/>
      <stop offset="100%" stop-color="#E29D6E"/>
    </linearGradient>
  </defs>
  <rect width="600" height="240" fill="url(#skyRoof)"/>
  <!-- Skyline Silhouettes -->
  <path d="M 0 210 L 120 210 L 120 180 L 220 180 L 220 210 L 380 210 L 380 170 L 460 170 L 460 210 L 600 210 L 600 240 L 0 240 Z" fill="#1B2521"/>
  <!-- Roof Travertine Pavers -->
  <rect x="0" y="240" width="600" height="160" fill="#D8D2C4"/>
  <!-- Bronze Pergola Canopy -->
  <rect x="40" y="30" width="520" height="16" fill="#6E523A"/>
  ${[60, 140, 220, 300, 380, 460, 540].map((x) => `<rect x="${x}" y="15" width="8" height="30" fill="#4D3826"/>`).join('')}
  <rect x="60" y="46" width="14" height="200" fill="#4D3826"/>
  <rect x="520" y="46" width="14" height="200" fill="#4D3826"/>
  <!-- Olive Planters -->
  <rect x="120" y="220" width="50" height="40" fill="#5A432F" rx="2"/>
  <circle cx="145" cy="195" r="24" fill="#2E4839"/>
  <rect x="420" y="220" width="50" height="40" fill="#5A432F" rx="2"/>
  <circle cx="445" cy="195" r="24" fill="#2E4839"/>
  <!-- Fire Table & Low Armchairs -->
  <rect x="250" y="270" width="100" height="45" fill="#3D3026" rx="4"/>
  <circle cx="300" cy="285" r="8" fill="#FFC87A" filter="drop-shadow(0 0 6px #FF9C38)"/>
</svg>
`);

// 7. Amenities: Resident Lounge & Library (600x400)
writeSvg('amenity-lounge.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#1C2622"/>
  <!-- Smoked Oak Parquetry -->
  <rect x="0" y="260" width="600" height="140" fill="#8C6E4E"/>
  <!-- Fluted Walnut Bookcase Wall -->
  <rect x="40" y="40" width="220" height="230" fill="#3D2C1E"/>
  ${Array.from({ length: 5 }).map((_, i) => `<line x1="40" y1="${55 + i * 45}" x2="260" y2="${55 + i * 45}" stroke="#7B6145" stroke-width="4"/>`).join('')}
  <!-- Books on shelves -->
  ${[60, 100, 140, 180, 220].map((x) => `<rect x="${x}" y="65" width="25" height="30" fill="#967B5E" rx="1"/>`).join('')}
  <!-- Double-Height Limestone Fireplace -->
  <rect x="320" y="20" width="160" height="250" fill="#D6CFC1"/>
  <rect x="350" y="160" width="100" height="90" fill="#18130E" rx="2"/>
  <circle cx="400" cy="210" r="14" fill="#FFB054" filter="drop-shadow(0 0 10px #FF8822)"/>
  <!-- Velvet Lounge Armchairs -->
  <rect x="200" y="270" width="80" height="65" fill="#4B5E55" rx="6"/>
  <rect x="490" y="270" width="80" height="65" fill="#4B5E55" rx="6"/>
  <!-- Round Bronze Drinks Table -->
  <circle cx="340" cy="315" r="22" fill="#8A6D4B"/>
</svg>
`);

// 8. Amenities: Wellness Studio (600x400)
writeSvg('amenity-wellness.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <rect width="600" height="400" fill="#1C2522"/>
  <!-- Light Oak Movement Floor -->
  <rect x="0" y="240" width="600" height="160" fill="#BFA37E"/>
  <!-- Garden Courtyard Outlook Glazing -->
  <rect x="40" y="40" width="520" height="200" fill="#283E34"/>
  <!-- Lush Greenery Outside -->
  <circle cx="120" cy="140" r="60" fill="#1D3328"/>
  <circle cx="260" cy="130" r="75" fill="#243F32"/>
  <circle cx="420" cy="135" r="70" fill="#1D3328"/>
  <!-- Bronze Window Mullions -->
  <g stroke="#6E523A" stroke-width="4">
    <rect x="40" y="40" width="520" height="200" fill="none"/>
    <line x1="210" y1="40" x2="210" y2="240"/>
    <line x1="380" y1="40" x2="380" y2="240"/>
  </g>
  <!-- Fluted Oak Wall Ribs (Left & Right) -->
  <rect x="0" y="40" width="40" height="200" fill="#5A432F"/>
  <rect x="560" y="40" width="40" height="200" fill="#5A432F"/>
  <!-- Movement Benches -->
  <rect x="180" y="290" width="100" height="30" fill="#4B3929" rx="3"/>
  <rect x="340" y="290" width="100" height="30" fill="#4B3929" rx="3"/>
</svg>
`);

// 9. Amenities: Arrival Portico (600x400)
writeSvg('amenity-arrival.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
  <defs>
    <linearGradient id="arrSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#141E1A"/>
      <stop offset="100%" stop-color="#2D3D36"/>
    </linearGradient>
    <linearGradient id="arrWater" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1B2F27"/>
      <stop offset="100%" stop-color="#0E1914"/>
    </linearGradient>
  </defs>
  <rect width="600" height="260" fill="url(#arrSky)"/>
  <!-- Travertine Arrival Courtyard Paving -->
  <rect x="0" y="260" width="600" height="140" fill="#D5CEBF"/>
  <!-- Reflecting Pool Flanking Porte-Cochere -->
  <rect x="60" y="280" width="180" height="90" fill="url(#arrWater)" rx="2"/>
  <rect x="360" y="280" width="180" height="90" fill="url(#arrWater)" rx="2"/>
  <!-- Massive 4.6m Travertine Columns -->
  <rect x="40" y="40" width="45" height="230" fill="#C5BCAB"/>
  <rect x="515" y="40" width="45" height="230" fill="#C5BCAB"/>
  <!-- Cantilevered Bronze Canopy with Warm Recessed Downlighting -->
  <rect x="20" y="70" width="560" height="28" fill="#75583E"/>
  <rect x="30" y="94" width="540" height="6" fill="#FFE0B2" opacity="0.85"/>
  <!-- Warm Illuminated Double-Height Lobby Entrance -->
  <rect x="180" y="98" width="240" height="165" fill="#F0CA96" opacity="0.9"/>
  <line x1="300" y1="98" x2="300" y2="263" stroke="#4D3826" stroke-width="4"/>
</svg>
`);

// 10. District Preview Illustration (800x480)
writeSvg('district-map.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="800" height="480">
  <defs>
    <linearGradient id="distCanal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E382F"/>
      <stop offset="100%" stop-color="#142620"/>
    </linearGradient>
  </defs>
  <!-- Ground Terrain -->
  <rect width="800" height="480" fill="#E2DDD2"/>

  <!-- Paved Boulevards & Streets -->
  <rect x="0" y="160" width="800" height="30" fill="#C8C0B2"/>
  <rect x="0" y="340" width="800" height="30" fill="#C8C0B2"/>
  <rect x="220" y="0" width="30" height="480" fill="#C8C0B2"/>
  <rect x="560" y="0" width="30" height="480" fill="#C8C0B2"/>

  <!-- Waterway Canal with Bridges -->
  <path d="M 0 80 Q 400 120 800 60 L 800 110 Q 400 170 0 130 Z" fill="url(#distCanal)"/>
  <!-- Bridges -->
  <rect x="215" y="75" width="40" height="50" fill="#AFA594" rx="2"/>
  <rect x="555" y="65" width="40" height="50" fill="#AFA594" rx="2"/>

  <!-- Botanic Garden Park -->
  <rect x="60" y="210" width="130" height="110" fill="#2E4D3C" rx="8"/>
  <text x="125" y="270" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-size="12" font-weight="bold">Botanical Park</text>

  <!-- Contextual Urban Blocks -->
  <rect x="60" y="390" width="130" height="65" fill="#BCB5A4" rx="3"/>
  <rect x="275" y="390" width="115" height="65" fill="#AFA694" rx="3"/>
  <rect x="410" y="390" width="125" height="65" fill="#BCB5A4" rx="3"/>
  <rect x="615" y="390" width="135" height="65" fill="#AFA694" rx="3"/>

  <!-- Central AUREL Development Site -->
  <rect x="330" y="200" width="160" height="130" fill="#FAF6EE" stroke="#A8875F" stroke-width="2" rx="4"/>
  <rect x="365" y="225" width="90" height="75" fill="#28463C" rx="3"/>
  <text x="410" y="268" text-anchor="middle" fill="#FFFFFF" font-family="serif" font-size="16" font-weight="bold" letter-spacing="1">AUREL</text>
  <text x="410" y="284" text-anchor="middle" fill="#D9984C" font-family="sans-serif" font-size="9" font-weight="bold" letter-spacing="1.5">TOWER</text>

  <!-- East Cultural Quarter -->
  <rect x="615" y="210" width="135" height="110" fill="#C2B8A6" rx="3"/>
  <text x="682" y="270" text-anchor="middle" fill="#382C22" font-family="sans-serif" font-size="12" font-weight="bold">Cultural Quarter</text>
</svg>
`);

// 11. Material Texture: Honed Roman Travertine (800x600)
writeSvg('texture-travertine.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <filter id="travertineGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.008" numOctaves="5" result="noise" />
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.82
        0 0 0 0 0.77
        0 0 0 0 0.69
        0 0 0 0.45 0" result="coloredNoise" />
      <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
    </filter>
    <linearGradient id="travBase" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EBE5D8"/>
      <stop offset="25%" stop-color="#DFD8C9"/>
      <stop offset="50%" stop-color="#D4CBBB"/>
      <stop offset="75%" stop-color="#DFD8C9"/>
      <stop offset="100%" stop-color="#E8E2D4"/>
    </linearGradient>
  </defs>

  <!-- Base Travertine Bed -->
  <rect width="800" height="600" fill="url(#travBase)"/>
  <rect width="800" height="600" fill="#D6CDBC" filter="url(#travertineGrain)" opacity="0.85"/>

  <!-- Distinct Horizontal Veining Stratifications -->
  ${[45, 95, 140, 185, 230, 275, 320, 365, 410, 455, 500, 545]
    .map(
      (y, idx) => `
    <path d="M 0 ${y} Q 200 ${y + (idx % 2 === 0 ? 8 : -8)} 400 ${y + 2} T 800 ${y - 4}" 
          stroke="${idx % 3 === 0 ? '#B8AD9C' : '#C8BEAE'}" 
          stroke-width="${idx % 2 === 0 ? 3 : 1.5}" 
          fill="none" 
          opacity="0.65" />
    <path d="M 0 ${y + 2} Q 250 ${y + 12} 550 ${y - 6} T 800 ${y + 4}" 
          stroke="#9E9281" 
          stroke-width="1" 
          fill="none" 
          opacity="0.35" />
  `
    )
    .join('')}

  <!-- Porous Micro-Cavities & Natural Fossil Voids -->
  ${[
    [120, 140, 18, 5], [280, 90, 24, 6], [420, 210, 16, 4], [640, 180, 28, 7],
    [90, 340, 22, 6], [310, 410, 30, 8], [540, 370, 20, 5], [710, 450, 25, 6],
    [190, 490, 26, 7], [450, 530, 18, 4], [620, 80, 15, 5], [360, 280, 32, 9]
  ]
    .map(
      ([x, y, w, h]) => `
    <ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#948877" opacity="0.55"/>
    <ellipse cx="${x + 1}" cy="${y + 1}" rx="${w * 0.7}" ry="${h * 0.7}" fill="#7A6F5F" opacity="0.6"/>
  `
    )
    .join('')}
</svg>
`);

// 12. Material Texture: Satin Architectural Bronze (800x600)
writeSvg('texture-bronze.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <filter id="brushedBronze" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.005 0.35" numOctaves="4" result="brush" />
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.55
        0 0 0 0 0.40
        0 0 0 0 0.28
        0 0 0 0.35 0" result="coloredBrush" />
      <feBlend mode="overlay" in="SourceGraphic" in2="coloredBrush" />
    </filter>
    <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4E3B2A"/>
      <stop offset="20%" stop-color="#72573F"/>
      <stop offset="45%" stop-color="#8F6E4E"/>
      <stop offset="55%" stop-color="#B28C65"/>
      <stop offset="65%" stop-color="#8F6E4E"/>
      <stop offset="85%" stop-color="#5E4733"/>
      <stop offset="100%" stop-color="#3D2E20"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#bronzeGradient)"/>
  <rect width="800" height="600" fill="#6A513A" filter="url(#brushedBronze)" opacity="0.75"/>

  <!-- Linear Extrusion Anodized Sheen Lines -->
  ${Array.from({ length: 40 })
    .map(
      (_, i) => `
    <line x1="${i * 20}" y1="0" x2="${i * 20}" y2="600" stroke="${i % 2 === 0 ? 'rgba(255,225,185,0.12)' : 'rgba(30,20,12,0.25)'}" stroke-width="${(i % 3) + 1}"/>
  `
    )
    .join('')}
</svg>
`);

// 13. Material Texture: Smoked White Oak Parquetry (800x600)
writeSvg('texture-oak.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <filter id="oakGrain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="4" result="wood" />
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.52
        0 0 0 0 0.38
        0 0 0 0 0.24
        0 0 0 0.40 0" result="coloredWood" />
      <feBlend mode="multiply" in="SourceGraphic" in2="coloredWood" />
    </filter>
    <linearGradient id="oakBase" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#8C6A48"/>
      <stop offset="50%" stop-color="#735436"/>
      <stop offset="100%" stop-color="#5A4027"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#oakBase)"/>
  <rect width="800" height="600" fill="#6D4F33" filter="url(#oakGrain)" opacity="0.85"/>

  <!-- Authentic Cathedral Annual Rings & Hardwood Grain -->
  ${[50, 110, 170, 230, 290, 350, 410, 470, 530]
    .map(
      (y) => `
    <path d="M 0 ${y} C 250 ${y - 30} 550 ${y + 40} 800 ${y - 15}" stroke="#44301E" stroke-width="2.5" fill="none" opacity="0.45"/>
    <path d="M 0 ${y + 6} C 260 ${y - 25} 540 ${y + 35} 800 ${y - 10}" stroke="#9C7752" stroke-width="1.2" fill="none" opacity="0.3"/>
  `
    )
    .join('')}

  <!-- Planking Joints -->
  <line x1="260" y1="0" x2="260" y2="600" stroke="#2B1E13" stroke-width="2.5"/>
  <line x1="540" y1="0" x2="540" y2="600" stroke="#2B1E13" stroke-width="2.5"/>
</svg>
`);

// 14. Material Texture: Low-Iron Acoustic Double Glazing (800x600)
writeSvg('texture-glazing.svg', `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="glassSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D4440"/>
      <stop offset="40%" stop-color="#1E312D"/>
      <stop offset="70%" stop-color="#283F3A"/>
      <stop offset="100%" stop-color="#14211D"/>
    </linearGradient>
    <linearGradient id="specularGleam" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.45)"/>
      <stop offset="25%" stop-color="rgba(255,255,255,0.1)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="75%" stop-color="rgba(240,195,145,0.2)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
  </defs>

  <rect width="800" height="600" fill="url(#glassSky)"/>
  <rect width="800" height="600" fill="url(#specularGleam)"/>

  <!-- Double-Glazed Argon Cavity Shadow Edge -->
  <rect x="0" y="0" width="16" height="600" fill="#0D1412"/>
  <line x1="16" y1="0" x2="16" y2="600" stroke="#7A9E96" stroke-width="1.5" opacity="0.6"/>
  <rect x="784" y="0" width="16" height="600" fill="#0D1412"/>
  <line x1="784" y1="0" x2="784" y2="600" stroke="#7A9E96" stroke-width="1.5" opacity="0.6"/>

  <!-- Diagonal Acoustic Lamination Sheen -->
  <line x1="100" y1="0" x2="700" y2="600" stroke="rgba(255,255,255,0.18)" stroke-width="8" filter="blur(4px)"/>
</svg>
`);

console.log('--- All architectural stills generated successfully. ---');
