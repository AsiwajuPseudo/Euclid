import {useState} from 'react';

import Core from './core.jsx';
import Small from './small.jsx'
import Settings from './settings.jsx'
import Help from './help.jsx'
import Account from './account.jsx';

function AppControl(props) {
  const [size,setSize] = useState(window.innerWidth);
  const [screen,setScreen]=useState('account')
  const [user_id,setUser]=useState('')

  const screenset=(target,user)=>{
    setUser(user)
    setScreen(target)
  }
  return (
    <>
      { screen=='core' && size>1000 && <Core screenset={screenset} user_id={user_id} host={props.host}/>}
      { screen=='core' && size<1000 && <Small screenset={screenset} user_id={user_id} host={props.host}/>}
      {screen=='account' && <Account screenset={screenset} host={props.host}/>}
      {screen=='settings' && <Settings screenset={screenset} user_id={user_id} host={props.host}/>}
      {screen=='help' && <Help screenset={screenset} user_id={user_id} host={props.host}/>}
    </>
  )
}

export default AppControl
