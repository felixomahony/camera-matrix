import { projectPoints } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import Line from "./Line";
import CubePrimitive from "./CubePrimitive";
import { inv, add, subtract } from "mathjs";
import { rotateCamera } from "../../../scripts/rotation";

const pointWorld = [[2], [0], [2], [1]];

const d = 0.05;
const cubeVerts = [
  [d, d, d, d, -d, -d, -d, -d],
  [d, d, -d, -d, d, d, -d, -d],
  [d, -d, d, -d, d, -d, d, -d],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const cubeFaces = [
  [0, 1, 3, 2], // x = 1
  [4, 5, 7, 6], // x = -1
  [0, 1, 5, 4], // y = 1
  [2, 3, 7, 6], // y = -1
  [0, 4, 6, 2], // z = 1
];

function calculateImagePlaneIntersection(
  cameraIntrinsics: number[][],
  cubePointLocation: number[][],
  cameraLocation: number[][]
): number[][] {
  const focal = cameraIntrinsics[0][0] / 1000;
  const cam = cameraLocation.map((row, i) => {
    return [row[3]];
  });
  const diffVector = subtract(cubePointLocation, cam);

  const diffVectorNorm = Math.sqrt(
    diffVector[0][0] ** 2 + diffVector[1][0] ** 2 + diffVector[2][0] ** 2
  );

  const diffVectorNormed = diffVector.map((row) => {
    return [(row[0] / diffVectorNorm) * focal];
  });

  const imagePlaneIntersection = add(cam, diffVectorNormed);

  return imagePlaneIntersection;
}

export default function CubeCorner({
  egoExtrinsicMatrix,
  egoIntrinsicMatrix,
  cameraExtrinsics,
  cameraIntrinsics,
  showLine = false,
  showCamPoint = false,
  showCubePoint = false,
  showImagePlaneIntersection = false,
  cubePointLocation = pointWorld,
}: {
  egoExtrinsicMatrix: number[][];
  egoIntrinsicMatrix: number[][];
  cameraExtrinsics: number[][];
  cameraIntrinsics: number[][];
  showLine?: boolean;
  showCamPoint?: boolean;
  showCubePoint?: boolean;
  showImagePlaneIntersection?: boolean;
  cubePointLocation?: number[][];
}) {
  const [pointProj, setPointProj] = useState<number[][]>(
    projectPoints(pointWorld, egoExtrinsicMatrix, egoIntrinsicMatrix)
  );
  const [camPosition, setCamPosition] = useState<number[][]>(
    inv(cameraExtrinsics)
  );
  const [imagePlaneIntersection, setImagePlaneIntersection] = useState<
    number[][]
  >(
    calculateImagePlaneIntersection(
      cameraIntrinsics,
      cubePointLocation,
      camPosition
    )
  );
  const [projCamCenter, setProjCamCenter] = useState<number[][]>(
    projectPoints(
      [[camPosition[0][3]], [camPosition[1][3]], [camPosition[2][3]], [1]],
      egoExtrinsicMatrix,
      egoIntrinsicMatrix
    )
  );

  useEffect(() => {
    setPointProj(
      projectPoints(pointWorld, egoExtrinsicMatrix, egoIntrinsicMatrix)
    );
  }, [egoExtrinsicMatrix, egoIntrinsicMatrix]);

  useEffect(() => {
    setProjCamCenter(
      projectPoints(
        [[camPosition[0][3]], [camPosition[1][3]], [camPosition[2][3]], [1]],
        egoExtrinsicMatrix,
        egoIntrinsicMatrix
      )
    );
  }, [cameraExtrinsics, egoExtrinsicMatrix, egoIntrinsicMatrix]);

  useEffect(() => {
    setImagePlaneIntersection(
      calculateImagePlaneIntersection(
        cameraIntrinsics,
        cubePointLocation,
        camPosition
      )
    );
  }, [cameraIntrinsics, cubePointLocation, camPosition]);

  return (
    <>
      {showCubePoint && (
        <CubePrimitive
          extrinsicMatrix={egoExtrinsicMatrix}
          intrinsicMatrix={egoIntrinsicMatrix}
          cubeVerts={add(cubeVerts, cubePointLocation)}
          cubeFaces={cubeFaces}
          cubeColors={cubeFaces.map((_, i) => "#ff00ff")}
        />
      )}
      {showCamPoint && (
        <CubePrimitive
          extrinsicMatrix={egoExtrinsicMatrix}
          intrinsicMatrix={egoIntrinsicMatrix}
          cubeVerts={add(cubeVerts, [
            [camPosition[0][3]],
            [camPosition[1][3]],
            [camPosition[2][3]],
            [1],
          ])}
          cubeFaces={cubeFaces}
          cubeColors={cubeFaces.map((_, i) => "#ff00ff")}
        />
      )}
      {showLine && (
        <Line
          startX={pointProj[0][0]}
          startY={pointProj[1][0]}
          endX={projCamCenter[0][0]}
          endY={projCamCenter[1][0]}
          color={"#ff00ff"}
        />
      )}
      {showImagePlaneIntersection && (
        <CubePrimitive
          extrinsicMatrix={egoExtrinsicMatrix}
          intrinsicMatrix={egoIntrinsicMatrix}
          cubeVerts={add(cubeVerts, imagePlaneIntersection)}
          cubeFaces={cubeFaces}
          cubeColors={cubeFaces.map((_, i) => "#ff00ff")}
        />
      )}
    </>
  );
}
