import { useMemo, useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Creates a BoxGeometry with metric-scaled UV coordinates so that physical texture repetition
 * is 100% constant across different mesh sizes without stretching or squashing.
 * @param tileMeters physical width/height of one texture repetition in meters (default 1.2m)
 */
export function createMetricBoxGeometry(
  width: number,
  height: number,
  depth: number,
  tileMeters: number = 1.2
): THREE.BoxGeometry {
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

export interface InstancePiece {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

interface InstancedBatchProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  pieces: InstancePiece[];
  name?: string;
}

export function InstancedBatch({ geometry, material, pieces, name }: InstancedBatchProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!meshRef.current || pieces.length === 0) return;
    const matrix = new THREE.Matrix4();
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const sc = new THREE.Vector3();
    const euler = new THREE.Euler();

    for (let i = 0; i < pieces.length; i++) {
      const p = pieces[i];
      pos.set(p.position[0], p.position[1], p.position[2]);
      if (p.rotation) {
        euler.set(p.rotation[0], p.rotation[1], p.rotation[2]);
        quat.setFromEuler(euler);
      } else {
        quat.identity();
      }
      if (p.scale) {
        sc.set(p.scale[0], p.scale[1], p.scale[2]);
      } else {
        sc.set(1, 1, 1);
      }
      matrix.compose(pos, quat, sc);
      meshRef.current.setMatrixAt(i, matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.computeBoundingBox();
    meshRef.current.computeBoundingSphere();
  }, [pieces]);

  if (pieces.length === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, pieces.length]}
      castShadow
      receiveShadow
      name={name}
      raycast={() => null}
    />
  );
}

export interface InstancedTowerFacadeProps {
  materials: {
    stone: THREE.MeshStandardMaterial;
    stoneSill: THREE.MeshStandardMaterial;
    bronze: THREE.MeshStandardMaterial;
    darkBronze: THREE.MeshStandardMaterial;
    shadowReveal: THREE.MeshStandardMaterial;
    exteriorGlazing: THREE.MeshStandardMaterial;
    exteriorGlazingVariation: THREE.MeshStandardMaterial;
    exteriorGlazingOccupied: THREE.MeshStandardMaterial;
    balustradeGlass: THREE.MeshStandardMaterial;
    foliage: THREE.MeshStandardMaterial;
  };
}

/**
 * High-performance, architectural instancing module propagating the approved Level 8 treatment
 * across all residential floors (1 to 12) of the AUREL Tower.
 *
 * Collapses ~800 individual mesh draw calls into cohesive, instanced batches with:
 * - Real CC0 Travertine 001 with metric UV scaling
 * - Real CC0 Metal 030 (Brushed Bronze)
 * - 220mm window reveals
 * - Sloped weather sills with contact shadow drips
 * - Bronze perimeter frames, transoms, and division mullions
 * - Balustrades with continuous extruded bronze shoes and 90-degree returns
 * - Dielectric tinted glazing with subtle per-bay variations
 * - raycast={() => null} on all decorative elements so interactive picking is 100% unimpeded
 */
export function InstancedTowerFacade({ materials }: InstancedTowerFacadeProps) {
  // Architectural Dimensions
  const width = 28;
  const depth = 20;
  const lobbyHeight = 4.6;
  const floorHeight = 3.4;
  const residentialFloors = 12;

  // Sub-bay width definitions matching the calibrated Level 8 design
  const subBayWidths = useMemo(() => ({ west: 3.5, center: 3.7, east: 3.1 }), []);

  // Shared geometries
  const geometries = useMemo(() => {
    return {
      // 1. South structural piers & reveals
      pier: createMetricBoxGeometry(0.75, 3.08, 0.75, 1.2),
      pierReveal: new THREE.BoxGeometry(0.02, 3.05, 0.02),

      // 2. Corner columns
      cornerCol: createMetricBoxGeometry(1.4, 3.08, 1.4, 1.2),

      // 3. Side elevation bays (East & West)
      sidePier: createMetricBoxGeometry(0.65, 3.08, 0.55, 1.2),
      sideSill: createMetricBoxGeometry(0.80, 0.16, 3.35, 1.2),
      sideSillDrip: new THREE.BoxGeometry(0.78, 0.02, 3.30),
      sideMullion: new THREE.BoxGeometry(0.09, 2.70, 0.065),
      sideGlass: new THREE.BoxGeometry(0.08, 2.70, 3.25),

      // 4. Shading fins
      finEast: new THREE.BoxGeometry(0.12, 3.08, 0.80),
      finSouth: new THREE.BoxGeometry(0.08, 3.08, 0.50),

      // 5. Cantilevered Balconies & Balustrades
      balSlab: createMetricBoxGeometry(12.7, 0.28, 2.2, 1.2),
      balSoffitDrip: new THREE.BoxGeometry(12.65, 0.02, 2.15),
      balShoeFront: new THREE.BoxGeometry(12.6, 0.08, 0.06),
      balGlassFront: new THREE.BoxGeometry(12.5, 0.88, 0.025),
      balRailFront: new THREE.BoxGeometry(12.6, 0.04, 0.06),
      balShoeSide: new THREE.BoxGeometry(0.06, 0.08, 2.06),
      balGlassSide: new THREE.BoxGeometry(0.025, 0.88, 2.04),
      balRailSide: new THREE.BoxGeometry(0.04, 0.04, 2.06),
      balPaveJoint: new THREE.BoxGeometry(0.015, 0.005, 2.18),

      // 6. Balcony Planters & Foliage
      planter: createMetricBoxGeometry(1.4, 0.44, 0.7, 1.2),
      planterCurb: new THREE.BoxGeometry(1.42, 0.02, 0.72),
      foliage1: new THREE.SphereGeometry(0.26, 8, 8),
      foliage2: new THREE.SphereGeometry(0.30, 8, 8),
      foliage3: new THREE.SphereGeometry(0.22, 8, 8),

      // 7. Floor Slab Soffit Reveal Grooves
      soffitReveal: new THREE.BoxGeometry(width + 0.6, 0.06, depth + 0.6),

      // 8. North Elevation Window Assemblies
      northSill: createMetricBoxGeometry(width - 3.2, 0.14, 0.38, 1.2),
      northFrameTop: new THREE.BoxGeometry(width - 3.2, 0.05, 0.08),
      northFrameBottom: new THREE.BoxGeometry(width - 3.2, 0.05, 0.08),
      northMullion: new THREE.BoxGeometry(0.065, 2.55, 0.10),
      northGlass: new THREE.BoxGeometry(width - 3.3, 2.55, 0.02),

      // 9. South Window Sub-Bay Geometries (keyed by sub-bay width)
      bayWest: {
        header: createMetricBoxGeometry(subBayWidths.west + 0.02, 0.20, 0.24, 1.2),
        sill: createMetricBoxGeometry(subBayWidths.west + 0.04, 0.12, 0.38, 1.2),
        sillDrip: new THREE.BoxGeometry(subBayWidths.west, 0.02, 0.36),
        frameTop: new THREE.BoxGeometry(subBayWidths.west - 0.02, 0.05, 0.08),
        frameBottom: new THREE.BoxGeometry(subBayWidths.west - 0.02, 0.05, 0.08),
        transom: new THREE.BoxGeometry(subBayWidths.west - 0.04, 0.04, 0.06),
        glass: new THREE.BoxGeometry(subBayWidths.west - 0.04, 2.55, 0.02)
      },
      bayCenter: {
        header: createMetricBoxGeometry(subBayWidths.center + 0.02, 0.20, 0.24, 1.2),
        sill: createMetricBoxGeometry(subBayWidths.center + 0.04, 0.12, 0.38, 1.2),
        sillDrip: new THREE.BoxGeometry(subBayWidths.center, 0.02, 0.36),
        frameTop: new THREE.BoxGeometry(subBayWidths.center - 0.02, 0.05, 0.08),
        frameBottom: new THREE.BoxGeometry(subBayWidths.center - 0.02, 0.05, 0.08),
        transom: new THREE.BoxGeometry(subBayWidths.center - 0.04, 0.04, 0.06),
        glass: new THREE.BoxGeometry(subBayWidths.center - 0.04, 2.55, 0.02)
      },
      bayEast: {
        header: createMetricBoxGeometry(subBayWidths.east + 0.02, 0.20, 0.24, 1.2),
        sill: createMetricBoxGeometry(subBayWidths.east + 0.04, 0.12, 0.38, 1.2),
        sillDrip: new THREE.BoxGeometry(subBayWidths.east, 0.02, 0.36),
        frameTop: new THREE.BoxGeometry(subBayWidths.east - 0.02, 0.05, 0.08),
        frameBottom: new THREE.BoxGeometry(subBayWidths.east - 0.02, 0.05, 0.08),
        transom: new THREE.BoxGeometry(subBayWidths.east - 0.04, 0.04, 0.06),
        glass: new THREE.BoxGeometry(subBayWidths.east - 0.04, 2.55, 0.02)
      },
      bayFrameSide: new THREE.BoxGeometry(0.05, 2.55, 0.08),
      bayMullion: new THREE.BoxGeometry(0.065, 2.55, 0.10)
    };
  }, [subBayWidths, width, depth]);

  useEffect(() => {
    return () => {
      geometries.pier.dispose();
      geometries.pierReveal.dispose();
      geometries.cornerCol.dispose();
      geometries.sidePier.dispose();
      geometries.sideSill.dispose();
      geometries.sideSillDrip.dispose();
      geometries.sideMullion.dispose();
      geometries.sideGlass.dispose();
      geometries.finEast.dispose();
      geometries.finSouth.dispose();
      geometries.balSlab.dispose();
      geometries.balSoffitDrip.dispose();
      geometries.balShoeFront.dispose();
      geometries.balGlassFront.dispose();
      geometries.balRailFront.dispose();
      geometries.balShoeSide.dispose();
      geometries.balGlassSide.dispose();
      geometries.balRailSide.dispose();
      geometries.balPaveJoint.dispose();
      geometries.planter.dispose();
      geometries.planterCurb.dispose();
      geometries.foliage1.dispose();
      geometries.foliage2.dispose();
      geometries.foliage3.dispose();
      geometries.soffitReveal.dispose();
      geometries.northSill.dispose();
      geometries.northFrameTop.dispose();
      geometries.northFrameBottom.dispose();
      geometries.northMullion.dispose();
      geometries.northGlass.dispose();

      Object.values(geometries.bayWest).forEach((g) => g.dispose());
      Object.values(geometries.bayCenter).forEach((g) => g.dispose());
      Object.values(geometries.bayEast).forEach((g) => g.dispose());
      geometries.bayFrameSide.dispose();
      geometries.bayMullion.dispose();
    };
  }, [geometries]);

  // Compute all instance matrices across residential floors 1 to 12
  const instances = useMemo(() => {
    // 1. South structural piers & reveals
    const piers: InstancePiece[] = [];
    const pierReveals: InstancePiece[] = [];

    // 2. Corner columns
    const cornerCols: InstancePiece[] = [];

    // 3. Side elevation window bays
    const sidePiers: InstancePiece[] = [];
    const sideSills: InstancePiece[] = [];
    const sideSillDrips: InstancePiece[] = [];
    const sideMullions: InstancePiece[] = [];
    const sideGlassStd: InstancePiece[] = [];
    const sideGlassAlt: InstancePiece[] = [];

    // 4. Shading fins
    const finsEast: InstancePiece[] = [];
    const finsSouth: InstancePiece[] = [];

    // 5. Balcony slabs & balustrades
    const balSlabs: InstancePiece[] = [];
    const balSoffitDrips: InstancePiece[] = [];
    const balShoesFront: InstancePiece[] = [];
    const balGlassFront: InstancePiece[] = [];
    const balRailsFront: InstancePiece[] = [];
    const balShoesSide: InstancePiece[] = [];
    const balGlassSide: InstancePiece[] = [];
    const balRailsSide: InstancePiece[] = [];
    const balPaveJoints: InstancePiece[] = [];

    // 6. Balcony planters & foliage
    const planters: InstancePiece[] = [];
    const planterCurbs: InstancePiece[] = [];
    const foliage1: InstancePiece[] = [];
    const foliage2: InstancePiece[] = [];
    const foliage3: InstancePiece[] = [];

    // 7. Floor slab soffit reveal grooves
    const soffitReveals: InstancePiece[] = [];

    // 8. North elevation windows
    const northSills: InstancePiece[] = [];
    const northFramesTop: InstancePiece[] = [];
    const northFramesBottom: InstancePiece[] = [];
    const northMullions: InstancePiece[] = [];
    const northGlassStd: InstancePiece[] = [];
    const northGlassAlt: InstancePiece[] = [];

    // 9. South Window Sub-Bays (Headers, sills, frames, mullions, glass)
    const bayWestHeaders: InstancePiece[] = [];
    const bayWestSills: InstancePiece[] = [];
    const bayWestSillDrips: InstancePiece[] = [];
    const bayWestFramesTop: InstancePiece[] = [];
    const bayWestFramesBottom: InstancePiece[] = [];
    const bayWestTransoms: InstancePiece[] = [];
    const bayWestGlass: InstancePiece[] = [];

    const bayCenterHeaders: InstancePiece[] = [];
    const bayCenterSills: InstancePiece[] = [];
    const bayCenterSillDrips: InstancePiece[] = [];
    const bayCenterFramesTop: InstancePiece[] = [];
    const bayCenterFramesBottom: InstancePiece[] = [];
    const bayCenterTransoms: InstancePiece[] = [];
    const bayCenterGlass: InstancePiece[] = [];

    const bayEastHeaders: InstancePiece[] = [];
    const bayEastSills: InstancePiece[] = [];
    const bayEastSillDrips: InstancePiece[] = [];
    const bayEastFramesTop: InstancePiece[] = [];
    const bayEastFramesBottom: InstancePiece[] = [];
    const bayEastTransoms: InstancePiece[] = [];
    const bayEastGlass: InstancePiece[] = [];

    const bayFramesSides: InstancePiece[] = [];
    const bayMullions: InstancePiece[] = [];

    // Loop over residential floors 1 to 12
    for (let floorIdx = 0; floorIdx < residentialFloors; floorIdx++) {
      const floorNum = floorIdx + 1;
      const floorCenterY = lobbyHeight + floorIdx * floorHeight + floorHeight / 2;
      const isPenthouse = floorNum >= 11;

      // --- A. Corner Columns (4 corners per floor) ---
      for (const cx of [-width / 2 + 0.6, width / 2 - 0.6]) {
        for (const cz of [-depth / 2 + 0.6, depth / 2 - 0.6]) {
          cornerCols.push({ position: [cx, floorCenterY, cz] });
        }
      }

      // --- B. South Structural Travertine Piers & Shadow Reveals ---
      for (const px of [-9, -4.5, 0, 4.5, 9]) {
        piers.push({ position: [px, floorCenterY, depth / 2] });

        // Triple shadow reveal grooves articulating each stone pier
        pierReveals.push({ position: [px, floorCenterY, depth / 2 + 0.38] });
        pierReveals.push({ position: [px - 0.38, floorCenterY, depth / 2] });
        pierReveals.push({ position: [px + 0.38, floorCenterY, depth / 2] });
      }

      // --- C. Alternating Bronze Shading Fins (Even Floors) ---
      if (floorNum % 2 === 0) {
        for (const fx of [-11.5, -6.8, -2.2, 2.2, 6.8, 11.5]) {
          finsSouth.push({ position: [fx, floorCenterY, depth / 2 + 0.3] });
        }
      }

      // --- D. East Facade Architectural Bronze Shading Fins ---
      for (const fz of [-4, 0, 4]) {
        finsEast.push({ position: [width / 2 + 0.05, floorCenterY, fz] });
      }

      // --- E. Side Elevation Recessed Window Bays (East & West) ---
      for (const side of [-1, 1]) {
        for (const sz of [-6, -2, 2, 6]) {
          sidePiers.push({ position: [side * 13.9, floorCenterY, sz - 1.88] });
          sideSills.push({
            position: [side * 13.7, floorCenterY - 1.35, sz],
            rotation: [0, 0, side * 0.06]
          });
          sideSillDrips.push({ position: [side * 13.7, floorCenterY - 1.43, sz] });
          sideMullions.push({ position: [side * 13.63, floorCenterY, sz] });

          const isOcc = (floorNum + Math.abs(sz)) % 3 === 0;
          if (isOcc) {
            sideGlassAlt.push({ position: [side * 13.55, floorCenterY, sz] });
          } else {
            sideGlassStd.push({ position: [side * 13.55, floorCenterY, sz] });
          }
        }
      }

      // --- F. Balconies & Terraces (South Elevation: West X: -6.85, East X: +6.85) ---
      for (const side of [-1, 1]) {
        const bx = side * 6.85;

        // Cantilevered slab with metric travertine UVs & soffit drip reveal
        balSlabs.push({ position: [bx, floorCenterY - 1.56, depth / 2 + 1.1] });
        balSoffitDrips.push({ position: [bx, floorCenterY - 1.71, depth / 2 + 1.1] });

        // Front continuous bronze shoe, glass, and handrail
        balShoesFront.push({ position: [bx, floorCenterY - 1.38, depth / 2 + 2.16] });
        balGlassFront.push({ position: [bx, floorCenterY - 0.92, depth / 2 + 2.16] });
        balRailsFront.push({ position: [bx, floorCenterY - 0.46, depth / 2 + 2.16] });

        // 90-Degree Balustrade Returns connecting into facade
        const returnWestX = bx - 6.3;
        const returnEastX = bx + 6.3;
        for (const rx of [returnWestX, returnEastX]) {
          balShoesSide.push({ position: [rx, floorCenterY - 1.38, depth / 2 + 1.13] });
          balGlassSide.push({ position: [rx, floorCenterY - 0.92, depth / 2 + 1.13] });
          balRailsSide.push({ position: [rx, floorCenterY - 0.46, depth / 2 + 1.13] });
        }

        // Balcony stone paving joints
        for (const jx of [bx - 4.0, bx, bx + 4.0]) {
          balPaveJoints.push({ position: [jx, floorCenterY - 1.418, depth / 2 + 1.1] });
        }

        // Loggia Sculpted Planter with Organic Foliage
        const planterX = side === -1 ? -1.6 : 1.6;
        planters.push({ position: [planterX, floorCenterY - 1.18, depth / 2 + 1.6] });
        planterCurbs.push({ position: [planterX, floorCenterY - 0.96, depth / 2 + 1.6] });
        foliage1.push({ position: [planterX - 0.3, floorCenterY - 0.86, depth / 2 + 1.64] });
        foliage2.push({ position: [planterX + 0.25, floorCenterY - 0.80, depth / 2 + 1.56] });
        foliage3.push({ position: [planterX, floorCenterY - 0.74, depth / 2 + 1.66] });
      }

      // --- G. South Elevation Window Sub-Bays (West & East) ---
      // West bay sub-bays at world X: -11.15 (width 3.5), -6.75 (width 3.7), -2.55 (width 3.1)
      // East bay sub-bays at world X: +2.55 (width 3.1), +6.75 (width 3.7), +11.15 (width 3.5)
      const subBays = [
        { type: 'west', x: -11.15, width: subBayWidths.west },
        { type: 'center', x: -6.75, width: subBayWidths.center },
        { type: 'east', x: -2.55, width: subBayWidths.east },
        { type: 'east', x: 2.55, width: subBayWidths.east },
        { type: 'center', x: 6.75, width: subBayWidths.center },
        { type: 'west', x: 11.15, width: subBayWidths.west }
      ] as const;

      for (const sb of subBays) {
        const sx = sb.x;
        const sw = sb.width;

        // Frame sides & vertical division mullion
        bayFramesSides.push({ position: [sx - sw / 2 + 0.02, floorCenterY + 0.02, depth / 2 - 0.22] });
        bayFramesSides.push({ position: [sx + sw / 2 - 0.02, floorCenterY + 0.02, depth / 2 - 0.22] });
        bayMullions.push({ position: [sx, floorCenterY + 0.02, depth / 2 - 0.22] });

        if (sb.type === 'west') {
          bayWestHeaders.push({ position: [sx, floorCenterY + 1.44, depth / 2 - 0.11] });
          bayWestSills.push({
            position: [sx, floorCenterY - 1.36, depth / 2 - 0.02],
            rotation: [0.08, 0, 0]
          });
          bayWestSillDrips.push({ position: [sx, floorCenterY - 1.43, depth / 2 - 0.02] });
          bayWestFramesTop.push({ position: [sx, floorCenterY + 1.32, depth / 2 - 0.22] });
          bayWestFramesBottom.push({ position: [sx, floorCenterY - 1.28, depth / 2 - 0.22] });
          bayWestTransoms.push({ position: [sx, floorCenterY + 0.88, depth / 2 - 0.22] });
          bayWestGlass.push({ position: [sx, floorCenterY + 0.02, depth / 2 - 0.22] });
        } else if (sb.type === 'center') {
          bayCenterHeaders.push({ position: [sx, floorCenterY + 1.44, depth / 2 - 0.11] });
          bayCenterSills.push({
            position: [sx, floorCenterY - 1.36, depth / 2 - 0.02],
            rotation: [0.08, 0, 0]
          });
          bayCenterSillDrips.push({ position: [sx, floorCenterY - 1.43, depth / 2 - 0.02] });
          bayCenterFramesTop.push({ position: [sx, floorCenterY + 1.32, depth / 2 - 0.22] });
          bayCenterFramesBottom.push({ position: [sx, floorCenterY - 1.28, depth / 2 - 0.22] });
          bayCenterTransoms.push({ position: [sx, floorCenterY + 0.88, depth / 2 - 0.22] });
          bayCenterGlass.push({ position: [sx, floorCenterY + 0.02, depth / 2 - 0.22] });
        } else {
          bayEastHeaders.push({ position: [sx, floorCenterY + 1.44, depth / 2 - 0.11] });
          bayEastSills.push({
            position: [sx, floorCenterY - 1.36, depth / 2 - 0.02],
            rotation: [0.08, 0, 0]
          });
          bayEastSillDrips.push({ position: [sx, floorCenterY - 1.43, depth / 2 - 0.02] });
          bayEastFramesTop.push({ position: [sx, floorCenterY + 1.32, depth / 2 - 0.22] });
          bayEastFramesBottom.push({ position: [sx, floorCenterY - 1.28, depth / 2 - 0.22] });
          bayEastTransoms.push({ position: [sx, floorCenterY + 0.88, depth / 2 - 0.22] });
          bayEastGlass.push({ position: [sx, floorCenterY + 0.02, depth / 2 - 0.22] });
        }
      }

      // --- H. North Elevation Windows ---
      northSills.push({
        position: [0, floorCenterY - 1.36, -depth / 2 + 0.02],
        rotation: [-0.08, 0, 0]
      });
      northFramesTop.push({ position: [0, floorCenterY + 1.32, -depth / 2 + 0.22] });
      northFramesBottom.push({ position: [0, floorCenterY - 1.28, -depth / 2 + 0.22] });
      for (const nx of [-9, -4.5, 0, 4.5, 9]) {
        northMullions.push({ position: [nx, floorCenterY + 0.02, -depth / 2 + 0.22] });
      }
      if (floorNum % 2 === 0 || isPenthouse) {
        northGlassAlt.push({ position: [0, floorCenterY + 0.02, -depth / 2 + 0.22] });
      } else {
        northGlassStd.push({ position: [0, floorCenterY + 0.02, -depth / 2 + 0.22] });
      }

      // --- I. Floor Slab Recessed Soffit Shadow Reveal ---
      soffitReveals.push({ position: [0, floorCenterY - floorHeight / 2 + 0.02, 0] });
    }

    return {
      piers,
      pierReveals,
      cornerCols,
      sidePiers,
      sideSills,
      sideSillDrips,
      sideMullions,
      sideGlassStd,
      sideGlassAlt,
      finsEast,
      finsSouth,
      balSlabs,
      balSoffitDrips,
      balShoesFront,
      balGlassFront,
      balRailsFront,
      balShoesSide,
      balGlassSide,
      balRailsSide,
      balPaveJoints,
      planters,
      planterCurbs,
      foliage1,
      foliage2,
      foliage3,
      soffitReveals,
      northSills,
      northFramesTop,
      northFramesBottom,
      northMullions,
      northGlassStd,
      northGlassAlt,
      bayWestHeaders,
      bayWestSills,
      bayWestSillDrips,
      bayWestFramesTop,
      bayWestFramesBottom,
      bayWestTransoms,
      bayWestGlass,
      bayCenterHeaders,
      bayCenterSills,
      bayCenterSillDrips,
      bayCenterFramesTop,
      bayCenterFramesBottom,
      bayCenterTransoms,
      bayCenterGlass,
      bayEastHeaders,
      bayEastSills,
      bayEastSillDrips,
      bayEastFramesTop,
      bayEastFramesBottom,
      bayEastTransoms,
      bayEastGlass,
      bayFramesSides,
      bayMullions
    };
  }, [lobbyHeight, floorHeight, residentialFloors, width, depth, subBayWidths]);

  return (
    <group name="instanced-tower-facade">
      {/* 1. Structural Piers, Corner Columns & Shadow Reveals */}
      <InstancedBatch geometry={geometries.pier} material={materials.stone} pieces={instances.piers} name="inst-south-piers" />
      <InstancedBatch geometry={geometries.pierReveal} material={materials.shadowReveal} pieces={instances.pierReveals} name="inst-pier-reveals" />
      <InstancedBatch geometry={geometries.cornerCol} material={materials.stone} pieces={instances.cornerCols} name="inst-corner-columns" />

      {/* 2. Side Elevation Bays (Stone piers, sloped sills, bronze frames, dielectric glass) */}
      <InstancedBatch geometry={geometries.sidePier} material={materials.stone} pieces={instances.sidePiers} name="inst-side-piers" />
      <InstancedBatch geometry={geometries.sideSill} material={materials.stoneSill} pieces={instances.sideSills} name="inst-side-sills" />
      <InstancedBatch geometry={geometries.sideSillDrip} material={materials.shadowReveal} pieces={instances.sideSillDrips} name="inst-side-sill-drips" />
      <InstancedBatch geometry={geometries.sideMullion} material={materials.bronze} pieces={instances.sideMullions} name="inst-side-mullions" />
      <InstancedBatch geometry={geometries.sideGlass} material={materials.exteriorGlazing} pieces={instances.sideGlassStd} name="inst-side-glass-std" />
      <InstancedBatch geometry={geometries.sideGlass} material={materials.exteriorGlazingOccupied} pieces={instances.sideGlassAlt} name="inst-side-glass-alt" />

      {/* 3. Architectural Shading Fins */}
      <InstancedBatch geometry={geometries.finEast} material={materials.bronze} pieces={instances.finsEast} name="inst-fins-east" />
      <InstancedBatch geometry={geometries.finSouth} material={materials.bronze} pieces={instances.finsSouth} name="inst-fins-south" />

      {/* 4. Cantilevered Balconies & Continuous Crystal Balustrades */}
      <InstancedBatch geometry={geometries.balSlab} material={materials.stone} pieces={instances.balSlabs} name="inst-bal-slabs" />
      <InstancedBatch geometry={geometries.balSoffitDrip} material={materials.shadowReveal} pieces={instances.balSoffitDrips} name="inst-bal-soffit-drips" />
      <InstancedBatch geometry={geometries.balShoeFront} material={materials.bronze} pieces={instances.balShoesFront} name="inst-bal-shoes-front" />
      <InstancedBatch geometry={geometries.balGlassFront} material={materials.balustradeGlass} pieces={instances.balGlassFront} name="inst-bal-glass-front" />
      <InstancedBatch geometry={geometries.balRailFront} material={materials.darkBronze} pieces={instances.balRailsFront} name="inst-bal-rails-front" />
      <InstancedBatch geometry={geometries.balShoeSide} material={materials.bronze} pieces={instances.balShoesSide} name="inst-bal-shoes-side" />
      <InstancedBatch geometry={geometries.balGlassSide} material={materials.balustradeGlass} pieces={instances.balGlassSide} name="inst-bal-glass-side" />
      <InstancedBatch geometry={geometries.balRailSide} material={materials.darkBronze} pieces={instances.balRailsSide} name="inst-bal-rails-side" />
      <InstancedBatch geometry={geometries.balPaveJoint} material={materials.shadowReveal} pieces={instances.balPaveJoints} name="inst-bal-pave-joints" />

      {/* 5. Balcony Planters & Organic Foliage */}
      <InstancedBatch geometry={geometries.planter} material={materials.stone} pieces={instances.planters} name="inst-planters" />
      <InstancedBatch geometry={geometries.planterCurb} material={materials.bronze} pieces={instances.planterCurbs} name="inst-planter-curbs" />
      <InstancedBatch geometry={geometries.foliage1} material={materials.foliage} pieces={instances.foliage1} name="inst-foliage1" />
      <InstancedBatch geometry={geometries.foliage2} material={materials.foliage} pieces={instances.foliage2} name="inst-foliage2" />
      <InstancedBatch geometry={geometries.foliage3} material={materials.foliage} pieces={instances.foliage3} name="inst-foliage3" />

      {/* 6. Slab Soffit Reveal Grooves */}
      <InstancedBatch geometry={geometries.soffitReveal} material={materials.shadowReveal} pieces={instances.soffitReveals} name="inst-soffit-reveals" />

      {/* 7. North Elevation Windows */}
      <InstancedBatch geometry={geometries.northSill} material={materials.stoneSill} pieces={instances.northSills} name="inst-north-sills" />
      <InstancedBatch geometry={geometries.northFrameTop} material={materials.bronze} pieces={instances.northFramesTop} name="inst-north-frames-top" />
      <InstancedBatch geometry={geometries.northFrameBottom} material={materials.bronze} pieces={instances.northFramesBottom} name="inst-north-frames-bottom" />
      <InstancedBatch geometry={geometries.northMullion} material={materials.bronze} pieces={instances.northMullions} name="inst-north-mullions" />
      <InstancedBatch geometry={geometries.northGlass} material={materials.exteriorGlazing} pieces={instances.northGlassStd} name="inst-north-glass-std" />
      <InstancedBatch geometry={geometries.northGlass} material={materials.exteriorGlazingVariation} pieces={instances.northGlassAlt} name="inst-north-glass-alt" />

      {/* 8. South Window Sub-Bay Frames & Mullions */}
      <InstancedBatch geometry={geometries.bayFrameSide} material={materials.bronze} pieces={instances.bayFramesSides} name="inst-bay-frame-sides" />
      <InstancedBatch geometry={geometries.bayMullion} material={materials.bronze} pieces={instances.bayMullions} name="inst-bay-mullions" />

      {/* 9. South Window Sub-Bays: West Width (3.5m) */}
      <InstancedBatch geometry={geometries.bayWest.header} material={materials.stone} pieces={instances.bayWestHeaders} name="inst-bay-west-headers" />
      <InstancedBatch geometry={geometries.bayWest.sill} material={materials.stoneSill} pieces={instances.bayWestSills} name="inst-bay-west-sills" />
      <InstancedBatch geometry={geometries.bayWest.sillDrip} material={materials.shadowReveal} pieces={instances.bayWestSillDrips} name="inst-bay-west-sill-drips" />
      <InstancedBatch geometry={geometries.bayWest.frameTop} material={materials.bronze} pieces={instances.bayWestFramesTop} name="inst-bay-west-frames-top" />
      <InstancedBatch geometry={geometries.bayWest.frameBottom} material={materials.bronze} pieces={instances.bayWestFramesBottom} name="inst-bay-west-frames-bottom" />
      <InstancedBatch geometry={geometries.bayWest.transom} material={materials.bronze} pieces={instances.bayWestTransoms} name="inst-bay-west-transoms" />
      <InstancedBatch geometry={geometries.bayWest.glass} material={materials.exteriorGlazing} pieces={instances.bayWestGlass} name="inst-bay-west-glass" />

      {/* 10. South Window Sub-Bays: Center Width (3.7m) */}
      <InstancedBatch geometry={geometries.bayCenter.header} material={materials.stone} pieces={instances.bayCenterHeaders} name="inst-bay-center-headers" />
      <InstancedBatch geometry={geometries.bayCenter.sill} material={materials.stoneSill} pieces={instances.bayCenterSills} name="inst-bay-center-sills" />
      <InstancedBatch geometry={geometries.bayCenter.sillDrip} material={materials.shadowReveal} pieces={instances.bayCenterSillDrips} name="inst-bay-center-sill-drips" />
      <InstancedBatch geometry={geometries.bayCenter.frameTop} material={materials.bronze} pieces={instances.bayCenterFramesTop} name="inst-bay-center-frames-top" />
      <InstancedBatch geometry={geometries.bayCenter.frameBottom} material={materials.bronze} pieces={instances.bayCenterFramesBottom} name="inst-bay-center-frames-bottom" />
      <InstancedBatch geometry={geometries.bayCenter.transom} material={materials.bronze} pieces={instances.bayCenterTransoms} name="inst-bay-center-transoms" />
      <InstancedBatch geometry={geometries.bayCenter.glass} material={materials.exteriorGlazingVariation} pieces={instances.bayCenterGlass} name="inst-bay-center-glass" />

      {/* 11. South Window Sub-Bays: East Width (3.1m) */}
      <InstancedBatch geometry={geometries.bayEast.header} material={materials.stone} pieces={instances.bayEastHeaders} name="inst-bay-east-headers" />
      <InstancedBatch geometry={geometries.bayEast.sill} material={materials.stoneSill} pieces={instances.bayEastSills} name="inst-bay-east-sills" />
      <InstancedBatch geometry={geometries.bayEast.sillDrip} material={materials.shadowReveal} pieces={instances.bayEastSillDrips} name="inst-bay-east-sill-drips" />
      <InstancedBatch geometry={geometries.bayEast.frameTop} material={materials.bronze} pieces={instances.bayEastFramesTop} name="inst-bay-east-frames-top" />
      <InstancedBatch geometry={geometries.bayEast.frameBottom} material={materials.bronze} pieces={instances.bayEastFramesBottom} name="inst-bay-east-frames-bottom" />
      <InstancedBatch geometry={geometries.bayEast.transom} material={materials.bronze} pieces={instances.bayEastTransoms} name="inst-bay-east-transoms" />
      <InstancedBatch geometry={geometries.bayEast.glass} material={materials.exteriorGlazingOccupied} pieces={instances.bayEastGlass} name="inst-bay-east-glass" />
    </group>
  );
}
