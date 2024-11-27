import { projectPoints, rotateCamera } from "../../../scripts/rotation";
import { useEffect, useState } from "react";
import Line from "./Line";
import Quadrelateral from "./Quadrelateral";

export default function Camera({
  egoEtrinsicMatrix,
  egoIntrinsicMatrix,
  camExtrinsicMatrix,
  camIntrinsicMatrix,
  showPlane = false,
}: {
  egoEtrinsicMatrix: number[][];
  egoIntrinsicMatrix: number[][];
  camExtrinsicMatrix: number[][];
  camIntrinsicMatrix: number[][];
  showPlane?: boolean;
}) {
  const getCamCam = (intrinsics: number[][]) => {
    const focalX = intrinsics[0][0];
    // const focalY = intrinsics[1][1];
    const cx = intrinsics[0][2] / 1000;
    const cy = intrinsics[1][2] / 1000;

    return [
      [-0.96 - cx, 0.96 - cx, 0.96 - cx, -0.96 - cx, 0],
      [0.72 - cy, 0.72 - cy, -0.72 - cy, -0.72 - cy, 0],
      [-focalX / 1000, -focalX / 1000, -focalX / 1000, -focalX / 1000, 0],
      [1, 1, 1, 1, 1],
    ];
  };

  const [camCam, setCamCam] = useState(getCamCam(camIntrinsicMatrix));

  const [camWorld, setCamWorld] = useState<number[][]>(
    rotateCamera(camExtrinsicMatrix, camCam)
  );

  const [camEgo, setCamEgo] = useState<number[][]>(
    projectPoints(camWorld, egoEtrinsicMatrix, egoIntrinsicMatrix)
  );

  useEffect(() => {
    setCamEgo(projectPoints(camWorld, egoEtrinsicMatrix, egoIntrinsicMatrix));
  }, [egoEtrinsicMatrix, egoIntrinsicMatrix, camWorld]);

  useEffect(() => {
    const cW = rotateCamera(camExtrinsicMatrix, camCam);
    setCamWorld(cW);
  }, [camExtrinsicMatrix, camCam]);

  useEffect(() => {
    setCamCam(getCamCam(camIntrinsicMatrix));
  }, [camIntrinsicMatrix]);

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
      {showPlane && (
        <Quadrelateral
          projectedVerts={camEgo}
          idxes={[0, 1, 2, 3]}
          color="#99f6e4"
        />
      )}
    </>
  );
}
