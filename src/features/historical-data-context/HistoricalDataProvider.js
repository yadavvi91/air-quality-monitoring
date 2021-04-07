import React, { useState } from "react";

export const HistoricalDataContext = React.createContext([]);

const HistoricalDataProvider = (props) => {
  const aCallback = () => {
    alert("HEY FROM METHOD");
    setHistoricalData([]);
  };

  const [historicalData, setHistoricalData] = useState([]);

  return (
    <HistoricalDataContext.Provider
      value={{
        historicalData,
        setHistoricalData: (historicalData) =>
          setHistoricalData(historicalData),
        aCallback: aCallback
      }}
    >
      {props.children}
    </HistoricalDataContext.Provider>
  );
};

export default HistoricalDataProvider;
