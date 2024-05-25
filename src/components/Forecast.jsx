import DegreeList from "./DegreeList";
import TileList from "./TileList";
import TemperatureUnit from "./TemperatureUnit";

const Forecast = ({ forecast: data, currentUnit, setTempUnits, setData }) => {
  if (data != null && data.list != null) {
    const today = data.list[0];

    return (
      <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
        <div className="mx-auto w-[300px]">
          <TemperatureUnit
            tempUnits={currentUnit}
            handleTempImperial={() => setTempUnits("imperial")}
            handleTempMetric={() => setTempUnits("metric")}
            coord={data.coord}
            setData={setData}
          />
          <DegreeList data={data} currentUnit={currentUnit} today={today} />
          <TileList data={data} today={today} />
        </div>
      </div>
    );
  } else {
    return <div>Empty List</div>;
  }
};
export default Forecast;
