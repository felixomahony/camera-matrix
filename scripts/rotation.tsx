import { multiply, Matrix, inv } from "mathjs";

export function getCameraPoints(rotationMatrix: number[][]) {
  // rotation matrix is type number[][]

  const centre = [[0], [0], [0], [1]];
  const point1 = [[0.6], [0.45], [-2], [1]];
  const point2 = [[0.6], [-0.45], [-2], [1]];
  const point3 = [[-0.6], [-0.45], [-2], [1]];
  const point4 = [[-0.6], [0.45], [-2], [1]];

  // Apply rotation matrix to all points
  const centre_rot = multiply(rotationMatrix, centre);
  const point1_rot = multiply(rotationMatrix, point1);
  const point2_rot = multiply(rotationMatrix, point2);
  const point3_rot = multiply(rotationMatrix, point3);
  const point4_rot = multiply(rotationMatrix, point4);

  return [centre_rot, point1_rot, point2_rot, point3_rot, point4_rot];
}

export function projectPoints(
  points: number[][],
  extrinisicMatrix: number[][],
  intrinsicMatrix: number[][]
) {
  // points is type number[][] with 4 rows and n columns
  // extrinsicMatrix is type number[][] with 3 rows and 4 columns
  // intrinsicMatrix is type number[][] with 3 rows and 3 columns

  const pointsCamera: any = multiply(extrinisicMatrix, points);
  pointsCamera[2] = pointsCamera[2].map((element: number) => {
    return -element;
  });
  pointsCamera.pop();
  const pointsImage: any = multiply(intrinsicMatrix, pointsCamera);

  const pointsNormalized = pointsImage.map((row: number[], row_idx: number) => {
    return row.map((element, i) =>
      row_idx == 2 ? element : element / pointsImage[2][i]
    );
  });

  return pointsNormalized as number[][];

  // return pointsNormalized_number;
}

export function rotateCamera(cameraExtrinsics: number[][], points: number[][]) {
  // get inverse of extrinsics
  const invExtrinsics = inv(cameraExtrinsics);
  const camera_rotated: any = multiply(invExtrinsics, points);
  return camera_rotated as number[][];
}
