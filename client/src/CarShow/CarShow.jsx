import React from "react";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {Car} from "./Car.jsx";
import {Ground} from "./Ground.jsx";
import {FloatingGrid} from "./FloatingGrid.jsx";
import {Boxes} from "./Boxes.jsx";
import {Rings} from "./Rings.jsx";



export const CarShow = () => {
  return (
    <>
      <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3,2,5]} />

      {/* let color = new Color(0,0,0) */}
      <color args={[0, 0, 0]} attach={'background'} />

      {/* отражение на машине */}
      <CubeCamera resolution={256} frames={Infinity}>
        {
          (texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )
        }
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5,5,0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <FloatingGrid />
      <Boxes />
      <Rings />

      <EffectComposer>
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.1} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={4} // blur kernel size
          luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.02} // smoothness of the luminance threshold. Range is [0, 1]
        />
        {/*        <ChromaticAberration
          modulationOffset={0}
          radialModulation={true}
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />*/}
      </EffectComposer>

    </>
  )
}

