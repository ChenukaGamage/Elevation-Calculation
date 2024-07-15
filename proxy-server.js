const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get("/api/elevation", async (req, res) => {
  try {
    const { locations, key } = req.query;
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${key}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching elevation data");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
