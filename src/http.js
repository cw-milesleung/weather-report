import axios from "axios";

export function fetchAvailableWeather(lat, lon) {
  const options = {
    method: "GET",
    url: "http://localhost:8000/weather",
    // params: { lat: 44.34, lon: 10.99 },
    params: { lat: lat, lon: lon },
  };

  const response = axios.request(options).then((response) => {
    if (response.status !== 200)
      throw new ErrorEvent("Failed to fetch weather");

    return response.data.name;
  });

  return response;
}
