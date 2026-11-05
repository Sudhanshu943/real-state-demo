import { Environment, Lightformer } from '@react-three/drei';

/** Local light cards supply glass/metal reflections without remote HDR downloads. */
export function StudioLighting() {
  return <Environment resolution={128} frames={1}>
    <Lightformer form="rect" intensity={2} color="#dce8e5" position={[0,30,10]} rotation={[Math.PI/2,0,0]} scale={[80,80,1]}/>
    <Lightformer form="rect" intensity={1.4} color="#fff0d5" position={[35,15,20]} rotation={[0,-Math.PI/3,0]} scale={[30,55,1]}/>
    <Lightformer form="rect" intensity={1.1} color="#c9dedc" position={[-35,15,-20]} rotation={[0,Math.PI/3,0]} scale={[30,55,1]}/>
  </Environment>;
}
