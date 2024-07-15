import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as turf from "@turf/turf";
import { degToRad } from "./utils/degToRad";
import { fetchElevation } from "./utils/fetchElevation";
import { generateGrid } from "./utils/generateGrid";
import { isPointInPolygon } from "./utils/isPointInPolygon";
import { calculateSurfaceArea } from "./utils/calculateSurfaceArea";

function App() {
  const [totalArea, setTotalArea] = useState(null);

  const boundaryLat = [
    37.419660834181826, 37.41983897419518, 37.41929470053686,
    37.419294700536843,
  ];
  const boundaryLon = [
    -122.08463788032533, -122.08439011126758, -122.0843904465437,
    -122.0843904465454,
  ];
  const boundaryPolygon = boundaryLon.map((lon, i) => [lon, boundaryLat[i]]);

  const apiKey = "AIzaSyAvDuUmTTwxFnWEE5XGXxjbGVR0DGGIxkU"; // Replace with your actual API key

  useEffect(() => {
    console.log(boundaryPolygon);
    async function fetchAndCalculateArea() {
      // const elevations =  fetchElevation(boundaryPolygon, apiKey);
      const elevations = [
        4.135900974273682, 4.195455074310303, 4.487160205841064,
        4.48716020584108,
      ];
      const lon = boundaryPolygon.map((p) => p[0]);
      const lat = boundaryPolygon.map((p) => p[1]);
      const area = calculateSurfaceArea(lon, lat, elevations);
      setTotalArea(area);
    }

    fetchAndCalculateArea();
  }, [apiKey, boundaryPolygon]);

  return (
    <div className="App">
      <h1>Boundary Grid and Surface Area</h1>
      <svg id="map"></svg>
      {totalArea && (
        <p>Total Surface Area: {totalArea / 25.29285264} perches</p>
      )}
    </div>
  );
}
export default App;

// function App() {
//   const lat = [
//     37.419660834181826, 37.41983897419518, 37.41929470053686, 37.419294700536843];
//   const lon = [
//     -122.08463788032533, -122.08439011126758, -122.0843904465437,
//     -122.0843904465454];
//     // fetchElevation();
// // const lat = [
// //   6.271011180086728, 6.270787555901456, 6.26990938846365, 6.269669433536478,
// //   6.270147010386878,
// // ];

// // const lon = [
// //   80.06681475788355, 80.06618712097406, 80.06601747125387, 80.06677586585283,
// //   80.06720367819071,
// // ];

//   const elev = [
//     4.135900974273682, 4.195455074310303, 4.487160205841064, 4.487160205841080];

//   const totArea = calculateSurfaceArea(lon, lat, elev);

//   return (
//     <div className="App">
//       <h1>Boundary Grid and Surface Area</h1>
//       {totArea && (
//         <p>Total Surface Area: {totArea / 25.29285264} perches </p>
//       )}
//     </div>
//   );
// }

// export default App;
