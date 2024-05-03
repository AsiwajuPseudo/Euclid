import React,{useState} from 'react';
import { LockOutlined, UserOutlined, PhoneOutlined, MailOutlined, LoadingOutlined, BankOutlined, AimOutlined} from '@ant-design/icons';
import { Button, Form, Input, Card, Image, Flex, Typography, Select, Checkbox, message} from 'antd';

function Register(props) {
  const [show,setShow]=useState(false)
  const [agree,setAgree]=useState(true)
  const [error,setError]=useState('')
  const [loader,setLoad]=useState()

  const onFinish = async (values) => {
    setLoad(<LoadingOutlined/>)
    try {
      const response = await fetch(props.host+'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.status==="success"){
          props.screenset('core',data.user)
        }
        else{
          message.warning(data.status)
          setLoad()
        }
      } else {
        console.error('Registration failed');
        setLoad();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCheck=(e)=>{
    setAgree(e.target.checked);
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Form name="normal_register" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your Name!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Full Name" variant="filled" />
          </Form.Item>
          <Form.Item name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
            <Input prefix={<PhoneOutlined />} placeholder="Phone" variant="filled" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" variant="filled" />
          </Form.Item>
          <Form.Item name="type" rules={[{ required: true, message: 'Please select account type!' }]}>
            <Select suffixIcon={<AimOutlined />} placeholder="Account type" variant="filled">
              <Select.Option value="individual">Individual</Select.Option>
              <Select.Option value="org">Organization</Select.Option>
              <Select.Option value="student">Student</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="code" rules={[{ required: true, message: 'Please input organization code!' }]}>
            <Input prefix={<BankOutlined />} placeholder="Organization code(put 0000 if individual)" variant="filled" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" variant="filled" />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={agree} onChange={handleCheck}>
              I agree to the
            </Checkbox>
            <a onClick={() => props.pageset('terms')}>terms and conditions</a>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!agree} block>{loader}Register</Button>
            Or <a onClick={() => props.pageset('login')}>Login now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '400px',
    background: '#fff',
    padding: '20px',
  },
};

export default Register;