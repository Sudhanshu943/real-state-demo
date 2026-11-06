import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Selection } from '../domain/types';

interface CameraRigProps {
  selection: Selection;
  preset?: 'overview' | 'arrival' | 'gardens' | 'skyline';
  onPointerDragChange: (isDragging: boolean) => void;
}

export function CameraRig({
  selection,
  preset = 'overview',
  onPointerDragChange
}: CameraRigProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();

  const targetCamPos = useRef(new THREE.Vector3(65, 40, 75));
  const targetCamLook = useRef(new THREE.Vector3(0, 23, 0));
  const isAnimating = useRef(true);
  const prevKind = useRef<string | null>(null);

  // Compute desired camera target based on selection & presets
  useEffect(() => {
    isAnimating.current = true;

    if (selection.kind === 'district') {
      if (selection.landmarkId) {
        targetCamPos.current.set(90, 60, 95);
        targetCamLook.current.set(0, 0, 0);
      } else {
        targetCamPos.current.set(75, 45, 85);
        targetCamLook.current.set(0, 18, 0);
      }

      // If entering district view for the first time, immediately snap to authored aerial viewpoint
      if (prevKind.current !== 'district') {
        camera.position.copy(targetCamPos.current);
        camera.lookAt(targetCamLook.current);
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetCamLook.current);
          controlsRef.current.update();
        }
      }
      prevKind.current = 'district';
      return;
    }

    prevKind.current = selection.kind;

    if (selection.kind === 'tour') {
      // Interior scene manages its own camera look
      isAnimating.current = false;
      return;
    }

    if (selection.kind === 'floor') {
      const floorCenterY = 4.6 + (selection.floor - 1) * 3.4 + 1.7;
      targetCamLook.current.set(0, floorCenterY, 0);
      targetCamPos.current.set(40, floorCenterY + 12, 45);
      return;
    }

    if (selection.kind === 'unit') {
      const isWest = selection.unitId.endsWith('01');
      const floorNum = parseInt(selection.unitId.slice(1, 3), 10);
      const floorCenterY = 4.6 + (floorNum - 1) * 3.4 + 1.7;
      targetCamLook.current.set(isWest ? -7 : 7, floorCenterY, 0);
      targetCamPos.current.set(isWest ? -26 : 26, floorCenterY + 6, 28);
      return;
    }

    // Exterior Presets
    switch (preset) {
      case 'arrival':
        targetCamPos.current.set(35, 8, 46);
        targetCamLook.current.set(0, 5, 0);
        break;
      case 'gardens':
        targetCamPos.current.set(-45, 22, 45);
        targetCamLook.current.set(0, 17, 5);
        break;
      case 'skyline':
        targetCamPos.current.set(55, 62, 55);
        targetCamLook.current.set(0, 34, 0);
        break;
      case 'overview':
      default:
        targetCamPos.current.set(65, 40, 75);
        targetCamLook.current.set(0, 23, 0);
        break;
    }
  }, [selection, preset]);

  useFrame((_, delta) => {
    if (selection.kind === 'tour' || !isAnimating.current || !controlsRef.current) return;

    const damp = 1 - Math.exp(-delta * 6);
    camera.position.lerp(targetCamPos.current, damp);
    controlsRef.current.target.lerp(targetCamLook.current, damp);
    controlsRef.current.update();

    if (camera.position.distanceTo(targetCamPos.current) < 0.2) {
      isAnimating.current = false;
    }
    if (typeof window !== 'undefined' && controlsRef.current) {
      (window as any).__AUREL_CONTROLS__ = controlsRef.current;
    }
  });

  // Tour mode manages its own dedicated eye-level fixed viewpoint controller
  if (selection.kind === 'tour') {
    return null;
  }

  return (
    <OrbitControls
      ref={controlsRef}
      target={selection.kind === 'district' ? [0, 18, 0] : [0, 23, 0]}
      enableDamping
      dampingFactor={0.06}
      minDistance={selection.kind === 'district' ? 40 : 25}
      maxDistance={selection.kind === 'district' ? 300 : 160}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.05} // prevent going underground
      onStart={() => {
        isAnimating.current = false;
        onPointerDragChange(true);
      }}
      onEnd={() => {
        setTimeout(() => onPointerDragChange(false), 50);
      }}
    />
  );
}
