import { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { FacadeDetails } from './FacadeDetails';
import { ArrivalGarden } from './ArrivalGarden';
import { TreeCanopy } from './TreeCanopy';
import { FacadeBayModule } from './FacadeBayModule';
import {
  getTravertineTexture,
  getTravertineNormalTexture,
  getTravertineRoughnessTexture,
  getBronzeTexture,
  getBronzeRoughnessTexture
} from './textureGenerators';

interface BuildingProceduralProps {
  selectedFloor?: number;
  selectedUnitId?: string;
  onSelectFloor: (floor: number) => void;
  onSelectUnit: (unitId: string) => void;
  isPointerDragging: boolean;
}

export function BuildingProcedural({
  selectedFloor,
  selectedUnitId,
  onSelectFloor,
  onSelectUnit,
  isPointerDragging
}: BuildingProceduralProps) {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // Architectural Dimensions
  const width = 28;
  const depth = 20;
  const lobbyHeight = 4.6;
  const floorHeight = 3.4;
  const residentialFloors = 12;
  const exampleFloors = [4, 8, 12];

  // Authored Architectural PBR Materials with Procedural Maps
  const materials = useMemo(() => {
    const travertineTex = getTravertineTexture();
    const travertineNor = getTravertineNormalTexture();
    const travertineRough = getTravertineRoughnessTexture();
    const bronzeTex = getBronzeTexture();
    const bronzeRough = getBronzeRoughnessTexture();

    return {
      stone: new THREE.MeshStandardMaterial({
        map: travertineTex,
        normalMap: travertineNor,
        normalScale: new THREE.Vector2(0.8, 0.8),
        roughnessMap: travertineRough,
        roughness: 0.65,
        metalness: 0.04
      }),
      stoneReveal: new THREE.MeshStandardMaterial({
        color: '#6A6152',
        roughness: 0.85,
        metalness: 0.04
      }),
      darkStone: new THREE.MeshStandardMaterial({
        color: '#212A26',
        roughness: 0.82,
        metalness: 0.10
      }),
      water: new THREE.MeshStandardMaterial({
        color: '#153028',
        roughness: 0.04,
        metalness: 0.88,
        transparent: true,
        opacity: 0.85
      }),
      bronze: new THREE.MeshStandardMaterial({
        map: bronzeTex,
        roughnessMap: bronzeRough,
        roughness: 0.35,
        metalness: 0.82
      }),
      darkBronze: new THREE.MeshStandardMaterial({
        color: '#34261B',
        roughness: 0.45,
        metalness: 0.85
      }),
      // Exterior tinted glazing: restrained smoke-green, dielectric reflective PBR approximation
      exteriorGlazing: new THREE.MeshStandardMaterial({
        color: '#283832',
        roughness: 0.038,
        metalness: 0.04, // dielectric physics: F0 ~0.04
        emissive: '#161D19',
        emissiveIntensity: 0.22,
        envMapIntensity: 2.65
      }),
      // Window-to-window subtle tone variation (cooler bronze-slate tone)
      exteriorGlazingVariation: new THREE.MeshStandardMaterial({
        color: '#2B3B34',
        roughness: 0.046,
        metalness: 0.035,
        emissive: '#181F1A',
        emissiveIntensity: 0.20,
        envMapIntensity: 2.50
      }),
      // Subtle occupied window treatment: gentle warm ambient depth without full internal geometry
      exteriorGlazingOccupied: new THREE.MeshStandardMaterial({
        color: '#324238',
        roughness: 0.060,
        metalness: 0.03,
        emissive: '#26241C',
        emissiveIntensity: 0.28,
        envMapIntensity: 2.40
      }),
      // Balcony & rooftop acoustic balustrades: preserve authentic transparency
      balustradeGlass: new THREE.MeshStandardMaterial({
        color: '#90AAA2',
        roughness: 0.02,
        metalness: 0.04,
        transparent: true,
        opacity: 0.40,
        envMapIntensity: 1.85
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: '#1F3827',
        roughness: 0.85,
        metalness: 0.02
      }),
      highlightFloor: new THREE.MeshStandardMaterial({
        color: '#A88258',
        roughness: 0.35,
        metalness: 0.5,
        emissive: '#8C673A',
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.65
      }),
      highlightUnit: new THREE.MeshStandardMaterial({
        color: '#28463C',
        roughness: 0.3,
        metalness: 0.5,
        emissive: '#28463C',
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.7
      })
    };
  }, []);

  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  return (
    <group name="aurel-tower" position={[0, 0, 0]}>
      <FacadeDetails bronze={materials.bronze} reveal={materials.stoneReveal} stone={materials.stone} />
      <ArrivalGarden />
      {/* ================================================================== */}
      {/* 1. GROUND LANDSCAPING, REFLECTING POOLS & BASE PLINTH              */}
      {/* ================================================================== */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.darkStone}>
        <boxGeometry args={[52, 0.4, 44]} />
      </mesh>

      {/* Arrival Courtyard Travertine Paving (Rotated horizontally with normal +Y) */}
      <mesh position={[0, 0.02, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.stone}>
        <planeGeometry args={[16, 14]} />
      </mesh>

      {/* Flanking Reflecting Pools (Rotated horizontally with normal +Y) */}
      <mesh position={[-12, 0.03, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.water}>
        <planeGeometry args={[6, 12]} />
      </mesh>
      <mesh position={[12, 0.03, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.water}>
        <planeGeometry args={[6, 12]} />
      </mesh>

      {/* Entrance Planters with Layered Organic Foliage */}
      {[-8.5, 8.5].map((x) => (
        <group key={x} position={[x, 0, 18]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={materials.stone}>
            <boxGeometry args={[2.5, 0.8, 1.2]} />
          </mesh>
          <mesh position={[-0.6, 1.0, 0]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.55, 12, 12]} />
          </mesh>
          <mesh position={[0.5, 1.1, 0.1]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.60, 12, 12]} />
          </mesh>
          <mesh position={[0, 1.3, -0.1]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.45, 10, 10]} />
          </mesh>
        </group>
      ))}

      {/* ================================================================== */}
      {/* 2. SOLID CENTRAL STRUCTURAL CORE                                   */}
      {/* ================================================================== */}
      <mesh position={[0, 23, 0]} castShadow receiveShadow material={materials.darkStone}>
        <boxGeometry args={[10, 46, 10]} />
      </mesh>

      {/* ================================================================== */}
      {/* 3. GROUND LOBBY & ARRIVAL PORTICO CANOPY (Base Hierarchy)           */}
      {/* ================================================================== */}
      <group position={[0, lobbyHeight / 2, 0]}>
        {/* Double-Height Corner Travertine Colonnade */}
        {[-width / 2 + 1.2, width / 2 - 1.2].map((x) =>
          [-depth / 2 + 1.2, depth / 2 - 1.2].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0, z]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[2.4, lobbyHeight, 2.4]} />
            </mesh>
          ))
        )}

        {/* Double-Height Lobby Glazing */}
        <mesh position={[0, 0, depth / 2 - 0.2]} receiveShadow material={materials.exteriorGlazingOccupied}>
          <boxGeometry args={[width - 5, lobbyHeight - 0.2, 0.2]} />
        </mesh>

        {/* Arrival Portico Canopy extending over the entrance */}
        <mesh position={[0, lobbyHeight / 2 - 0.15, depth / 2 + 4.5]} castShadow receiveShadow material={materials.darkBronze}>
          <boxGeometry args={[16, 0.30, 9]} />
        </mesh>
        <mesh position={[0, lobbyHeight / 2 - 0.32, depth / 2 + 4.5]} material={materials.bronze}>
          <boxGeometry args={[15.6, 0.05, 8.6]} />
        </mesh>
        {/* Portico Downlight */}
        <pointLight position={[0, lobbyHeight / 2 - 0.5, depth / 2 + 4.5]} intensity={1.2} color="#FFDCB0" distance={10} />
      </group>

      {/* ================================================================== */}
      {/* 4. RESIDENTIAL FLOORS 1 to 12 (Middle & Crown Hierarchy)          */}
      {/* ================================================================== */}
      {Array.from({ length: residentialFloors }, (_, i) => {
        const floorNumber = i + 1;
        const yPos = lobbyHeight + i * floorHeight + floorHeight / 2;
        const isInteractive = exampleFloors.includes(floorNumber);
        const isFloorActive = selectedFloor === floorNumber;
        const isFloorHovered = hoveredFloor === floorNumber;
        const isPenthouseFloor = floorNumber >= 11;

        let slabMat = materials.stone;
        if (isFloorActive) {
          slabMat = materials.highlightFloor;
        }

        const westUnitId = floorNumber < 10 ? `A0${floorNumber}01` : `A${floorNumber}01`;
        const eastUnitId = floorNumber < 10 ? `A0${floorNumber}02` : `A${floorNumber}02`;

        return (
          <group key={floorNumber} position={[0, yPos, 0]}>
            {/* Horizontal Cantilevered Floor Slab */}
            <mesh position={[0, -floorHeight / 2 + 0.16, 0]} castShadow receiveShadow material={slabMat}>
              <boxGeometry args={[width + 0.8, 0.32, depth + 0.8]} />
            </mesh>

            {/* Recessed Soffit Reveal */}
            <mesh position={[0, -floorHeight / 2 + 0.02, 0]} material={materials.stoneReveal}>
              <boxGeometry args={[width + 0.6, 0.06, depth + 0.6]} />
            </mesh>

            {/* Solid Travertine Corner Columns */}
            <mesh position={[-width / 2 + 0.6, 0, depth / 2 - 0.6]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[1.4, floorHeight - 0.32, 1.4]} />
            </mesh>
            <mesh position={[width / 2 - 0.6, 0, depth / 2 - 0.6]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[1.4, floorHeight - 0.32, 1.4]} />
            </mesh>
            <mesh position={[-width / 2 + 0.6, 0, -depth / 2 + 0.6]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[1.4, floorHeight - 0.32, 1.4]} />
            </mesh>
            <mesh position={[width / 2 - 0.6, 0, -depth / 2 + 0.6]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[1.4, floorHeight - 0.32, 1.4]} />
            </mesh>

            {/* Recessed side windows framed by genuine stone piers, rather than a blank wall. */}
            {[-1, 1].map(side => <group key={side}>
              {[-6, -2, 2, 6].map(z => <group key={z}>
                <mesh
                  position={[side * 13.55, 0, z]}
                  material={
                    (floorNumber + Math.abs(z)) % 3 === 0
                      ? materials.exteriorGlazingOccupied
                      : (floorNumber % 2 === 0 ? materials.exteriorGlazingVariation : materials.exteriorGlazing)
                  }
                >
                  <boxGeometry args={[.08, 2.7, 3.25]} />
                </mesh>
                <mesh position={[side * 13.9, 0, z - 1.88]} castShadow receiveShadow material={materials.stone}>
                  <boxGeometry args={[.65, 3.08, .55]} />
                </mesh>
                <mesh position={[side * 13.7, -1.35, z]} castShadow material={materials.stone}>
                  <boxGeometry args={[.8, .16, 3.35]} />
                </mesh>
                <mesh position={[side * 13.63, 0, z]} material={materials.bronze}>
                  <boxGeometry args={[.09, 2.7, .065]} />
                </mesh>
              </group>)}
            </group>)}

            {/* East Facade Architectural Bronze Shading Fins */}
            {[-4, 0, 4].map((z) => (
              <mesh key={`east-fin-${z}`} position={[width / 2 + 0.05, 0, z]} castShadow material={materials.bronze}>
                <boxGeometry args={[0.12, floorHeight - 0.32, 0.8]} />
              </mesh>
            ))}

            {/* Vertical Travertine Piers on South Elevation (West Level 8 piers articulated inside FacadeBayModule) */}
            {[-9, -4.5, 0, 4.5, 9].map((xPos) => {
              if (floorNumber === 8 && xPos < 0) return null;
              return (
                <mesh key={xPos} position={[xPos, 0, depth / 2]} castShadow receiveShadow material={materials.stone}>
                  <boxGeometry args={[0.75, floorHeight - 0.32, 0.75]} />
                </mesh>
              );
            })}

            {/* Alternating Bronze Vertical Shading Fins for Facade Rhythm */}
            {floorNumber % 2 === 0 &&
              [-11.5, -6.8, -2.2, 2.2, 6.8, 11.5].map((xPos) => {
                if (floorNumber === 8 && xPos < 0) return null;
                return (
                  <mesh key={`fin-${xPos}`} position={[xPos, 0, depth / 2 + 0.3]} castShadow material={materials.bronze}>
                    <boxGeometry args={[0.08, floorHeight - 0.32, 0.5]} />
                  </mesh>
                );
              })}

            {/* Balconies / Terraces on South Facade with Crystal Balustrades */}
            {/* Level 8 West uses high-detail FacadeBayModule */}
            {floorNumber === 8 ? (
              <FacadeBayModule position={[-7, 0, depth / 2]} />
            ) : (
              <>
                {/* West Balcony Terrace */}
                <mesh position={[-7, -floorHeight / 2 + 0.14, depth / 2 + 1.1]} castShadow receiveShadow material={materials.stone}>
                  <boxGeometry args={[11.5, 0.28, 2.2]} />
                </mesh>
                {/* West Balcony Slim Bronze Top Handrail */}
                <mesh position={[-7, -floorHeight / 2 + 1.1, depth / 2 + 2.15]} castShadow material={materials.darkBronze}>
                  <boxGeometry args={[11.5, 0.04, 0.06]} />
                </mesh>
                {/* West Balcony Crystal Glass Infill */}
                <mesh position={[-7, -floorHeight / 2 + 0.65, depth / 2 + 2.15]} material={materials.balustradeGlass}>
                  <boxGeometry args={[11.3, 0.88, 0.02]} />
                </mesh>
                {/* West Balcony Organic Foliage Cluster */}
                <group position={[-12, -floorHeight / 2 + 0.4, depth / 2 + 1.7]}>
                  <mesh castShadow receiveShadow material={materials.stone}>
                    <boxGeometry args={[1.4, 0.45, 0.7]} />
                  </mesh>
                  <mesh position={[-0.3, 0.45, 0]} castShadow material={materials.foliage}>
                    <sphereGeometry args={[0.32, 8, 8]} />
                  </mesh>
                  <mesh position={[0.3, 0.52, 0.05]} castShadow material={materials.foliage}>
                    <sphereGeometry args={[0.35, 8, 8]} />
                  </mesh>
                </group>

                {/* West Window Bay (Tinted Glazing with variation) */}
                <mesh
                  position={[-7, 0, depth / 2 - 0.1]}
                  receiveShadow
                  material={
                    isPenthouseFloor || floorNumber % 3 === 0
                      ? materials.exteriorGlazingOccupied
                      : floorNumber % 2 === 0
                      ? materials.exteriorGlazingVariation
                      : materials.exteriorGlazing
                  }
                >
                  <boxGeometry args={[11, floorHeight - 0.5, 0.1]} />
                </mesh>
              </>
            )}

            {/* East Balcony Terrace */}
            <mesh position={[7, -floorHeight / 2 + 0.14, depth / 2 + 1.1]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[11.5, 0.28, 2.2]} />
            </mesh>
            {/* East Balcony Slim Bronze Top Handrail */}
            <mesh position={[7, -floorHeight / 2 + 1.1, depth / 2 + 2.15]} castShadow material={materials.darkBronze}>
              <boxGeometry args={[11.5, 0.04, 0.06]} />
            </mesh>
            {/* East Balcony Crystal Glass Infill */}
            <mesh position={[7, -floorHeight / 2 + 0.65, depth / 2 + 2.15]} material={materials.balustradeGlass}>
              <boxGeometry args={[11.3, 0.88, 0.02]} />
            </mesh>
            {/* East Balcony Organic Foliage Cluster */}
            <group position={[12, -floorHeight / 2 + 0.4, depth / 2 + 1.7]}>
              <mesh castShadow receiveShadow material={materials.stone}>
                <boxGeometry args={[1.4, 0.45, 0.7]} />
              </mesh>
              <mesh position={[-0.3, 0.52, 0.05]} castShadow material={materials.foliage}>
                <sphereGeometry args={[0.35, 8, 8]} />
              </mesh>
              <mesh position={[0.3, 0.45, 0]} castShadow material={materials.foliage}>
                <sphereGeometry args={[0.32, 8, 8]} />
              </mesh>
            </group>

            {/* East Window Bay (Tinted Glazing with variation) */}
            <mesh
              position={[7, 0, depth / 2 - 0.1]}
              receiveShadow
              material={
                floorNumber % 3 === 1
                  ? materials.exteriorGlazingOccupied
                  : floorNumber % 2 === 1
                  ? materials.exteriorGlazingVariation
                  : materials.exteriorGlazing
              }
            >
              <boxGeometry args={[11, floorHeight - 0.5, 0.1]} />
            </mesh>

            {/* North Elevation Windows (Tinted Glazing) */}
            <mesh
              position={[0, 0, -depth / 2 + 0.1]}
              receiveShadow
              material={floorNumber % 2 === 0 ? materials.exteriorGlazingVariation : materials.exteriorGlazing}
            >
              <boxGeometry args={[width - 3, floorHeight - 0.5, 0.1]} />
            </mesh>

            {/* --- INTERACTIVE PROXIES --- */}
            {isInteractive && !isFloorActive && (
              <mesh
                name={`floor_${floorNumber}_proxy`}
                position={[0, 0, 0]}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  setHoveredFloor(floorNumber);
                }}
                onPointerOut={(e) => {
                  e.stopPropagation();
                  setHoveredFloor(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isPointerDragging) {
                    onSelectFloor(floorNumber);
                  }
                }}
              >
                <boxGeometry args={[width + 3, floorHeight, depth + 4]} />
                <meshBasicMaterial
                  color={isFloorHovered ? '#A8875F' : '#000000'}
                  transparent
                  opacity={isFloorHovered ? 0.22 : 0}
                  depthWrite={false}
                />
              </mesh>
            )}

            {isInteractive && isFloorActive && (
              <group>
                <mesh
                  name={`unit_${westUnitId}`}
                  position={[-7, 0, 0]}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredUnit(westUnitId);
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredUnit(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPointerDragging) {
                      onSelectUnit(westUnitId);
                    }
                  }}
                >
                  <boxGeometry args={[12.5, floorHeight, depth + 3]} />
                  <meshBasicMaterial
                    color={selectedUnitId === westUnitId ? '#28463C' : '#A8875F'}
                    transparent
                    opacity={selectedUnitId === westUnitId ? 0.35 : hoveredUnit === westUnitId ? 0.25 : 0.08}
                    depthWrite={false}
                  />
                </mesh>

                <mesh
                  name={`unit_${eastUnitId}`}
                  position={[7, 0, 0]}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredUnit(eastUnitId);
                  }}
                  onPointerOut={(e) => {
                    e.stopPropagation();
                    setHoveredUnit(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isPointerDragging) {
                      onSelectUnit(eastUnitId);
                    }
                  }}
                >
                  <boxGeometry args={[12.5, floorHeight, depth + 3]} />
                  <meshBasicMaterial
                    color={selectedUnitId === eastUnitId ? '#28463C' : '#A8875F'}
                    transparent
                    opacity={selectedUnitId === eastUnitId ? 0.35 : hoveredUnit === eastUnitId ? 0.25 : 0.08}
                    depthWrite={false}
                  />
                </mesh>
              </group>
            )}
          </group>
        );
      })}

      {/* ================================================================== */}
      {/* 5. ROOF SKY GARDEN & CROWN PERGOLA (Crown Hierarchy at Y: ~46m)    */}
      {/* ================================================================== */}
      <group position={[0, lobbyHeight + residentialFloors * floorHeight + 1.5, 0]}>
        {/* Parapet Stone Coping */}
        <mesh position={[0, -1, 0]} castShadow receiveShadow material={materials.stone}>
          <boxGeometry args={[width + 0.6, 1.2, depth + 0.6]} />
        </mesh>

        {/* Bronze Cantilevered Pergola Beams & Glass Screens */}
        {[-1,1].map(side=><group key={side}>
          <mesh position={[0,.25,side*9.7]} material={materials.balustradeGlass}><boxGeometry args={[27,.95,.04]}/></mesh>
          <mesh position={[0,.75,side*9.7]} material={materials.bronze}><boxGeometry args={[27,.05,.07]}/></mesh>
          <mesh position={[side*13.5,.25,0]} material={materials.balustradeGlass}><boxGeometry args={[.04,.95,19.4]}/></mesh>
          <mesh position={[side*13.5,.75,0]} material={materials.bronze}><boxGeometry args={[.07,.05,19.4]}/></mesh>
        </group>)}
        {[-9, -5.5, -2, 2, 5.5, 9].map((x) => (
          <mesh key={x} position={[x, 2.6, 0]} castShadow material={materials.bronze}>
            <boxGeometry args={[0.35, 0.45, depth - 2]} />
          </mesh>
        ))}

        {/* Bronze Pergola Cross-Purlins */}
        {[-6, -2, 2, 6].map((z) => (
          <mesh key={`cross-${z}`} position={[0, 2.85, z]} castShadow material={materials.darkBronze}>
            <boxGeometry args={[width - 3, 0.15, 0.25]} />
          </mesh>
        ))}

        {/* Lush Sky Garden Landscaping Deck */}
        <mesh position={[0, -0.25, 0]} receiveShadow material={materials.stone}>
          <boxGeometry args={[width - 2, 0.2, depth - 2]} />
        </mesh>
        {[-6,6].map(x=><group key={x} position={[x,0,0]}>
          <mesh position={[0,.05,0]} castShadow receiveShadow material={materials.darkBronze}><boxGeometry args={[3.8,.12,1.6]}/></mesh>
          <mesh position={[0,.27,0]} castShadow receiveShadow material={materials.stone}><boxGeometry args={[3.7,.3,1.5]}/></mesh>
          <mesh position={[0,.64,-.6]} castShadow material={materials.stone}><boxGeometry args={[3.7,.45,.2]}/></mesh>
        </group>)}
        <mesh position={[0,.25,0]} castShadow receiveShadow material={materials.darkBronze}><cylinderGeometry args={[1.1,1,.7,32]}/></mesh>
        {[-1,1].map(side=><mesh key={side} position={[side*11,.12,0]} castShadow receiveShadow material={materials.foliage}><boxGeometry args={[1.2,.5,14]}/></mesh>)}
        {/* Rooftop Specimen Plants */}
        {[-8, -3, 3, 8].map((x, idx) => (
          <group key={`roof-plant-${x}`} position={[x, 0.4, (idx % 2 === 0 ? 4 : -4)]}>
            <mesh castShadow receiveShadow material={materials.stone}>
              <cylinderGeometry args={[0.6, 0.5, 0.7, 16]} />
            </mesh>
            <mesh position={[0,.8,0]} castShadow material={materials.darkBronze}><cylinderGeometry args={[.06,.09,1.2,8]}/></mesh>
            <TreeCanopy position={[0,1.4,0]} scale={.65}/>
          </group>
        ))}
      </group>
    </group>
  );
}
