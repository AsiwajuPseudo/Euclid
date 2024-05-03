import React, { useState, useEffect } from 'react';
import { Card, Menu, Col, Row, Button, FloatButton, Form, Input, InputNumber, Modal, Tooltip} from 'antd';
import { DeleteOutlined, PlusOutlined, CloudUploadOutlined, SearchOutlined, NumberOutlined, LoadingOutlined} from '@ant-design/icons'


const {Item}=Menu;

import Tables from '../components/table.jsx';
const deli=(id)=>{
  //log_item
  console.log(id)
}
const columns = [
  {
    title: 'Text',
    dataIndex: 'text',
    key: 'text',
    width:'50%',
    ellipsis:{rows:4},
    render: (text) => (
      <Tooltip placement="top" title={text}>
        {text}
      </Tooltip>
    ),
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
    ellipsis:{rows:4},
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: 'right',
    width:'20%',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    ellipsis:{rows:4},
  },
  {
    title:'Action',
    key:'action',
    render:(_,record)=>(
      <a onClick={()=>deli(record.id)}><DeleteOutlined/></a>
    ),
  },
];

const TablesPage = (props) => {

  const [menus,setMenus]=useState([])
  const [table_data,setTabledata]=useState([])
  const [current,setCurrent]=useState('')
  const [error,setError]=useState('')
  const [loader,setLoad]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(props.host+'tables?user=sd');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setMenus(data.tables);
        setTabledata(data.data)
        if (data.tables.length>0){
          setCurrent(data.tables[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  //view a table
  const view=async (target)=>{
    setTabledata([])
    setCurrent(target)
    try {
      const response = await fetch(props.host+'view?table='+target);
        
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setTabledata(data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //On search
  const onQuery = async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const formData = { ...values, table:current};
      const response = await fetch(props.host+'query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // If login is successful, redirect or perform other actions as needed
        const data = await response.json();
        setTabledata(data.results)
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
    <div style={styles.container}>
      <Row>
        <Col span={6}>
            <Menu mode="vertical">
            {menus.map((item,index)=>(
              <Item key={index} onClick={()=>view(item)}>{item}</Item>
            ))}
            </Menu>
        </Col>
        <Col span={18}>
          <Row>
            <Card style={{width:'100%'}}>
              <Form layout='inline' onFinish={onQuery}>
                <Form.Item name="q" rules={[{ required: true, message: 'Please enter search phrase' }]}>
                  <Input variant="filled" style={{width:500}} prefix={<SearchOutlined/>} placeholder={current}/>
                </Form.Item>
                <Form.Item name="k">
                  <InputNumber variant="filled" style={{width:200}} prefix={<NumberOutlined/>} placeholder="Number of results(k)"/>
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType="submit">{loader} Query</Button>
                </Form.Item>
              </Form>
            </Card>
          </Row>
          <Row>
            <Tables columns={columns} data={table_data}/>
          </Row>
        </Col>
      </Row>
      <FloatButton type='primary' icon={<PlusOutlined/>} onClick={()=>props.pageset('newtable')}/>
    </div>
  );
};

const styles={
  container:{
    minHeight:'300px',
  },
};

export default TablesPage;