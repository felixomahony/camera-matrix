import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

import Cube from "./three_js/Cube";
import CubeCorner from "./three_js/CubeCorner";
import Grid from "./three_js/Grid";
import Axes from "./three_js/Axes";
import Camera from "./three_js/Camera";
import DecomposedConnection from "./three_js/DecomposedConnection";

export default function ThirdPartyView({
  visibility,
  containerRef,
  egoExtrinsics,
  egoIntrinsics,
  camExtrinsics,
  camIntrinsics,
}: {
  visibility: any;
  containerRef: any;
  egoExtrinsics: number[][];
  egoIntrinsics: number[][];
  camExtrinsics: number[][];
  camIntrinsics: number[][];
}) {
  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 5]}
        zoom={1}
        left={-960}
        right={960}
        top={
          (1920 * (containerRef.current?.clientHeight ?? 1440)) /
          (containerRef.current?.clientWidth ?? 1920) /
          2
        }
        bottom={
          -(1920 * (containerRef.current?.clientHeight ?? 1440)) /
          (containerRef.current?.clientWidth ?? 1920) /
          2
        }
        near={0.1}
        far={1000}
      />
      <Grid
        extrinsicMatrix={egoExtrinsics}
        intrinsicMatrix={egoIntrinsics}
        camCoords={visibility.grid_cam}
        camExtrinsicMatrix={camExtrinsics}
      />
      <Cube extrinsicMatrix={egoExtrinsics} intrinsicMatrix={egoIntrinsics} />
      {visibility.camera && (
        <Camera
          egoEtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          camExtrinsicMatrix={camExtrinsics}
          camIntrinsicMatrix={camIntrinsics}
          showPlane={visibility.camera_plane}
        />
      )}
      {visibility.axis_cam && (
        <Axes
          egoExtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          cameraExtrinsics={camExtrinsics}
          camera={true}
        />
      )}
      {visibility.axis_orig && (
        <Axes
          egoExtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          cameraExtrinsics={camExtrinsics}
          camera={false}
        />
      )}
      {visibility.cube_corner && (
        <CubeCorner
          egoExtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          cameraExtrinsics={camExtrinsics}
          cameraIntrinsics={camIntrinsics}
          showCamPoint={true}
          showCubePoint={true}
          showLine={true}
          showImagePlaneIntersection={true}
        />
      )}
      {visibility.decomposed_cam && (
        <DecomposedConnection
          egoEtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          camExtrinsicMatrix={camExtrinsics}
          camIntrinsicMatrix={camIntrinsics}
          camCoords={true}
          ord={"y"}
        />
      )}
      {visibility.decomposed_orig && (
        <DecomposedConnection
          egoEtrinsicMatrix={egoExtrinsics}
          egoIntrinsicMatrix={egoIntrinsics}
          camExtrinsicMatrix={camExtrinsics}
          camIntrinsicMatrix={camIntrinsics}
          camCoords={false}
          ord={"y"}
        />
      )}
    </Canvas>
  );
}
