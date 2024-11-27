import { get } from "http";

export function get_visibility(progress: number): any {
  return {
    decomposed_cam: get_decomposed_cam(progress),
    decomposed_orig: get_decomposed_orig(progress),
    grid_cam: get_grid_cam(progress),
    axis_cam: get_axis_cam(progress),
    axis_orig: get_axis_orig(progress),
    camera_plane: get_camera_plane(progress),
    cube_corner: get_cube_corner(progress),
    camera: get_camera(progress),
  };
}

function get_decomposed_cam(progress: number): any {
  return progress > 300 && progress < 400;
}

function get_decomposed_orig(progress: number): any {
  return progress > 700 && progress < 900;
}

function get_grid_cam(progress: number): any {
  return progress > 200 && progress < 700;
}

function get_axis_cam(progress: number): any {
  return progress > 200 && progress < 900;
}

function get_axis_orig(progress: number): any {
  return progress > 400 && progress < 900;
}

function get_camera_plane(progress: number): any {
  return progress > 900;
}

function get_cube_corner(progress: number): any {
  return progress > 900;
}

function get_camera(progress: number): any {
  return true;
}
