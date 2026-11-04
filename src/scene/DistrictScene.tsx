import { useMemo } from 'react';
import * as THREE from 'three';
import { useExperience } from '../app/providers';

interface DistrictSceneProps {
  selectedLandmarkId?: string;
  onSelectLandmark: (id: string) => void;
  isPointerDragging: boolean;
}

export function DistrictScene({
  selectedLandmarkId,
  onSelectLandmark,
  isPointerDragging
}: DistrictSceneProps) {
  const { project } = useExperience();

  const materials = useMemo(() => {
    return {
      ground: new THREE.MeshStandardMaterial({
        color: '#D8D4C8',
        roughness: 0.92,
        metalness: 0.04
      }),
      streets: new THREE.MeshStandardMaterial({
        color: '#BBB4A4',
        roughness: 0.85,
        metalness: 0.08
      }),
      canalWater: new THREE.MeshStandardMaterial({
        color: '#1A332B',
        roughness: 0.06,
        metalness: 0.95
      }),
      parkGreen: new THREE.MeshStandardMaterial({
        color: '#2D4E3C',
        roughness: 0.88,
        metalness: 0.02
      }),
      blocksStone: new THREE.MeshStandardMaterial({
        color: '#CBC4B4',
        roughness: 0.75,
        metalness: 0.06
      }),
      blocksSlate: new THREE.MeshStandardMaterial({
        color: '#34403B',
        roughness: 0.70,
        metalness: 0.20
      }),
      blocksWarm: new THREE.MeshStandardMaterial({
        color: '#BFA88F',
        roughness: 0.72,
        metalness: 0.08
      }),
      aurelTowerStone: new THREE.MeshStandardMaterial({
        color: '#C2B8A5',
        roughness: 0.68,
        metalness: 0.06
      }),
      aurelBronze: new THREE.MeshStandardMaterial({
        color: '#6E523A',
        roughness: 0.35,
        metalness: 0.75
      }),
      markerMat: new THREE.MeshStandardMaterial({
        color: '#28463C',
        emissive: '#1A332B',
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8
      }),
      markerSelected: new THREE.MeshStandardMaterial({
        color: '#D9984C',
        emissive: '#D9984C',
        emissiveIntensity: 0.9,
        roughness: 0.15,
        metalness: 0.85
      })
    };
  }, []);

  return (
    <group name="aurel-district" position={[0, 0, 0]}>
      {/* ================================================================== */}
      {/* 1. TERRAIN & PAVED STREET GRID                                     */}
      {/* ================================================================== */}
      {/* Base Ground Plane (600m x 600m) */}
      <mesh position={[0, -0.6, 0]} receiveShadow material={materials.ground}>
        <boxGeometry args={[600, 1.2, 600]} />
      </mesh>

      {/* East-West Arterial Avenues */}
      {[-80, 0, 80].map((z) => (
        <mesh key={`street-z-${z}`} position={[0, 0.03, z]} receiveShadow material={materials.streets}>
          <boxGeometry args={[600, 0.06, 14]} />
        </mesh>
      ))}

      {/* North-South Boulevards */}
      {[-110, -40, 40, 110].map((x) => (
        <mesh key={`street-x-${x}`} position={[x, 0.03, 0]} receiveShadow material={materials.streets}>
          <boxGeometry args={[14, 0.06, 600]} />
        </mesh>
      ))}

      {/* ================================================================== */}
      {/* 2. CURVED WATER CANAL & BRIDGES                                    */}
      {/* ================================================================== */}
      {/* Scenic Urban Waterway Canal */}
      <mesh position={[0, 0.02, -95]} receiveShadow material={materials.canalWater}>
        <boxGeometry args={[600, 0.04, 24]} />
      </mesh>
      {/* Canal Bridges */}
      {[-110, -40, 40, 110].map((x) => (
        <mesh key={`bridge-${x}`} position={[x, 0.4, -95]} castShadow receiveShadow material={materials.blocksStone}>
          <boxGeometry args={[14, 0.6, 26]} />
        </mesh>
      ))}

      {/* ================================================================== */}
      {/* 3. CIVIC PARKS & BOTANIC GARDEN OASIS                              */}
      {/* ================================================================== */}
      {/* West Botanic Park Zone */}
      <mesh position={[-85, 0.05, -45]} receiveShadow material={materials.parkGreen}>
        <boxGeometry args={[46, 0.1, 44]} />
      </mesh>
      {/* Clustered Trees in West Park */}
      {[-95, -85, -75].map((x) =>
        [-52, -42, -35].map((z) => (
          <mesh key={`tree-${x}-${z}`} position={[x, 3.5, z]} castShadow material={materials.parkGreen}>
            <sphereGeometry args={[2.5, 12, 12]} />
          </mesh>
        ))
      )}

      {/* East Waterfront Promenade Park */}
      <mesh position={[85, 0.05, -60]} receiveShadow material={materials.parkGreen}>
        <boxGeometry args={[44, 0.1, 38]} />
      </mesh>

      {/* ================================================================== */}
      {/* 4. CONTEXTUAL URBAN ARCHITECTURAL MASSING                          */}
      {/* ================================================================== */}
      {/* Stepped Urban Blocks with varied elevations & materiality */}
      {[
        // North-West Quadrant
        { x: -145, z: -45, w: 32, d: 38, h: 22, mat: materials.blocksStone },
        { x: -85, z: 45, w: 34, d: 42, h: 18, mat: materials.blocksWarm },
        { x: -145, z: 45, w: 36, d: 40, h: 26, mat: materials.blocksSlate },
        // North-East Quadrant
        { x: 85, z: 45, w: 34, d: 44, h: 20, mat: materials.blocksStone },
        { x: 145, z: 45, w: 36, d: 40, h: 24, mat: materials.blocksWarm },
        { x: 145, z: -45, w: 32, d: 38, h: 28, mat: materials.blocksSlate },
        // South Perimeter Blocks
        { x: -75, z: 120, w: 46, d: 34, h: 16, mat: materials.blocksStone },
        { x: 0, z: 120, w: 50, d: 34, h: 14, mat: materials.blocksWarm },
        { x: 75, z: 120, w: 46, d: 34, h: 18, mat: materials.blocksSlate }
      ].map((b, i) => (
        <group key={`block-${i}`} position={[b.x, b.h / 2, b.z]}>
          <mesh castShadow receiveShadow material={b.mat}>
            <boxGeometry args={[b.w, b.h, b.d]} />
          </mesh>
          {/* Architectural Setback / Penthouse Crown on taller buildings */}
          {b.h > 20 && (
            <mesh position={[0, b.h / 2 + 2, 0]} castShadow material={materials.blocksWarm}>
              <boxGeometry args={[b.w - 8, 4, b.d - 8]} />
            </mesh>
          )}
        </group>
      ))}

      {/* ================================================================== */}
      {/* 5. AUREL TOWER SITE (Center X: 0, Z: 0)                            */}
      {/* ================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Ground Site Plinth & Reflecting Pool */}
        <mesh position={[0, 0.15, 0]} receiveShadow material={materials.ground}>
          <boxGeometry args={[44, 0.3, 36]} />
        </mesh>
        <mesh position={[0, 0.31, 12]} receiveShadow material={materials.canalWater}>
          <boxGeometry args={[18, 0.02, 8]} />
        </mesh>

        {/* Articulated AUREL Tower Model */}
        {/* Main Shaft (12 Storeys, 46m) */}
        <mesh position={[0, 23, 0]} castShadow receiveShadow material={materials.aurelTowerStone}>
          <boxGeometry args={[28, 46, 20]} />
        </mesh>
        {/* Floor Band Reveals */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`aurel-slab-${i}`} position={[0, 4.6 + i * 3.4, 0]} castShadow material={materials.aurelBronze}>
            <boxGeometry args={[28.8, 0.25, 20.8]} />
          </mesh>
        ))}
        {/* Balcony Terraces on South Facade */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={`aurel-balc-${i}`} position={[0, 4.6 + i * 3.4, 11]} castShadow material={materials.aurelTowerStone}>
            <boxGeometry args={[22, 0.2, 2]} />
          </mesh>
        ))}
        {/* Crown Pergola */}
        <mesh position={[0, 46.5, 0]} castShadow material={materials.aurelBronze}>
          <boxGeometry args={[26, 1.2, 18]} />
        </mesh>
      </group>

      {/* ================================================================== */}
      {/* 6. AUTHORED LANDMARK BEACONS & PULSE RINGS                         */}
      {/* ================================================================== */}
      {project.landmarks.map((landmark) => {
        const isSelected = selectedLandmarkId === landmark.id;
        const [x, y, z] = landmark.position;

        return (
          <group
            key={landmark.id}
            position={[x, y + 2, z]}
            onClick={(e) => {
              e.stopPropagation();
              if (!isPointerDragging) {
                onSelectLandmark(landmark.id);
              }
            }}
          >
            {/* Ground Pulsing Halo */}
            <mesh position={[0, -y - 1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[isSelected ? 6 : 4, isSelected ? 8 : 5.5, 32]} />
              <meshBasicMaterial
                color={isSelected ? '#D9984C' : '#28463C'}
                transparent
                opacity={isSelected ? 0.75 : 0.45}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Glowing Beacon Sphere */}
            <mesh position={[0, 7, 0]} castShadow material={isSelected ? materials.markerSelected : materials.markerMat}>
              <sphereGeometry args={[isSelected ? 4.5 : 3.2, 20, 20]} />
            </mesh>

            {/* Elegant Beacon Stem */}
            <mesh position={[0, 3.5, 0]} material={isSelected ? materials.markerSelected : materials.markerMat}>
              <cylinderGeometry args={[0.6, 0.2, 7, 12]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
