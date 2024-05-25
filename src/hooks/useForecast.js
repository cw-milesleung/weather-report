import { useEffect, useState } from "react";
import encryptedAPIKey from "./encryptedAPIKey";

const BASE_URL = "http://api.openweathermap.org";

const useForecast = () => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(null);
  const [load, setLoad] = useState(false);
  const weatherAPIKey = encryptedAPIKey();

  const getSearchOptions = async (value) => {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${weatherAPIKey}`
    );
    const data = await response.json();
    setOptions(data);
  };

  const onInputChange = (e) => {
    const { value } = e.target;
    if (value.trim() === "") return;
    setTerm(value);
    getSearchOptions(value);
  };

  const onSubmit = (setData, unit) => {
    if (!city) return;
    setLoad(true);
    getForecast(city, setData, unit);
  };

  const getToggleMetric = (coord, setData) => {
    getForecast(coord, setData, "metric");
  };

  const getToggleImperial = (coord, setData) => {
    getForecast(coord, setData, "imperial");
  };

  const getForecast = async (coord, setData, unit) => {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=${unit}&lang=en&appid=${weatherAPIKey}`
      );
      const data = await response.json();
      const forecastData = { ...data.city, list: data.list.slice(0, 16) };

      setData(forecastData);
      setLoad(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onOptionSelect = (option) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return {
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    load,
    getToggleMetric,
    getToggleImperial,
  };
};

export default useForecast;
