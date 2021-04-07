import React, { useContext } from "react";
import styles from "./AQIHistoricalData.module.css";

export const AQIHistoricalData = (props) => {
  console.log(JSON.stringify(props.state.historicalData));
  /* historicalData.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`);
  }) */
  return <div className={styles.about}>Historical Data</div>;
};
