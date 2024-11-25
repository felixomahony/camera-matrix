import * as THREE from "three";
import { Line } from "@react-three/drei";

export default function LineComponent({
  startX,
  startY,
  endX,
  endY,
  color,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
}) {
  const lineElem = [
    new THREE.Vector3(startX, startY, 0.0),
    new THREE.Vector3(endX, endY, 0.0),
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(lineElem);

  return (
    <line>
      <bufferGeometry attach="geometry" {...lineGeometry} />
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
}
