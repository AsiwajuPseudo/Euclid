import React, { useState } from 'react';
import { Card} from 'antd';
import { Chart } from 'react-google-charts';

const Maps = (props) => {

  return (
    <div>
      <Card>
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="GeoChart"
          data={props.mapdata}
          options={{
            region:props.region,
            resolution: props.resolution,
            backgroundColor: 'white',
            defaultColor: '#f0f0f0',
          }}/>
        </Card>
    </div>
  );
};

export default Maps;