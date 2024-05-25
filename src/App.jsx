import Forecast from "./components/Forecast";
import Load from "./components/Load";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";
import { useEffect, useState } from "react";

function App() {
  const {
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    load,
  } = useForecast();

  const [data, setData] = useState(null);
  const [tempUnits, setTempUnits] = useState("metric");

  useEffect(() => {
    onSubmit(setData, tempUnits);
  }, [tempUnits]);

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 h-[100vh] w-full">
      {load ? (
        <Load />
      ) : data ? (
        <Forecast
          forecast={data}
          currentUnit={tempUnits}
          setTempUnits={setTempUnits}
          setData={setData}
        />
      ) : (
        <Search
          term={term}
          onInputChange={onInputChange}
          options={options}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit(setData, tempUnits)}
        />
      )}
    </main>
  );
}

export default App;
