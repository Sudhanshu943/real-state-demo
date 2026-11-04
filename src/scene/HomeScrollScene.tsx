import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { BuildingProcedural } from './BuildingProcedural';
import { InteriorModel } from './InteriorScene';

interface HomeScrollSceneProps {
  scrollProgress: number; // 0.0 to 1.0
  isReducedMotion?: boolean;
}

// Pre-allocated static scratch vectors to eliminate runtime garbage collection
const targetPosScratch = new THREE.Vector3();
const targetLookScratch = new THREE.Vector3();
const extStartPos = new THREE.Vector3(54, 25, 58);
const extMidPos = new THREE.Vector3(34, 28, 42);
const extEndPos = new THREE.Vector3(20, 31, 26);
const extStartLook = new THREE.Vector3(-7, 22, 0);
const extMidLook = new THREE.Vector3(-3, 25, 0);
const extEndLook = new THREE.Vector3(2.5, 29.5, 6.0);

const intLivingStartPos = new THREE.Vector3(3.0, 1.45, 9.2);
const intLivingEndPos = new THREE.Vector3(3.6, 1.45, 10.4);
const intLivingStartLook = new THREE.Vector3(5.2, 1.10, 14.8);
const intLivingEndLook = new THREE.Vector3(5.8, 1.10, 15.6);

const intBalconyStartPos = new THREE.Vector3(5.6, 1.42, 15.4);
const intBalconyEndPos = new THREE.Vector3(6.0, 1.42, 16.4);
const intBalconyStartLook = new THREE.Vector3(6.0, 1.20, 24.0);
const intBalconyEndLook = new THREE.Vector3(6.0, 1.20, 32.0);

function HomeScrollCamera({ scrollProgress, isReducedMotion = false }: { scrollProgress: number; isReducedMotion?: boolean }) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3(54, 25, 58));
  const currentLook = useRef(new THREE.Vector3(-7, 22, 0));
  const previousMode = useRef<'exterior' | 'interior'>('exterior');
  const lastFov = useRef(40);

  useFrame((_, delta) => {
    const s = THREE.MathUtils.clamp(scrollProgress, 0, 1);
    const damp = isReducedMotion ? 1 : 1 - Math.exp(-delta * 8);

    const mode: 'exterior' | 'interior' = s < 0.51 ? 'exterior' : 'interior';

    // Bounded Deterministic Handoff: Reset camera pose while obscured during mode transition
    if (mode !== previousMode.current) {
      if (mode === 'interior') {
        // Forward scroll entering interior: snap camera to living room start pose
        currentPos.current.copy(intLivingStartPos);
        currentLook.current.copy(intLivingStartLook);
        camera.position.copy(currentPos.current);
        camera.lookAt(currentLook.current);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.fov = 48;
          camera.near = 0.1;
          camera.updateProjectionMatrix();
          lastFov.current = 48;
        }
      } else {
        // Reverse scroll returning to exterior: snap camera to level 8 loggia pose
        currentPos.current.copy(extEndPos);
        currentLook.current.copy(extEndLook);
        camera.position.copy(currentPos.current);
        camera.lookAt(currentLook.current);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.fov = 45;
          camera.near = 0.5;
          camera.updateProjectionMatrix();
          lastFov.current = 45;
        }
      }
      previousMode.current = mode;
    }

    let targetFov = 40;

    if (isReducedMotion) {
      targetPosScratch.copy(extStartPos);
      targetLookScratch.copy(extStartLook);
      targetFov = 40;
    } else if (s < 0.25) {
      // Chapter 1: Exterior establishing shot (Full 12-storey tower, plinth & sky in right 55%, negative space left)
      const t = s / 0.25;
      targetPosScratch.lerpVectors(extStartPos, extMidPos, t);
      targetLookScratch.lerpVectors(extStartLook, extMidLook, t);
      targetFov = 40;
    } else if (s < 0.51) {
      // Chapter 2: Craft & Terrace (Crane up to Level 8 Skyline Terrace facade reveal)
      const t = (s - 0.25) / (0.51 - 0.25);
      targetPosScratch.lerpVectors(extMidPos, extEndPos, t);
      targetLookScratch.lerpVectors(extMidLook, extEndLook, t);
      targetFov = THREE.MathUtils.lerp(40, 45, t);
    } else if (s < 0.82) {
      // Chapter 3: Living Salon (Composed eye-level view with sofa, cocktail table, fluted wall, and garden terrace depth)
      const t = (s - 0.51) / (0.82 - 0.51);
      targetPosScratch.lerpVectors(intLivingStartPos, intLivingEndPos, t);
      targetLookScratch.lerpVectors(intLivingStartLook, intLivingEndLook, t);
      targetFov = THREE.MathUtils.lerp(48, 51, t);
    } else {
      // Chapter 4: Sunset Outlook (Balcony terrace, crystal balustrade, outdoor seating, and golden skyline horizon)
      const t = (s - 0.82) / (1.00 - 0.82);
      targetPosScratch.lerpVectors(intBalconyStartPos, intBalconyEndPos, t);
      targetLookScratch.lerpVectors(intBalconyStartLook, intBalconyEndLook, t);
      targetFov = THREE.MathUtils.lerp(51, 54, t);
    }

    currentPos.current.lerp(targetPosScratch, damp);
    currentLook.current.lerp(targetLookScratch, damp);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      const interpolatedFov = THREE.MathUtils.lerp(camera.fov, targetFov, damp);
      if (Math.abs(interpolatedFov - lastFov.current) > 0.05) {
        camera.fov = interpolatedFov;
        camera.near = s >= 0.51 ? 0.1 : 0.5;
        camera.updateProjectionMatrix();
        lastFov.current = interpolatedFov;
      }
    }
  });

  return null;
}

export function HomeScrollScene({ scrollProgress, isReducedMotion = false }: HomeScrollSceneProps) {
  // Scene handoff threshold: s < 0.51 = Exterior Tower; s >= 0.51 = Furnished Interior
  const isInterior = scrollProgress >= 0.51 && !isReducedMotion;

  // Bounded crossfade aperture: 1.0 everywhere except dipping to 0 at s = 0.51
  const s = scrollProgress;
  const crossfadeAlpha =
    s < 0.48 || s > 0.54
      ? 1
      : Math.pow(Math.abs(s - 0.51) / 0.03, 1.6);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: isInterior
          ? '#18221F'
          : 'linear-gradient(180deg, #1C2824 0%, #24342E 35%, #3E3B34 70%, #6E6152 100%)',
        opacity: crossfadeAlpha,
        transition: 'background 400ms ease'
      }}
    >
      <Canvas
        shadows="soft"
        camera={{ position: [54, 25, 58], fov: 40, near: 0.2, far: 240 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 1.5]}
      >
        <HomeScrollCamera scrollProgress={scrollProgress} isReducedMotion={isReducedMotion} />

        {!isInterior ? (
          <>
            <fog attach="fog" args={['#23302B', 80, 240]} />
            <ambientLight intensity={0.42} color="#D2DDD8" />

            {/* Directional Sun from South-East (Raking golden light hitting South & East facades) */}
            <directionalLight
              position={[48, 56, 42]}
              intensity={1.45}
              castShadow
              shadow-camera-left={-28}
              shadow-camera-right={28}
              shadow-camera-top={45}
              shadow-camera-bottom={-10}
              shadow-camera-near={10}
              shadow-camera-far={160}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-bias={-0.0001}
              color="#FFEAD2"
            />
            {/* Soft Cool Sky Fill for Contrast & Material Depth */}
            <directionalLight position={[-35, 40, -25]} intensity={0.45} color="#607D75" />
            {/* Subtle Warm Ground Bounce */}
            <directionalLight position={[15, -15, 30]} intensity={0.25} color="#78624E" />

            <BuildingProcedural
              onSelectFloor={() => {}}
              onSelectUnit={() => {}}
              isPointerDragging={false}
            />
          </>
        ) : (
          <InteriorModel
            roomId={scrollProgress > 0.82 ? 'balcony' : 'living'}
            showHotspots={false}
          />
        )}
      </Canvas>
    </div>
  );
}
