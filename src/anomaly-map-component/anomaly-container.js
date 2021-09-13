import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Map from "./map";
import DataFormatation from "./data-formatation";
import GlobalChart from "../chart-components/global-chart";
import Slicer from "../chart-components/slicer";


import { Redirect } from "react-router-dom";

function AnomalyContainer() {
  const location = useLocation();
  let anomalies = null;

  const [show, setShow] = useState(false);
  const [slicer, setSlicer] = useState(true);


  if (location.state === undefined) {
    return <Redirect to="/unpassed-anomalies" />;
  } else {
    anomalies = location.state.anomalies;
  }

  const globalData = DataFormatation(anomalies, "global");

  return (
    <>
      <Main>
        <Map data={anomalies} />
        <ControlContainer>
          <ShowMap
            type="button"
            className="btn btn-dark btn-xd"
            onClick={() => setShow(!show)}
            id="default_heading"
          >
            {show ? "Hide global chart" : "Show global chart"}
          </ShowMap>
          <ShowSlicer
            type="button"
            className="btn btn-dark btn-xd"
            onClick={() => setSlicer(!slicer)}
            id="default_heading"
          >
            {slicer ? "Hide slicer" : "Show slicer"}
          </ShowSlicer>
        </ControlContainer>
        {show ? <GlobalChart data={globalData} /> : null}
        {slicer ? <Slicer/> : null}
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

const ControlContainer = styled.div`
  position: fixed;
  z-index: 314159;
  pointer-events: initial;
  margin-top: 0.5%;
  left: 0.5%;
  display: grid;
  grid-template-columns: repeat(1, 5fr);
  grid-template-rows: 1fr 1fr ;
  gap: 20px 20px;
`;

const ShowMap = styled.button``;

const ShowSlicer = styled.button``;
