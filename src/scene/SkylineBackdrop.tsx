import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { DetailBatch, type Piece } from './FacadeDetails';

/** One continuous sky surface. Separate coplanar strips previously caused z-fighting. */
export function SkylineBackdrop() {
  const city = useMemo(() => [0,1,2].map(layer => {
    const pieces:Piece[]=[];
    const windows:Piece[]=[];
    for(let i=0;i<65;i++){
      const height=2.5+((i*7+layer*13)%11)*.65;
      const x=-200+i*6.5+layer*2;
      const z=83-layer*13;
      const base=-7-layer*1.4;
      pieces.push({position:[x,base+height/2,z],scale:[3.4+(i%3)*.65,height,3]});
      pieces.push({position:[x,base+height+.2,z],scale:[2.6,.4,2.4]});
      if(layer>0) for(let row=0;row<4;row++) windows.push({position:[x,base+height*.2+row*.65,z-1.51],scale:[2.7,.12,.02]});
    }
    return {pieces,windows, material:new THREE.MeshBasicMaterial({color:['#92a5a0','#708b84','#4b6961'][layer]}),windowMaterial:new THREE.MeshBasicMaterial({color:'#c3c8a4'})};
  }),[]);
  useEffect(()=>()=>city.forEach(c=>{c.material.dispose();c.windowMaterial.dispose();}),[city]);
  const sky = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#243f46');
    gradient.addColorStop(.35, '#8eaaa7');
    gradient.addColorStop(.50, '#d8c4a5');
    gradient.addColorStop(.58, '#eab987');
    gradient.addColorStop(1, '#a8afa3');
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 32, 512);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
  useEffect(() => () => sky.dispose(), [sky]);
  return <group name="continuous-sky-and-city">
    <mesh position={[6, 0, 15]} renderOrder={-1}>
      <sphereGeometry args={[150, 48, 32]} />
      <meshBasicMaterial map={sky} side={THREE.BackSide} depthWrite={false} toneMapped={false} />
    </mesh>
    <mesh position={[30, 8, 100]}>
      <circleGeometry args={[1.4, 40]} />
      <meshBasicMaterial color="#ffe6b5" side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
    {city.map((c,i)=><group key={i}><DetailBatch pieces={c.pieces} material={c.material}/>{c.windows.length>0&&<DetailBatch pieces={c.windows} material={c.windowMaterial}/>}</group>)}
    <mesh position={[6, -7, 53]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[180, 100]} />
      <meshStandardMaterial color="#748d80" roughness={.6} />
    </mesh>
  </group>;
}
