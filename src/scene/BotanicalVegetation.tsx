import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader, MeshoptDecoder } from 'three-stdlib';

export interface VegetationInstance {
  position: [number, number, number];
  rotationY?: number;
  scale?: number | [number, number, number];
}

interface LoadedTreeData {
  primitives: Array<{
    geometry: THREE.BufferGeometry;
    material: THREE.Material;
  }>;
}

interface LoadedShrubData {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}

// Memory caches to prevent re-fetching or re-decoding across re-renders
let cachedTreeData: LoadedTreeData | null = null;
let cachedShrubData: LoadedShrubData | null = null;
let treePromise: Promise<LoadedTreeData | null> | null = null;
let shrubPromise: Promise<LoadedShrubData | null> | null = null;

async function getMeshoptDecoder() {
  const decoder = typeof MeshoptDecoder === 'function' ? MeshoptDecoder() : MeshoptDecoder;
  if (decoder && (decoder as any).ready) {
    await (decoder as any).ready;
  }
  return decoder;
}

async function loadTreeData(): Promise<LoadedTreeData | null> {
  if (cachedTreeData) return cachedTreeData;
  if (treePromise) return treePromise;

  treePromise = (async () => {
    try {
      const decoder = await getMeshoptDecoder();
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(decoder);

      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load('/assets/models/tree_small_02.glb', resolve, undefined, reject);
      });

      if (!gltf || !gltf.scene) return null;

      const primitives: Array<{ geometry: THREE.BufferGeometry; material: THREE.Material }> = [];

      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.geometry) {
          const mat = child.material;
          if (mat) {
            mat.roughness = Math.max(0.4, mat.roughness ?? 0.7);
            // Ensure leaves clip cleanly without alpha-sorting depth glitches
            if (mat.name && mat.name.includes('leaves')) {
              mat.alphaTest = 0.45;
              mat.depthWrite = true;
              mat.transparent = false;
            }
          }
          primitives.push({
            geometry: child.geometry.clone(),
            material: child.material
          });
        }
      });

      if (primitives.length === 0) return null;

      cachedTreeData = { primitives };
      return cachedTreeData;
    } catch (err) {
      console.warn('[BotanicalVegetation] Tree model load failed, using procedural fallback:', err);
      return null;
    }
  })();

  return treePromise;
}

async function loadShrubData(): Promise<LoadedShrubData | null> {
  if (cachedShrubData) return cachedShrubData;
  if (shrubPromise) return shrubPromise;

  shrubPromise = (async () => {
    try {
      const decoder = await getMeshoptDecoder();
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(decoder);

      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load('/assets/models/shrub_01.glb', resolve, undefined, reject);
      });

      if (!gltf || !gltf.scene) return null;

      let found: LoadedShrubData | null = null;
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.geometry && !found) {
          const mat = child.material;
          if (mat) {
            mat.roughness = Math.max(0.45, mat.roughness ?? 0.75);
            mat.alphaTest = 0.4;
            mat.depthWrite = true;
            mat.side = THREE.DoubleSide;
          }
          found = {
            geometry: child.geometry.clone(),
            material: child.material
          };
        }
      });

      if (!found) return null;

      cachedShrubData = found;
      return cachedShrubData;
    } catch (err) {
      console.warn('[BotanicalVegetation] Shrub model load failed, using procedural fallback:', err);
      return null;
    }
  })();

  return shrubPromise;
}

const dummyObj = new THREE.Object3D();

/**
 * Botanical Specimen Trees component.
 * Renders CC0 tree_small_02 instances collapsed into minimal draw calls (one per primitive).
 * Seamless non-blocking procedural fallback if model is pending or fails to load.
 */
export function BotanicalTrees({ instances }: { instances: VegetationInstance[] }) {
  const [treeData, setTreeData] = useState<LoadedTreeData | null>(() => cachedTreeData);
  const [status, setStatus] = useState<'loading' | 'glb' | 'fallback'>(() => (cachedTreeData ? 'glb' : 'loading'));
  const instancedMeshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  useEffect(() => {
    let active = true;
    if (!treeData) {
      loadTreeData().then((data) => {
        if (!active) return;
        if (data) {
          setTreeData(data);
          setStatus('glb');
        } else {
          setStatus('fallback');
        }
      });
    }
    return () => {
      active = false;
    };
  }, [treeData]);

  // Update canvas dataset attribute for test inspection
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.dataset.exteriorVegetation = status;
    }
  }, [status]);

  useLayoutEffect(() => {
    if (!treeData) return;
    const count = instances.length;

    treeData.primitives.forEach((_, primIdx) => {
      const mesh = instancedMeshRefs.current[primIdx];
      if (!mesh) return;

      for (let i = 0; i < count; i++) {
        const inst = instances[i];
        dummyObj.position.set(...inst.position);
        dummyObj.rotation.set(0, inst.rotationY ?? 0, 0);
        if (typeof inst.scale === 'number') {
          dummyObj.scale.set(inst.scale, inst.scale, inst.scale);
        } else if (Array.isArray(inst.scale)) {
          dummyObj.scale.set(...inst.scale);
        } else {
          dummyObj.scale.set(1, 1, 1);
        }
        dummyObj.updateMatrix();
        mesh.setMatrixAt(i, dummyObj.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    });
  }, [treeData, instances]);

  if (!treeData) {
    // Procedural Fallback Trees (Instanced architectural cylinder trunk + layered foliage)
    return <ProceduralTreeFallback instances={instances} />;
  }

  return (
    <group name="botanical-trees-cc0">
      {treeData.primitives.map((prim, idx) => (
        <instancedMesh
          key={idx}
          ref={(el) => {
            instancedMeshRefs.current[idx] = el;
          }}
          args={[prim.geometry, prim.material, instances.length]}
          castShadow
          receiveShadow
          raycast={() => null}
        />
      ))}
    </group>
  );
}

/**
 * Botanical Shrubs component.
 * Renders CC0 shrub_01 instances collapsed into a single draw call.
 * Seamless non-blocking procedural fallback if model is pending or fails to load.
 */
export function BotanicalShrubs({ instances }: { instances: VegetationInstance[] }) {
  const [shrubData, setShrubData] = useState<LoadedShrubData | null>(() => cachedShrubData);
  const [status, setStatus] = useState<'loading' | 'glb' | 'fallback'>(() => (cachedShrubData ? 'glb' : 'loading'));
  const instancedMeshRef = useRef<THREE.InstancedMesh | null>(null);

  useEffect(() => {
    let active = true;
    if (!shrubData) {
      loadShrubData().then((data) => {
        if (!active) return;
        if (data) {
          setShrubData(data);
          setStatus('glb');
        } else {
          setStatus('fallback');
        }
      });
    }
    return () => {
      active = false;
    };
  }, [shrubData]);

  // Update canvas dataset attribute for test inspection
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas && status === 'glb') {
      canvas.dataset.exteriorShrubs = status;
    }
  }, [status]);

  useLayoutEffect(() => {
    if (!shrubData || !instancedMeshRef.current) return;
    const mesh = instancedMeshRef.current;
    const count = instances.length;

    for (let i = 0; i < count; i++) {
      const inst = instances[i];
      dummyObj.position.set(...inst.position);
      dummyObj.rotation.set(0, inst.rotationY ?? 0, 0);
      if (typeof inst.scale === 'number') {
        dummyObj.scale.set(inst.scale, inst.scale, inst.scale);
      } else if (Array.isArray(inst.scale)) {
        dummyObj.scale.set(...inst.scale);
      } else {
        dummyObj.scale.set(1, 1, 1);
      }
      dummyObj.updateMatrix();
      mesh.setMatrixAt(i, dummyObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [shrubData, instances]);

  if (!shrubData) {
    return <ProceduralShrubFallback instances={instances} />;
  }

  return (
    <group name="botanical-shrubs-cc0">
      <instancedMesh
        ref={instancedMeshRef}
        args={[shrubData.geometry, shrubData.material, instances.length]}
        castShadow
        receiveShadow
        raycast={() => null}
      />
    </group>
  );
}

/**
 * Clean architectural procedural fallback tree (trunk + foliage)
 * Drawn via 2 instanced meshes (1 trunk, 1 foliage) with zero garbage generation.
 */
function ProceduralTreeFallback({ instances }: { instances: VegetationInstance[] }) {
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const canopyRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!trunkRef.current || !canopyRef.current) return;
    const count = instances.length;

    for (let i = 0; i < count; i++) {
      const inst = instances[i];
      const s = typeof inst.scale === 'number' ? inst.scale : 1.0;

      // Trunk matrix
      dummyObj.position.set(inst.position[0], inst.position[1] + 1.8 * s, inst.position[2]);
      dummyObj.rotation.set(0, inst.rotationY ?? 0, 0);
      dummyObj.scale.set(s, s, s);
      dummyObj.updateMatrix();
      trunkRef.current.setMatrixAt(i, dummyObj.matrix);

      // Canopy matrix
      dummyObj.position.set(inst.position[0], inst.position[1] + 3.6 * s, inst.position[2]);
      dummyObj.rotation.set(0, (inst.rotationY ?? 0) + 0.4, 0);
      dummyObj.scale.set(s, s * 0.9, s);
      dummyObj.updateMatrix();
      canopyRef.current.setMatrixAt(i, dummyObj.matrix);
    }

    trunkRef.current.instanceMatrix.needsUpdate = true;
    canopyRef.current.instanceMatrix.needsUpdate = true;
  }, [instances]);

  return (
    <group name="procedural-tree-fallback">
      <instancedMesh ref={trunkRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow raycast={() => null}>
        <cylinderGeometry args={[0.18, 0.28, 3.6, 8]} />
        <meshStandardMaterial color="#4A4135" roughness={0.88} />
      </instancedMesh>
      <instancedMesh ref={canopyRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow raycast={() => null}>
        <sphereGeometry args={[1.75, 12, 10]} />
        <meshStandardMaterial color="#324B35" roughness={0.78} />
      </instancedMesh>
    </group>
  );
}

/**
 * Clean architectural procedural fallback shrub
 * Drawn via 1 instanced mesh.
 */
function ProceduralShrubFallback({ instances }: { instances: VegetationInstance[] }) {
  const shrubRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    if (!shrubRef.current) return;
    const count = instances.length;

    for (let i = 0; i < count; i++) {
      const inst = instances[i];
      const s = typeof inst.scale === 'number' ? inst.scale : 1.0;

      dummyObj.position.set(inst.position[0], inst.position[1] + 0.35 * s, inst.position[2]);
      dummyObj.rotation.set(0, inst.rotationY ?? 0, 0);
      dummyObj.scale.set(s * 1.3, s * 0.7, s * 1.1);
      dummyObj.updateMatrix();
      shrubRef.current.setMatrixAt(i, dummyObj.matrix);
    }

    shrubRef.current.instanceMatrix.needsUpdate = true;
  }, [instances]);

  return (
    <group name="procedural-shrub-fallback">
      <instancedMesh ref={shrubRef} args={[undefined, undefined, instances.length]} castShadow receiveShadow raycast={() => null}>
        <sphereGeometry args={[0.65, 10, 8]} />
        <meshStandardMaterial color="#2B4633" roughness={0.80} />
      </instancedMesh>
    </group>
  );
}
