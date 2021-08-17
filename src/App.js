import React from "react";
import Home from "./home-component/home";
import AnomalyMap from "./anomaly-map-component/anomaly-map";
import NotFoundError from "./error-component/NotFoundError";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/anomalies">
          <AnomalyMap />
        </Route>
        <Route path="*">
          <NotFoundError />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
