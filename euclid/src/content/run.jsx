import React,{useState,useEffect} from 'react';
import { Input, InputNumber, Form,Button,Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import Displayer from './displayer.jsx'

const { Paragraph, Text } = Typography;


const Run = (props) => {
  const [inputs,setInputs]=useState(props.tool.inputs)
  const [loader,setLoad]=useState()
  const [results,setResults]=useState()
  
  const renderInput = (input) => {
    if (input.type === 'text') {
      return (<Form.Item label={input.name} name={input.name} rules={[{ required: true, message: 'Please enter value' }]}>
                <Input />
              </Form.Item>
              );
    } else if (input.type === 'number') {
      return (<Form.Item label={input.name} name={input.name} rules={[{ required: true, message: 'Please enter value' }]}>
                <InputNumber />
              </Form.Item>
              );
    }
    return null;
  };

  const Finish = async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const response = await fetch(props.host+'run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults(<Displayer items={data.answer}/>)
        setLoad()
      } else {
        setResults("Internal Error: Try again")
        setLoad()
      }
    } catch (error) {
      setResults('Error:'+error);
      setLoad()
    }
  };

  return (
    <Form layout="vertical" onFinish={Finish} initialValues={{tool:props.tool.tool}}>
      <Form.Item name="tool" style={{ display: 'none' }}>
        <Input type="hidden" />
      </Form.Item>
      {inputs.map((input, index) => (
        <div key={index}>
          {renderInput(input)}
        </div>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">{loader}Run Model</Button>
      </Form.Item>
      <div>{results}</div>
    </Form>
  );
};

export default Run;
