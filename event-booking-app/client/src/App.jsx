import React from 'react'
import Routess from './services/Routess'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
     

const App = () => {
  return (
    <div>
      <Routess/>
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
