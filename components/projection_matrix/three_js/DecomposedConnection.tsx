import { projectPoints, rotateCamera } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import Line from "./Line";
import { inv, multiply } from "mathjs";
import { round } from "mathjs";

export default function DecomposedConnection({
  egoEtrinsicMatrix,
  egoIntrinsicMatrix,
  camExtrinsicMatrix,
  camIntrinsicMatrix,
  camCoords = false,
  ord,
}: {
  egoEtrinsicMatrix: number[][];
  egoIntrinsicMatrix: number[][];
  camExtrinsicMatrix: number[][];
  camIntrinsicMatrix: number[][];
  camCoords?: boolean;
  ord: string;
}) {
  function getGlobalPositions(
    camExtrinsics: number[][],
    camCoords: boolean
  ): number[][] {
    if (camCoords) {
      const originPosition = camExtrinsics.map((row, idx) =>
        idx === 3 ? [1] : [row[3]]
      );
      const cameraPositions = [
        [0, originPosition[0][0], originPosition[0][0], originPosition[0][0]],
        [0, 0, originPosition[1][0], originPosition[1][0]],
        [0, 0, 0, originPosition[2][0]],
        [1, 1, 1, 1],
      ];
      const globalPositions = multiply(
        inv(camExtrinsics),
        cameraPositions
      ) as any;
      return globalPositions as number[][];
    } else {
      const cameraPosition = inv(camExtrinsics).map((row) => row[3]);
      const globalPositions = [
        [0, cameraPosition[0], cameraPosition[0], cameraPosition[0]],
        [0, 0, cameraPosition[1], cameraPosition[1]],
        [0, 0, 0, cameraPosition[2]],
        [1, 1, 1, 1],
      ];
      return globalPositions;
    }
  }

  const [globalPositions, setGlobalPositions] = useState<number[][]>(
    getGlobalPositions(camExtrinsicMatrix, camCoords)
  );

  const [projectedPositions, setProjectedPositions] = useState<number[][]>(
    projectPoints(globalPositions, egoEtrinsicMatrix, egoIntrinsicMatrix)
  );

  useEffect(() => {
    const globalPositions = getGlobalPositions(camExtrinsicMatrix, camCoords);
    setGlobalPositions(globalPositions);
    setProjectedPositions(
      projectPoints(globalPositions, egoEtrinsicMatrix, egoIntrinsicMatrix)
    );
  }, [camExtrinsicMatrix, egoEtrinsicMatrix]);

  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [endX, setEndX] = useState<number>(0);
  const [endY, setEndY] = useState<number>(0);

  useEffect(() => {
    setStartX(projectedPositions[0][1]);
    setStartY(projectedPositions[1][1]);
    setEndX(projectedPositions[0][2]);
    setEndY(projectedPositions[1][2]);
  });

  console.log("projectedPositions", projectedPositions);
  return (
    <>
      <Line
        startX={projectedPositions[0][0]}
        startY={projectedPositions[1][0]}
        endX={projectedPositions[0][1]}
        endY={projectedPositions[1][1]}
        color="#f00"
      />
      <Line
        startX={startX}
        startY={startY}
        endX={endX}
        endY={endY}
        color="#0f0"
      />
      <Line
        startX={projectedPositions[0][2]}
        startY={projectedPositions[1][2]}
        endX={projectedPositions[0][3]}
        endY={projectedPositions[1][3]}
        color="#00f"
      />
    </>
  );
}
