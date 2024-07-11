export function generateGrid(bbox, resolution) {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const gridPoints = [];

  // Ensure resolution is appropriate
  if (resolution <= 0 || resolution > (maxLon - minLon) || resolution > (maxLat - minLat)) {
    console.error("Resolution is too large or invalid for the given bounding box.");
    return gridPoints;
  }

  // Generate grid points
  for (let lon = minLon; lon <= maxLon; lon += resolution) {
    for (let lat = minLat; lat <= maxLat; lat += resolution) {
      gridPoints.push([lon, lat]);
    }
  }

  return gridPoints;
}
