import React from "react";
import "./CityAQI.css";

export const CityAQI = (props) => {
  const { cities, cityWiseData } = props;

  function handleCitySelect(event) {
    console.log(event);
    console.log(cityWiseData[event.target.value]);
  }

  return (
    <>
      <div className="city_aqi">City Wise AQI</div>
      <select
        name="city"
        id="city"
        onSelect={(event) => handleCitySelect(event)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </>
  );
};
