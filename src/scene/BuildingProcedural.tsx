import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { getTravertineTexture, getBronzeTexture } from './textureGenerators';

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
    const bronzeTex = getBronzeTexture();

    return {
      stone: new THREE.MeshStandardMaterial({
        map: travertineTex,
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
        roughness: 0.38,
        metalness: 0.82
      }),
      darkBronze: new THREE.MeshStandardMaterial({
        color: '#34261B',
        roughness: 0.45,
        metalness: 0.85
      }),
      // Dielectric crystal architectural glazing
      glass: new THREE.MeshStandardMaterial({
        color: '#769490',
        roughness: 0.06,
        metalness: 0.08,
        transparent: true,
        opacity: 0.40
      }),
      // Warm amber interior occupied illumination
      glassLit: new THREE.MeshStandardMaterial({
        color: '#E29E52',
        roughness: 0.20,
        metalness: 0.12,
        emissive: '#B87228',
        emissiveIntensity: 0.65,
        transparent: true,
        opacity: 0.85
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

  return (
    <group name="aurel-tower" position={[0, 0, 0]}>
      {/* ================================================================== */}
      {/* 1. GROUND LANDSCAPING, REFLECTING POOLS & BASE PLINTH              */}
      {/* ================================================================== */}
      <mesh position={[0, -0.2, 0]} receiveShadow material={materials.darkStone}>
        <boxGeometry args={[68, 0.4, 56]} />
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
        <mesh position={[0, 0, depth / 2 - 0.2]} receiveShadow material={materials.glassLit}>
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

            {/* Side Shear Walls (East & West Facades) */}
            <mesh position={[-width / 2 + 0.3, 0, 0]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[0.6, floorHeight - 0.32, depth - 4]} />
            </mesh>
            <mesh position={[width / 2 - 0.3, 0, 0]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[0.6, floorHeight - 0.32, depth - 4]} />
            </mesh>

            {/* East Facade Architectural Bronze Shading Fins */}
            {[-4, 0, 4].map((z) => (
              <mesh key={`east-fin-${z}`} position={[width / 2 + 0.05, 0, z]} castShadow material={materials.bronze}>
                <boxGeometry args={[0.12, floorHeight - 0.32, 0.8]} />
              </mesh>
            ))}

            {/* Vertical Travertine Piers on South Elevation */}
            {[-9, -4.5, 0, 4.5, 9].map((xPos) => (
              <mesh key={xPos} position={[xPos, 0, depth / 2]} castShadow receiveShadow material={materials.stone}>
                <boxGeometry args={[0.75, floorHeight - 0.32, 0.75]} />
              </mesh>
            ))}

            {/* Alternating Bronze Vertical Shading Fins for Facade Rhythm */}
            {floorNumber % 2 === 0 &&
              [-11.5, -6.8, -2.2, 2.2, 6.8, 11.5].map((xPos) => (
                <mesh key={`fin-${xPos}`} position={[xPos, 0, depth / 2 + 0.3]} castShadow material={materials.bronze}>
                  <boxGeometry args={[0.08, floorHeight - 0.32, 0.5]} />
                </mesh>
              ))}

            {/* Balconies / Terraces on South Facade with Crystal Balustrades */}
            {/* West Balcony Terrace */}
            <mesh position={[-7, -floorHeight / 2 + 0.14, depth / 2 + 1.1]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[11.5, 0.28, 2.2]} />
            </mesh>
            {/* West Balcony Slim Bronze Top Handrail */}
            <mesh position={[-7, -floorHeight / 2 + 1.1, depth / 2 + 2.15]} castShadow material={materials.darkBronze}>
              <boxGeometry args={[11.5, 0.04, 0.06]} />
            </mesh>
            {/* West Balcony Crystal Glass Infill */}
            <mesh position={[-7, -floorHeight / 2 + 0.65, depth / 2 + 2.15]} material={materials.glass}>
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

            {/* East Balcony Terrace */}
            <mesh position={[7, -floorHeight / 2 + 0.14, depth / 2 + 1.1]} castShadow receiveShadow material={materials.stone}>
              <boxGeometry args={[11.5, 0.28, 2.2]} />
            </mesh>
            {/* East Balcony Slim Bronze Top Handrail */}
            <mesh position={[7, -floorHeight / 2 + 1.1, depth / 2 + 2.15]} castShadow material={materials.darkBronze}>
              <boxGeometry args={[11.5, 0.04, 0.06]} />
            </mesh>
            {/* East Balcony Crystal Glass Infill */}
            <mesh position={[7, -floorHeight / 2 + 0.65, depth / 2 + 2.15]} material={materials.glass}>
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

            {/* Window Bays (Dielectric glass with occupied warm lighting accents) */}
            <mesh position={[-7, 0, depth / 2 - 0.1]} receiveShadow material={floorNumber % 2 === 0 || isPenthouseFloor ? materials.glassLit : materials.glass}>
              <boxGeometry args={[11, floorHeight - 0.5, 0.1]} />
            </mesh>
            <mesh position={[7, 0, depth / 2 - 0.1]} receiveShadow material={floorNumber % 3 === 0 || isPenthouseFloor ? materials.glassLit : materials.glass}>
              <boxGeometry args={[11, floorHeight - 0.5, 0.1]} />
            </mesh>

            {/* North Elevation Windows */}
            <mesh position={[0, 0, -depth / 2 + 0.1]} receiveShadow material={materials.glass}>
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

        {/* Bronze Cantilevered Pergola Beams */}
        {[-9, -5.5, -2, 2, 5.5, 9].map((x) => (
          <mesh key={x} position={[x, 1.2, 0]} castShadow material={materials.bronze}>
            <boxGeometry args={[0.35, 0.45, depth - 2]} />
          </mesh>
        ))}

        {/* Bronze Pergola Cross-Purlins */}
        {[-6, -2, 2, 6].map((z) => (
          <mesh key={`cross-${z}`} position={[0, 1.45, z]} castShadow material={materials.darkBronze}>
            <boxGeometry args={[width - 3, 0.15, 0.25]} />
          </mesh>
        ))}

        {/* Lush Sky Garden Landscaping Deck */}
        <mesh position={[0, 0.05, 0]} receiveShadow material={materials.foliage}>
          <boxGeometry args={[width - 5, 0.6, depth - 5]} />
        </mesh>
        {/* Rooftop Specimen Plants */}
        {[-8, -3, 3, 8].map((x, idx) => (
          <group key={`roof-plant-${x}`} position={[x, 0.4, (idx % 2 === 0 ? 4 : -4)]}>
            <mesh castShadow receiveShadow material={materials.stone}>
              <cylinderGeometry args={[0.6, 0.5, 0.7, 16]} />
            </mesh>
            <mesh position={[0, 0.7, 0]} castShadow material={materials.foliage}>
              <sphereGeometry args={[0.65, 12, 12]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
