import React,{useState} from 'react';
import { Menu} from 'antd';
import {HomeOutlined, AppstoreOutlined, LogoutOutlined, ClusterOutlined,UserOutlined,DeploymentUnitOutlined, AppstoreAddOutlined,SettingOutlined, FolderOutlined} from '@ant-design/icons'

const { SubMenu } = Menu;

function LeftNav(props) {
  const [collapsed,setColl]=useState(true)

  const hover=()=>{
    setColl(false)
  }
  const out=()=>{
    setColl(true)
  }

  return (
    <div style={styles.container}>
      <Menu mode="inline" style={{height:'450px'}} inlineCollapsed={collapsed} onMouseOver={hover} onMouseOut={out}>
        <Menu.Item key="1" icon={<HomeOutlined/>} onClick={()=>props.pageset("dashboard")}>Playground</Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined/>} onClick={()=>props.pageset("tables")}>Tables</Menu.Item>
        <Menu.Item key="3" icon={<AppstoreAddOutlined/>} onClick={()=>props.pageset("newtable")}>New Table</Menu.Item>
        <Menu.Item key="4" icon={<DeploymentUnitOutlined/>} onClick={()=>props.pageset("models")}>Models</Menu.Item>
        <Menu.Item key="5" icon={<FolderOutlined/>} onClick={()=>props.pageset("folders")}>Folders</Menu.Item>
        <Menu.Item key="7" icon={<SettingOutlined/>} onClick={()=>props.pageset("settings")}>Settings</Menu.Item>
        <Menu.Item key="8" icon={<LogoutOutlined/>} onClick={()=>props.screenset("account",'')}>Logout</Menu.Item>
      </Menu>
    </div>
  )
};

const styles={
  container:{
    maxWidth:200,
    display:'flex',
    alignItems:'center',
    position: 'sticky',
    zIndex:1000,
  },
};

export default LeftNav