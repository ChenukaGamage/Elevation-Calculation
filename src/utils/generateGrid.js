export function generateGrid(bbox, resolution) {
  const [minLon, minLat, maxLon, maxLat] = bbox;
  const gridPoints = [];

  for (let lon = minLon; lon <= maxLon; lon += resolution) {
    for (let lat = minLat; lat <= maxLat; lat += resolution) {
      gridPoints.push([lon, lat]);
    }
  }
  return gridPoints;
}
