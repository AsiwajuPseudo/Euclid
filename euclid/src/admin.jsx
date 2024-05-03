import {useState} from 'react';
import './App.css';

import Core from './core.jsx';
import Account from './account.jsx';

function Admin(props) {
  const [screen,setScreen]=useState('account')
  const [user_id,setUser]=useState('')

  const screenset=(target,user)=>{
    setScreen(target)
    setUser(user)
  }
  return (
    <>
      { screen=='core' && <Core screenset={screenset} user_id={user_id} host={props.host}/>}
      {screen=='account' && <Account screenset={screenset} host={props.host}/>}
    </>
  )
}

export default Admin