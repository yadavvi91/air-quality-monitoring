import React from "react";
import styles from "./AQIReference.module.css";

export function AQIReference() {
  return (
    <div className={styles.about}>
      <div>Central Pollution Control Board's</div>
      <div>Air Quality Standard</div>
      <table>
        <thead>
          <tr>
            <th>Air Quality Index (AQI)</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.good}>
            <td>0-50</td>
            <td>Good</td>
          </tr>
          <tr className={styles.satisfactory}>
            <td>51-100</td>
            <td>Satisfactory</td>
          </tr>
          <tr className={styles.moderate}>
            <td>101-200</td>
            <td>Moderate</td>
          </tr>
          <tr className={styles.poor}>
            <td>201-300</td>
            <td>Poor</td>
          </tr>
          <tr className={styles.very_poor}>
            <td>301-400</td>
            <td>Very Poor</td>
          </tr>
          <tr className={styles.severe}>
            <td>401-500</td>
            <td>Severe</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
