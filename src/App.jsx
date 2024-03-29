import Forecast from "./components/Forecast";
import Load from "./components/Load";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

function App() {
  const {
    forecast,
    options,
    term,
    onOptionSelect,
    onSubmit,
    onInputChange,
    load,
  } = useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 h-[100vh] w-full">
      {load ? (
        <Load />
      ) : forecast ? (
        <Forecast forecast={forecast} />
      ) : (
        <Search
          term={term}
          onInputChange={onInputChange}
          options={options}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
}

export default App;
