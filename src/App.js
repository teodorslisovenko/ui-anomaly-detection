import React from "react";
import Home from "./home-component/home";
import AnomalyContainer from "./anomaly-map-component/anomaly-container";
import NotFoundError from "./error-component/not-found-error";
import UnpassedAnomaliesError from "./error-component/unpassed-anomalies-error";

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
          <AnomalyContainer />
        </Route>
        <Route path="/unpassed-anomalies">
          <UnpassedAnomaliesError />
        </Route>
        <Route path="*">
          <NotFoundError />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
