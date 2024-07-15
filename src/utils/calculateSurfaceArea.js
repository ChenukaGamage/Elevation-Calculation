import * as d3 from "d3";
import { degToRad } from "./degToRad";
import { triangleArea } from "./triangleArea";
const lat = 7.006938;
const lon = 80.132599;
const elev = 2.090;


export function calculateSurfaceArea(lon, lat, elev) {
  const a = 6378137.0; // Semi-major axis (meters)
  const f = 1 / 298.257223563; // Flattening
  const e2 = 2 * f - f * f; // Eccentricity squared

  const latRad = lat.map(degToRad);
  const lonRad = lon.map(degToRad);

  const x = [];
  const y = [];
  const z = [];

  for (let i = 0; i < lat.length; i++) {
    const N = a / Math.sqrt(1 - e2 * Math.sin(latRad[i]) ** 2);
    x.push((N + elev[i]) * Math.cos(latRad[i]) * Math.cos(lonRad[i]));
    y.push((N + elev[i]) * Math.cos(latRad[i]) * Math.sin(lonRad[i]));
    z.push(((1 - e2) * N + elev[i]) * Math.sin(latRad[i]));
  }

  const points = x.map((x, i) => [x, y[i]]);
  const delaunay = d3.Delaunay.from(points);
  const triangles = delaunay.triangles;

  let totalArea = 0;

  for (let i = 0; i < triangles.length; i += 3) {
    const p1 = triangles[i];
    const p2 = triangles[i + 1];
    const p3 = triangles[i + 2];

    const xTri = [x[p1], x[p2], x[p3]];
    const yTri = [y[p1], y[p2], y[p3]];
    const zTri = [z[p1], z[p2], z[p3]];

    totalArea += triangleArea(xTri, yTri, zTri);
  }

  return totalArea;
}
