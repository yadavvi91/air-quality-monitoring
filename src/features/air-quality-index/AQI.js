import React, { useEffect, useState } from "react";
import "./AQI.css";

const oldData = [
  {
    city: "Mumbai",
    aqi: 182,
    category: "moderate",
    prevTime: undefined,
    currTime: 1617251117777,
    text: "A few seconds ago"
  },
  {
    city: "Delhi",
    aqi: 300,
    category: "poor",
    prevTime: undefined,
    currTime: 1617251117777,
    text: "A few seconds ago"
  },
  {
    city: "Bhubaneswar",
    aqi: 100,
    category: "satisfactory",
    prevTime: undefined,
    currTime: 1617251117777,
    text: "A few seconds ago"
  }
];
export function AQI() {
  const [data, setData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  let counter = 0;
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
      setData((data) => {
        return {
          data: {
            ...data,
            message
          }
        };
      });
      setHistoricalData((historicalData) => {
        return {
          historicalData: {
            ...historicalData,
            [timeStamp]: newHistoricalData
          }
        }
      });
      console.log("ABCD");

      counter++;
      if (counter > 5) {
        ws.close();
      }
    };

    ws.onclose = () => {
      console.log("disconnected");
      // automatically try to reconnect on connection loss
    };
  }, []);

  return (
    <div className="aqi_table">
      <div>
        <div className="aqi_tr aqi_td">
          <div className="aqi_td">City</div>
          <div className="aqi_td">Current AQI</div>
          <div className="aqi_td">Last updated</div>
        </div>
      </div>
      <div>
        {oldData.map((cityData) => (
          <div className="aqi_tr">
            <div className="aqi_td">{cityData.city}</div>
            <div className={"aqi_td " + cityData.category}>{cityData.aqi}</div>
            <div className="aqi_td">{cityData.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
