import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const PORT = 8000;

const app = express();
const apiKey = process.env.API_KEY;
app.use(cors());

app.get("/", (req, res) => {
  res.json("hi");
});

app.get("/weather", (req, res) => {
  const getLatitude = req.query.lat;
  const getLongitude = req.query.lon;

  const options = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${getLatitude}&lon=${getLongitude}&appid=${apiKey}`,
  };

  axios
    .request(options)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
