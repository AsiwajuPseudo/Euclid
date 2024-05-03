import { useState } from 'react';
import { Col, Row } from 'antd';
import LeftNav from './components/leftnav.jsx';
import AppHeader from './components/header.jsx';

import Dashboard from './content/dashboard.jsx';
import TablesPage from './content/tables.jsx';
import Newtable from './content/newtable.jsx';
import Models from './content/models.jsx';
import Files from './content/files.jsx';
import Settings from './content/settings.jsx';
import Login from './content/login.jsx';

function Core(props) {
  const [page, setPage] = useState("dashboard");

  const pageset=(target)=>{
    setPage(target)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <AppHeader user_id={props.user_id}/>
      </div>
       <div style={styles.side}>
          <LeftNav pageset={pageset} screenset={props.screenset} userset={props.userset}/>
        </div>
      <Row>
        <div style={styles.center}>
        {page=="dashboard" && <Dashboard user_id={props.user_id} host={props.host}/>}
        {page =="tables" && <TablesPage pageset={pageset} user_id={props.user_id} host={props.host}/>}
        {page=="newtable" && <Newtable user_id={props.user_id} host={props.host}/>}
        {page=="models" && <Models user_id={props.user_id} host={props.host}/>}
        {page=="folders" && <Files user_id={props.user_id} host={props.host}/>}
        {page=="settings" && <Settings user_id={props.user_id} host={props.host}/>}
        {page=="login" && <Login user_id={props.user_id}/>}
        </div>
      </Row>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative', // Needed for sticky positioning
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'white',
  },
  side: {
    float: 'left',
    zIndex: 1000,
    position: 'sticky',
    top: 65,
  },
  center: {
    margin: '5px',
  },
};

export default Core;