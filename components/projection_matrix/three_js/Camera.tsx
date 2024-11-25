import { projectPoints, rotateCamera } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import Line from "./Line";

const camWorld = [
  [-1, 1, 1, -1, 0],
  [0.5, 0.5, -0.5, -0.5, 0],
  [-2, -2, -2, -2, 0],
  [1, 1, 1, 1, 1],
];

export default function Camera({
  egoEtrinsicMatrix,
  egoIntrinsicMatrix,
  camExtrinsicMatrix,
}: {
  egoEtrinsicMatrix: number[][];
  egoIntrinsicMatrix: number[][];
  camExtrinsicMatrix: number[][];
}) {
  const [camCam, setCamCam] = useState<number[][]>(
    rotateCamera(camExtrinsicMatrix, camWorld)
  );

  const [camEgo, setCamEgo] = useState<number[][]>(
    projectPoints(
      rotateCamera(camExtrinsicMatrix, camWorld),
      egoEtrinsicMatrix,
      egoIntrinsicMatrix
    )
  );

  useEffect(() => {
    setCamEgo(projectPoints(camCam, egoEtrinsicMatrix, egoIntrinsicMatrix));
  }, [egoEtrinsicMatrix, egoIntrinsicMatrix]);

  useEffect(() => {
    const cC = rotateCamera(camExtrinsicMatrix, camWorld);
    setCamCam(cC);
  }, [camExtrinsicMatrix]);

  console.log("camEgo", camEgo);

  if (camEgo === null) {
    return null;
  }

  return (
    <>
      <Line
        startX={camEgo[0][0]}
        startY={camEgo[1][0]}
        endX={camEgo[0][1]}
        endY={camEgo[1][1]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][1]}
        startY={camEgo[1][1]}
        endX={camEgo[0][2]}
        endY={camEgo[1][2]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][2]}
        startY={camEgo[1][2]}
        endX={camEgo[0][3]}
        endY={camEgo[1][3]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][3]}
        startY={camEgo[1][3]}
        endX={camEgo[0][0]}
        endY={camEgo[1][0]}
        color="#fff"
      />

      <Line
        startX={camEgo[0][0]}
        startY={camEgo[1][0]}
        endX={camEgo[0][4]}
        endY={camEgo[1][4]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][1]}
        startY={camEgo[1][1]}
        endX={camEgo[0][4]}
        endY={camEgo[1][4]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][2]}
        startY={camEgo[1][2]}
        endX={camEgo[0][4]}
        endY={camEgo[1][4]}
        color="#fff"
      />
      <Line
        startX={camEgo[0][3]}
        startY={camEgo[1][3]}
        endX={camEgo[0][4]}
        endY={camEgo[1][4]}
        color="#fff"
      />
    </>
  );
}
