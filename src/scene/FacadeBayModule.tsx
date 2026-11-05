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
 * Creates a BoxGeometry with metric-scaled UV coordinates so that physical texture repetition
 * is 100% constant across different mesh sizes without stretching or squashing.
 * @param tileMeters physical width/height of one texture repetition in meters (default 1.2m)
 */
function createMetricBoxGeometry(width: number, height: number, depth: number, tileMeters: number = 1.2): THREE.BoxGeometry {
  const geo = new THREE.BoxGeometry(width, height, depth);
  const uvAttr = geo.attributes.uv;
  const uvs = uvAttr.array as Float32Array;

  const scaleFace = (offset: number, scaleU: number, scaleV: number) => {
    for (let i = 0; i < 4; i++) {
      const idx = (offset + i) * 2;
      uvs[idx] *= scaleU;
      uvs[idx + 1] *= scaleV;
    }
  };

  // Face 0 (+X) and Face 1 (-X): span depth (U) and height (V)
  scaleFace(0, depth / tileMeters, height / tileMeters);
  scaleFace(4, depth / tileMeters, height / tileMeters);

  // Face 2 (+Y) and Face 3 (-Y): span width (U) and depth (V)
  scaleFace(8, width / tileMeters, depth / tileMeters);
  scaleFace(12, width / tileMeters, depth / tileMeters);

  // Face 4 (+Z) and Face 5 (-Z): span width (U) and height (V)
  scaleFace(16, width / tileMeters, height / tileMeters);
  scaleFace(20, width / tileMeters, height / tileMeters);

  uvAttr.needsUpdate = true;
  return geo;
}

/**
 * Audited Architectural Facade Module for Level 8 (Unit A0801 - Skyline Suite).
 *
 * Geometric Audit & Structural Integration:
 * - Coordinates cleanly with the building's column grid at world X: -9.0 and -4.5.
 * - Sits between structural travertine piers with authentic 220mm stone reveals.
 * - Metric-scaled UVs on piers, sills, and slabs eliminate texture stretching.
 * - Continuous cantilevered balcony slab with aligned bottom soffit drip groove.
 * - Sloped travertine weather sills with beveled shadow lines under each window bay.
 * - Dark bronze perimeter frames, transom bars, and architectural vertical mullions.
 * - Laminated crystal balustrades with continuous extruded bronze shoe channel and 90-degree returns.
 * - All decorative meshes have raycast disabled so interactive unit/floor picking proxies are never obstructed.
 * - Uses real PBR maps (ambientCG Travertine001 & Metal030) and dielectric tinted glazing with subtle per-pane variation.
 */
export function FacadeBayModule({ position = [0, 0, 0] }: FacadeBayModuleProps) {
  const bays = useMemo(
    () => [
      { id: 'bay-west', x: -4.15, width: 3.5 },
      { id: 'bay-center', x: 0.25, width: 3.7 },
      { id: 'bay-east', x: 4.45, width: 3.1 }
    ],
    []
  );

  const materials = useMemo(() => {
    const trav = getPBRTravertineTextures();
    const bronze = getPBRBronzeTextures();

    return {
      stone: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.55, 0.55),
        roughnessMap: trav.roughnessMap,
        roughness: 0.62,
        metalness: 0.01
      }),
      stoneSill: new THREE.MeshStandardMaterial({
        map: trav.map,
        normalMap: trav.normalMap,
        normalScale: new THREE.Vector2(0.60, 0.60),
        roughnessMap: trav.roughnessMap,
        roughness: 0.58,
        metalness: 0.01
      }),
      bronzeFrame: new THREE.MeshStandardMaterial({
        map: bronze.map,
        normalMap: bronze.normalMap,
        normalScale: new THREE.Vector2(0.5, 0.5),
        roughnessMap: bronze.roughnessMap,
        color: '#443425',
        roughness: 0.35,
        metalness: 0.88
      }),
      darkBronzeRail: new THREE.MeshStandardMaterial({
        map: bronze.map,
        roughnessMap: bronze.roughnessMap,
        color: '#32251A',
        roughness: 0.30,
        metalness: 0.90
      }),
      shadowReveal: new THREE.MeshStandardMaterial({
        color: '#15100B',
        roughness: 0.9,
        metalness: 0.2
      }),
      // Dielectric tinted architectural glazing (West bay)
      glazingWest: new THREE.MeshStandardMaterial({
        color: '#283832',
        roughness: 0.038,
        metalness: 0.04, // dielectric physics: F0 ~0.04
        emissive: '#161D19',
        emissiveIntensity: 0.22,
        envMapIntensity: 2.65
      }),
      // Dielectric tinted architectural glazing (Center bay) - subtle tone & roughness shift
      glazingCenter: new THREE.MeshStandardMaterial({
        color: '#2B3B34',
        roughness: 0.046,
        metalness: 0.035,
        emissive: '#181F1A',
        emissiveIntensity: 0.20,
        envMapIntensity: 2.50
      }),
      // Dielectric tinted architectural glazing (East bay)
      glazingEast: new THREE.MeshStandardMaterial({
        color: '#273731',
        roughness: 0.040,
        metalness: 0.04,
        emissive: '#161D19',
        emissiveIntensity: 0.22,
        envMapIntensity: 2.60
      }),
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
      })
    };
  }, []);

  const geometries = useMemo(() => {
    return {
      pier: createMetricBoxGeometry(0.75, 3.08, 0.75, 1.2),
      pierReveal: new THREE.BoxGeometry(0.02, 3.05, 0.02),
      slab: createMetricBoxGeometry(12.7, 0.28, 2.2, 1.2),
      soffitDrip: new THREE.BoxGeometry(12.65, 0.02, 2.15),
      planter: createMetricBoxGeometry(1.4, 0.44, 0.7, 1.2),
      planterCurb: new THREE.BoxGeometry(1.42, 0.02, 0.72),
      foliage1: new THREE.SphereGeometry(0.26, 8, 8),
      foliage2: new THREE.SphereGeometry(0.30, 8, 8),
      foliage3: new THREE.SphereGeometry(0.22, 8, 8),
      balShoeFront: new THREE.BoxGeometry(12.6, 0.08, 0.06),
      balGlassFront: new THREE.BoxGeometry(12.5, 0.88, 0.025),
      balRailFront: new THREE.BoxGeometry(12.6, 0.04, 0.06),
      balRailSide: new THREE.BoxGeometry(0.04, 0.04, 2.06),
      balGlassSide: new THREE.BoxGeometry(0.025, 0.88, 2.04),
      balShoeSide: new THREE.BoxGeometry(0.06, 0.08, 2.06),
      paveJoint: new THREE.BoxGeometry(0.015, 0.005, 2.18),
      bayGeos: bays.map((bay) => ({
        id: bay.id,
        header: createMetricBoxGeometry(bay.width + 0.02, 0.20, 0.24, 1.2),
        sill: createMetricBoxGeometry(bay.width + 0.04, 0.12, 0.38, 1.2),
        sillDrip: new THREE.BoxGeometry(bay.width, 0.02, 0.36),
        frameTop: new THREE.BoxGeometry(bay.width - 0.02, 0.05, 0.08),
        frameBottom: new THREE.BoxGeometry(bay.width - 0.02, 0.05, 0.08),
        frameSide: new THREE.BoxGeometry(0.05, 2.55, 0.08),
        mullion: new THREE.BoxGeometry(0.065, 2.55, 0.10),
        transom: new THREE.BoxGeometry(bay.width - 0.04, 0.04, 0.06),
        glass: new THREE.BoxGeometry(bay.width - 0.04, 2.55, 0.02)
      }))
    };
  }, [bays]);

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
      geometries.pier.dispose();
      geometries.pierReveal.dispose();
      geometries.slab.dispose();
      geometries.soffitDrip.dispose();
      geometries.planter.dispose();
      geometries.planterCurb.dispose();
      geometries.foliage1.dispose();
      geometries.foliage2.dispose();
      geometries.foliage3.dispose();
      geometries.balShoeFront.dispose();
      geometries.balGlassFront.dispose();
      geometries.balRailFront.dispose();
      geometries.balRailSide.dispose();
      geometries.balGlassSide.dispose();
      geometries.balShoeSide.dispose();
      geometries.paveJoint.dispose();
      geometries.bayGeos.forEach((bg) => {
        bg.header.dispose();
        bg.sill.dispose();
        bg.sillDrip.dispose();
        bg.frameTop.dispose();
        bg.frameBottom.dispose();
        bg.frameSide.dispose();
        bg.mullion.dispose();
        bg.transom.dispose();
        bg.glass.dispose();
      });
    };
  }, [materials, geometries]);

  // Raycast disabler to ensure decorative architectural detail never blocks floor/unit raycasting
  const noRaycast = () => null;

  return (
    <group position={position} name="level8-facade-bay-audited">
      {/* ================================================================== */}
      {/* 1. ARTICULATED STRUCTURAL PIERS (Level 8 West Column Grid)        */}
      {/* ================================================================== */}
      {/* Structural Stone Pier at world X: -9.0 (local -2.0) */}
      <mesh position={[-2.0, 0, 0]} castShadow receiveShadow geometry={geometries.pier} material={materials.stone} raycast={noRaycast} />
      {/* Structural Stone Pier at world X: -4.5 (local +2.5) */}
      <mesh position={[2.5, 0, 0]} castShadow receiveShadow geometry={geometries.pier} material={materials.stone} raycast={noRaycast} />
      {/* West Pier Shadow Reveal Joints */}
      {[-2.0, 2.5].map((px) => (
        <group key={`pier-reveal-${px}`}>
          <mesh position={[px, 0, 0.38]} geometry={geometries.pierReveal} material={materials.shadowReveal} raycast={noRaycast} />
          <mesh position={[px - 0.38, 0, 0]} geometry={geometries.pierReveal} material={materials.shadowReveal} raycast={noRaycast} />
          <mesh position={[px + 0.38, 0, 0]} geometry={geometries.pierReveal} material={materials.shadowReveal} raycast={noRaycast} />
        </group>
      ))}

      {/* ================================================================== */}
      {/* 2. THREE RECESSED WINDOW SUB-BAYS WITH DEEP REVEALS (220mm)        */}
      {/* ================================================================== */}
      {bays.map((bay, idx) => {
        const bg = geometries.bayGeos[idx];
        const glazingMat =
          bay.id === 'bay-west'
            ? materials.glazingWest
            : bay.id === 'bay-center'
            ? materials.glazingCenter
            : materials.glazingEast;

        return (
          <group key={bay.id} position={[bay.x, 0, 0]}>
            {/* Top Header Reveal Return */}
            <mesh position={[0, 1.44, -0.11]} castShadow receiveShadow geometry={bg.header} material={materials.stone} raycast={noRaycast} />

            {/* Sloped Stone Weather Sill with Bevel Wash */}
            <mesh
              position={[0, -1.36, -0.02]}
              rotation={[0.08, 0, 0]}
              castShadow
              receiveShadow
              geometry={bg.sill}
              material={materials.stoneSill}
              raycast={noRaycast}
            />
            {/* Sill Underside Shadow Drip Reveal */}
            <mesh position={[0, -1.43, -0.02]} geometry={bg.sillDrip} material={materials.shadowReveal} raycast={noRaycast} />

            {/* Dark Bronze Outer Sub-Frame (Top, Bottom, Left, Right) */}
            <mesh position={[0, 1.32, -0.22]} castShadow geometry={bg.frameTop} material={materials.bronzeFrame} raycast={noRaycast} />
            <mesh position={[0, -1.28, -0.22]} castShadow geometry={bg.frameBottom} material={materials.bronzeFrame} raycast={noRaycast} />
            <mesh position={[-bay.width / 2 + 0.02, 0.02, -0.22]} castShadow geometry={bg.frameSide} material={materials.bronzeFrame} raycast={noRaycast} />
            <mesh position={[bay.width / 2 - 0.02, 0.02, -0.22]} castShadow geometry={bg.frameSide} material={materials.bronzeFrame} raycast={noRaycast} />

            {/* Vertical Division Mullion */}
            <mesh position={[0, 0.02, -0.22]} castShadow geometry={bg.mullion} material={materials.bronzeFrame} raycast={noRaycast} />
            {/* Horizontal Transom Bar */}
            <mesh position={[0, 0.88, -0.22]} geometry={bg.transom} material={materials.bronzeFrame} raycast={noRaycast} />

            {/* Tinted Reflective Architectural Glazing with Subtle Per-Pane Tone Shift */}
            <mesh position={[0, 0.02, -0.22]} receiveShadow geometry={bg.glass} material={glazingMat} raycast={noRaycast} />
          </group>
        );
      })}

      {/* ================================================================== */}
      {/* 3. CONTINUOUS CANTILEVERED BALCONY SLAB & SOFFIT                   */}
      {/* ================================================================== */}
      {/* Honed Stone Balcony Slab Cantilever with Metric-Scaled Travertine UVs */}
      <mesh position={[0.15, -1.56, 1.1]} castShadow receiveShadow geometry={geometries.slab} material={materials.stone} raycast={noRaycast} />
      {/* Underside Soffit Drip Groove for Contact Shadow Depth */}
      <mesh position={[0.15, -1.71, 1.1]} geometry={geometries.soffitDrip} material={materials.shadowReveal} raycast={noRaycast} />

      {/* ================================================================== */}
      {/* 4. CRYSTAL BALUSTRADE WITH CONTINUOUS BRONZE SHOE & RETURNS       */}
      {/* ================================================================== */}
      {/* Front Continuous Bronze Shoe Channel */}
      <mesh position={[0.15, -1.38, 2.16]} castShadow geometry={geometries.balShoeFront} material={materials.bronzeFrame} raycast={noRaycast} />
      {/* Front Crystal Glass Balustrade Infill */}
      <mesh position={[0.15, -0.92, 2.16]} geometry={geometries.balGlassFront} material={materials.balustradeGlass} raycast={noRaycast} />
      {/* Front Slim Bronze Top Handrail (60mm profile) */}
      <mesh position={[0.15, -0.46, 2.16]} castShadow geometry={geometries.balRailFront} material={materials.darkBronzeRail} raycast={noRaycast} />

      {/* 90-Degree Side Balustrade Returns connecting into building facade */}
      {/* West Return */}
      <group position={[-6.15, 0, 1.13]}>
        <mesh position={[0, -0.46, 0]} castShadow geometry={geometries.balRailSide} material={materials.darkBronzeRail} raycast={noRaycast} />
        <mesh position={[0, -0.92, 0]} geometry={geometries.balGlassSide} material={materials.balustradeGlass} raycast={noRaycast} />
        <mesh position={[0, -1.38, 0]} geometry={geometries.balShoeSide} material={materials.bronzeFrame} raycast={noRaycast} />
      </group>
      {/* East Return */}
      <group position={[6.45, 0, 1.13]}>
        <mesh position={[0, -0.46, 0]} castShadow geometry={geometries.balRailSide} material={materials.darkBronzeRail} raycast={noRaycast} />
        <mesh position={[0, -0.92, 0]} geometry={geometries.balGlassSide} material={materials.balustradeGlass} raycast={noRaycast} />
        <mesh position={[0, -1.38, 0]} geometry={geometries.balShoeSide} material={materials.bronzeFrame} raycast={noRaycast} />
      </group>

      {/* Balcony Stone Paving Joint Reveals */}
      {[-3.8, 0.25, 4.2].map((x) => (
        <mesh key={`pave-joint-${x}`} position={[x, -1.418, 1.1]} geometry={geometries.paveJoint} material={materials.shadowReveal} raycast={noRaycast} />
      ))}

      {/* ================================================================== */}
      {/* 5. LOGGIA SCULPTED PLANTER & SPECIMEN FOLIAGE                     */}
      {/* ================================================================== */}
      <group position={[5.4, -1.18, 1.6]}>
        <mesh castShadow receiveShadow geometry={geometries.planter} material={materials.stone} raycast={noRaycast} />
        <mesh position={[0, 0.22, 0]} geometry={geometries.planterCurb} material={materials.bronzeFrame} raycast={noRaycast} />
        {/* Organic foliage canopy */}
        <mesh position={[-0.3, 0.32, 0.04]} castShadow geometry={geometries.foliage1} material={materials.foliage} raycast={noRaycast} />
        <mesh position={[0.25, 0.38, -0.04]} castShadow geometry={geometries.foliage2} material={materials.foliage} raycast={noRaycast} />
        <mesh position={[0, 0.44, 0.06]} castShadow geometry={geometries.foliage3} material={materials.foliage} raycast={noRaycast} />
      </group>
    </group>
  );
}
