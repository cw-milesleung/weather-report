import { useEffect, useState } from "react";
import { fetchAvailableWeather } from "../http";

const Search = () => {
  const [place, setPlaces] = useState("");
  const onInputChange = (e) => {
    setPlaces(e.target.value);
  };

  const onInputSubmit = () => {
    if (place.trim() === "") return;
  };

  const [isFetching, setIsFetching] = useState(false);
  const [availableWeather, setAvailableWeather] = useState("");
  const [error, setError] = useState("");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    async function fetchWeather() {
      setIsFetching(true);
      try {
        const weather = await fetchAvailableWeather(latitude, longitude);
        setAvailableWeather(weather);
        setIsFetching(false);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch weather, Please try again later.",
        });
        setIsFetching(false);
      }
    }
    fetchWeather();
  }, [latitude, longitude]);

  // const handleSubmit = () => {};

  const handleLatChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLonChange = (e) => {
    setLongitude(e.target.value);
  };

  console.log(availableWeather);
  return (
    <>
      {/* <div>
        <input
          type="text"
          placeholder="Enter location"
          value={place}
          onChange={onInputChange}
        />
        <button onClick={onInputSubmit}>Search</button>
      </div> */}
      <form>
        <label>
          Latitude:
          <input type="number" value={latitude} onChange={handleLatChange} />
        </label>
        <br />
        <label>
          Longitude:
          <input type="number" value={longitude} onChange={handleLonChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default Search;
