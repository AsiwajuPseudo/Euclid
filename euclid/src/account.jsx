import {useState} from 'react';

import Login from './content/login.jsx';

function Account(props) {
  const [page,setPage]=useState('login')

  const pageset=(target)=>{
    setPage(target)
  }

  return (
    <>
      { page=='login' && <Login pageset={pageset} screenset={props.screenset} host={props.host}/>}
    </>
  )
}

export default Account
