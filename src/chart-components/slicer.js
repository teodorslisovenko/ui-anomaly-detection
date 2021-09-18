import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const Slicer = ({ filter, data }) => {
  const [interval, setInterval] = useState([
    data.totalCount - 5,
    data.totalCount,
  ]);

  // Based on dateId get the timestamp like 24/12/2012
  const getDateString = (index) => {
    const dateString = data.features.find(
      (feature) => feature.dateId === index
    );
    return dateString.date;
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // First loadup with just a interval of last five dates.
    filter(data.totalCount - 5, data.totalCount);
  }, []);

  return (
    <Container>
      <h3 className="pt-3" id="default_heading">
        Slice the time interval
      </h3>
      <Slider>
        <Indicator>{getDateString(interval[0])}</Indicator>
        <Range
          pushable={true}
          draggableTrack={true}
          allowCross={false}
          min={1}
          max={data.totalCount}
          step={1}
          value={interval}
          onChange={(dateId) => {
            setInterval(dateId);
          }}
        />
        <Indicator>{getDateString(interval[1])}</Indicator>
      </Slider>
      <div class="d-grid col-5 pb-4 mx-auto">
        <button
          type="button"
          className="btn btn-dark "
          onClick={() => filter(interval[0], interval[1])}
        >
          <span id="default_heading">Slice</span>
        </button>
      </div>
    </Container>
  );
};

export default Slicer;

const Container = styled.div`
  height: 10rem;
  width: 100rem;
  position: fixed;
  margin-top: 40%;
  margin-left: 1%;
  z-index: 314159;
  pointer-events: initial;

  border: 1px solid #444;
  background-color: white;
  padding: 10px;
  box-shadow: 5px 10px;

  display: grid;
  grid-template-rows: 15% 70% 15%;
  align-items: center;
`;
const Slider = styled.div`
  display: grid;
  grid-template-columns: 10.4% 78% 10.4%;
  align-items: center;
  gap: 1% 1%;
`;

const Indicator = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  font-family: "Secular One", sans-serif;
  text-align: center;
`;
