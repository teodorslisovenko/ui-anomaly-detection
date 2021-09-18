import React, { useState, useEffect } from "react";
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
  const localData = DataFormatation(anomalies, "local");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedFeatures, setGlobalFeatures] = useState(globalData.features);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedLocalFeatures, setLocalFeatures] = useState(localData);

  const filterFeatures = (startIndex, endIndex) => {
    let filtratedGlobalFeatures = [];
    for (const globalFeature of globalData.features) {
      if (
        globalFeature.dateId >= startIndex &&
        globalFeature.dateId <= endIndex
      ) {
        filtratedGlobalFeatures.push(globalFeature);
      }
    }
    setGlobalFeatures(filtratedGlobalFeatures);

    let filtratedLocalFeatures = [];
    for (const localFeature of localData) {
      if (
        localFeature.dateId >= startIndex &&
        localFeature.dateId <= endIndex
      ) {
        filtratedLocalFeatures.push(localFeature);
      }
    }
    setLocalFeatures(filtratedLocalFeatures);
  };

  return (
    <>
      <Main>
        <Map data={selectedLocalFeatures} />
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
        {show ? (
          <GlobalChart labels={globalData.labels} features={selectedFeatures} />
        ) : null}
        {slicer ? <Slicer data={globalData} filter={filterFeatures} /> : null}
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
  grid-template-rows: 1fr 1fr;
  gap: 20px 20px;
`;

const ShowMap = styled.button``;

const ShowSlicer = styled.button``;
