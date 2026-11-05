import { useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BuildingProcedural } from '../scene/BuildingProcedural';
import { InteriorModel } from '../scene/InteriorScene';
import { DistrictScene } from '../scene/DistrictScene';
import { StudioLighting } from '../scene/StudioLighting';

const shots = {
  facade: {pos:[24,20,27], look:[8,24,3], fov:40},
  living: {pos:[2.5,1.65,11.2], look:[5.8,1.05,14.7], fov:57},
  garden: {pos:[.8,1.65,16.4], look:[8.2,1,18.1], fov:62},
  penthouse: {pos:[9.5,1.65,12.3], look:[4.5,1.2,16.8], fov:62},
  roof: {pos:[24,57,29], look:[0,47,0], fov:42},
  arrival: {pos:[23,6.5,31], look:[0,3,10], fov:55},
  district: {pos:[220,235,265], look:[0,0,0], fov:48},
  wellness: {pos:[3,1.7,9], look:[7,1.2,14.8], fov:65},
} satisfies Record<string,{pos:number[];look:number[];fov:number}>;
type Shot = keyof typeof shots;
function Pose({shot}:{shot:Shot}) {
  const {camera}=useThree();
  useEffect(()=>{
    const p=shots[shot]; camera.position.set(...p.pos as [number,number,number]); camera.lookAt(...p.look as [number,number,number]);
    if(camera instanceof THREE.PerspectiveCamera){camera.fov=p.fov;camera.updateProjectionMatrix();}
  },[camera,shot]);
  return null;
}
function WellnessDetails() {
  return <group>
    {[3,6,9].map(x=><group key={x}>
      <mesh position={[x,.07,14]} receiveShadow><boxGeometry args={[1.15,.025,2]}/><meshStandardMaterial color="#60786b" roughness={1}/></mesh>
      <mesh position={[x+.4,.2,13]} rotation={[Math.PI/2,0,0]} castShadow><cylinderGeometry args={[.12,.12,.55,24]}/><meshStandardMaterial color="#a99d85" roughness={1}/></mesh>
      <mesh position={[x-.3,.16,13.1]} castShadow><boxGeometry args={[.22,.17,.35]}/><meshStandardMaterial color="#b49d7b" roughness={.9}/></mesh>
    </group>)}
  </group>;
}
/** Development-only capture surface. Homepage consumes static images, not extra live canvases. */
export function AssetStudio(){
  const [shot,setShot]=useState<Shot>('facade');
  const interior=['living','garden','penthouse','wellness'].includes(shot);
  return <div style={{height:720,width:1280,background:'#d8d5c8'}}>
    <nav aria-label="Render compositions" style={{height:52,display:'flex',gap:8,padding:8,background:'#102019',color:'#eee'}}>
      {Object.keys(shots).map(id=><button key={id} onClick={()=>setShot(id as Shot)} style={{color:shot===id?'#15291e':'#eee',background:shot===id?'#cbb695':'transparent',padding:'4px 14px'}}>{id}</button>)}
    </nav>
    <div data-testid="render-stage" style={{height:668,width:1280,background:'linear-gradient(#90a5a2,#d5c8ae)'}}>
      <Canvas key={shot} shadows camera={{near:.1,far:1200}} dpr={[1,1.5]} gl={{antialias:true,toneMapping:THREE.ACESFilmicToneMapping,toneMappingExposure:1.15}}>
        <Pose shot={shot}/><StudioLighting/>
        {interior ? <><InteriorModel furnished={shot!=='wellness'}/>{shot==='wellness'&&<WellnessDetails/>}</> : <>
          <ambientLight intensity={.75}/><hemisphereLight args={['#e8f0ec','#7b816e',1]}/>
          <directionalLight position={[50,90,60]} intensity={2.5} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-100} shadow-camera-right={100} shadow-camera-top={100} shadow-camera-bottom={-100} shadow-camera-far={400} shadow-bias={-.0002}/>
          {shot==='district'?<DistrictScene onSelectLandmark={()=>{}} isPointerDragging={false}/>:<BuildingProcedural onSelectFloor={()=>{}} onSelectUnit={()=>{}} isPointerDragging={false}/>}
        </>}
      </Canvas>
    </div>
  </div>;
}
