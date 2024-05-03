import React from "react";
import { Card} from 'antd';
import { Chart } from "react-google-charts";

const options = {
  pieHole: 0.5,
};

function Pie(props) {
  return (
    <Card title={props.title}>
      <Chart
        chartType="PieChart"
        width="100%"
        data={props.data}
        options={options}/>
    </Card>
  );
}

export default Pie;
