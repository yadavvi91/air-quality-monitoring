import React, { useEffect, useState } from "react";

export function AQI() {
  const data = [
    {
      city: "Mumbai",
      aqi: 182,
      category: "Moderate",
      prevTime: undefined,
      currTime: 1617251117777,
      text: "A few seconds ago"
    },
    {
      city: "Delhi",
      aqi: 300,
      category: "Poor",
      prevTime: undefined,
      currTime: 1617251117777,
      text: "A few seconds ago"
    },
    {
      city: "Bhubaneswar",
      aqi: 100,
      category: "Satisfactory",
      prevTime: undefined,
      currTime: 1617251117777,
      text: "A few seconds ago"
    }
  ];
  // const [data, setData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const ws = new WebSocket("ws://city-ws.herokuapp.com");
  useEffect(() => {
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
    };
    ws.onmessage = (event) => {
      // listen to data sent from the websocket server
      /* const message = JSON.parse(event.data);
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
      console.log("ABCD"); */
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  });

  return (
    <div>
      {data.map((cityData) => (
        <div>
          <div>{cityData.city}</div>
          <div>{cityData.aqi}</div>
          <div>{cityData.category}</div>
          <div>{cityData.text}</div>
        </div>
      ))}
    </div>
  );
}
