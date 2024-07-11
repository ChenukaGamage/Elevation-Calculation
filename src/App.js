import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import * as turf from "@turf/turf";
import { degToRad } from "./utils/degToRad";
import { fetchElevation } from "./utils/fetchElevation";
import { generateGrid } from "./utils/generateGrid";
import { isPointInPolygon } from "./utils/isPointInPolygon";
import { calculateSurfaceArea } from "./utils/calculateSurfaceArea";

function App() {
  const [gridPointsInside, setGridPointsInside] = useState([]);
  const [gridPointsOutside, setGridPointsOutside] = useState([]);
  const [totalArea, setTotalArea] = useState(null);

  const boundaryLat = [7.006938, 7.257183, 7.219517, 7.079452, 7.057741];
  const boundaryLon = [80.132599, 80.281552, 80.756713, 80.752374, 80.451872];
  const boundaryPolygon = boundaryLon.map((lon, i) => [lon, boundaryLat[i]]);

  const apiKey = "AIzaSyD4TgCq6fHybwf9Ar4t2pi0tE7l6PDN7pg"; // Replace with your actual API key

  useEffect(() => {
    const bbox = turf.bbox(
      turf.polygon([[...boundaryPolygon, boundaryPolygon[0]]])
    );
    const [minLon, minLat, maxLon, maxLat] = bbox;

    let totalDistance = 0;
    for (let i = 0; i < boundaryPolygon.length - 1; i++) {
      totalDistance += turf.distance(
        turf.point(boundaryPolygon[i]),
        turf.point(boundaryPolygon[i + 1])
      );
    }
    const averageDistance = totalDistance / (boundaryPolygon.length - 1);
    let baseResolution = averageDistance / 2;
    // while (baseResolution > 0 ){
    //   baseResolution /= 2;
    // }

    console.log(averageDistance);
    let gridPoints = generateGrid(bbox, baseResolution);
    let insidePoints = gridPoints.filter((point) =>
      isPointInPolygon(point, boundaryPolygon)
    );
    let outsidePoints = gridPoints.filter(
      (point) => !isPointInPolygon(point, boundaryPolygon)
    );

    if (insidePoints.length < 8) {
      baseResolution = baseResolution / 4;
      gridPoints = generateGrid(bbox, baseResolution);
      insidePoints = gridPoints.filter((point) =>
        isPointInPolygon(point, boundaryPolygon)
      );
      outsidePoints = gridPoints.filter(
        (point) => !isPointInPolygon(point, boundaryPolygon)
      );
    }

    // setGridPointsInside(insidePoints);
    // setGridPointsOutside(outsidePoints);

    async function fetchAndCalculateArea() {
      // const elevations = await fetchElevation(insidePoints, apiKey);
      const lon = insidePoints.map((p) => p[0]);
      const lat = insidePoints.map((p) => p[1]);
      // const area = calculateSurfaceArea(lon, lat, elevations);
      // setTotalArea(area);
    }

    fetchAndCalculateArea();
  }, [apiKey, boundaryPolygon]);

  // useEffect(() => {
  //   const svg = d3.select("#map").attr("width", 800).attr("height", 600);

  //   const projection = d3
  //     .geoMercator()
  //     .center([
  //       (boundaryLon[0] + boundaryLon[2]) / 2,
  //       (boundaryLat[0] + boundaryLat[2]) / 2,
  //     ])
  //     .scale(10000)
  //     .translate([400, 300]);

  //   const path = d3.geoPath().projection(projection);

  //   svg
  //     .append("path")
  //     .datum(turf.polygon([[...boundaryPolygon, boundaryPolygon[0]]]))
  //     .attr("d", path)
  //     .attr("class", "boundary")
  //     .style("stroke", "black")
  //     .style("stroke-width", 2)
  //     .style("fill", "none");

  //   svg
  //     .selectAll(".inside")
  //     .data(gridPointsInside.map((point) => turf.point(point)))
  //     .enter()
  //     .append("circle")
  //     .attr("class", "inside")
  //     .attr("cx", (d) => projection(d.geometry.coordinates)[0])
  //     .attr("cy", (d) => projection(d.geometry.coordinates)[1])
  //     .attr("r", 2)
  //     .style("fill", "green");

  //   svg
  //     .selectAll(".outside")
  //     .data(gridPointsOutside.map((point) => turf.point(point)))
  //     .enter()
  //     .append("circle")
  //     .attr("class", "outside")
  //     .attr("cx", (d) => projection(d.geometry.coordinates)[0])
  //     .attr("cy", (d) => projection(d.geometry.coordinates)[1])
  //     .attr("r", 2)
  //     .style("fill", "red");
  // }, [gridPointsInside, gridPointsOutside, boundaryPolygon]);

  return (
    <div className="App">
      <h1>Boundary Grid and Surface Area</h1>
      <svg id="map"></svg>
      {totalArea && <p>Total Surface Area: {totalArea} square meters</p>}
    </div>
  );
}

export default App;
