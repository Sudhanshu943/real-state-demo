import { RoundedBox } from '@react-three/drei';
import { PottedPlantAsset } from './PottedPlantAsset';

function Cushion({position, size, color = '#c7beb0', rotation = 0}: {position: [number,number,number]; size: [number,number,number]; color?: string; rotation?: number}) {
  return <RoundedBox args={size} radius={.07} smoothness={3} position={position} rotation={[0,rotation,0]} castShadow receiveShadow>
    <meshStandardMaterial color={color} roughness={.94} />
  </RoundedBox>;
}

export function SalonDetails() {
  return <group name="furnished-salon">
    <group position={[4.8,0,14]}>
      <RoundedBox args={[4.8,.035,3.7]} radius={.008} smoothness={3} position={[0,.08,-.1]} receiveShadow>
        <meshStandardMaterial color="#9d9687" roughness={1}/>
      </RoundedBox>
      {Array.from({length: 24},(_,i)=><mesh key={i} position={[-2.2+i*.19,.101,-.1]}>
        <boxGeometry args={[.013,.002,3.35]}/><meshStandardMaterial color="#b4ad9e" roughness={1}/>
      </mesh>)}
      <Cushion position={[0,.21,.8]} size={[3.4,.22,1.05]} color="#746757"/>
      {[-1.08,0,1.08].map(x=><group key={x}>
        <Cushion position={[x,.43,.76]} size={[1.05,.24,.96]}/>
        <Cushion position={[x,.79,1.12]} size={[1.06,.65,.25]}/>
      </group>)}
      <Cushion position={[-1.67,.62,.77]} size={[.22,.65,1.04]}/>
      <Cushion position={[1.67,.62,.77]} size={[.22,.65,1.04]}/>
      <Cushion position={[-1.1,.42,-.18]} size={[1.1,.27,.92]}/>
      <Cushion position={[-1.1,.2,-.18]} size={[1.1,.18,.92]} color="#746757"/>
      <Cushion position={[-1.12,.79,.93]} size={[.44,.47,.16]} color="#73816b" rotation={.17}/>
      <Cushion position={[1.1,.79,.92]} size={[.44,.47,.16]} color="#b79872" rotation={-.2}/>
      <RoundedBox args={[1.5,.09,.85]} radius={.025} smoothness={3} position={[.3,.41,-.4]} castShadow receiveShadow>
        <meshStandardMaterial color="#d3c7af" roughness={.55}/>
      </RoundedBox>
      {[-.13,.73].map(x=><mesh key={x} position={[x,.24,-.4]} castShadow>
        <cylinderGeometry args={[.17,.2,.34,24]}/><meshStandardMaterial color="#baad95" roughness={.7}/>
      </mesh>)}
      {[0,1,2].map(i=><mesh key={i} position={[.1,.47+i*.025,-.45]} rotation={[0,.1*i,0]} castShadow>
        <boxGeometry args={[.34,.024,.26]}/><meshStandardMaterial color={['#354b42','#c8bba3','#645440'][i]}/>
      </mesh>)}
      <mesh position={[.72,.54,-.37]} castShadow>
        <sphereGeometry args={[.12,24,16]}/><meshStandardMaterial color="#a18768" roughness={.6}/>
      </mesh>
      <mesh position={[2.1,.5,.7]} castShadow><cylinderGeometry args={[.32,.28,.07,32]}/><meshStandardMaterial color="#bca98a" metalness={.35} roughness={.4}/></mesh>
      <mesh position={[2.1,.27,.7]} castShadow><cylinderGeometry args={[.045,.08,.5,12]}/><meshStandardMaterial color="#5b4a34" metalness={.6} roughness={.4}/></mesh>
      <group position={[-2.3,0,1]}>
        <mesh position={[0,.03,0]}><cylinderGeometry args={[.2,.2,.06,24]}/><meshStandardMaterial color="#4b4133" metalness={.6}/></mesh>
        <mesh position={[0,.9,0]}><cylinderGeometry args={[.014,.014,1.8,12]}/><meshStandardMaterial color="#9e8256" metalness={.8} roughness={.3}/></mesh>
        <mesh position={[0,1.8,0]}><cylinderGeometry args={[.17,.29,.38,32,1,true]}/><meshStandardMaterial color="#e2d8bc" side={2} roughness={.9}/></mesh>
        <pointLight position={[0,1.65,0]} color="#ffe0af" intensity={2} distance={5}/>
      </group>
    </group>
    {/* Curtain folds, floor trims and a shallow coffer give the room a finished envelope. */}
    {[.35,11.4].map(x=><group key={x}>
      {Array.from({length: 9},(_,i)=><mesh key={i} position={[x+i*.075,1.42,15.75]} castShadow scale={[1,1,.45]}>
        <cylinderGeometry args={[.065,.075,2.78,8]}/><meshStandardMaterial color="#c6bcaa" roughness={1}/>
      </mesh>)}
    </group>)}
    {[.13,11.86].map(x=><mesh key={x} position={[x,.14,8]}><boxGeometry args={[.06,.18,15.8]}/><meshStandardMaterial color="#c6beb0" roughness={.8}/></mesh>)}
    {Array.from({length: 42},(_,i)=><mesh key={i} position={[11.82,1.45,9.1+i*.14]} castShadow>
      <boxGeometry args={[.08,2.65,.055]}/><meshStandardMaterial color={i%3 ? '#66513c':'#78614a'} roughness={.75}/>
    </mesh>)}
    <mesh position={[6,2.77,15.6]}><boxGeometry args={[11.5,.035,.055]}/><meshBasicMaterial color="#f7dfad"/></mesh>
    <mesh position={[11.7,2.77,12]}><boxGeometry args={[.055,.035,7]}/><meshBasicMaterial color="#f7dfad"/></mesh>
    <group position={[.35,0,10.5]}>
      <mesh position={[0,.4,0]} castShadow><boxGeometry args={[.45,.7,2.4]}/><meshStandardMaterial color="#574735" roughness={.7}/></mesh>
      <mesh position={[0,.77,0]} castShadow><boxGeometry args={[.5,.07,2.5]}/><meshStandardMaterial color="#b4a487" roughness={.65}/></mesh>
      {Array.from({length:18},(_,i)=><mesh key={i} position={[.04,1.15,-1+i*.115]} rotation={[.03*(i%3),0,0]} castShadow>
        <boxGeometry args={[.23,.5+(i%3)*.06,.075]}/><meshStandardMaterial color={['#68735a','#b0a084','#897359','#4f6053'][i%4]} roughness={.9}/>
      </mesh>)}
    </group>
    {/* Framed abstract textile artwork, facing into the room. */}
    <group position={[.14,1.65,12.4]} rotation={[0,Math.PI/2,0]}>
      <mesh><boxGeometry args={[1.7,1.25,.04]}/><meshStandardMaterial color="#514937"/></mesh>
      <mesh position={[0,0,.026]}><planeGeometry args={[1.58,1.13]}/><meshStandardMaterial color="#c7b89c"/></mesh>
      <mesh position={[-.2,.05,.03]}><circleGeometry args={[.35,48]}/><meshStandardMaterial color="#687863"/></mesh>
      <mesh position={[.25,-.2,.032]}><planeGeometry args={[.65,.3]}/><meshStandardMaterial color="#a28462"/></mesh>
    </group>

    {/* Authored CC0 Potted Plant Asset grounded on oak parquet floor near terrace light */}
    <PottedPlantAsset position={[1.4, 0, 15.1]} scale={0.92} rotation={[0, 0.4, 0]} />
  </group>;
}
