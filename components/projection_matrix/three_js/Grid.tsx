import { projectPoints } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import Line from "./Line";

const gridIdxes: number[] = [
  -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

const gridIdxesHorizontalStart = [
  gridIdxes,
  gridIdxes.map((_, __) => -10),
  gridIdxes.map((_, __) => -1),
  gridIdxes.map((_, __) => 1),
];

// const gridIdxesHorizontalStart = [[1], [-1], [-1], [1]];

const gridIdxesHorizontalEnd = [
  gridIdxes,
  gridIdxes.map((_, i) => 10),
  gridIdxes.map((_, i) => -1),
  gridIdxes.map((_, i) => 1),
];

// const gridIdxesHorizontalEnd = [[1], [1], [-1], [1]];

const gridIdxesVerticalStart = [
  gridIdxes.map((_, i) => -10),
  gridIdxes,
  gridIdxes.map((_, i) => -1),
  gridIdxes.map((_, i) => 1),
];

// const gridIdxesVerticalStart = [[-10], [0], [-1], [1]];

const gridIdxesVerticalEnd = [
  gridIdxes.map((_, i) => 10),
  gridIdxes,
  gridIdxes.map((_, i) => -1),
  gridIdxes.map((_, i) => 1),
];

const gridColor = "#064e3b";

// const gridIdxesVerticalEnd = [[10], [0], [-1], [1]];

export default function Cube({
  extrinsicMatrix,
  intrinsicMatrix,
}: {
  extrinsicMatrix: number[][];
  intrinsicMatrix: number[][];
}) {
  const [projGHS, setProjGHS] = useState<number[][]>(
    projectPoints(gridIdxesHorizontalStart, extrinsicMatrix, intrinsicMatrix)
  );
  const [projGHE, setProjGHE] = useState<number[][]>(
    projectPoints(gridIdxesHorizontalEnd, extrinsicMatrix, intrinsicMatrix)
  );
  const [projGVS, setProjGVS] = useState<number[][]>(
    projectPoints(gridIdxesVerticalStart, extrinsicMatrix, intrinsicMatrix)
  );
  const [projGVE, setProjGVE] = useState<number[][]>(
    projectPoints(gridIdxesVerticalEnd, extrinsicMatrix, intrinsicMatrix)
  );

  useEffect(() => {
    setProjGHS(
      projectPoints(gridIdxesHorizontalStart, extrinsicMatrix, intrinsicMatrix)
    );
    setProjGHE(
      projectPoints(gridIdxesHorizontalEnd, extrinsicMatrix, intrinsicMatrix)
    );
    setProjGVS(
      projectPoints(gridIdxesVerticalStart, extrinsicMatrix, intrinsicMatrix)
    );
    setProjGVE(
      projectPoints(gridIdxesVerticalEnd, extrinsicMatrix, intrinsicMatrix)
    );
  }, [extrinsicMatrix, intrinsicMatrix]);

  if (!projGHS || projGHS.length < 3 || projGHS[0].length < 2) {
    return null;
  }

  return (
    <>
      {projGHS[0].map((_, i) => (
        <Line
          key={i}
          startX={projGHS[0][i]}
          startY={projGHS[1][i]}
          endX={projGHE[0][i]}
          endY={projGHE[1][i]}
          color={gridColor}
        />
      ))}
      {projGVS[0].map((_, i) => (
        <Line
          key={i + 100}
          startX={projGVS[0][i]}
          startY={projGVS[1][i]}
          endX={projGVE[0][i]}
          endY={projGVE[1][i]}
          color={gridColor}
        />
      ))}
    </>
  );
}
