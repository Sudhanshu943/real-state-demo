import React, { Component, useState, useEffect, type ReactNode } from 'react';
import * as THREE from 'three';
import { GLTFLoader, MeshoptDecoder } from 'three-stdlib';

const MODEL_PATH = '/assets/models/potted_plant_01.glb';

export interface PlantProps {
  position?: [number, number, number];
  scale?: number | [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Lightweight procedural fallback matching dimensions and grounding
 * of the photogrammetry model. Renders synchronously without network or suspense delays.
 */
export function PlantFallback({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0]
}: PlantProps) {
  const numScale = typeof scale === 'number' ? [scale, scale, scale] as [number, number, number] : scale;

  return (
    <group position={position} scale={numScale} rotation={rotation} name="plant-procedural-fallback">
      {/* Terracotta Planter Pot */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.19, 0.54, 24]} />
        <meshStandardMaterial color="#945338" roughness={0.72} metalness={0.05} />
      </mesh>
      {/* Terracotta Pot Rim */}
      <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.28, 0.26, 0.08, 24]} />
        <meshStandardMaterial color="#884C33" roughness={0.68} metalness={0.05} />
      </mesh>
      {/* Topsoil Layer */}
      <mesh position={[0, 0.52, 0]} receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#36291E" roughness={0.95} />
      </mesh>
      {/* Central Woody Stem */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.035, 0.65, 8]} />
        <meshStandardMaterial color="#4A3B2C" roughness={0.8} />
      </mesh>
      {/* Organic Foliage Canopy Cluster */}
      <group position={[0, 1.05, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshStandardMaterial color="#2B4D36" roughness={0.65} />
        </mesh>
        <mesh position={[-0.15, -0.05, 0.1]} castShadow>
          <sphereGeometry args={[0.24, 12, 12]} />
          <meshStandardMaterial color="#355E42" roughness={0.65} />
        </mesh>
        <mesh position={[0.16, -0.02, -0.08]} castShadow>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#24422E" roughness={0.65} />
        </mesh>
        <mesh position={[0.05, 0.28, 0.05]} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#3C6B4B" roughness={0.65} />
        </mesh>
      </group>
    </group>
  );
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class PlantErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.warn('[PottedPlantAsset] Model load failed, falling back to procedural planter:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

let cachedModel: THREE.Group | null = null;
let loadPromise: Promise<THREE.Group | null> | null = null;

async function loadPlantModel(): Promise<THREE.Group | null> {
  if (cachedModel) return cachedModel.clone(true);
  if (loadPromise) return loadPromise.then((m) => (m ? m.clone(true) : null));

  loadPromise = (async () => {
    try {
      const decoder = typeof MeshoptDecoder === 'function' ? MeshoptDecoder() : MeshoptDecoder;
      if (decoder && (decoder as any).ready) {
        await (decoder as any).ready;
      }
      const loader = new GLTFLoader();
      loader.setMeshoptDecoder(decoder);

      const gltf = await new Promise<any>((resolve, reject) => {
        loader.load(MODEL_PATH, resolve, undefined, reject);
      });

      if (!gltf || !gltf.scene) {
        return null;
      }

      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.roughness = Math.max(0.3, child.material.roughness ?? 0.6);
          }
        }
      });

      cachedModel = gltf.scene as THREE.Group;
      return gltf.scene.clone(true) as THREE.Group;
    } catch (err) {
      console.warn('[PottedPlantAsset] GLB load failed, retaining procedural fallback:', err);
      return null;
    }
  })();

  return loadPromise;
}

export function preloadPlantModel(): void {
  loadPlantModel();
}

/**
 * Public PottedPlantAsset wrapper:
 * Guarantees that asynchronous GLB fetching or decoding failures never suspend
 * or blank out the parent interior room.
 */
export function PottedPlantAsset(props: PlantProps) {
  const [model, setModel] = useState<THREE.Group | null>(() => (cachedModel ? cachedModel.clone(true) : null));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;
    if (!model) {
      loadPlantModel().then((loaded) => {
        if (!active) return;
        if (loaded) {
          setModel(loaded);
          setHasError(false);
        } else {
          setHasError(true);
        }
      });
    }
    return () => {
      active = false;
    };
  }, [model]);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.dataset.plantStatus = model ? 'glb' : (hasError ? 'fallback' : 'loading');
    }
  }, [model, hasError]);

  const numScale = typeof props.scale === 'number'
    ? [props.scale, props.scale, props.scale] as [number, number, number]
    : (props.scale ?? [1, 1, 1]);

  if (!model) {
    return <PlantFallback {...props} />;
  }

  return (
    <group
      position={props.position ?? [0, 0, 0]}
      scale={numScale}
      rotation={props.rotation ?? [0, 0, 0]}
      name="potted-plant-cc0"
    >
      <primitive object={model} />
    </group>
  );
}
