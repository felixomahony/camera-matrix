import {
  BufferGeometry,
  Float32BufferAttribute,
  BufferAttribute,
  DoubleSide,
} from "three";

export default function Quadrelateral({
  projectedVerts,
  idxes,
  color,
}: {
  projectedVerts: number[][];
  idxes: number[];
  color: string;
}) {
  if (
    !projectedVerts ||
    projectedVerts.length < 3 ||
    projectedVerts[0].length < 4
  ) {
    console.error("Invalid projectedVerts", projectedVerts);
    return null;
  }

  const vertices = new Float32Array([
    projectedVerts[0][idxes[0]],
    projectedVerts[1][idxes[0]],
    1.0,
    projectedVerts[0][idxes[1]],
    projectedVerts[1][idxes[1]],
    1.0,
    projectedVerts[0][idxes[2]],
    projectedVerts[1][idxes[2]],
    1.0,
    projectedVerts[0][idxes[3]],
    projectedVerts[1][idxes[3]],
    1.0,
  ]);

  const indices = new Uint16Array([
    0,
    1,
    2, // First triangle
    0,
    2,
    3, // Second triangle
  ]);

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(new BufferAttribute(indices, 1));

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial color={color} side={DoubleSide} />
    </mesh>
  );
}
