import React, { useState } from "react";
import "./CityAQI.css";

export const CityAQI = (props) => {
  const { cities, cityWiseData } = props;
  const initialCity = cities.length > 0 ? cities[0] : undefined;
  const [selectedCity, setSelectedCity] = useState(initialCity);

  function handleCitySelect(event) {
    console.log(event);
    console.log(cityWiseData[event.target.value]);
    setSelectedCity(event.target.value);
  }

  return (
    <div>
      <div className="city_aqi">City Wise AQI</div>
      <select
        name="city"
        id="city"
        value={selectedCity}
        onChange={(event) => handleCitySelect(event)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <div>
        {cityWiseData &&
          cityWiseData[selectedCity] &&
          cityWiseData[selectedCity].map((data) => {
            return (
              <div key={data.timeStamp}>
                <div>{`AQI ${data.aqi}`}</div>
                <div>{`TimeStamp: ${new Date(
                  data.timeStamp / 1000
                ).toString()}`}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
