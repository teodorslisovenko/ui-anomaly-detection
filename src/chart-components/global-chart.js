import React from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import randomcolor from "randomcolor";

const GlobalChart = ({ data }) => {
  const { features, labels } = data;
  const labelArray = [...labels];

  features.sort(function (a, b) {
    var aa = a.date.split("/").reverse().join(),
      bb = b.date.split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });

  return (
    <Container>
      <h3 id="default_heading"> Every feature value by time dimension </h3>
      <ResponsiveContainer width="95%" height="95%">
        <AreaChart width={500} height={300} data={features}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <YAxis />
          <Tooltip />
          <Brush
            startIndex="1"
            endIndex="20"
            dataKey="date"
            height={30}
            stroke="#0000FF"
          />
          {/* <Legend layout="vetical" verticalAlign="top" align="right" /> */}
          {labelArray.map((label, index) => {

            const fillColor = randomcolor({
              luminosity: "dark",
              format: "hsla",
              alpha: 1,
            });

            return (
              <Area
                type="monotone"
                stackId={label}
                isAnimationActive={false}
                key={index}
                dataKey={label}
                stroke={fillColor}
                fill={fillColor}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default GlobalChart;

// CSS styling

const Container = styled.div`
  height: 45rem;
  width: 55rem;
  position: fixed;
  margin-top: 1%;
  margin-left: 53%;
  z-index: 314159;
  pointer-events: initial;

  border: 1px solid #444;
  background-color: white;
  padding: 10px;
  box-shadow: 5px 10px;
`;
