import React,{useState,useEffect} from 'react';
import { Input, InputNumber, Form,Button,Typography,List} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const { Paragraph, Text,Title } = Typography;

import Maps from '../components/maps.jsx'
import Tables from '../components/table.jsx'
import Vbars from '../components/vbars.jsx'
import Pie from '../components/pie.jsx'
import Scatter from '../components/scatter.jsx'
import Area from '../components/area.jsx'

const Displayer = (props) => {
  
  const renderContent = (item) => {
    if (item.type === 'paragraph') {
      return (<Paragraph>{item.data}</Paragraph>);
    } 

    else if (item.type === 'header') {
      return (<Title level={4}>{item.data}</Title>);
    }

    else if(item.type==='list'){
      return (<ul style={{ listStyleType: 'none' }}>{item.data.map((text,index) =>(<li key={index}><b>{index+1}.</b> {text}</li>))}</ul>)
    }

    else if(item.type==='table'){
      return (<Tables columns={item.data.columns} data={item.data.values}/>)
    }
    else if(item.type==='map'){
      return (<Maps mapdata={item.data.mapData} region={item.data.region} resolution={item.data.resolution}/>)
    }

    else if(item.type==='pie chart'){
      return (<Pie data={item.data.values} title={item.data.title}/>)
    }

    else if(item.type==='bar chart'){
      return (<Vbars data={item.data.values} vaxis={item.data.vAxis} haxis={item.data.hAxis}/>)
    }
    else if(item.type==='area chart'){
      return (<Area data={item.data.values} haxis={item.data.hAxis}/>)
    }

    return (<div>item</div>);
  };
  return (
    <div>
      {props.items.map((item, index) => (
        <div key={index}>
          {renderContent(item)}
        </div>
      ))}
    </div>
  );
};

export default Displayer;