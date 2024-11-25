import Quadrelateral from "./Quadrelateral";
import { projectPoints } from "../../../scripts/rotation";
import { useEffect, useState } from "react";

function getZOrder(projectedCubeVerts: number[][], cubeFaces: number[][]) {
  const facePoints: number[][] = cubeFaces.map((face) => {
    return face.map((idx) => {
      return projectedCubeVerts[2][idx];
    });
  });
  const meanFaceZ: number[] = facePoints.map((face) => {
    return face.reduce((acc, val) => acc + val, 0) / face.length;
  });

  const indices = meanFaceZ.map((_, i) => i);

  const argSort = indices.sort((a, b) => meanFaceZ[b] - meanFaceZ[a]);
  return argSort;
}

export default function Cube({
  extrinsicMatrix,
  intrinsicMatrix,
  cubeVerts,
  cubeFaces,
  cubeColors,
}: {
  extrinsicMatrix: number[][];
  intrinsicMatrix: number[][];
  cubeVerts: number[][];
  cubeFaces: number[][];
  cubeColors: string[];
}) {
  const [projectedCubeVerts, setProjectedCubeVerts] = useState<number[][]>(
    projectPoints(cubeVerts, extrinsicMatrix, intrinsicMatrix)
  );

  const [faceZOrder, setFaceZOrder] = useState<number[]>(
    getZOrder(projectedCubeVerts, cubeFaces)
  );

  useEffect(() => {
    const projectedPoints = projectPoints(
      cubeVerts,
      extrinsicMatrix,
      intrinsicMatrix
    );
    setProjectedCubeVerts(projectedPoints);
    setFaceZOrder(getZOrder(projectedPoints, cubeFaces));
  }, [intrinsicMatrix, extrinsicMatrix]);

  return (
    <>
      {faceZOrder.map((face_idx, i) => (
        <Quadrelateral
          key={i}
          projectedVerts={projectedCubeVerts}
          idxes={cubeFaces[face_idx]}
          color={cubeColors[face_idx]}
        />
      ))}
    </>
  );
}
