import React, { useContext } from "react";
import styles from "./AQIHistoricalData.module.css";

export const AQIHistoricalData = (props) => {
  console.log(JSON.stringify(props.state.historicalData));
  props.state.historicalData.map((data) => {
    const timeStamp = Object.keys(data)[0];
    const date = new Date(timeStamp);
    const citiesData = data[timeStamp];
    const printableTimeStamp = date.toString();
    console.log(printableTimeStamp);
    const cities = Object.keys(citiesData);
    cities.map((city) => {
      const cityData = citiesData[city];
      const { aqi } = cityData;
      console.log(`City: ${city}, AQI: ${aqi}`);
    });

    console.log();
  });
  /* historicalData.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`);
  }) */
  return <div className={styles.about}>Historical Data</div>;
};
