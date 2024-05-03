import React, {useState} from 'react';
import { LockOutlined, UserOutlined, LoadingOutlined,MailOutlined} from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card, Image, Flex, Typography, message} from 'antd';

const { Text, Link,Paragraph, Title} = Typography;

function Login(props){
  const [error,setError]=useState('')
  const [loader,setLoad]=useState()
  const onFinish = async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const response = await fetch(props.host+'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (response.ok) {
        // If login is successful, redirect or perform other actions as needed
        const data = await response.json();
        if(data.status==="success"){
          props.screenset('core',data.user);
          setLoad()
        }
        else{
          message.warning(data.status)
          setLoad()
        }
      } else {
        // If login fails, handle the error
        message.warning('Login failed');
        setLoad()
      }
    } catch (error) {
      console.error('Error:', error);
      setLoad()
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Form name="normal_login" initialValues={{remember: true,}} onFinish={onFinish}>
          <Flex style={{width:'100%',marginBottom:'20px'}} justify="center" align="center">
            <Image width={100} src="logo.png" preview={false}/>
          </Flex>
          <Form.Item name="email" rules={[{required: true,message: 'Please input your Username!',},]}>
            <Input prefix={<MailOutlined/>} placeholder="Email" variant="filled"/>
          </Form.Item>
          <Form.Item name="password" rules={[{required: true,message: 'Please input your Password!',},]}>
            <Input prefix={<LockOutlined/>} type="password" placeholder="Password" variant="filled"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>{loader}Log in</Button>
            Or <a onClick={()=>props.pageset('register')}>register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles={
  container:{
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    width:'400px',
    background: '#fff',
    padding:'20px',
  },
};

export default Login;