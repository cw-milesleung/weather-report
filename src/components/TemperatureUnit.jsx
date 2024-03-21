import useForecast from "../hooks/useForecast";

const TemperatureUnit = ({
  tempUnits,
  handleTempImperial,
  handleTempMetric,
  coord,
}) => {
  const { getToggleMetric, getToggleImperial } = useForecast();

  const handleToggleImperial = () => {
    getToggleImperial(coord);
    handleTempImperial();
  };
  const handleToggleMetric = () => {
    getToggleMetric(coord);
    handleTempMetric();
  };

  return (
    <p className="text-sm">
      {tempUnits === "metric" && (
        <>
          <span className="font-bold">
            <u>
              <sup className="text-xs">&deg;</sup>C
            </u>
          </span>
          <span> | </span>
          <span className="font cursor-pointer" onClick={handleToggleImperial}>
            <sup className="text-xs">&deg;</sup>F
          </span>
        </>
      )}
      {tempUnits === "imperial" && (
        <>
          <span className="font cursor-pointer" onClick={handleToggleMetric}>
            <sup className="text-xs">&deg;</sup>C
          </span>
          <span> | </span>
          <span className="font-bold">
            <u>
              <sup className="text-xs">&deg;</sup>F
            </u>
          </span>
        </>
      )}
    </p>
  );
};

export default TemperatureUnit;
