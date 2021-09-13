import React, { useState } from "react";
import styled from "styled-components";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

const Slicer = () => {
  const [val, setVal] = useState([0, 1]);

  console.log(val);

  return (
    <Container>
      <Indicator>{val[0]}</Indicator>
      <Range
        pushable={true}
        draggableTrack={true}
        allowCross={false}
        s
        min={0}
        max={10}
        step={1}
        value={val}
        onChange={(value) => {
          setVal(value);
        }}
      />
      <Indicator>{val[1]}</Indicator>
    </Container>
  );
};

export default Slicer;

const Container = styled.div`
  height: 6rem;
  width: 90rem;
  position: fixed;
  margin-top: 43%;
  margin-left: 1%;
  z-index: 314159;
  pointer-events: initial;

  border: 1px solid #444;
  background-color: white;
  padding: 10px;
  box-shadow: 5px 10px;

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
