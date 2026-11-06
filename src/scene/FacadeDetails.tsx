import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

export type Piece = { position: [number, number, number]; scale: [number, number, number] };

export function DetailBatch({ pieces, material }: { pieces: Piece[]; material: THREE.Material }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    for (let i = 0; i < pieces.length; i++) {
      matrix.compose(new THREE.Vector3(...pieces[i].position), quaternion, new THREE.Vector3(...pieces[i].scale));
      mesh.current!.setMatrixAt(i, matrix);
    }
    mesh.current!.instanceMatrix.needsUpdate = true;
    mesh.current!.computeBoundingSphere();
  }, [pieces]);
  return <instancedMesh ref={mesh} args={[undefined, material, pieces.length]} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
  </instancedMesh>;
}

/** Small-scale architectural details, batched so repetition does not add hundreds of draw calls.
 * Interior-only furnishings, curtains, and concealed ceiling planes have been removed in favor
 * of authentic tinted reflective exterior glazing, reducing scene complexity without visual loss.
 */
export function FacadeDetails({ bronze, reveal, stone }: { bronze: THREE.Material; reveal: THREE.Material; stone: THREE.Material }) {
  const finishes = useMemo(() => ({
    glow: new THREE.MeshStandardMaterial({color: '#edd9b0', emissive: '#ead0a0', emissiveIntensity: .45}),
  }), []);
  useEffect(() => () => Object.values(finishes).forEach(m => m.dispose()), [finishes]);
  const details = useMemo(() => {
    const frames: Piece[] = [];
    const joints: Piece[] = [];
    const planters: Piece[] = [];
    const lights: Piece[] = [];
    for (let floor = 1; floor <= 12; floor++) {
      const base = 4.6 + (floor - 1) * 3.4;
      for (const side of [-1, 1]) {
        // Quiet stone panel joints on both side elevations.
        for (const z of [-6, -2, 2, 6]) {
          joints.push({ position: [side * 14.012, base + 1.7, z], scale: [0.018, 2.96, 0.026] });
        }
        joints.push({ position: [side * 14.012, base + 1.2, 0], scale: [0.018, 0.024, 15.95] });
      }
    }
    // Slim entrance door leaves, transom, handles and canopy supports.
    for (const x of [-2.4, 0, 2.4]) frames.push({position:[x,2,10.05],scale:[.07,3.6,.16]});
    frames.push({position:[0,3.8,10.05],scale:[7.2,.08,.16]});
    for(const x of [-.18,.18]) frames.push({position:[x,1.6,10.23],scale:[.035,.65,.07]});
    for(const x of [-7.4,7.4]) frames.push({position:[x,2.15,18],scale:[.18,4.3,.18]});
    // Outdoor entrance canopy downlights (functional arrival lighting)
    for(const x of [-5,-2.5,0,2.5,5]) lights.push({position:[x,4.2,14.3],scale:[.8,.025,2.8]});
    // Pergola structure: columns supporting the existing roof lattice.
    for(const x of [-9,9]) for(const z of [-7,7]) frames.push({position:[x,48.05,z],scale:[.16,2.8,.16]});
    // Arrival paving joints make the entrance read as a built landscape.
    for (let x = -6; x <= 6; x += 2) {
      joints.push({ position: [x, 0.028, 14], scale: [0.022, 0.008, 13.8] });
    }
    for (let z = 8; z <= 20; z += 2) {
      joints.push({ position: [0, 0.028, z], scale: [15.8, 0.008, 0.022] });
    }
    return { frames, joints, planters, lights };
  }, []);
  return <group name="architectural-facade-details">
    <DetailBatch pieces={details.frames} material={bronze} />
    <DetailBatch pieces={details.joints} material={reveal} />
    <DetailBatch pieces={details.planters} material={stone} />
    <DetailBatch pieces={details.lights} material={finishes.glow} />
  </group>;
}
