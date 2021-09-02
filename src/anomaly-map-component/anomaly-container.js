import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Map from "./map";
import DataFormatation from "./data-formatation";
import GlobalChart from "../chart-components/global-chart";

import { Redirect } from "react-router-dom";

function AnomalyContainer() {
  const location = useLocation();
  let anomalies = null;

  const [show, setShow] = useState(false);

  if (location.state === undefined) {
    return <Redirect to="/unpassed-anomalies" />;
  } else {
    anomalies = location.state.anomalies;
  }

  const globalData = DataFormatation(anomalies, "global");

  return (
    <>
      <h1></h1>
      <Main>
        <Map data={anomalies} />
        {show ? <GlobalChart data={globalData} /> : null}
        <ShowMap
          type="button"
          className="btn btn-dark btn-lg"
          onClick={() => setShow(!show)}
          id="default_heading"
        >
          Show global chart
        </ShowMap>
      </Main>
    </>
  );
}

export default AnomalyContainer;

// CSS styling

const Main = styled.div`
  position: relative;
  pointer-events: initial;
`;

const ShowMap = styled.button`
  position: absolute;
  z-index: 314159;
  pointer-events: initial;
  margin-top: 47%;
  left: 1%;
`;
