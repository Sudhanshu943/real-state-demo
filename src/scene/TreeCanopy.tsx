import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

/** A deterministic volume of individual leaves instead of a handful of solid green spheres. */
export function TreeCanopy({position=[0,0,0],scale=1}:{position?:[number,number,number];scale?:number}){
  const mesh=useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(()=>{
    const dummy=new THREE.Object3D();
    const color=new THREE.Color();
    for(let i=0;i<1400;i++){
      const angle=i*2.399963;
      const v=(i+.5)/1400;
      const y=1-2*v;
      const radius=Math.sqrt(1-y*y);
      const shell=.65+.35*((i*17%101)/100);
      dummy.position.set(Math.cos(angle)*radius*2*shell,y*1.15,Math.sin(angle)*radius*1.6*shell);
      dummy.rotation.set(i*.83,angle,i*.37);
      dummy.scale.set(.19+(i%5)*.015,.035,.085);
      dummy.updateMatrix();mesh.current!.setMatrixAt(i,dummy.matrix);
      color.set(['#657a50','#829168','#4d6540','#99a27b'][i%4]);mesh.current!.setColorAt(i,color);
    }
    mesh.current!.instanceMatrix.needsUpdate=true;
    if(mesh.current!.instanceColor)mesh.current!.instanceColor.needsUpdate=true;
    mesh.current!.computeBoundingSphere();
  },[]);
  return <instancedMesh ref={mesh} args={[undefined,undefined,1400]} position={position} scale={scale} castShadow>
    <icosahedronGeometry args={[1,0]}/><meshStandardMaterial roughness={.95}/>
  </instancedMesh>;
}
