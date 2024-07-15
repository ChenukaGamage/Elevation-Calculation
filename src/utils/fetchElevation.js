import axios from "axios";

export async function fetchElevation(points, apiKey) {
  const elevations = [];
  console.log("points", points);

  // Prepare locations string
  const locations = points.map((p) => `${p[1]},${p[0]}`).join("|");
  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${apiKey}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      response.data.results.forEach((result) => {
        elevations.push(result.elevation);
      });
    } else {
      console.error(
        "Error fetching elevationnnnn:",
        response.data.error_message
      );
    }
  } catch (error) {
    console.error("Error fetching elevation:", error);
  }

  return elevations;
}
