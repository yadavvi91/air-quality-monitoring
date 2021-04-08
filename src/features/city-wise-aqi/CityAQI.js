import React from "react";
import "./CityAQI.css";

export const CityAQI = (props) => {
  const { cities } = props;
  function handleCitySelect(event) {
    console.log(event);
  }

  return (
    <>
      <div className="city_aqi">City Wise AQI</div>
      <select onSelect={(event) => handleCitySelect(event)}>{}</select>
    </>
  );
};
