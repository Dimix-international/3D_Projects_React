import React, {Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import {CarShow} from "./CarShow.jsx";
import './CarShow.css';


export const CarShowApp = () => {

  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  )
}
