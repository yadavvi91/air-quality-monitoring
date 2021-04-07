import React, { useContext, useEffect, useReducer, useState } from "react";
import "./AQI.css";
import { Button } from "antd";

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
      // console.log(
      //   `city: ${newCity}, aqi: ${newAQI}, timeStamp: ${action.timeStamp}`
      // );
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
      let category = undefined;
      if (newAQI > 0 && newAQI < 51) {
        category = "good";
      } else if (newAQI > 50 && newAQI < 101) {
        category = "satisfactory";
      } else if (newAQI > 100 && newAQI < 201) {
        category = "moderate";
      } else if (newAQI > 200 && newAQI < 301) {
        category = "poor";
      } else if (newAQI > 300 && newAQI < 401) {
        category = "very_poor";
      } else if (newAQI > 401) {
        category = "severe";
      }
      newData[newCity] = {
        city: newCity,
        aqi: newAQI.toFixed(2),
        category,
        prevTime,
        currTime,
        text
      };
    });
    const newConsumableData = [];
    Object.values(newData).forEach((v) => {
      newConsumableData.push(v);
    });
    return {
      data: newData,
      consumableData: newConsumableData,
      historicalData
    };
  } else {
    throw new Error();
  }
}

export const AQI = React.memo((props) => {
  const [getAQIData, setGetAQIData] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { appDispatch } = props;

  const setAppStateHistoricalData = (historicalData) => {
    appDispatch({
      type: "set-historical-data",
      historicalData: historicalData
    });
  };
  function startListeningToWebSocket() {
    setGetAQIData(true);
  }

  function stopListeningToWebSocket() {
    setGetAQIData(false);
  }

  useEffect(() => {
    if (!getAQIData) return;

    const ws = new WebSocket("ws://city-ws.herokuapp.com");
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onclose = () => {
      console.log("disconnected");
    };

    ws.onmessage = (event) => {
      console.log("onmessage");
      if (!getAQIData) return;

      // listen to data sent from the websocket server
      const message = JSON.parse(event.data);
      const newHistoricalData = {};
      const timeStamp = Math.floor(Date.now());

      for (const cityWiseData of message) {
        const city = cityWiseData["city"];
        const aqi = cityWiseData["aqi"];
        newHistoricalData[city] = {
          aqi,
          timeStamp
        };
      }

      dispatch({ type: "data-change", data: message, timeStamp: timeStamp });
      setAppStateHistoricalData({
        historicalData: {
          [timeStamp]: newHistoricalData
        }
      });
    };
    return () => {
      if (getAQIData) {
        ws.close();
      }
    };
  }, [getAQIData, setAppStateHistoricalData]);

  return (
    <>
      <Button onClick={(event) => startListeningToWebSocket()}>Start</Button>
      <Button onClick={(event) => stopListeningToWebSocket()}>Stop</Button>
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
            <div className="aqi_tr" key={cityData.city}>
              <div className="aqi_td">{cityData.city}</div>
              <div className={"aqi_td " + cityData.category}>
                {cityData.aqi}
              </div>
              <div className="aqi_td">{cityData.text}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
});
