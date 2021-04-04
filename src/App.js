import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { AQI } from "./features/air-quality-index/AQI";
import { AQIReference } from "./features/air-quality-reference/AQIReference";

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path="/about">
          <AQIReference />
        </Route>
        <Route path="/">
          <header className="App-header">
            {/*<img src={logo} className="App-logo" alt="logo" />*/}
            {/*<Counter />*/}
            <AQI />
            {/*<p>*/}
            {/*  Edit <code>src/App.js</code> and save to reload.*/}
            {/*</p>*/}
          </header>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
