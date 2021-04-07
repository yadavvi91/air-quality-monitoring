import React, { useContext } from "react";
import styles from "./AQIHistoricalData.module.css";
import { HistoricalDataContext } from "../historical-data-context/HistoricalDataProvider";

export function AQIHistoricalData() {
  const { historicalData } = useContext(HistoricalDataContext);
  console.log(JSON.stringify(historicalData));
  /* historicalData.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`);
  }) */
  return (
    <div className={styles.about}>
      Historical Data
    </div>
  );
}
