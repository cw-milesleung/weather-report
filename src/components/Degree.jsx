const Degree = ({ temp, unit }) => {
  return (
    <>
      <span>
        {temp}
        <sup>o</sup>
        {unit}
      </span>
    </>
  );
};
export default Degree;
