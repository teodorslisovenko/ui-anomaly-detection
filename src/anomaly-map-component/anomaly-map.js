import React from "react";
import { useLocation } from "react-router-dom";

function AnomalyMap() {

  const location = useLocation();
  let anomalies = null;

  if (location.state) {
    //const { anomalies } = location.state;
    anomalies = location.state.anomalies; 
  }
  else {
    console.log('no props');
  }

  console.log(anomalies)

  return (
    <>
      <h1>Here goes the map...</h1>
    </>
  );
}

export default AnomalyMap;
