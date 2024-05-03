import {useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import AppControl from './app/app.jsx';
import Admin from './admin.jsx';

function App() {
  const [screen,setScreen]=useState('account')
  const [user_id,setUser]=useState('')
  const host="http://34.123.17.194:8080/"
  //const host="http://127.0.0.1:5000/"

  const screenset=(target,user)=>{
    setScreen(target)
    setUser(user)
  }
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<AppControl host={host}/> } /> 
        <Route path="/admin" element={<Admin host={host}/> } /> 
      </Routes> 
    </BrowserRouter>
  )
}

export default App
