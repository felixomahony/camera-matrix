import CubePrimitive from "./CubePrimitive";

const cubeVerts = [
  [1, 1, 1, 1, -1, -1, -1, -1],
  [1, 1, -1, -1, 1, 1, -1, -1],
  [1, -1, 1, -1, 1, -1, 1, -1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

const cubeFaces = [
  [0, 1, 3, 2], // x = 1
  [4, 5, 7, 6], // x = -1
  [0, 1, 5, 4], // y = 1
  [2, 3, 7, 6], // y = -1
  [0, 4, 6, 2], // z = 1
];

const cubeColors = ["#34d399", "#059669", "#0f766e", "#99f6e4", "#f0fdfa"];

export default function Cube({
  extrinsicMatrix,
  intrinsicMatrix,
}: {
  extrinsicMatrix: number[][];
  intrinsicMatrix: number[][];
}) {
  return (
    <CubePrimitive
      extrinsicMatrix={extrinsicMatrix}
      intrinsicMatrix={intrinsicMatrix}
      cubeVerts={cubeVerts}
      cubeFaces={cubeFaces}
      cubeColors={cubeColors}
    />
  );
}
