import { useEffect, useState } from "react";

const BASE_URL = "http://api.openweathermap.org";

const useForecast = () => {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [load, setLoad] = useState(false);

  const getSearchOptions = async (value) => {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
        import.meta.env.VITE_SOME_KEY
      }`
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

  const onSubmit = () => {
    if (!city) return;
    setLoad(true);
    getForecast(city);
  };

  const getForecast = async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${city.lat}&lon=${
          city.lon
        }&units=metric&lang=en&appid=${import.meta.env.VITE_SOME_KEY}`
      );
      const data = await response.json();
      const forecastData = { ...data.city, list: data.list.slice(0, 16) };
      setForecast(forecastData);
      setLoad(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getImperialForecast = async (city) => {
    try {
      const response = await fetch(
        `${BASE_URL}/data/2.5/forecast?lat=${city.lat}&lon=${
          city.lon
        }&units=imperial&lang=en&appid=${import.meta.env.VITE_SOME_KEY}`
      );
      const data = await response.json();
      const forecastData = { ...data.city, list: data.list.slice(0, 16) };
      setForecast(forecastData);
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
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    load,
  };
};
export default useForecast;
