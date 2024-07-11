export function triangleArea(x, y, z) {
  const AB = [x[1] - x[0], y[1] - y[0], z[1] - z[0]];
  const AC = [x[2] - x[0], y[2] - y[0], z[2] - z[0]];

  const crossProduct = [
    AB[1] * AC[2] - AB[2] * AC[1],
    AB[2] * AC[0] - AB[0] * AC[2],
    AB[0] * AC[1] - AB[1] * AC[0],
  ];

  const area =
    0.5 * Math.sqrt(crossProduct.reduce((sum, val) => sum + val ** 2, 0));
  if (isNaN(area)) {
    throw new Error("Invalid triangle, area calculation failed.");
  }
  return area;
}
