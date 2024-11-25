import init_vals from "./init_vals.json";
import { multiply, Matrix, inv } from "mathjs";

export function get_ego_extrinsics(progress: number): number[][] {
  if (progress < 100) {
    return ego_extrinsics_page_1(progress);
  }
  if (progress < 200) {
    return ego_extrinsics_page_1(100);
  }
  return ego_extrinsics_page_1(100);
}

export function get_cam_extrinsics(progress: number): number[][] {
  const init_cam_position = init_vals["init_cam_position"];
  const init_cam_rotation = init_vals["init_cam_rotation"];

  const new_inv_extrinsics = init_cam_rotation.map(
    (row: number[], i: number) => {
      return row.map((element, j) => {
        return element + j == 3 ? init_cam_position[i][0] : element;
      });
    }
  );

  console.log("extrinsics", new_inv_extrinsics);
  const new_extrinsics = inv(new_inv_extrinsics);

  return new_extrinsics as number[][];
}

function ego_extrinsics_page_1(progress: number): number[][] {
  const max_scale = 3;
  const max_angle = -1.5 * Math.PI;
  const theta: number = (progress / 100) * max_angle;
  const rotMat: number[][] = [
    [Math.cos(theta), Math.sin(theta), 0, 0],
    [-Math.sin(theta), Math.cos(theta), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];
  const scale = 1 + (progress / 100) * (max_scale - 1);
  let newPos: any = multiply(rotMat, init_vals["init_ego_position"]);
  newPos = multiply(scale, newPos);
  const init_rotation = init_vals["init_ego_rotation"];
  const newRotation: any = multiply(rotMat, init_rotation);

  const new_inv_extrinsics = newRotation.map((row: number[], i: number) => {
    return row.map((element, j) => {
      return element + j == 3 ? newPos[i][0] : element;
    });
  });

  const new_extrinsics = inv(new_inv_extrinsics);

  // remove final row
  // new_extrinsics.pop();

  return new_extrinsics as number[][];
}
