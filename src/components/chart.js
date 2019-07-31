import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const Chart = props => (
  <LineChart
    isAnimationActive={false}
    width={500}
    height={300}
    data={props.data}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis yAxisId="left" />
    <YAxis yAxisId="right" orientation="right" />
    <Tooltip />
    <Legend />
    <Line isAnimationActive={false} yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" />
    <Line isAnimationActive={false} yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
  </LineChart>
);

export default Chart;
