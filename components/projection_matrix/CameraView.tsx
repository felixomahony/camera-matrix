import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import Cube from "./three_js/Cube";
import CubeCorner from "./three_js/CubeCorner";

export default function CameraView({
  camExtrinsics,
  camIntrinsics,
  visibility,
}: {
  camExtrinsics: number[][];
  camIntrinsics: number[][];
  visibility: any;
}) {
  return (
    <div className="w-32 h-24 md:w-48 md:h-36 border border-solid border-white bg-black">
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[0, 0, 5]}
          zoom={1}
          left={-960}
          right={960}
          top={720}
          bottom={-720}
          near={0.1}
          far={1000}
        />
        <Cube extrinsicMatrix={camExtrinsics} intrinsicMatrix={camIntrinsics} />
        {visibility.cube_corner && (
          <CubeCorner
            egoExtrinsicMatrix={camExtrinsics}
            egoIntrinsicMatrix={camIntrinsics}
            cameraExtrinsics={camExtrinsics}
            cameraIntrinsics={camIntrinsics}
            showCamPoint={false}
            showCubePoint={true}
            showLine={false}
          />
        )}
      </Canvas>
    </div>
  );
}
