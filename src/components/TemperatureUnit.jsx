const TemperatureUnit = ({ isBold, label }) => (
  <span className={`font${isBold ? "-bold" : ""} cursor-pointer`}>
    <u>
      <sup className="text-xs">&deg;</sup>
      {label}
    </u>
  </span>
);
export default TemperatureUnit;
