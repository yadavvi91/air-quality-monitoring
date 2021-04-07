import React, { useCallback, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import "./App.css";
import { AQI } from "./features/air-quality-index/AQI";
import { AQIReference } from "./features/air-quality-reference/AQIReference";
import { AQIHistoricalData } from "./features/aqi-historical-data/AQIHistoricalData";

const { Header, Content } = Layout;

const initialState = {
  historicalData: []
};

function reducer(state, action) {
  switch (action.type) {
    case "set-historical-data":
      return {
        ...state,
        historicalData: [...state.historicalData, action.historicalData]
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appDispatch = useCallback(
    (action) => {
      dispatch(action);
    },
    [state, dispatch]
  );

  return (
    <Router className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/">
                <span>AQI</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/historical-data">
                <span>AQI Historical Data</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/about">
                <span>AQI Reference</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/" exact={true}>
              <AQI appDispatch={appDispatch} />
            </Route>
            <Route path="/about" exact={true}>
              <AQIReference />
            </Route>
            <Route path="/historical-data" exact={true}>
              <AQIHistoricalData state={state} />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
