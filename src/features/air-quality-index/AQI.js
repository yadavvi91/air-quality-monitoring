import React, { useEffect, useReducer, useState } from "react";
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

const initialState = {
  data: {},
  consumableData: [],
  historicalData: []
};

function reducer(state, action) {
  const { data, consumableData, historicalData } = state;
  if (action.type === "data-change") {
    const newData = { ...data };
    action.data.forEach((d) => {
      const { city: newCity, aqi: newAQI } = d;
      let prevTime = undefined;
      let currTime = undefined;
      let text = undefined;
      console.log(
        `city: ${newCity}, aqi: ${newAQI}, timeStamp: ${action.timeStamp}`
      );
      if (newData[newCity] === undefined) {
        prevTime = undefined;
        currTime = action.timeStamp;
        text = "A few seconds ago";
      } else {
        prevTime = newData[newCity].currTime;
        currTime = action.timeStamp;
        const timePassed = (currTime - prevTime) / 1000;
        if (timePassed / 43200 > 1) {
          text = `${(timePassed % 43200).toFixed(2)} hours ago`;
        } else if (timePassed / 3600 > 1) {
          text = `${(timePassed % 3600).toFixed(2)} minutes ago`;
        } else if (timePassed / 60 > 1) {
          text = `${(timePassed % 60).toFixed(2)} seconds ago`;
        } else {
          text = `${timePassed.toFixed(2)} seconds ago`;
        }
      }
      newData[newCity] = {
        city: newCity,
        aqi: newAQI.toFixed(2),
        prevTime,
        currTime,
        text
      };
    });
    const newConsumableData = [];
    Object.values(newData).forEach((v) => {
      newConsumableData.push(v);
    })
    return {
      data: newData,
      consumableData: newConsumableData,
      historicalData
    };
  } else if (action.type === "historical-data-change") {
    return {
      data,
      consumableData,
      historicalData: [...historicalData, action.historicalData]
    };
  } else {
    throw new Error();
  }
}

export function AQI() {
  const [data, setData] = useState([]);
  const [historicalData, setHistoricalData] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
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
      dispatch({ type: "data-change", data: message, timeStamp: timeStamp });
      dispatch({
        type: "historical-data-change",
        historicalData: {
          [timeStamp]: newHistoricalData
        }
      });
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
        {state.consumableData.map((cityData) => (
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
