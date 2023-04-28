import React from 'react'
import Shop from './components/pages/shop/shop';
import {Routes, Route } from 'react-router-dom';
import './mainContainer.css'
import StateController from './stateController';


const MainContainer = () => {
  return (
    <>
    <div className='mainContainer'>
    <Routes>
      <Route path='/' element={<Shop/>} />
      <Route path='/StateController' element={<StateController/>} />
    </Routes>
    </div>
    </>
  )
}

export default MainContainer