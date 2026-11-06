import { useMemo } from 'react';
import * as THREE from 'three';
import { getPBRPavingTextures } from './textureGenerators';
import { BotanicalTrees, BotanicalShrubs, type VegetationInstance } from './BotanicalVegetation';

interface ArrivalGardenProps {
  materials?: Record<string, THREE.Material>;
}

export function ArrivalGarden({ materials }: ArrivalGardenProps) {
  // PBR concrete pavers material (Poly Haven CC0 concrete_pavers_02)
  const pavingMaterial = useMemo(() => {
    const pbr = getPBRPavingTextures(8, 10);
    return new THREE.MeshStandardMaterial({
      map: pbr.map,
      normalMap: pbr.normalMap,
      roughnessMap: pbr.roughnessMap,
      roughness: 0.85,
      metalness: 0.04
    });
  }, []);

  // Architectural granite plinth and curb material
  const graniteCurbMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#424844',
      roughness: 0.70,
      metalness: 0.12
    });
  }, []);

  // Sunken soil bed material (rich loamy organic earth)
  const soilMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#1C1916',
      roughness: 0.98,
      metalness: 0.02
    });
  }, []);

  // Broad surrounding site asphalt/granite apron
  const surroundingGroundMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#18201D',
      roughness: 0.95,
      metalness: 0.05
    });
  }, []);

  // Reflecting pool water material (high specular, subtle transparency)
  const poolWaterMaterial = useMemo(() => {
    return (
      materials?.water ??
      new THREE.MeshStandardMaterial({
        color: '#132822',
        roughness: 0.03,
        metalness: 0.88,
        transparent: true,
        opacity: 0.88
      })
    );
  }, [materials]);

  // Pool basin dark slate lining
  const poolBasinMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#101614',
      roughness: 0.85,
      metalness: 0.10
    });
  }, []);

  // Travertine stone for planters & tower footprint
  const stoneMat = materials?.stone ?? graniteCurbMaterial;
  const darkBronzeMat = materials?.darkBronze ?? graniteCurbMaterial;
  const shadowRevealMat = materials?.shadowReveal ?? graniteCurbMaterial;

  // Botanical Tree instances (flanking the arrival promenade in recessed soil beds)
  const treeInstances: VegetationInstance[] = useMemo(
    () => [
      // West Bed Specimen Trees
      { position: [-19, 0.10, 2], rotationY: 0.35, scale: 1.05 },
      { position: [-19, 0.10, 12], rotationY: 2.15, scale: 0.95 },
      { position: [-19, 0.10, 22], rotationY: 4.20, scale: 1.10 },
      // East Bed Specimen Trees
      { position: [19, 0.10, 2], rotationY: 5.10, scale: 0.98 },
      { position: [19, 0.10, 12], rotationY: 1.45, scale: 1.08 },
      { position: [19, 0.10, 22], rotationY: 3.70, scale: 0.94 }
    ],
    []
  );

  // Botanical Shrub instances (along curbs, reflecting pools, and entrance planters)
  const shrubInstances: VegetationInstance[] = useMemo(
    () => [
      // West soil bed hedge clusters
      { position: [-20.5, 0.10, -2], rotationY: 0.2, scale: 0.9 },
      { position: [-17.5, 0.10, 5], rotationY: 1.5, scale: 0.85 },
      { position: [-20.2, 0.10, 8], rotationY: 2.8, scale: 1.0 },
      { position: [-17.8, 0.10, 15], rotationY: 4.1, scale: 0.95 },
      { position: [-20.4, 0.10, 18], rotationY: 5.4, scale: 0.88 },
      { position: [-17.6, 0.10, 25], rotationY: 0.9, scale: 1.05 },
      { position: [-19.5, 0.10, 28], rotationY: 3.2, scale: 0.92 },
      { position: [-18.2, 0.10, -5], rotationY: 4.6, scale: 0.85 },

      // East soil bed hedge clusters
      { position: [20.5, 0.10, -2], rotationY: 5.8, scale: 0.9 },
      { position: [17.5, 0.10, 5], rotationY: 4.3, scale: 0.85 },
      { position: [20.2, 0.10, 8], rotationY: 3.0, scale: 1.0 },
      { position: [17.8, 0.10, 15], rotationY: 1.7, scale: 0.95 },
      { position: [20.4, 0.10, 18], rotationY: 0.4, scale: 0.88 },
      { position: [17.6, 0.10, 25], rotationY: 4.9, scale: 1.05 },
      { position: [19.5, 0.10, 28], rotationY: 2.6, scale: 0.92 },
      { position: [18.2, 0.10, -5], rotationY: 1.2, scale: 0.85 },

      // Flanking reflecting pools
      { position: [-15.8, 0.12, 10], rotationY: 1.1, scale: 0.75 },
      { position: [-15.8, 0.12, 18], rotationY: 3.9, scale: 0.78 },
      { position: [15.8, 0.12, 10], rotationY: 4.8, scale: 0.75 },
      { position: [15.8, 0.12, 18], rotationY: 2.2, scale: 0.78 },

      // Entrance Planters (replaces the old green spherical blobs)
      { position: [-8.8, 0.72, 18], rotationY: 0.6, scale: 0.55 },
      { position: [-8.2, 0.72, 18], rotationY: 2.4, scale: 0.52 },
      { position: [8.2, 0.72, 18], rotationY: 3.8, scale: 0.55 },
      { position: [8.8, 0.72, 18], rotationY: 5.5, scale: 0.52 }
    ],
    []
  );

  return (
    <group name="arrival-plaza-precinct">
      {/* ================================================================== */}
      {/* 1. BROAD SURROUNDING URBAN GROUND APRON (140m x 140m at Y: -0.22m) */}
      {/* Blends seamlessly with fog to remove the floating display platform */}
      {/* ================================================================== */}
      <mesh position={[0, -0.22, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={surroundingGroundMaterial} raycast={() => null}>
        <planeGeometry args={[140, 140]} />
      </mesh>

      {/* ================================================================== */}
      {/* 2. ELEVATED PODIUM PLINTH (56m x 48m, top at Y: +0.14m)            */}
      {/* ================================================================== */}
      <mesh position={[0, -0.04, 3]} receiveShadow material={graniteCurbMaterial} raycast={() => null}>
        <boxGeometry args={[56, 0.36, 50]} />
      </mesh>
      {/* Negative Shadow Reveal Slot grounding the plinth */}
      <mesh position={[0, -0.20, 3]} material={shadowRevealMat} raycast={() => null}>
        <boxGeometry args={[56.2, 0.04, 50.2]} />
      </mesh>

      {/* ================================================================== */}
      {/* 3. MAIN ARRIVAL PROMENADE (PBR Pavers: concrete_pavers_02)        */}
      {/* Y: +0.16m, Width: 18m, Depth: 22m (Z: +5m to +27m)                 */}
      {/* ================================================================== */}
      <mesh position={[0, 0.16, 16]} receiveShadow material={pavingMaterial} raycast={() => null}>
        <boxGeometry args={[18, 0.04, 22]} />
      </mesh>

      {/* Tower Base Promenade Travertine Paving (Z: -12m to +5m, X: -16m to +16m) */}
      <mesh position={[0, 0.155, -3.5]} receiveShadow material={stoneMat} raycast={() => null}>
        <boxGeometry args={[32, 0.03, 17]} />
      </mesh>

      {/* Tower Footprint Contact Shadow Plane */}
      <mesh position={[0, 0.165, 0]} material={shadowRevealMat} raycast={() => null}>
        <boxGeometry args={[26, 0.005, 18]} />
      </mesh>

      {/* ================================================================== */}
      {/* 4. ARCHITECTURAL GRANITE CURBS & EDGES                            */}
      {/* ================================================================== */}
      {/* Flanking Promenade Curbs separating pavers from pools and beds */}
      {[-9.1, 9.1].map((x) => (
        <mesh key={`prom-curb-${x}`} position={[x, 0.20, 16]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
          <boxGeometry args={[0.25, 0.12, 22]} />
        </mesh>
      ))}

      {/* Promenade Forecourt End Curb (Z: +27m) */}
      <mesh position={[0, 0.20, 27.1]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
        <boxGeometry args={[18.4, 0.12, 0.25]} />
      </mesh>

      {/* ================================================================== */}
      {/* 5. FLANKING REFLECTING POOLS (Recessed Basin & Water)              */}
      {/* ================================================================== */}
      {[-12.7, 12.7].map((x) => (
        <group key={`pool-${x}`} position={[x, 0, 15]}>
          {/* Recessed Basin Floor (Y: +0.02m) */}
          <mesh position={[0, 0.02, 0]} receiveShadow material={poolBasinMaterial} raycast={() => null}>
            <boxGeometry args={[5.2, 0.02, 13.6]} />
          </mesh>
          {/* Water Surface (Y: +0.13m, below curb Y: +0.20m to prevent z-fighting) */}
          <mesh position={[0, 0.13, 0]} receiveShadow material={poolWaterMaterial} raycast={() => null}>
            <boxGeometry args={[5.2, 0.01, 13.6]} />
          </mesh>
          {/* Pool Perimeter Coping Curbs */}
          {[-2.7, 2.7].map((cx) => (
            <mesh key={`pool-curb-x-${cx}`} position={[cx, 0.18, 0]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
              <boxGeometry args={[0.25, 0.10, 14.1]} />
            </mesh>
          ))}
          {[-7.0, 7.0].map((cz) => (
            <mesh key={`pool-curb-z-${cz}`} position={[0, 0.18, cz]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
              <boxGeometry args={[5.65, 0.10, 0.25]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================== */}
      {/* 6. RECESSED SOIL PLANTER BEDS                                      */}
      {/* ================================================================== */}
      {[-19.2, 19.2].map((x) => (
        <group key={`bed-${x}`} position={[x, 0, 11]}>
          {/* Sunken Soil Surface (Y: +0.09m) */}
          <mesh position={[0, 0.09, 0]} receiveShadow material={soilMaterial} raycast={() => null}>
            <boxGeometry args={[6.8, 0.02, 34]} />
          </mesh>
          {/* Bed Outer Edge Curbs */}
          <mesh position={[x > 0 ? 3.5 : -3.5, 0.18, 0]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
            <boxGeometry args={[0.25, 0.12, 34.2]} />
          </mesh>
          {[-17.1, 17.1].map((cz) => (
            <mesh key={`bed-curb-z-${cz}`} position={[0, 0.18, cz]} castShadow receiveShadow material={graniteCurbMaterial} raycast={() => null}>
              <boxGeometry args={[7.25, 0.12, 0.25]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================== */}
      {/* 7. ENTRANCE ARCHITECTURAL PLANTERS                                 */}
      {/* ================================================================== */}
      {[-8.5, 8.5].map((x) => (
        <group key={`ent-planter-${x}`} position={[x, 0, 18]}>
          {/* Stone Planter Base Box */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={stoneMat} raycast={() => null}>
            <boxGeometry args={[2.5, 0.70, 1.3]} />
          </mesh>
          {/* Bronze Coping Rim */}
          <mesh position={[0, 0.71, 0]} castShadow material={darkBronzeMat} raycast={() => null}>
            <boxGeometry args={[2.55, 0.03, 1.35]} />
          </mesh>
          {/* Recessed Soil Bed */}
          <mesh position={[0, 0.69, 0]} receiveShadow material={soilMaterial} raycast={() => null}>
            <boxGeometry args={[2.3, 0.02, 1.1]} />
          </mesh>
        </group>
      ))}

      {/* ================================================================== */}
      {/* 8. BOTANICAL INSTANCED TREES & SHRUBS                              */}
      {/* ================================================================== */}
      <BotanicalTrees instances={treeInstances} />
      <BotanicalShrubs instances={shrubInstances} />
    </group>
  );
}
