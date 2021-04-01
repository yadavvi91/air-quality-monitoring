import React, { useEffect, useState } from "react";

export function AQI() {
  const [data, setData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const ws = new WebSocket("ws://city-ws.herokuapp.com");
  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    ws.onmessage = (event) => {
      // listen to data sent from the websocket server
      const message = JSON.parse(event.data);
      const newHistoricalData = {};
      const timeStamp = Math.floor(Date.now());

      for (const cityWiseData of message) {
        const city = cityWiseData["city"];
        const aqi = cityWiseData["aqi"];
        console.log(`city: ${city}, aqi: ${aqi}`);
        newHistoricalData[city] = {
          aqi,
          timeStamp
        };
      }
      console.log(`Original Data: ${JSON.stringify(data)}`);
      console.log(`New Data: ${JSON.stringify(message)}`);
      console.log(`Historical Data: ${JSON.stringify(historicalData)}`);
      setData(message);
      setHistoricalData((historicalData[timeStamp] = newHistoricalData));
      console.log("ABCD");
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  });

  return <div>AQI</div>;
}
