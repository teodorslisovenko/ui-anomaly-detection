import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import randomcolor from "randomcolor";

const GlobalChart = ({ data }) => {
  const { features, labels } = data;
  const labelArray = [...labels];

  return (
    <Container>
      <h3 id="default_heading"> Feature value by time dimension </h3>
      <ResponsiveContainer width="95%" height="95%">
        <LineChart width={500} height={300} data={features}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <YAxis />
          <Tooltip />
          <Legend layout="vetical" verticalAlign="top" align="right" />
          {labelArray.map((label, index) => (
            <Line
              type="monotone"
              key={index}
              dataKey={label}
              stroke={randomcolor()}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default GlobalChart;

// CSS styling

const Container = styled.div`
  height: 45rem;
  width: 55rem;
  position: absolute;
  margin-top: 1%;
  margin-left: 53%;
  z-index: 314159;
  pointer-events: initial;

  border: 1px solid #444;
  background-color: white;
  padding: 10px;
  box-shadow: 5px 10px;
`;
