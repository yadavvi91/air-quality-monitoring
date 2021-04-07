import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { AQI } from "./features/air-quality-index/AQI";
import { AQIReference } from "./features/air-quality-reference/AQIReference";
import { AQIHistoricalData } from "./features/aqi-historical-data/AQIHistoricalData";

const { Header, Content } = Layout;

function App() {
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
              <AQI />
            </Route>
            <Route path="/about" exact={true}>
              <AQIReference />
            </Route>
            <Route path="/historical-data" exact={true}>
              <AQIHistoricalData />
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
