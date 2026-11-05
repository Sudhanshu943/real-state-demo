import { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import {
  getPBRTravertineTextures,
  getPBRBronzeTextures
} from './textureGenerators';

interface FacadeBayModuleProps {
  position?: [number, number, number];
}

/**
 * Audited Architectural Facade Module for Level 8 (Unit A0801 - Skyline Suite).
 *
 * Geometric Audit & Structural Integration:
 * - Coordinates cleanly with the building's column grid at world X: -9.0 and -4.5.
 * - Sits between structural travertine piers with authentic 220mm stone reveals.
 * - Continuous cantilevered balcony slab with aligned bottom soffit drip groove.
 * - Sloped travertine weather sills with beveled shadow lines under each window bay.
 * - Dark bronze perimeter frames and architectural vertical mullions.
 * - Laminated crystal balustrades with continuous extruded bronze shoe channel and 90-degree returns.
 * - All decorative meshes have raycast disabled so interactive unit/floor picking proxies are never obstructed.
 * - Uses real PBR maps (ambientCG Travertine001 & Metal030) and dielectric tinted glazing with subtle per-pane variation.
 */
export function FacadeBayModule({ position = [0, 0, 0] }: FacadeBayModuleProps) {
  const materials = useMemo(() => {
    const trav = getPBRTravertineTextures();
    const bronze = getPBRBronzeTextures();

    return {
      stone: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.9, 0.9),
        roughnessMap: trav.roughnessMap,
        roughness: 0.70,
        metalness: 0.02
      }),
      stoneSill: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        roughnessMap: trav.roughnessMap,
        roughness: 0.60,
        metalness: 0.02
      }),
      bronzeFrame: new THREE.MeshStandardMaterial({
        map: bronze.map,
        normalMap: bronze.normalMap,
        normalScale: new THREE.Vector2(0.7, 0.7),
        roughnessMap: bronze.roughnessMap,
        roughness: 0.38,
        metalness: 0.82
      }),
      darkBronzeRail: new THREE.MeshStandardMaterial({
        map: bronze.map,
        roughnessMap: bronze.roughnessMap,
        color: '#362A1F',
        roughness: 0.32,
        metalness: 0.85
      }),
      // Dielectric tinted architectural glazing (West bay)
      glazingWest: new THREE.MeshStandardMaterial({
        color: '#1A2420',
        roughness: 0.05,
        metalness: 0.03, // dielectric physics: F0 ~0.04
        envMapIntensity: 1.55
      }),
      // Dielectric tinted architectural glazing (Center bay) - subtle tone & roughness shift
      glazingCenter: new THREE.MeshStandardMaterial({
        color: '#1E2723',
        roughness: 0.065,
        metalness: 0.025,
        envMapIntensity: 1.50
      }),
      // Dielectric tinted architectural glazing (East bay)
      glazingEast: new THREE.MeshStandardMaterial({
        color: '#1B2421',
        roughness: 0.048,
        metalness: 0.03,
        envMapIntensity: 1.60
      }),
      balustradeGlass: new THREE.MeshStandardMaterial({
        color: '#7A9690',
        roughness: 0.04,
        metalness: 0.04,
        transparent: true,
        opacity: 0.38
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: '#223D2B',
        roughness: 0.85,
        metalness: 0.02
      })
    };
  }, []);

  useEffect(() => () => Object.values(materials).forEach((m) => m.dispose()), [materials]);

  // Raycast disabler to ensure decorative architectural detail never blocks floor/unit raycasting
  const noRaycast = () => null;

  // Sub-bay openings defined between structural columns (centered at local -7):
  // Pier 1 (world -9.0) is at local x = -2.0
  // Pier 2 (world -4.5) is at local x = +2.5
  const bays = [
    { id: 'bay-west', x: -4.15, width: 3.5 },
    { id: 'bay-center', x: 0.25, width: 3.7 },
    { id: 'bay-east', x: 4.45, width: 3.1 }
  ];

  return (
    <group position={position} name="level8-facade-bay-audited">
      {/* ================================================================== */}
      {/* 1. ARTICULATED STRUCTURAL PIERS (Level 8 West Column Grid)        */}
      {/* ================================================================== */}
      {/* Structural Stone Pier at world X: -9.0 (local -2.0) */}
      <mesh position={[-2.0, 0, 0]} castShadow receiveShadow material={materials.stone} raycast={noRaycast}>
        <boxGeometry args={[0.75, 3.08, 0.75]} />
      </mesh>
      {/* Structural Stone Pier at world X: -4.5 (local +2.5) */}
      <mesh position={[2.5, 0, 0]} castShadow receiveShadow material={materials.stone} raycast={noRaycast}>
        <boxGeometry args={[0.75, 3.08, 0.75]} />
      </mesh>
      {/* West Pier Shadow Reveal Joints */}
      {[-2.0, 2.5].map((px) => (
        <group key={`pier-reveal-${px}`}>
          <mesh position={[px, 0, 0.38]} material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.02, 3.05, 0.02]} />
          </mesh>
          <mesh position={[px - 0.38, 0, 0]} material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.02, 3.05, 0.02]} />
          </mesh>
          <mesh position={[px + 0.38, 0, 0]} material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.02, 3.05, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* ================================================================== */}
      {/* 2. THREE RECESSED WINDOW SUB-BAYS WITH DEEP REVEALS (220mm)        */}
      {/* ================================================================== */}
      {bays.map((bay) => (
        <group key={bay.id} position={[bay.x, 0, 0]}>
          {/* Top Header Reveal Return */}
          <mesh position={[0, 1.44, -0.11]} castShadow receiveShadow material={materials.stone} raycast={noRaycast}>
            <boxGeometry args={[bay.width + 0.02, 0.20, 0.24]} />
          </mesh>

          {/* Sloped Stone Weather Sill with Bevel Wash */}
          <mesh
            position={[0, -1.36, -0.02]}
            rotation={[0.08, 0, 0]}
            castShadow
            receiveShadow
            material={materials.stoneSill}
            raycast={noRaycast}
          >
            <boxGeometry args={[bay.width + 0.04, 0.12, 0.38]} />
          </mesh>
          {/* Sill Underside Shadow Drip Reveal */}
          <mesh position={[0, -1.43, -0.02]} material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[bay.width, 0.02, 0.36]} />
          </mesh>

          {/* Dark Bronze Outer Sub-Frame (Top, Bottom, Left, Right) */}
          <mesh position={[0, 1.32, -0.22]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[bay.width - 0.02, 0.05, 0.08]} />
          </mesh>
          <mesh position={[0, -1.28, -0.22]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[bay.width - 0.02, 0.05, 0.08]} />
          </mesh>
          <mesh position={[-bay.width / 2 + 0.02, 0.02, -0.22]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.05, 2.55, 0.08]} />
          </mesh>
          <mesh position={[bay.width / 2 - 0.02, 0.02, -0.22]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.05, 2.55, 0.08]} />
          </mesh>

          {/* Vertical Division Mullion */}
          <mesh position={[0, 0.02, -0.22]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[0.065, 2.55, 0.10]} />
          </mesh>
          {/* Horizontal Transom Bar */}
          <mesh position={[0, 0.88, -0.22]} material={materials.bronzeFrame} raycast={noRaycast}>
            <boxGeometry args={[bay.width - 0.04, 0.04, 0.06]} />
          </mesh>

          {/* Tinted Reflective Architectural Glazing with Subtle Per-Pane Tone Shift */}
          <mesh
            position={[0, 0.02, -0.22]}
            receiveShadow
            material={
              bay.id === 'bay-west'
                ? materials.glazingWest
                : bay.id === 'bay-center'
                ? materials.glazingCenter
                : materials.glazingEast
            }
            raycast={noRaycast}
          >
            <boxGeometry args={[bay.width - 0.04, 2.55, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* ================================================================== */}
      {/* 3. CONTINUOUS CANTILEVERED BALCONY SLAB & SOFFIT                   */}
      {/* ================================================================== */}
      {/* Honed Stone Balcony Slab Cantilever */}
      <mesh position={[0.15, -1.56, 1.1]} castShadow receiveShadow material={materials.stone} raycast={noRaycast}>
        <boxGeometry args={[12.7, 0.28, 2.2]} />
      </mesh>
      {/* Underside Soffit Drip Groove */}
      <mesh position={[0.15, -1.71, 1.1]} material={materials.bronzeFrame} raycast={noRaycast}>
        <boxGeometry args={[12.65, 0.02, 2.15]} />
      </mesh>

      {/* ================================================================== */}
      {/* 4. CRYSTAL BALUSTRADE WITH CONTINUOUS BRONZE SHOE & RETURNS       */}
      {/* ================================================================== */}
      {/* Front Continuous Bronze Shoe Channel */}
      <mesh position={[0.15, -1.38, 2.16]} castShadow material={materials.bronzeFrame} raycast={noRaycast}>
        <boxGeometry args={[12.6, 0.08, 0.06]} />
      </mesh>
      {/* Front Crystal Glass Balustrade Infill */}
      <mesh position={[0.15, -0.92, 2.16]} material={materials.balustradeGlass} raycast={noRaycast}>
        <boxGeometry args={[12.5, 0.88, 0.025]} />
      </mesh>
      {/* Front Slim Bronze Top Handrail (60mm profile) */}
      <mesh position={[0.15, -0.46, 2.16]} castShadow material={materials.darkBronzeRail} raycast={noRaycast}>
        <boxGeometry args={[12.6, 0.04, 0.06]} />
      </mesh>

      {/* 90-Degree Side Balustrade Returns connecting into building facade */}
      {/* West Return */}
      <group position={[-6.15, 0, 1.13]}>
        <mesh position={[0, -0.46, 0]} castShadow material={materials.darkBronzeRail} raycast={noRaycast}>
          <boxGeometry args={[0.04, 0.04, 2.06]} />
        </mesh>
        <mesh position={[0, -0.92, 0]} material={materials.balustradeGlass} raycast={noRaycast}>
          <boxGeometry args={[0.025, 0.88, 2.04]} />
        </mesh>
        <mesh position={[0, -1.38, 0]} material={materials.bronzeFrame} raycast={noRaycast}>
          <boxGeometry args={[0.06, 0.08, 2.06]} />
        </mesh>
      </group>
      {/* East Return */}
      <group position={[6.45, 0, 1.13]}>
        <mesh position={[0, -0.46, 0]} castShadow material={materials.darkBronzeRail} raycast={noRaycast}>
          <boxGeometry args={[0.04, 0.04, 2.06]} />
        </mesh>
        <mesh position={[0, -0.92, 0]} material={materials.balustradeGlass} raycast={noRaycast}>
          <boxGeometry args={[0.025, 0.88, 2.04]} />
        </mesh>
        <mesh position={[0, -1.38, 0]} material={materials.bronzeFrame} raycast={noRaycast}>
          <boxGeometry args={[0.06, 0.08, 2.06]} />
        </mesh>
      </group>

      {/* Balcony Stone Paving Joint Reveals */}
      {[-3.8, 0.25, 4.2].map((x) => (
        <mesh key={`pave-joint-${x}`} position={[x, -1.418, 1.1]} material={materials.bronzeFrame} raycast={noRaycast}>
          <boxGeometry args={[0.015, 0.005, 2.18]} />
        </mesh>
      ))}

      {/* ================================================================== */}
      {/* 5. LOGGIA SCULPTED PLANTER & SPECIMEN FOLIAGE                     */}
      {/* ================================================================== */}
      <group position={[5.4, -1.18, 1.6]}>
        <mesh castShadow receiveShadow material={materials.stone} raycast={noRaycast}>
          <boxGeometry args={[1.4, 0.44, 0.7]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={materials.bronzeFrame} raycast={noRaycast}>
          <boxGeometry args={[1.42, 0.02, 0.72]} />
        </mesh>
        {/* Organic foliage canopy */}
        <mesh position={[-0.3, 0.32, 0.04]} castShadow material={materials.foliage} raycast={noRaycast}>
          <sphereGeometry args={[0.26, 8, 8]} />
        </mesh>
        <mesh position={[0.25, 0.38, -0.04]} castShadow material={materials.foliage} raycast={noRaycast}>
          <sphereGeometry args={[0.30, 8, 8]} />
        </mesh>
        <mesh position={[0, 0.44, 0.06]} castShadow material={materials.foliage} raycast={noRaycast}>
          <sphereGeometry args={[0.22, 8, 8]} />
        </mesh>
      </group>
    </group>
  );
}
