import Quadrelateral from "./Quadrelateral";
import { projectPoints } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import CubePrimitive from "./CubePrimitive";
import { rotateCamera } from "../../../scripts/rotation";

const d: number = 0.05;

const xVerts = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [d, d, d, d, -d, -d, -d, -d],
  [d, d, -d, -d, d, d, -d, -d],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
const yVerts = [
  [d, d, d, d, -d, -d, -d, -d],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [d, d, -d, -d, d, d, -d, -d],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
const zVerts = [
  [d, d, d, d, -d, -d, -d, -d],
  [d, d, -d, -d, d, d, -d, -d],
  [2, -d, 2, -d, 2, -d, 2, -d],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const cubeFaces = [
  [0, 1, 3, 2], // x = 1
  [4, 5, 7, 6], // x = -1
  [0, 1, 5, 4], // y = 1
  [2, 3, 7, 6], // y = -1
  [0, 4, 6, 2], // z = 1
  [1, 5, 7, 3], // z = -1
];

const xColors = cubeFaces.map(() => "#ff0000");
const yColors = cubeFaces.map(() => "#ffff00");
const zColors = cubeFaces.map(() => "#0000ff");

export default function Cube({
  egoExtrinsicMatrix,
  egoIntrinsicMatrix,
  cameraExtrinsics,
  camera,
}: {
  egoExtrinsicMatrix: number[][];
  egoIntrinsicMatrix: number[][];
  cameraExtrinsics: number[][];
  camera: boolean;
}) {
  const [xVerts_, setXVerts] = useState<number[][]>(xVerts);
  const [yVerts_, setYVerts] = useState<number[][]>(yVerts);
  const [zVerts_, setZVerts] = useState<number[][]>(zVerts);

  useEffect(() => {
    if (camera) {
      setXVerts(rotateCamera(cameraExtrinsics, xVerts));
      setYVerts(rotateCamera(cameraExtrinsics, yVerts));
      setZVerts(rotateCamera(cameraExtrinsics, zVerts));
    }
  }, [cameraExtrinsics]);

  return (
    <>
      <CubePrimitive
        extrinsicMatrix={egoExtrinsicMatrix}
        intrinsicMatrix={egoIntrinsicMatrix}
        cubeVerts={xVerts_}
        cubeFaces={cubeFaces}
        cubeColors={xColors}
      />
      <CubePrimitive
        extrinsicMatrix={egoExtrinsicMatrix}
        intrinsicMatrix={egoIntrinsicMatrix}
        cubeVerts={yVerts_}
        cubeFaces={cubeFaces}
        cubeColors={yColors}
      />
      <CubePrimitive
        extrinsicMatrix={egoExtrinsicMatrix}
        intrinsicMatrix={egoIntrinsicMatrix}
        cubeVerts={zVerts_}
        cubeFaces={cubeFaces}
        cubeColors={zColors}
      />
    </>
  );
}
