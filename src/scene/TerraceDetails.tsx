import { RoundedBox } from '@react-three/drei';

export function TerraceDetails(){
  return <group name="terrace-furnishing">
    {[2,10].map((x,i)=><group key={x} position={[x,0,17.55]} rotation={[0,i?-0.3:.3,0]}>
      <RoundedBox args={[.85,.16,.8]} radius={.04} smoothness={3} position={[0,.48,0]} castShadow receiveShadow><meshStandardMaterial color="#b8b09b" roughness={1}/></RoundedBox>
      <RoundedBox args={[.85,.65,.15]} radius={.04} smoothness={3} position={[0,.8,.34]} castShadow><meshStandardMaterial color="#b8b09b" roughness={1}/></RoundedBox>
      {[-.36,.36].map(side=><group key={side}>
        <mesh position={[side,.4,0]} castShadow><boxGeometry args={[.045,.75,.045]}/><meshStandardMaterial color="#66553a" roughness={.55} metalness={.4}/></mesh>
        <mesh position={[side,.68,0]} castShadow><boxGeometry args={[.055,.055,.8]}/><meshStandardMaterial color="#66553a" roughness={.55} metalness={.4}/></mesh>
      </group>)}
      <mesh position={[i?-.9:.9,.42,.1]} castShadow receiveShadow><cylinderGeometry args={[.31,.25,.07,32]}/><meshStandardMaterial color="#b7a98e" roughness={.6}/></mesh>
      <mesh position={[i?-.9:.9,.22,.1]} castShadow><cylinderGeometry args={[.06,.15,.4,20]}/><meshStandardMaterial color="#685a43" roughness={.6}/></mesh>
    </group>)}
    {[.6,6,11.4].map(x=><group key={x} position={[x,0,18.3]}>
      <mesh position={[0,.32,0]} castShadow receiveShadow><cylinderGeometry args={[.31,.24,.64,32]}/><meshStandardMaterial color="#9b9782" roughness={.9}/></mesh>
      <mesh position={[0,.65,0]}><cylinderGeometry args={[.29,.29,.025,24]}/><meshStandardMaterial color="#514b38" roughness={1}/></mesh>
      <mesh position={[0,1,0]} castShadow><cylinderGeometry args={[.035,.055,.75,8]}/><meshStandardMaterial color="#756444"/></mesh>
      {Array.from({length:11},(_,i)=>{
        const angle=i*2.4;
        return <mesh key={i} position={[Math.cos(angle)*.22,.95+(i%4)*.12,Math.sin(angle)*.22]} rotation={[.35,angle,.35]} scale={[.35,.09,.15]} castShadow><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={i%2?'#5e7655':'#82916a'} roughness={1}/></mesh>;
      })}
    </group>)}
    {Array.from({length:11},(_,i)=><mesh key={i} position={[i+1,.006,17.5]}><boxGeometry args={[.008,.006,2.95]}/><meshStandardMaterial color="#a99f87" roughness={1}/></mesh>)}
    {[17,18].map(z=><mesh key={z} position={[6,.006,z]}><boxGeometry args={[11.9,.006,.008]}/><meshStandardMaterial color="#a99f87" roughness={1}/></mesh>)}
  </group>;
}
