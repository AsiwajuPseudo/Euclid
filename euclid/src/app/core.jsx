import React, { useState, useEffect } from 'react';
import { Card, Col, Row,Form, Input, Button, Space,Typography, Flex, Menu,FloatButton, Modal, Avatar, Dropdown, Drawer,Image,message} from 'antd';
import {SendOutlined,PlusOutlined,LoadingOutlined,DeleteOutlined, UserOutlined, RocketOutlined,CloudUploadOutlined, SettingOutlined, QuestionCircleOutlined,PoweroffOutlined} from '@ant-design/icons';

import Displayer from './displayer.jsx'
import CloudUpload from './cloudupload.jsx'
import Cloud from './cloud.jsx'
import Source from './source.jsx'

const { Text, Link,Paragraph, Title} = Typography;
const {Item}=Menu;
const { TextArea } = Input;

const Core = (props) => {
  const [form] = Form.useForm();
  const [menus,setMenu] = useState([])
  const [tables,setTables]=useState([])
  const [messages,setMessages]= useState([])
  const [documents,setDocuments]=useState([])
  const [current,setCurrent] = useState('')
  const [pre,setPre]=useState('')
  const [visible,setVisible]=useState(false)
  const [cloud,setCloud]=useState(false)
  const [docs,setDocs]=useState(false)
  const [loader, setLoad] = useState();
  const [send,setSend]=useState(<SendOutlined/>)
  const [tree,setTree]=useState([])
  const [results, setResult] = useState('')
  const [tool,setTool]=useState("assistant")
  const [url,setUrl]=useState(null)

  useEffect(() => {
    fetch(props.host+'chats?user_id='+props.user_id)
      .then(response => response.json())
      .then(data => {
        setMenu(data.chats);
        setTables(data.tables);
      })
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  const Send =async (values) => {
    setSend(<LoadingOutlined/>)
    try {
      const formData = { ...values, user_id:props.user_id,chat_id:current,tool:tool}
      const response = await fetch(props.host+'play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // If login is successful, redirect or perform other actions as needed
        const data = await response.json();
        setMessages(data.messages)
        setDocuments(data.documents)
        setMenu(data.chats)
        setCurrent(data.current)
        setSend(<SendOutlined/>)
        setPre('message sent')
      } else {
        setSend(<SendOutlined/>)
      }
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      setSend(<SendOutlined/>)
    }
  };

  const view=async (target)=>{
    setCurrent(target)
    try {
      const response = await fetch(props.host+'messages?chat_id='+target);
        
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setMessages(data.messages)
      setDocuments([])
      setTree(data.nodes)
      if(data.messages.length===0){
        setPre('')
      }
      else{
        setPre('messages are there')
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const deli=async (target)=>{
    setCurrent(target)
    try {
      const response = await fetch(props.host+'deli_chat?chat_id='+target+'&user_id='+props.user_id);
        
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setMessages([])
      setMenu(data.chats)
      setPre('')
      setCurrent(null)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const showModal = () => {
    setVisible(!visible);
  };

  const showCloud = () => {
    setCloud(!cloud);
  };

  const Add =async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const formData = { ...values, user_id:props.user_id}
      const response = await fetch(props.host+'add_chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        message.warning(data.status.status)
        if (data.status.status==='success'){
          view(data.status.chat)
          setMenu(data.chats)
        }
        setLoad()
      } else {
        setLoad()
      }
    } catch (error) {
      console.error('Error:', error);
      setLoad()
    }
  };

  const showsource=(target)=>{
    if (tool==="web"){
      setUrl(target)
      setDocs(true)
    }
    else if(tool==="assistant"){
      //do nothing
    }
    else if (tool==="documents"){
      setUrl(props.host+'source?name='+target+'&tool='+tool+'&chat_id='+current)
      setDocs(true)
    }
    else{
      setUrl(props.host+'source?name='+target+'&tool='+tool)
      setDocs(true)
    }
  }

  const closesource=()=>{
    //setSource(target)
    setDocs(false)
  }

  const tool_set=(target)=>{
    setTool(target);
  }

  const set_tree=(target)=>{
    setTree(target)
  }

  const options=(
    <Menu style={{padding:'20px'}}>
      <Title level={5} style={{ margin: 0 }}>Tools</Title>
      <Menu.Item key="a" onClick={()=>tool_set("assistant")}>
        <Paragraph style={{ margin: 0 }}>assistant</Paragraph>
        <Text disabled style={{ margin: 0 }}>Chat with GPT-4 Turbo</Text>
      </Menu.Item>
      <Menu.Item key="b" onClick={()=>tool_set("web")}>
        <Paragraph style={{ margin: 0 }}>web</Paragraph>
        <Text disabled style={{ margin: 0 }}>Use google search engine and GPT-4</Text>
      </Menu.Item>
      <Menu.Item key="c" onClick={()=>tool_set("documents")}>
        <Paragraph style={{ margin: 0 }}>documents</Paragraph>
        <Text disabled style={{ margin: 0 }}>Access your documents with GPT-4</Text>
      </Menu.Item>
      <Menu.Divider />
      <Title level={5} style={{ margin: 0 }}>Other</Title>
      {tables.map((table,index)=>(
        <Menu.Item key={index} onClick={()=>tool_set(table)}>
          {table}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div style={styles.container}>
      <Row>
        <Col span={4}>
          <Menu mode="vertical" style={{height:'100vh'}} selectable={false}>
            <div style={styles.title}>
              <Title level={4}>Case Rover</Title>
            </div>
            <div style={styles.menus}>
            <Title level={5} style={{marginLeft:'15px'}} disabled>Workspaces</Title>
            {menus.map((item,index)=>(
              <Item key={index} active>
                <Space>
                  <Text onClick={()=>view(item.chat_id)}>{item.name}</Text>
                  <Button type="text" onClick={()=>deli(item.chat_id)} icon={<DeleteOutlined/>}></Button>
                </Space>
              </Item>
            ))}
            </div>
            <div style={styles.profile}>
              <Menu.Item key="60" icon={<QuestionCircleOutlined/>} onClick={()=>props.screenset("help",props.user_id)}>Help</Menu.Item>
              <Menu.Item key="70" icon={<UserOutlined/>} onClick={()=>props.screenset("settings",props.user_id)}>Profile</Menu.Item>
              <Menu.Item key="80" icon={<PoweroffOutlined/>} onClick={()=>props.screenset("account",props.user_id)}>Logout</Menu.Item>
            </div>
          </Menu>
        </Col>
        <Col span={13}>
          <div>
            <Dropdown overlay={options} placement="bottom" size="large">
              <Button type="text" size="large"><SettingOutlined/>{tool}</Button>
            </Dropdown>
          </div>
          { pre==''&&
          (<div style={{height:'50vh',overflow: 'auto',marginTop:'20px'}}>
            <Flex style={{width:'100%'}} justify="center" align="center">
              <Image width={200} src="logo.png" preview={false}/>
            </Flex>
            <Flex style={{width:'100%'}} justify="center" align="center">
              <Paragraph>Select a chat or create a new one to start using the assistant</Paragraph>
            </Flex>
          </div>)
          }
          {pre!='' &&(
            <div style={{height:'77vh',overflow: 'auto',paddingLeft:'25px',paddingRight:'15px'}}>
              {messages.map((message,index)=>(
                <div key={index}>
                  <div style={styles.user}>
                    <Avatar style={{backgroundColor:'orange'}} size="small" icon={<UserOutlined />} />
                    <Paragraph style={{marginTop:10}}>{message.user}</Paragraph>
                  </div>
                  <div style={styles.system}>
                    <Avatar style={{backgroundColor:'orange'}} size="small" icon={<RocketOutlined />} />
                    <Displayer items={message.system.answer}/>
                    {message.system.sources.map((item,index)=>(
                      <Text key={item.key}>{item.name}</Text>
                      ))}
                  </div>
                </div>
                ))}
                {documents.map((item,index)=>(
                  <a href="#" onClick={()=>showsource(item)} key={index}>| {item} |</a>
                ))}
            </div>
          )}
          
          <Form layout="inline" form={form} onFinish={Send} style={{ minWidth: '94%' }}>
            <Space.Compact style={{width: '100%',}} size="large" block>
              <Form.Item name="prompt" rules={[{ required: false}]} style={{ marginTop: 5,width:'90%',marginLeft:'5%'}}>
                <Input size="default" placeholder="Enter prompt" suffix={<Button type="primary" htmlType="submit" icon={send} />}/>
              </Form.Item>
            </Space.Compact>
            <Flex style={{width:'100%'}} justify="center" align="center">
              <Paragraph>This system can make errors. Be sure to verify content.</Paragraph>
            </Flex>
          </Form>
        </Col>
        <Col span={7}>
          <div style={{marginTop:'40px',marginRight:'10px',marginLeft:'10px'}}>
            <Cloud tree={tree} chat_id={current} host={props.host} set_tree={set_tree}/>
          </div>
        </Col>
      </Row>
      <FloatButton type='primary' icon={<PlusOutlined/>} onClick={showModal}/>
      <FloatButton type="primary" icon={<CloudUploadOutlined />} onClick={showCloud} style={{ right: 94 }}/>
      <Modal title="New Workspace" open={visible} onCancel={showModal} onOk={showModal}>
        <Form layout="vertical" onFinish={Add}>
          <Form.Item label="Workspace name" name="name" rules={[{ required: true, message: 'Please enter model name!' }]}>
            <Input placeholder="Enter Workspace name"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{loader}Add Workspace</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal title="Upload files into cloud" open={cloud} onCancel={showCloud} onOk={showCloud}>
        <CloudUpload set_tree={set_tree} host={props.host} chat_id={current}/>
      </Modal>
      <Drawer title="Source" onClose={closesource} open={docs} width={850}>
        <iframe src={url} width="100%" height="500"></iframe>
      </Drawer>
    </div>
  );
};

const styles={
  container:{
    width:'100%',
  },
  user:{
    width:'100%',
    borderBottom:'1px solid #dedddc',
    paddingTop:'10px',
    paddingBottom:'10px',
  },
  system:{
    width:'100%',
    borderBottom:'1px solid #dedddc',
    paddingTop:'10px',
    paddingBottom:'10px',
  },
  profile:{
    borderTop:'1px solid #dedddc',
  },
  title:{
    borderBottom:'1px solid #dedddc',
    paddingLeft:'15px',
  },
  menus:{
    height:'65vh',
    overflow:'auto',
  },
};

export default Core;