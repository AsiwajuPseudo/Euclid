import {useState} from 'react';

import Login from './login.jsx';
import Register from './register.jsx';
import Terms from './terms.jsx'

function Account(props) {
  const [page,setPage]=useState('login')

  const pageset=(target)=>{
    setPage(target)
  }

  return (
    <>
      { page=='login' && <Login pageset={pageset} screenset={props.screenset} host={props.host}/>}
      { page=='register' && <Register pageset={pageset} screenset={props.screenset} host={props.host}/>}
      { page=='terms' && <Terms pageset={pageset} screenset={props.screenset} host={props.host}/>}
    </>
  )
}

export default Account
