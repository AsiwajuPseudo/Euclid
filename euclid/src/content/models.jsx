import React, {useState, useEffect} from 'react';
import {Tag,Card, Button, Modal, Form, Input, Select, Drawer, Space, Alert} from 'antd';
import {PlusOutlined, DeleteOutlined,BugOutlined,LoadingOutlined} from '@ant-design/icons';

import Tables from '../components/table.jsx';
import Tree from '../components/tree.jsx';
import ArrayEditor from '../components/array.jsx';
import Run from './run.jsx'

const { Option } = Select;

const Models = (props) => {
  const [visible, setVisible] = useState(false);
  const [draw,setDraw]=useState(false)
  const [run, setRun]=useState(false)
  const [models,setModels]=useState([])
  const [tables,setTables]=useState([])
  const [loader, setLoad] = useState();
  const [results,setResult]=useState('')
  const [tool,setTool]=useState()

  useEffect(() => {
    fetch(props.host+'models?user_id='+props.user_id)
      .then(response => response.json())
      .then(data => {
        setModels(data.models)
        setTables(data.tables)
      })
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  const Finish =async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const response = await fetch(props.host+'add_model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        // If login is successful, redirect or perform other actions as needed
        const data = await response.json();
        setResult(data.status.status)
        setModels(data.models)
        setLoad()
      } else {
        setLoad()
      }
    } catch (error) {
      console.error('Error:', error);
      setLoad()
    }
  };
 
  const showModal = () => {
    setVisible(!visible);
  };

  const deli_model=(target)=>{
    fetch(`${props.host}/deli_model?model_id=${target}&user_id=${props.user_id}`)
      .then(response => response.json())
      .then(content => setModels(content))
      .catch(error => console.error('Error fetching file content:', error));
  }

  const showRun=(target)=>{
    fetch(`${props.host}model?model_id=${target}`)
      .then(response => response.json())
      .then(content =>{
        setTool(content)
        setRun(true)
      })
      .catch(error => console.error('Error fetching file content:', error));
  }
  const closeRun=()=>{
    setRun(false);
  }
  const columns = [
    {
      title: 'Model Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tool',
      dataIndex: 'tool',
      key: 'tool',
    },
    {
      title: 'Table',
      dataIndex: 'table',
      key: 'table',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={()=>deli_model(record.model_id)}>
            <DeleteOutlined/>
          </Button>
          <Button type="primary" onClick={()=>showRun(record.model_id)}>
            <BugOutlined/>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card style={{width:'100%'}}>
        <Button type="primary" onClick={showModal} style={{float:'right'}}>
          <PlusOutlined/>Create Model
        </Button>
      </Card>
      <Tables columns={columns} data={models} />

      <Drawer title="Run Model" onClose={closeRun} open={run}>
        <Run tool={tool} host={props.host}/>
      </Drawer>

      <Modal title="Create New Model" open={visible} onCancel={showModal} onOk={showModal}>
        <Form layout="vertical" onFinish={Finish} initialValues={{user_id:props.user_id}}>
          <Alert message={results} type="success" />
          <Form.Item name="user_id" style={{ display: 'none' }}>
            <Input type="hidden"/>
          </Form.Item>
          <Form.Item label="Model Name" name="name" rules={[{ required: true, message: 'Please enter model name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tools" name="model" rules={[{ required: true, message: 'Please select tools!' }]}>
            <Select placeholder="Select a model">
              <Option value="web">Web-RAG</Option>
              <Option value="assistant">Assistant</Option>
              <Option value="rag">RAG</Option>
              <Option value="frag">Full-RAG</Option>
            </Select>
          </Form.Item>
          <Form.Item name="table" rules={[{ required: true, message: 'Please select a table!' }]}>
            <Select style={{ width: 120, margin: '10px 0' }} placeholder="Select Table">
              {tables.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{loader}Add Model</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Models;