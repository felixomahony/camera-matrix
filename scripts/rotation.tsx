import { multiply, Matrix, inv } from "mathjs";
import * as THREE from "three";

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

export function toExtrinsics(
  roll: number,
  pitch: number,
  yaw: number,
  tx: number,
  ty: number,
  tz: number
): number[][] {
  const euler = new THREE.Euler(roll, pitch, yaw);
  const matrix = new THREE.Matrix4().makeRotationFromEuler(euler).transpose();
  const extrinsics = inv([
    [matrix.elements[0], matrix.elements[1], matrix.elements[2], tx],
    [matrix.elements[4], matrix.elements[5], matrix.elements[6], ty],
    [matrix.elements[8], matrix.elements[9], matrix.elements[10], tz],
    [0, 0, 0, 1],
  ]);
  return extrinsics;
}

export function getT(extrinsics: number[][]): number[] {
  return extrinsics.map((row) => row[3]);
}

export function invertEuler(euler: number[]): number[] {
  const eulerObj = new THREE.Euler(euler[0], euler[1], euler[2]);
  const invEulerObj = new THREE.Euler().setFromQuaternion(
    new THREE.Quaternion().setFromEuler(eulerObj).invert()
  );
  return [invEulerObj.x, invEulerObj.y, invEulerObj.z];
}

export function invertTranslation(
  translation: number[],
  euler: number[]
): number[] {
  const eulerObj = new THREE.Euler(euler[0], euler[1], euler[2]);
  const invTranslation = new THREE.Vector3(
    translation[0],
    translation[1],
    translation[2]
  )
    .applyEuler(eulerObj)
    .negate();
  return [invTranslation.x, invTranslation.y, invTranslation.z];
}
