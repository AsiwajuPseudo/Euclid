import React from "react";
import { Card} from 'antd';
import { Chart } from "react-google-charts";

function Area(props) {
  const options = {
    hAxis: { 
      title: props.haxis, 
      titleTextStyle: { color: "#333" }
    },
    vAxis: {
      minValue: 0, 
    },
    chartArea: { width: "70%", height: "80%" },
  };
  return (
    <Card>
      <Chart
        chartType="AreaChart"
        width="100%"
        height="400px"
        data={props.data}
        options={options}/>
    </Card>
  );
}

export default Area;