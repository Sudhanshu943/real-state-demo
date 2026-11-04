import { useState, useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { BuildingProcedural } from './BuildingProcedural';
import { InteriorScene } from './InteriorScene';
import { DistrictScene } from './DistrictScene';
import { CameraRig } from './CameraRig';
import { SceneBoundary } from './SceneBoundary';
import { useExperience } from '../app/providers';
import type { Selection, RoomId } from '../domain/types';

interface SceneHostProps {
  selection: Selection;
  onSelectFloor: (floor: number) => void;
  onSelectUnit: (unitId: string) => void;
  onSelectLandmark: (id: string) => void;
  onRoomChange: (room: RoomId) => void;
  presetCamera?: 'overview' | 'arrival' | 'gardens' | 'skyline';
  fallback2D: React.ReactNode;
}

export function SceneHost({
  selection,
  onSelectFloor,
  onSelectUnit,
  onSelectLandmark,
  onRoomChange,
  presetCamera = 'overview',
  fallback2D
}: SceneHostProps) {
  const { state, dispatch } = useExperience();
  const [hasWebGlError, setHasWebGlError] = useState(false);
  const [isPointerDragging, setIsPointerDragging] = useState(false);

  const pointerDownPos = useRef({ x: 0, y: 0 });

  const isSimplified = state.preferences.renderPreference === 'simplified';

  if (isSimplified || hasWebGlError) {
    return <>{fallback2D}</>;
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    if (dx > 6 || dy > 6) {
      setIsPointerDragging(true);
      setTimeout(() => setIsPointerDragging(false), 50);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background:
          selection.kind === 'tour'
            ? '#18221F'
            : 'linear-gradient(180deg, #1C2924 0%, #293832 35%, #4A4A42 70%, #8A7B6B 100%)'
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <SceneBoundary
        onError={() => setHasWebGlError(true)}
        fallback={fallback2D}
      >
        <Canvas
          shadows="soft"
          camera={{ position: [65, 40, 75], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
            powerPreference: 'high-performance'
          }}
          dpr={[1, 1.5]}
        >
          {selection.kind !== 'tour' && (
            <>
              {selection.kind === 'district' ? (
                <>
                  <fog attach="fog" args={['#1E2C26', 280, 750]} />
                  <ambientLight intensity={0.55} color="#D8E2DC" />
                  <directionalLight
                    position={[100, 140, 90]}
                    intensity={1.25}
                    castShadow
                    shadow-camera-left={-120}
                    shadow-camera-right={120}
                    shadow-camera-top={120}
                    shadow-camera-bottom={-120}
                    shadow-camera-near={20}
                    shadow-camera-far={350}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-bias={-0.0001}
                    color="#FFF2DE"
                  />
                  <directionalLight position={[-80, 50, -60]} intensity={0.35} color="#6E7E76" />
                </>
              ) : (
                <>
                  <fog attach="fog" args={['#23302B', 70, 220]} />
                  <ambientLight intensity={0.38} color="#E6EDED" />
                  <directionalLight
                    position={[50, 65, 45]}
                    intensity={1.15}
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
                    color="#FFF1DE"
                  />
                  <directionalLight position={[-35, 25, -30]} intensity={0.3} color="#7C6E5F" />
                </>
              )}
            </>
          )}

          {/* Camera Controller */}
          <CameraRig
            selection={selection}
            preset={presetCamera}
            onPointerDragChange={setIsPointerDragging}
          />

          {/* Scene Dispatcher */}
          {selection.kind === 'district' ? (
            <DistrictScene
              selectedLandmarkId={selection.landmarkId}
              onSelectLandmark={onSelectLandmark}
              isPointerDragging={isPointerDragging}
            />
          ) : selection.kind === 'tour' ? (
            <InteriorScene
              roomId={selection.roomId}
              onRoomChange={onRoomChange}
              isPointerDragging={isPointerDragging}
            />
          ) : (
            <BuildingProcedural
              selectedFloor={selection.kind === 'floor' ? selection.floor : undefined}
              selectedUnitId={selection.kind === 'unit' ? selection.unitId : undefined}
              onSelectFloor={onSelectFloor}
              onSelectUnit={onSelectUnit}
              isPointerDragging={isPointerDragging}
            />
          )}
        </Canvas>
      </SceneBoundary>

      {/* Simplified View Switcher Button (outside tour HUD) */}
      {selection.kind !== 'tour' && (
        <button
          onClick={() => dispatch({ type: 'SET_RENDER_PREFERENCE', preference: 'simplified' })}
          className="scene-mode-switcher"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            padding: '8px 14px',
            backgroundColor: 'rgba(244, 240, 232, 0.9)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--color-line)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-ink)',
            cursor: 'pointer',
            zIndex: 40
          }}
          title="Switch to lightweight 2D illustrations and list view"
        >
          Use Simplified 2D View
        </button>
      )}
    </div>
  );
}
