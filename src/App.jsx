import { useEffect, useState } from "react";

function App() {
  const [term, setTerm] = useState("");
  const [options, setOptions] = useState([]);
  const [city, setCity] = useState(null);

  const getSearchOptions = async (value) => {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
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

    getForecast(city);
  };

  const getForecast = async (data) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org//data/2.5/forecast?lat=${
          data.lat
        }&lon=${data.lon}&units=metric&lang=en&appid=${
          import.meta.env.VITE_SOME_KEY
        }`
      );
      const weather = await response.json();

      console.log({ weather });
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

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>

        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from dropdown
        </p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            className="px-2 py-1 rounded-l-md border-2 border-white"
            type="text"
            placeholder="Enter city"
            value={term}
            onChange={onInputChange}
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option, index) => (
              <li key={option.name + "-" + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            search
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
