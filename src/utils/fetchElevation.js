import axios from "axios";

export async function fetchElevation(points, apiKey) {
  const elevations = [];
  const batchSize = 100;

  for (let i = 0; i < points.length; i += batchSize) {
    const batch = points.slice(i, i + batchSize);
    const locations = batch.map((p) => `${p[1]},${p[0]}`).join("|");
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      if (response.data.status === "OK") {
        response.data.results.forEach((result) => {
          elevations.push(result.elevation);
        });
      } else {
        console.error("Error fetching elevation:", response.data.error_message);
      }
    } catch (error) {
      console.error("Error fetching elevation:", error);
    }
  }

  return elevations;
}
