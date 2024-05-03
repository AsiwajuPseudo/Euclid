import React from "react";
import { Card} from 'antd';
import { Chart } from "react-google-charts";

const data = [
  ["Hours Studied", "Grade"],
  [0, 67],
  [1, 88],
  [2, 77],
  [3, 93],
  [4, 85],
  [5, 91],
];

const options = {
  hAxis: { title: "Hours Studied" },
  vAxis: { title: "Grade" },
};

function Scatter() {
  return (
    <Card title="Student's grades">
      <Chart
        chartType="Scatter"
        width="100%"
        height="400px"
        data={data}
        options={options}/>
    </Card>
  );
}

export default Scatter;