import React from "react";
import styles from "./AQIHistoricalData.module.css";

export function AQIHistoricalData(props) {
  const { historicalData } = props;
  /* historicalData.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`);
  }) */
  console.log(JSON.stringify(historicalData));
  return (
    <div className={styles.about}>
      Historical Data
    </div>
  );
}
