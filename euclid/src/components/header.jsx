import React from 'react';
import { Layout, Menu, Avatar, Col, Row, Input, Button,Image, Typography, Space, Dropdown} from 'antd';
import { UserOutlined, SearchOutlined} from '@ant-design/icons';

const { Header } = Layout;
const { Search } = Input;
const { Title } = Typography;

function AppHeader(props){

    const search=()=>{
      //search
    }

    const items=[
      {
        key: '1',
        label: (
          <a href="#">
            {props.user_id}
          </a>
        ),
      },
      ];

    return (
      <Header style={styles.head}>
        <Row>
        <Col span={4} style={styles.name}>
          <Title level={4}>Euclid</Title>
        </Col>
        <Col span={16}>
          <Search
            placeholder="Search"
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            variant="filled"
            onSearch={search}
            style={{ width: '100%',marginTop:'10px' }}/>
        </Col>
        <Col span={4} style={styles.profile}>
          <Dropdown menu={{items,}}>
            <Avatar size="medium" icon={<UserOutlined />} />
          </Dropdown>
        </Col>
        </Row>
      </Header>
    )
};

const styles={
  head:{
    backgroundColor:'white',
    borderBottom:'1px solid #dedddc',
  },
  name:{
    float:'left',
  },
  profile:{
    textAlign:'right',
  },
}

export default AppHeader;
