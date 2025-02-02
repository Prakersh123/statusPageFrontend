/*
 * Filename: /home/codestax/statusPage/vite-project/src/App.jsx
 * Path: /home/codestax/statusPage/vite-project
 * Created Date: Saturday, February 1st 2025, 12:58:41 pm
 * Author: Prakersharya
 * 
 * Copyright (c) 2025 Trinom Digital Pvt Ltd
 */

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './app/layout'
import routes from './routes';



function App() {

  return (
    <>
    <Router>
      {/* <Layout /> */}
      <Routes>
      {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Routes>
    </Router>
    </>
  )
}

export default App
