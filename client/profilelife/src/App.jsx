import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Nav } from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Form } from './pages/Form'
import { Card } from './pages/Card'

function App() {

  return (
    <>
       <Nav/>
       <Routes>
          <Route path='/home' element={<Home/>}/>
          <Route path='/users' element={<Card/>}/>
          <Route path='/form' element={<Form/>}/>
       </Routes>
    </>
  )
}

export default App
