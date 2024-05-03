import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const Newtable = (props) => {
  const [loader, setLoad] = useState();
  const [result, setResult]=useState('');

  const onFinish =async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const response = await fetch(props.host+'create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        // If login is successful, redirect or perform other actions as needed
        const data = await response.json();
        message.warning(data.status)
        setLoad()
      } else {
        // If login fails, handle the error
        console.error('Login failed');
        setLoad()
      }
    } catch (error) {
      console.error('Error:', error);
      setLoad()
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Add a New Table</h1>
      <Form name="newTableForm" onFinish={onFinish} layout="vertical" initialValues={{name: '',metric: 'cosine',}}>
        <Form.Item label="Table Name" name="name" rules={[{ required: true, message: 'Please input the table name!' }]}>
          <Input placeholder="Enter table name" />
        </Form.Item>

        <Form.Item label="Metric" name="metric" rules={[{ required: true, message: 'Please input the metric!' }]}>
          <Select placeholder="Select metric">
            <Option value="cosine">Cosine</Option>
            <Option value="l2">L2</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {loader}Add Table
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Newtable;