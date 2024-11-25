export function get_axis_visibility(progress: number): boolean {
  if (progress < 100) {
    return false;
  }
  if (progress < 200) {
    return axis_visibility_page_2(progress);
  }
  return true;
}

function axis_visibility_page_2(progress: number): boolean {
  return progress > 120;
}
