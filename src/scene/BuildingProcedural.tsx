import { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { FacadeDetails } from './FacadeDetails';
import { ArrivalGarden } from './ArrivalGarden';
import { BotanicalShrubs } from './BotanicalVegetation';
import { InstancedTowerFacade, createMetricBoxGeometry } from './InstancedTowerFacade';
import {
  getPBRTravertineTextures,
  getPBRBronzeTextures
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

  // Authored Architectural PBR Materials with Real CC0 PBR Textures
  const materials = useMemo(() => {
    const trav = getPBRTravertineTextures();
    const bronze = getPBRBronzeTextures();

    return {
      // Real CC0 Travertine 001 with metric-aware UV scaling
      stone: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.55, 0.55),
        roughnessMap: trav.roughnessMap,
        roughness: 0.62,
        metalness: 0.01
      }),
      // Sloped weather sills with crisp specular response
      stoneSill: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.60, 0.60),
        roughnessMap: trav.roughnessMap,
        roughness: 0.58,
        metalness: 0.01
      }),
      // Real CC0 Brushed Bronze Metal 030
      bronze: new THREE.MeshStandardMaterial({
        map: bronze.map,
        normalMap: bronze.normalMap,
        normalScale: new THREE.Vector2(0.5, 0.5),
        roughnessMap: bronze.roughnessMap,
        color: '#443425',
        roughness: 0.35,
        metalness: 0.88
      }),
      // Dark extruded bronze for top rails and structure
      darkBronze: new THREE.MeshStandardMaterial({
        map: bronze.map,
        roughnessMap: bronze.roughnessMap,
        color: '#32251A',
        roughness: 0.30,
        metalness: 0.90
      }),
      // Deep contact shadow reveal material
      shadowReveal: new THREE.MeshStandardMaterial({
        color: '#15100B',
        roughness: 0.90,
        metalness: 0.20
      }),
      // Dielectric tinted architectural glazing (standard residential bays)
      exteriorGlazing: new THREE.MeshStandardMaterial({
        color: '#283832',
        roughness: 0.038,
        metalness: 0.04, // dielectric physics: F0 ~0.04
        emissive: '#161D19',
        emissiveIntensity: 0.22,
        envMapIntensity: 2.65
      }),
      // Subtle window-to-window tone and roughness shift (center sub-bays)
      exteriorGlazingVariation: new THREE.MeshStandardMaterial({
        color: '#2B3B34',
        roughness: 0.046,
        metalness: 0.035,
        emissive: '#181F1A',
        emissiveIntensity: 0.20,
        envMapIntensity: 2.50
      }),
      // Penthouse and occupied suites with gentle ambient bounce
      exteriorGlazingOccupied: new THREE.MeshStandardMaterial({
        color: '#324238',
        roughness: 0.055,
        metalness: 0.035,
        emissive: '#22241C',
        emissiveIntensity: 0.26,
        envMapIntensity: 2.45
      }),
      // Crystal balustrade glass infill
      balustradeGlass: new THREE.MeshStandardMaterial({
        color: '#90AAA2',
        roughness: 0.02,
        metalness: 0.04,
        transparent: true,
        opacity: 0.40,
        envMapIntensity: 1.85
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: '#223D2B',
        roughness: 0.85,
        metalness: 0.02
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

  // Shared metric floor slab geometry
  const slabGeo = useMemo(() => createMetricBoxGeometry(width + 0.8, 0.32, depth + 0.8, 1.2), [width, depth]);

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
      slabGeo.dispose();
    };
  }, [materials, slabGeo]);

  return (
    <group name="aurel-tower" position={[0, 0, 0]}>
      {/* Fine architectural joints, entrance hardware & canopy downlights */}
      <FacadeDetails bronze={materials.bronze} reveal={materials.shadowReveal} stone={materials.stone} />

      {/* ================================================================== */}
      {/* 1. GROUND ARRIVAL PLAZA PRECINCT (PBR Pavers, Pools, Curbs & Flora) */}
      {/* ================================================================== */}
      <ArrivalGarden materials={materials} />

      {/* ================================================================== */}
      {/* 2. SOLID CENTRAL STRUCTURAL CORE                                   */}
      {/* ================================================================== */}
      <mesh position={[0, 23, 0]} castShadow receiveShadow material={materials.darkStone} raycast={() => null}>
        <boxGeometry args={[10, 46, 10]} />
      </mesh>

      {/* ================================================================== */}
      {/* 3. GROUND LOBBY & ARRIVAL PORTICO CANOPY (Base Hierarchy)           */}
      {/* ================================================================== */}
      <group position={[0, lobbyHeight / 2, 0]}>
        {/* Double-Height Corner Travertine Colonnade */}
        {[-width / 2 + 1.2, width / 2 - 1.2].map((x) =>
          [-depth / 2 + 1.2, depth / 2 - 1.2].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0, z]} castShadow receiveShadow material={materials.stone} raycast={() => null}>
              <boxGeometry args={[2.4, lobbyHeight, 2.4]} />
            </mesh>
          ))
        )}

        {/* Double-Height Lobby Glazing */}
        <mesh position={[0, 0, depth / 2 - 0.2]} receiveShadow material={materials.exteriorGlazingOccupied} raycast={() => null}>
          <boxGeometry args={[width - 5, lobbyHeight - 0.2, 0.2]} />
        </mesh>

        {/* Arrival Portico Canopy extending over the entrance */}
        <mesh position={[0, lobbyHeight / 2 - 0.15, depth / 2 + 4.5]} castShadow receiveShadow material={materials.darkBronze} raycast={() => null}>
          <boxGeometry args={[16, 0.30, 9]} />
        </mesh>
        <mesh position={[0, lobbyHeight / 2 - 0.32, depth / 2 + 4.5]} material={materials.bronze} raycast={() => null}>
          <boxGeometry args={[15.6, 0.05, 8.6]} />
        </mesh>
        {/* Portico Downlight */}
        <pointLight position={[0, lobbyHeight / 2 - 0.5, depth / 2 + 4.5]} intensity={1.2} color="#FFDCB0" distance={10} />
      </group>

      {/* ================================================================== */}
      {/* 4. INSTANCED TOWER FACADE (All 12 Residential Floors)              */}
      {/* ================================================================== */}
      <InstancedTowerFacade materials={materials} />

      {/* ================================================================== */}
      {/* 5. RESIDENTIAL FLOOR SLABS & INTERACTIVE PROXIES (Floors 1 to 12)  */}
      {/* ================================================================== */}
      {Array.from({ length: residentialFloors }, (_, i) => {
        const floorNumber = i + 1;
        const yPos = lobbyHeight + i * floorHeight + floorHeight / 2;
        const isInteractive = exampleFloors.includes(floorNumber);
        const isFloorActive = selectedFloor === floorNumber;
        const isFloorHovered = hoveredFloor === floorNumber;

        let slabMat = materials.stone;
        if (isFloorActive) {
          slabMat = materials.highlightFloor;
        }

        const westUnitId = floorNumber < 10 ? `A0${floorNumber}01` : `A${floorNumber}01`;
        const eastUnitId = floorNumber < 10 ? `A0${floorNumber}02` : `A${floorNumber}02`;

        return (
          <group key={floorNumber} position={[0, yPos, 0]}>
            {/* Horizontal Cantilevered Floor Slab with Metric UV Scaling */}
            <mesh
              position={[0, -floorHeight / 2 + 0.16, 0]}
              castShadow
              receiveShadow
              material={slabMat}
              geometry={slabGeo}
              raycast={() => null}
            />

            {/* --- INTERACTIVE PROXIES (Exclusively targeted for raycasts) --- */}
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
      {/* 6. ROOF SKY GARDEN & CROWN PERGOLA (Crown Hierarchy at Y: ~46m)    */}
      {/* ================================================================== */}
      <group position={[0, lobbyHeight + residentialFloors * floorHeight + 1.5, 0]}>
        {/* Parapet Stone Coping */}
        <mesh position={[0, -1, 0]} castShadow receiveShadow material={materials.stone} raycast={() => null}>
          <boxGeometry args={[width + 0.6, 1.2, depth + 0.6]} />
        </mesh>

        {/* Bronze Cantilevered Pergola Beams & Glass Screens */}
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[0, 0.25, side * 9.7]} material={materials.balustradeGlass} raycast={() => null}>
              <boxGeometry args={[27, 0.95, 0.04]} />
            </mesh>
            <mesh position={[0, 0.75, side * 9.7]} material={materials.bronze} raycast={() => null}>
              <boxGeometry args={[27, 0.05, 0.07]} />
            </mesh>
            <mesh position={[side * 13.5, 0.25, 0]} material={materials.balustradeGlass} raycast={() => null}>
              <boxGeometry args={[0.04, 0.95, 19.4]} />
            </mesh>
            <mesh position={[side * 13.5, 0.75, 0]} material={materials.bronze} raycast={() => null}>
              <boxGeometry args={[0.07, 0.05, 19.4]} />
            </mesh>
          </group>
        ))}

        {[-9, -5.5, -2, 2, 5.5, 9].map((x) => (
          <mesh key={x} position={[x, 2.6, 0]} castShadow material={materials.bronze} raycast={() => null}>
            <boxGeometry args={[0.35, 0.45, depth - 2]} />
          </mesh>
        ))}

        {/* Bronze Pergola Cross-Purlins */}
        {[-6, -2, 2, 6].map((z) => (
          <mesh key={`cross-${z}`} position={[0, 2.85, z]} castShadow material={materials.darkBronze} raycast={() => null}>
            <boxGeometry args={[width - 3, 0.15, 0.25]} />
          </mesh>
        ))}

        {/* Lush Sky Garden Landscaping Deck */}
        <mesh position={[0, -0.25, 0]} receiveShadow material={materials.stone} raycast={() => null}>
          <boxGeometry args={[width - 2, 0.2, depth - 2]} />
        </mesh>

        {[-6, 6].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow material={materials.darkBronze} raycast={() => null}>
              <boxGeometry args={[3.8, 0.12, 1.6]} />
            </mesh>
            <mesh position={[0, 0.27, 0]} castShadow receiveShadow material={materials.stone} raycast={() => null}>
              <boxGeometry args={[3.7, 0.3, 1.5]} />
            </mesh>
            <mesh position={[0, 0.64, -0.6]} castShadow material={materials.stone} raycast={() => null}>
              <boxGeometry args={[3.7, 0.45, 0.2]} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, 0.25, 0]} castShadow receiveShadow material={materials.darkBronze} raycast={() => null}>
          <cylinderGeometry args={[1.1, 1, 0.7, 32]} />
        </mesh>

        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 11, 0.12, 0]} castShadow receiveShadow material={materials.foliage} raycast={() => null}>
            <boxGeometry args={[1.2, 0.5, 14]} />
          </mesh>
        ))}

        {/* Rooftop Specimen Plants */}
        {[-8, -3, 3, 8].map((x, idx) => (
          <group key={`roof-plant-${x}`} position={[x, 0.4, idx % 2 === 0 ? 4 : -4]}>
            <mesh castShadow receiveShadow material={materials.stone} raycast={() => null}>
              <cylinderGeometry args={[0.6, 0.5, 0.7, 16]} />
            </mesh>
            <mesh position={[0, 0.35, 0]} receiveShadow material={materials.darkStone} raycast={() => null}>
              <cylinderGeometry args={[0.55, 0.55, 0.05, 16]} />
            </mesh>
          </group>
        ))}
        <BotanicalShrubs
          instances={[
            { position: [-8, 0.75, 4], rotationY: 0.8, scale: 0.55 },
            { position: [-3, 0.75, -4], rotationY: 2.3, scale: 0.52 },
            { position: [3, 0.75, 4], rotationY: 3.7, scale: 0.56 },
            { position: [8, 0.75, -4], rotationY: 5.1, scale: 0.54 }
          ]}
        />
      </group>
    </group>
  );
}
