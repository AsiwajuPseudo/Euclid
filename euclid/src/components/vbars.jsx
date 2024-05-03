import React from "react";
import { Card} from 'antd';
import { Chart } from "react-google-charts";

function Vbars(props) {

  const options = {
    hAxis: {
      title: props.haxis,
    },
    vAxis: {
      title: props.vaxis,
    },
    bars: "horizontal",
    axes: {
      y: {
        0: { side: "right" },
      },
    },
  };
  return (
    <Card>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={props.data}
        options={options}/>
    </Card>
  );
}

export default Vbars;