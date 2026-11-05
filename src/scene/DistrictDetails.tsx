import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { DetailBatch, type Piece } from './FacadeDetails';

export function DistrictDetails(){
  const details=useMemo(()=>{
    const windows:Piece[]=[], markings:Piece[]=[], paths:Piece[]=[];
    const blocks=[[-145,-45,32,38,22],[-85,45,34,42,18],[-145,45,36,40,26],[85,45,34,44,20],[145,45,36,40,24],[145,-45,32,38,28],[-75,120,46,34,16],[0,120,50,34,14],[75,120,46,34,18]];
    blocks.forEach(([x,z,w,d,h])=>{
      for(let y=3;y<h-1;y+=3){
        windows.push({position:[x,y,z+d/2+.02],scale:[w-3,1.1,.06]});
        windows.push({position:[x+w/2+.02,y,z],scale:[.06,1.1,d-3]});
      }
      paths.push({position:[x,.15,z],scale:[w+6,.18,d+6]});
    });
    for(const x of [-110,-40,40,110]) for(let z=-160;z<180;z+=12){
      if(z>-112&&z<-78)continue;
      markings.push({position:[x,.075,z],scale:[.3,.015,5]});
    }
    return {windows,markings,paths,glass:new THREE.MeshStandardMaterial({color:'#4e6860',roughness:.45}),paint:new THREE.MeshStandardMaterial({color:'#e5dfc5',roughness:1}),paving:new THREE.MeshStandardMaterial({color:'#c0bba9',roughness:1})};
  },[]);
  useEffect(()=>()=>{details.glass.dispose();details.paint.dispose();details.paving.dispose();},[details]);
  return <group name="district-streetscape-detail">
    <DetailBatch pieces={details.windows} material={details.glass}/><DetailBatch pieces={details.markings} material={details.paint}/><DetailBatch pieces={details.paths} material={details.paving}/>
    {[-120,-60,0,60,120].map(x=><group key={x} position={[x,0,-112]}>
      <mesh position={[0,1.7,0]} castShadow><cylinderGeometry args={[.3,.45,3.4,6]}/><meshStandardMaterial color="#86795d"/></mesh>
      <mesh position={[0,4,0]} scale={[1,.85,1]} castShadow><sphereGeometry args={[2.5,12,10]}/><meshStandardMaterial color="#708263" roughness={1}/></mesh>
    </group>)}
  </group>;
}
