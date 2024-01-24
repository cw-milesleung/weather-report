import { useState } from "react";
import DegreeList from "./DegreeList";
import TileList from "./TileList";
import TemperatureUnit from "./TemperatureUnit";

const Forecast = ({ forecast: data }) => {
  const today = data.list[0];
  const [tempUnits, setTempUnits] = useState("metric");

  const handleTempImperial = () => {
    setTempUnits("Imperial");
  };

  const handleTempMetric = () => {
    setTempUnits("metric");
  };

  return (
    <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
      <div className="mx-auto w-[300px]">
        <p className="text-sm">
          {tempUnits === "metric" && (
            <>
              <TemperatureUnit isBold={true} label="C" />
              <span className="mx-1">|</span>
              <TemperatureUnit
                isBold={false}
                label="F"
                handleTempImperial={handleTempImperial}
              />
            </>
          )}
          {!tempUnits === "metric" && (
            <>
              <TemperatureUnit
                isBold={false}
                label="C"
                handleTempMetric={handleTempMetric}
              />
              <span className="mx-1">|</span>
              <TemperatureUnit isBold={true} label="F" />
            </>
          )}
        </p>

        <DegreeList data={data} today={today} />
        <TileList data={data} today={today} />
      </div>
    </div>
  );
};
export default Forecast;
