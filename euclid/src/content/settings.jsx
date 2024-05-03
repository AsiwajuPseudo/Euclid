import React, { useState, useEffect} from 'react';
import { Row, Col, Form, Input, Button, Card, message} from 'antd';
import { LockOutlined,LoadingOutlined } from '@ant-design/icons'; // Removed unused import

const Settings = (props) => {
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [loader,setLoad]=useState()
  const [result,setResult]=useState()

  useEffect(() => {
    // Fetch data from Python backend or use your generate_tree function directly here
    // Replace '/api/get_tree_data' with your actual API endpoint
    fetch(props.host+'profile?user_id='+props.user_id)
      .then(response => response.json())
      .then(data => {
        if(data.status=="success"){
          setName(data.name)
          setEmail(data.email)
          setPhone(data.phone)
        }
      })
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  const handlePasswordVisibilityToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Password = async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const formData = { ...values, user_id: props.user_id };
      const response = await fetch(props.host+'password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        message.warning(data.status)
        setLoad()
      } else {
        setLoad()
      }
    } catch (error) {
      console.error('Error:', error);
      setLoad()
    }
  };

  return (
    <Row style={{ padding: '20px' }}>
      <Col span={12}>
        <Card title="Account Details" style={{ width: '400px', marginBottom: '20px' }}>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>User ID: {props.user_id}</p>
        </Card>
      </Col>

      <Col span={12}> {/* Added missing '=' after 'span' */}
        <Card title="Change Password" style={{ width: '400px' }}>
          <Form onFinish={Password} initialValues={{user_id:props.user_id}}>
            <Form.Item name="user_id" style={{ display: 'none' }}>
              <Input type="hidden"/>
            </Form.Item>
            <Form.Item name="oldpassword" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="Old Password" />
            </Form.Item>
            <Form.Item name="newpassword" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined />} type="password" placeholder="New Password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {loader} Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Settings;