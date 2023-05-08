import React, {useEffect} from "react";
import {MeshReflectorMaterial} from "@react-three/drei";
import {useFrame, useLoader} from "@react-three/fiber";
import {TextureLoader, LinearEncoding, RepeatWrapping} from "three";


export const Ground = () => {

  const [roughness, normal] = useLoader(TextureLoader, [
    'https://raw.githubusercontent.com/Domenicobrz/R3F-in-practice/main/car-show/public/textures/terrain-roughness.jpg',
    'https://raw.githubusercontent.com/Domenicobrz/R3F-in-practice/main/car-show/public/textures/terrain-normal.jpg'
  ]);

  useEffect(() => {
    [normal, roughness].forEach(t => {
      t.wrapS = RepeatWrapping;
      t.wrapT = RepeatWrapping;
      t.repeat.set(5,5)
    });

    normal.encoding = LinearEncoding;

  }, [normal, roughness])

  useFrame((state, delta) => {
    //элюзия движения
    let t = -state.clock.getElapsedTime() * 0.68;
    roughness.offset.set(0, t);
    normal.offset.set(0, t);
  });

  return (
    <mesh
      rotation-x={-Math.PI * 0.5}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        blur={[1000, 400]}
        mixBlur={30}
        mixContrast={1}
        resolution={1024}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={0.25}
        debug={0}
        reflectorOffset={0.2}
        mirror={0}
      />
    </mesh>
  )
}