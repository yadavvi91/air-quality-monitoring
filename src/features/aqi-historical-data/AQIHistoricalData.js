import React, { useContext } from "react";
import styles from "./AQIHistoricalData.module.css";
import { AppContext } from "../../App";

export function AQIHistoricalData() {
  const { appState, appDispatch } = useContext(AppContext);

  console.log(JSON.stringify(appState.historicalData));
  /* historicalData.forEach((data) => {
    console.log(`data: ${JSON.stringify(data)}`);
  }) */
  return <div className={styles.about}>Historical Data</div>;
}
