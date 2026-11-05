import { TreeCanopy } from './TreeCanopy';
/** Architectural site dressing, kept clear of the entrance and floor selection proxies. */
export function ArrivalGarden() {
  return (
    <group name="arrival-garden">
      {[-20, 20].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.12, 0]} receiveShadow>
            <boxGeometry args={[7, 0.35, 32]} />
            <meshStandardMaterial color="#78806b" roughness={1} />
          </mesh>
          {[-11, 0, 11].map((z, index) => (
            <group key={z} position={[x, 0.3, z]} rotation={[0, index * 0.7, 0]}>
              <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.45, 1.25, 0.5, 16]} />
                <meshStandardMaterial color="#a8a18e" roughness={0.85} />
              </mesh>
              <mesh position={[0, 2.1, 0]} castShadow>
                <cylinderGeometry args={[0.14, 0.28, 3.4, 7]} />
                <meshStandardMaterial color="#655d47" roughness={1} />
              </mesh>
              {[-1, 1].map((side) => (
                <mesh key={side} position={[side * .45, 3.1, 0]} rotation={[0, 0, -side * .5]} castShadow>
                  <cylinderGeometry args={[.07, .13, 1.8, 5]} />
                  <meshStandardMaterial color="#655d47" roughness={1} />
                </mesh>
              ))}
              <TreeCanopy position={[0,4.1,0]}/>
            </group>
          ))}
          <mesh position={[x, .45, 17.5]} castShadow receiveShadow>
            <boxGeometry args={[5, .45, 1]} />
            <meshStandardMaterial color="#bfb39b" roughness={.8} />
          </mesh>
        </group>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 16, .07, 0]} receiveShadow>
          <boxGeometry args={[.35, .14, 37]} />
          <meshStandardMaterial color="#bfb39b" roughness={.8} />
        </mesh>
      ))}
    </group>
  );
}
