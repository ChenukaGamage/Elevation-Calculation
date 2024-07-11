import * as turf from "@turf/turf";

export function isPointInPolygon(point, polygon) {
  return turf.booleanPointInPolygon(
    turf.point(point),
    turf.polygon([[...polygon, polygon[0]]])
  );
}
