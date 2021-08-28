import React from "react";
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

const LocalChart = ({ featureName, anomalies }) => {
  const featureOfInterest = anomalies.filter(
    (anomaly) => anomaly.name === featureName
  );

  // console.log(featureName);
  // console.log(featureOfInterest);

  const CustomizedDot = (props) => {
    const { cx, cy, payload, dataKey } = props;

    console.log(props);

    if (dataKey === "value" && payload.anomaly_level > 0) {
      return (
        <svg
          x={cx - 7}
          y={cy - 7}
          width={75}
          height={75}
          fill="red"
          viewBox="0 0 1024 1024"
        >
          <circle
            cx="95"
            cy="95"
            r="95"
            stroke="black"
            strokeWidth="10"
            fill="red"
          />
        </svg>
      );
    }
    return null;

    // return (
    //   <svg
    //     x={cx - 7}
    //     y={cy - 7}
    //     width={75}
    //     height={75}
    //     fill="green"
    //     viewBox="0 0 1024 1024"
    //   >
    //     <circle
    //       cx="95"
    //       cy="95"
    //       r="95"
    //       stroke="black"
    //       strokeWidth="10"
    //       fill="green"
    //     />
    //   </svg>
    // );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={featureOfInterest}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {["value", "importance", "anomaly_level"].map((label, index) =>
   
            <Line
              type="monotone"
              key={index}
              dataKey={label}
              strokeWidth={2}
              stroke={ label === "value" ? randomcolor() : null}
              dot={<CustomizedDot />}
            />

        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LocalChart;
