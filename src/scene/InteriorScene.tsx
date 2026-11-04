import { useMemo, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { RoomId } from '../domain/types';
import { getTravertineTexture, getBronzeTexture, getOakTexture } from './textureGenerators';

export interface InteriorModelProps {
  roomId?: RoomId;
  onRoomChange?: (roomId: RoomId) => void;
  showHotspots?: boolean;
}

export function InteriorModel({
  roomId = 'living',
  onRoomChange = () => {},
  showHotspots = false
}: InteriorModelProps) {
  // Architectural PBR Materials with Procedural Textures
  const materials = useMemo(() => {
    const travertineTex = getTravertineTexture();
    const oakTex = getOakTexture();
    const bronzeTex = getBronzeTexture();

    return {
      wall: new THREE.MeshStandardMaterial({
        color: '#ABA496',
        roughness: 0.85,
        metalness: 0.04
      }),
      floorOak: new THREE.MeshStandardMaterial({
        map: oakTex,
        roughness: 0.48,
        metalness: 0.08
      }),
      ceiling: new THREE.MeshStandardMaterial({
        color: '#C4BCB0',
        roughness: 0.9,
        metalness: 0.0,
        side: THREE.DoubleSide
      }),
      flutedWood: new THREE.MeshStandardMaterial({
        color: '#3E2D20',
        roughness: 0.52,
        metalness: 0.12
      }),
      travertine: new THREE.MeshStandardMaterial({
        map: travertineTex,
        roughness: 0.65,
        metalness: 0.06
      }),
      sofaFabric: new THREE.MeshStandardMaterial({
        color: '#A49D90',
        roughness: 0.88,
        metalness: 0.02
      }),
      cushionFabric: new THREE.MeshStandardMaterial({
        color: '#B8B2A6',
        roughness: 0.85,
        metalness: 0.02
      }),
      duvetLinen: new THREE.MeshStandardMaterial({
        color: '#B0A99C',
        roughness: 0.85,
        metalness: 0.02
      }),
      cashmereRunner: new THREE.MeshStandardMaterial({
        color: '#3E3228',
        roughness: 0.80,
        metalness: 0.04
      }),
      pillowFabric: new THREE.MeshStandardMaterial({
        color: '#BEB7A9',
        roughness: 0.85,
        metalness: 0.02
      }),
      darkBronze: new THREE.MeshStandardMaterial({
        map: bronzeTex,
        roughness: 0.38,
        metalness: 0.82
      }),
      lampBronze: new THREE.MeshStandardMaterial({
        color: '#A08055',
        roughness: 0.30,
        metalness: 0.85
      }),
      sconceGlow: new THREE.MeshStandardMaterial({
        color: '#FFF2D6',
        emissive: '#FFB85C',
        emissiveIntensity: 1.2,
        roughness: 0.2
      }),
      rug: new THREE.MeshStandardMaterial({
        color: '#70685E',
        roughness: 0.94,
        metalness: 0.02
      }),
      glass: new THREE.MeshStandardMaterial({
        color: '#8CAAB0',
        roughness: 0.06,
        metalness: 0.08,
        transparent: true,
        opacity: 0.28
      }),
      foliage: new THREE.MeshStandardMaterial({
        color: '#1E3827',
        roughness: 0.85,
        metalness: 0.04
      }),
      hotspotMat: new THREE.MeshStandardMaterial({
        color: '#A8875F',
        emissive: '#A8875F',
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      })
    };
  }, []);

  return (
    <group name="skyline-show-residence" position={[0, 0, 0]}>
      {/* Architectural Lighting */}
      <ambientLight intensity={0.80} color="#FFF5E6" />
      <directionalLight position={[6, 10, 24]} intensity={1.1} castShadow color="#FFE4C4" />
      {/* Living Room Downlight */}
      <pointLight position={[4.8, 2.7, 13.5]} intensity={0.8} color="#FFE3C2" distance={12} />
      {/* Bedroom Downlight */}
      <pointLight position={[3.6, 2.7, 3.5]} intensity={0.7} color="#FFE3C2" distance={10} />
      {/* Bedside Sconces */}
      <pointLight position={[1.85, 1.45, 2.0]} intensity={0.45} color="#FFD090" distance={4} />
      <pointLight position={[5.35, 1.45, 2.0]} intensity={0.45} color="#FFD090" distance={4} />
      {/* Balcony Loggia Terrace Lantern */}
      <pointLight position={[6.0, 2.5, 16.5]} intensity={1.2} color="#FFD8B0" distance={12} />

      {/* 1. ARCHITECTURAL ENVELOPE */}
      <mesh position={[6, 0, 8]} receiveShadow material={materials.floorOak}>
        <boxGeometry args={[12, 0.1, 16]} />
      </mesh>

      <mesh position={[6, 2.9, 8]} material={materials.ceiling}>
        <boxGeometry args={[12, 0.08, 16]} />
      </mesh>

      <mesh position={[0, 1.45, 8]} material={materials.wall}>
        <boxGeometry args={[0.2, 2.9, 16]} />
      </mesh>

      <mesh position={[12, 1.45, 8]} material={materials.wall}>
        <boxGeometry args={[0.2, 2.9, 16]} />
      </mesh>
      <mesh position={[11.88, 1.45, 12]} material={materials.flutedWood}>
        <boxGeometry args={[0.04, 2.7, 6]} />
      </mesh>

      <mesh position={[6, 1.45, 0]} material={materials.wall}>
        <boxGeometry args={[12, 2.9, 0.2]} />
      </mesh>

      {/* South Sliding Glass Wall to Balcony (Architectural bronze mullions with floor-to-ceiling panoramic glazing) */}
      <group position={[6, 1.45, 16]}>
        {/* Top Header & Bottom Sill */}
        <mesh position={[0, 1.4, 0]} material={materials.darkBronze}>
          <boxGeometry args={[12, 0.1, 0.12]} />
        </mesh>
        <mesh position={[0, -1.4, 0]} material={materials.darkBronze}>
          <boxGeometry args={[12, 0.1, 0.12]} />
        </mesh>
        {/* Vertical Bronze Mullions */}
        <mesh position={[-5.95, 0, 0]} material={materials.darkBronze}>
          <boxGeometry args={[0.1, 2.7, 0.12]} />
        </mesh>
        <mesh position={[5.95, 0, 0]} material={materials.darkBronze}>
          <boxGeometry args={[0.1, 2.7, 0.12]} />
        </mesh>
        <mesh position={[-2.0, 0, 0]} material={materials.darkBronze}>
          <boxGeometry args={[0.08, 2.7, 0.12]} />
        </mesh>
        <mesh position={[2.0, 0, 0]} material={materials.darkBronze}>
          <boxGeometry args={[0.08, 2.7, 0.12]} />
        </mesh>
        {/* High-transparency floor-to-ceiling glass */}
        <mesh position={[0, 0, 0]} material={materials.glass}>
          <boxGeometry args={[11.8, 2.7, 0.02]} />
        </mesh>
      </group>

      {/* 2. BALCONY TERRACE (Travertine deck, bronze slim handrail, crystal glass balustrade) */}
      <mesh position={[6, -0.05, 17.5]} receiveShadow material={materials.travertine}>
        <boxGeometry args={[12, 0.1, 3]} />
      </mesh>
      {/* Balustrade Top Handrail */}
      <mesh position={[6, 1.05, 19]} material={materials.darkBronze}>
        <boxGeometry args={[12, 0.04, 0.08]} />
      </mesh>
      {/* Balustrade Base Channel */}
      <mesh position={[6, 0.05, 19]} material={materials.darkBronze}>
        <boxGeometry args={[12, 0.05, 0.08]} />
      </mesh>
      {/* Crystal Clear Acoustic Glass Balustrade */}
      <mesh position={[6, 0.55, 18.96]} material={materials.glass}>
        <boxGeometry args={[11.8, 0.95, 0.02]} />
      </mesh>
      {/* Side End Balustrades */}
      <mesh position={[0, 0.55, 17.5]} material={materials.darkBronze}>
        <boxGeometry args={[0.08, 1.05, 3]} />
      </mesh>
      <mesh position={[12, 0.55, 17.5]} material={materials.darkBronze}>
        <boxGeometry args={[0.08, 1.05, 3]} />
      </mesh>

      {/* 3. LIVING SALON FURNITURE (Architecturally proportioned with rounded cushions, seam bevels, and honest joinery) */}
      <group position={[4.8, 0, 14.0]}>
        {/* Floor Rug with Thickness and Rounded Proportions */}
        <mesh position={[0, 0.06, 0]} receiveShadow material={materials.rug}>
          <boxGeometry args={[4.4, 0.03, 3.6]} />
        </mesh>

        {/* L-Shaped Sectional Sofa */}
        {/* Main Sofa Base / Plinth */}
        <mesh position={[0, 0.12, 0.8]} castShadow receiveShadow material={materials.darkBronze}>
          <boxGeometry args={[3.3, 0.10, 0.96]} />
        </mesh>
        {/* Main Sofa Seat Cushion */}
        <mesh position={[0, 0.32, 0.8]} castShadow receiveShadow material={materials.sofaFabric}>
          <boxGeometry args={[3.25, 0.30, 0.94]} />
        </mesh>
        {/* Main Sofa Backrest */}
        <mesh position={[0, 0.62, 1.15]} castShadow receiveShadow material={materials.sofaFabric}>
          <boxGeometry args={[3.25, 0.38, 0.28]} />
        </mesh>
        {/* Accent Throw Cushions */}
        <mesh position={[-0.8, 0.56, 0.98]} rotation={[0.1, 0.15, 0]} castShadow material={materials.cushionFabric}>
          <boxGeometry args={[0.55, 0.35, 0.16]} />
        </mesh>
        <mesh position={[0.8, 0.56, 0.98]} rotation={[0.1, -0.15, 0]} castShadow material={materials.cushionFabric}>
          <boxGeometry args={[0.55, 0.35, 0.16]} />
        </mesh>

        {/* Chaise Return Base & Cushion */}
        <mesh position={[-1.3, 0.12, -0.2]} castShadow receiveShadow material={materials.darkBronze}>
          <boxGeometry args={[0.96, 0.10, 1.3]} />
        </mesh>
        <mesh position={[-1.3, 0.32, -0.2]} castShadow receiveShadow material={materials.sofaFabric}>
          <boxGeometry args={[0.94, 0.30, 1.25]} />
        </mesh>
        <mesh position={[-1.65, 0.55, -0.2]} castShadow receiveShadow material={materials.sofaFabric}>
          <boxGeometry args={[0.22, 0.32, 1.25]} />
        </mesh>

        {/* Honed Travertine Cocktail Table (Dual sculpted pedestals + beveled tabletop) */}
        <group position={[0.2, 0, -0.2]}>
          {/* Beveled Travertine Top */}
          <mesh position={[0, 0.32, 0]} castShadow receiveShadow material={materials.travertine}>
            <boxGeometry args={[1.5, 0.08, 0.8]} />
          </mesh>
          {/* Dual Fluted Stone Pedestals */}
          <mesh position={[-0.45, 0.14, 0]} castShadow receiveShadow material={materials.travertine}>
            <cylinderGeometry args={[0.18, 0.22, 0.28, 24]} />
          </mesh>
          <mesh position={[0.45, 0.14, 0]} castShadow receiveShadow material={materials.travertine}>
            <cylinderGeometry args={[0.18, 0.22, 0.28, 24]} />
          </mesh>
        </group>

        {/* Slender Floor Lamp */}
        <group position={[2.2, 0, 1.1]}>
          <mesh position={[0, 0.02, 0]} material={materials.darkBronze}>
            <cylinderGeometry args={[0.16, 0.18, 0.04, 16]} />
          </mesh>
          <mesh position={[0, 0.9, 0]} castShadow material={materials.lampBronze}>
            <cylinderGeometry args={[0.018, 0.018, 1.76, 12]} />
          </mesh>
          <mesh position={[0, 1.75, 0]} material={materials.duvetLinen}>
            <cylinderGeometry args={[0.14, 0.24, 0.32, 24]} />
          </mesh>
        </group>

        {/* Travertine Corner Planter with Foliage */}
        <group position={[-2.0, 0, 1.2]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={materials.travertine}>
            <cylinderGeometry args={[0.26, 0.22, 0.7, 24]} />
          </mesh>
          <mesh position={[0, 0.85, 0]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.32, 16, 16]} />
          </mesh>
          <mesh position={[0.08, 1.05, 0.04]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.24, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* 4. PRIMARY BEDROOM SUITE */}
      <group position={[3.6, 0, 3.0]}>
        <mesh position={[0, 0.06, 0]} receiveShadow material={materials.rug}>
          <boxGeometry args={[4.0, 0.02, 3.6]} />
        </mesh>

        <mesh position={[0, 0.14, -0.1]} castShadow receiveShadow material={materials.flutedWood}>
          <boxGeometry args={[2.3, 0.24, 2.3]} />
        </mesh>

        <mesh position={[0, 0.38, -0.05]} castShadow receiveShadow material={materials.duvetLinen}>
          <boxGeometry args={[2.05, 0.28, 2.15]} />
        </mesh>

        <mesh position={[0, 0.53, 0.7]} castShadow material={materials.cashmereRunner}>
          <boxGeometry args={[2.1, 0.04, 0.65]} />
        </mesh>

        <mesh position={[-0.55, 0.62, -0.85]} rotation={[0.2, 0, 0]} castShadow material={materials.pillowFabric}>
          <boxGeometry args={[0.75, 0.35, 0.2]} />
        </mesh>
        <mesh position={[-0.55, 0.54, -0.6]} rotation={[0.1, 0, 0]} castShadow material={materials.duvetLinen}>
          <boxGeometry args={[0.7, 0.18, 0.35]} />
        </mesh>

        <mesh position={[0.55, 0.62, -0.85]} rotation={[0.2, 0, 0]} castShadow material={materials.pillowFabric}>
          <boxGeometry args={[0.75, 0.35, 0.2]} />
        </mesh>
        <mesh position={[0.55, 0.54, -0.6]} rotation={[0.1, 0, 0]} castShadow material={materials.duvetLinen}>
          <boxGeometry args={[0.7, 0.18, 0.35]} />
        </mesh>

        <mesh position={[0, 1.15, -1.18]} castShadow receiveShadow material={materials.flutedWood}>
          <boxGeometry args={[3.4, 1.6, 0.1]} />
        </mesh>
        <mesh position={[0, 1.95, -1.13]} material={materials.darkBronze}>
          <boxGeometry args={[3.4, 0.04, 0.04]} />
        </mesh>

        <mesh position={[-1.85, 0.35, -0.95]} castShadow receiveShadow material={materials.travertine}>
          <boxGeometry args={[0.65, 0.3, 0.45]} />
        </mesh>
        <mesh position={[1.85, 0.35, -0.95]} castShadow receiveShadow material={materials.travertine}>
          <boxGeometry args={[0.65, 0.3, 0.45]} />
        </mesh>

        <group position={[-1.85, 1.45, -1.1]}>
          <mesh material={materials.darkBronze}>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
          </mesh>
          <mesh position={[0, -0.12, 0.08]} material={materials.sconceGlow}>
            <sphereGeometry args={[0.06, 12, 12]} />
          </mesh>
        </group>
        <group position={[1.85, 1.45, -1.1]}>
          <mesh material={materials.darkBronze}>
            <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
          </mesh>
          <mesh position={[0, -0.12, 0.08]} material={materials.sconceGlow}>
            <sphereGeometry args={[0.06, 12, 12]} />
          </mesh>
        </group>
      </group>

      {/* 5. OUTDOOR BALCONY LOGGIA (Architecturally composed, zero foreground camera obstruction) */}
      <group position={[0, 0, 0]}>
        {/* Left Lounge Wing */}
        <group position={[2.0, 0, 17.5]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={materials.sofaFabric}>
            <boxGeometry args={[1.0, 0.65, 0.9]} />
          </mesh>
          <mesh position={[-1.0, 0.3, 0.2]} castShadow receiveShadow material={materials.travertine}>
            <cylinderGeometry args={[0.24, 0.20, 0.6, 16]} />
          </mesh>
          <mesh position={[-1.0, 0.72, 0.2]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.28, 12, 12]} />
          </mesh>
        </group>

        {/* Right Lounge Wing */}
        <group position={[10.0, 0, 17.5]}>
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow material={materials.sofaFabric}>
            <boxGeometry args={[1.0, 0.65, 0.9]} />
          </mesh>
          <mesh position={[-1.1, 0.22, 0]} castShadow receiveShadow material={materials.travertine}>
            <boxGeometry args={[0.6, 0.4, 0.6]} />
          </mesh>
          <mesh position={[1.0, 0.3, 0.2]} castShadow receiveShadow material={materials.travertine}>
            <cylinderGeometry args={[0.24, 0.20, 0.6, 16]} />
          </mesh>
          <mesh position={[1.0, 0.72, 0.2]} castShadow material={materials.foliage}>
            <sphereGeometry args={[0.28, 12, 12]} />
          </mesh>
        </group>

        {/* Terrace Loggia Sunset Influx Light */}
        <directionalLight position={[6, 5, 30]} intensity={1.2} color="#FFD29D" />
      </group>

      {/* 6. SUNSET HORIZON & RICH CITYSCAPE PANORAMA */}
      <group position={[6, 8, 48]}>
        {/* Sky Atmosphere Layers */}
        <mesh position={[0, 12, 0]}>
          <planeGeometry args={[140, 16]} />
          <meshBasicMaterial color="#121C18" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 5, 0]}>
          <planeGeometry args={[140, 12]} />
          <meshBasicMaterial color="#2B3E36" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <planeGeometry args={[140, 9]} />
          <meshBasicMaterial color="#C25F33" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -5.5, 0]}>
          <planeGeometry args={[140, 7]} />
          <meshBasicMaterial color="#EFA058" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -9.0, 0]}>
          <planeGeometry args={[140, 6]} />
          <meshBasicMaterial color="#FCD289" side={THREE.DoubleSide} />
        </mesh>

        {/* Distant Urban Towers (Silhouetted against the golden horizon) */}
        <mesh position={[-28, -5.5, 2]}>
          <boxGeometry args={[16, 11, 0.5]} />
          <meshBasicMaterial color="#1E2824" />
        </mesh>
        <mesh position={[-14, -4.5, 2]}>
          <boxGeometry args={[12, 13, 0.5]} />
          <meshBasicMaterial color="#1A221F" />
        </mesh>
        <mesh position={[2, -6.0, 2]}>
          <boxGeometry args={[18, 10, 0.5]} />
          <meshBasicMaterial color="#1E2824" />
        </mesh>
        <mesh position={[18, -4.0, 2]}>
          <boxGeometry args={[14, 14, 0.5]} />
          <meshBasicMaterial color="#18201D" />
        </mesh>
        <mesh position={[34, -5.5, 2]}>
          <boxGeometry args={[16, 11, 0.5]} />
          <meshBasicMaterial color="#1E2824" />
        </mesh>

        {/* Illuminated Twilight City Windows */}
        {[-26, -22, -14, -10, 2, 6, 16, 20, 32].map((x, i) => (
          <mesh key={x} position={[x, -5.2 + (i % 4) * 1.4, 4.5]}>
            <boxGeometry args={[0.8, 0.5, 0.1]} />
            <meshBasicMaterial color="#FFE4AC" />
          </mesh>
        ))}

        {/* Midground Skyline */}
        <mesh position={[-20, -6.5, 4]}>
          <boxGeometry args={[16, 7, 0.5]} />
          <meshBasicMaterial color="#18201C" />
        </mesh>
        <mesh position={[24, -7.0, 4]}>
          <boxGeometry args={[18, 6, 0.5]} />
          <meshBasicMaterial color="#18201C" />
        </mesh>

        {[-22, -18, -6, 2, 8, 16, 26].map((x, i) => (
          <mesh key={x} position={[x, -4.5 + (i % 3) * 1.2, 4.5]}>
            <boxGeometry args={[0.7, 0.45, 0.1]} />
            <meshBasicMaterial color="#FFDC9E" />
          </mesh>
        ))}
      </group>

      {/* 7. HOTSPOTS (Only rendered during interactive show residence tour) */}
      {showHotspots && roomId === 'living' && (
        <group>
          <group
            position={[3.6, 1.2, 6.0]}
            onClick={(e) => {
              e.stopPropagation();
              onRoomChange('bedroom');
            }}
          >
            <mesh material={materials.hotspotMat}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
          </group>

          <group
            position={[6.0, 1.2, 16.2]}
            onClick={(e) => {
              e.stopPropagation();
              onRoomChange('balcony');
            }}
          >
            <mesh material={materials.hotspotMat}>
              <sphereGeometry args={[0.18, 16, 16]} />
            </mesh>
          </group>
        </group>
      )}

      {showHotspots && roomId === 'bedroom' && (
        <group
          position={[3.6, 1.2, 8.5]}
          onClick={(e) => {
            e.stopPropagation();
            onRoomChange('living');
          }}
        >
          <mesh material={materials.hotspotMat}>
            <sphereGeometry args={[0.18, 16, 16]} />
          </mesh>
        </group>
      )}

      {showHotspots && roomId === 'balcony' && (
        <group
          position={[6.0, 1.2, 14.5]}
          onClick={(e) => {
            e.stopPropagation();
            onRoomChange('living');
          }}
        >
          <mesh material={materials.hotspotMat}>
            <sphereGeometry args={[0.18, 16, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/**
 * Dedicated camera controller for interactive standalone tour view only
 */
export function TourCameraController({ roomId }: { roomId: RoomId }) {
  const { camera, gl } = useThree();

  const nodes = useMemo(() => {
    return {
      living: {
        pos: new THREE.Vector3(4.2, 1.45, 10.8),
        look: new THREE.Vector3(5.0, 0.95, 14.5),
        fov: 52
      },
      bedroom: {
        pos: new THREE.Vector3(3.6, 1.45, 5.8),
        look: new THREE.Vector3(3.6, 0.70, 1.8),
        fov: 50
      },
      balcony: {
        pos: new THREE.Vector3(5.4, 1.45, 16.2),
        look: new THREE.Vector3(6.2, 1.05, 24.0),
        fov: 54
      }
    };
  }, []);

  const targetCamPos = useRef(new THREE.Vector3().copy(nodes.living.pos));
  const baseCamLook = useRef(new THREE.Vector3().copy(nodes.living.look));
  const currentCamLook = useRef(new THREE.Vector3().copy(nodes.living.look));

  const currentYaw = useRef(0);
  const currentPitch = useRef(0);
  const targetYaw = useRef(0);
  const targetPitch = useRef(0);
  const isPointerDown = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const isFirstRender = useRef(true);

  // Static scratch vectors to eliminate garbage collection
  const baseDirScratch = useRef(new THREE.Vector3());
  const rotatedDirScratch = useRef(new THREE.Vector3());
  const rightAxisScratch = useRef(new THREE.Vector3());
  const desiredLookScratch = useRef(new THREE.Vector3());
  const yUp = useRef(new THREE.Vector3(0, 1, 0));

  useEffect(() => {
    const node = nodes[roomId] || nodes.living;
    targetCamPos.current.copy(node.pos);
    baseCamLook.current.copy(node.look);
    currentCamLook.current.copy(node.look);
    targetYaw.current = 0;
    targetPitch.current = 0;
    currentYaw.current = 0;
    currentPitch.current = 0;

    if (isFirstRender.current || camera.position.distanceTo(node.pos) > 5) {
      camera.position.copy(node.pos);
      camera.lookAt(node.look);
      isFirstRender.current = false;
    }

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = node.fov;
      camera.near = 0.1;
      camera.far = 160;
      camera.updateProjectionMatrix();
    }
  }, [roomId, nodes, camera]);

  useEffect(() => {
    return () => {
      if (camera instanceof THREE.PerspectiveCamera) {
        camera.near = 0.5;
        camera.fov = 45;
        camera.updateProjectionMatrix();
      }
    };
  }, [camera]);

  const onPointerDown = useCallback((e: PointerEvent) => {
    isPointerDown.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isPointerDown.current) return;
    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    targetYaw.current = THREE.MathUtils.clamp(targetYaw.current - deltaX * 0.0035, -0.55, 0.55);
    targetPitch.current = THREE.MathUtils.clamp(targetPitch.current - deltaY * 0.003, -0.25, 0.25);
  }, []);

  const onPointerUp = useCallback(() => {
    isPointerDown.current = false;
  }, []);

  useEffect(() => {
    const dom = gl.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [gl, onPointerDown, onPointerMove, onPointerUp]);

  useFrame((_, delta) => {
    const damp = 1 - Math.exp(-delta * 6);
    camera.position.lerp(targetCamPos.current, damp);

    currentYaw.current += (targetYaw.current - currentYaw.current) * damp;
    currentPitch.current += (targetPitch.current - currentPitch.current) * damp;

    baseDirScratch.current.subVectors(baseCamLook.current, targetCamPos.current).normalize();
    rotatedDirScratch.current.copy(baseDirScratch.current);
    rotatedDirScratch.current.applyAxisAngle(yUp.current, currentYaw.current);
    rightAxisScratch.current.crossVectors(rotatedDirScratch.current, yUp.current).normalize();
    rotatedDirScratch.current.applyAxisAngle(rightAxisScratch.current, currentPitch.current);

    desiredLookScratch.current.addVectors(camera.position, rotatedDirScratch.current.multiplyScalar(10));
    currentCamLook.current.lerp(desiredLookScratch.current, damp);
    camera.lookAt(currentCamLook.current);
  });

  return null;
}

export interface InteriorSceneProps {
  roomId: RoomId;
  onRoomChange: (roomId: RoomId) => void;
  isPointerDragging?: boolean;
}

export function InteriorScene({ roomId, onRoomChange }: InteriorSceneProps) {
  return (
    <>
      <TourCameraController roomId={roomId} />
      <InteriorModel roomId={roomId} onRoomChange={onRoomChange} showHotspots={true} />
    </>
  );
}
