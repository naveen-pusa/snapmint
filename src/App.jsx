import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
 
import Authmodal from './pages/Authmodal'        
import Home from './pages/Home'                  
import SingleProduct from './pages/SingleProduct' 
 import ProtectedRoute from './components/ProtectedRoute' 

function App() {
  return (
    <Routes>

         {/* PROTECTED — only accessible after login */}
      <Route path="/" element={
        <ProtectedRoute><Home /></ProtectedRoute>
      } />


      {/* PUBLIC — /auth is landing page (signup/login) */}
      <Route path="/auth" element={<Authmodal />} />

   
      <Route path="/product/:id" element={
        <ProtectedRoute><SingleProduct /></ProtectedRoute>
      } />

      {/* <Route path="/cart" element={
        <ProtectedRoute><CartPage /></ProtectedRoute>
      } /> */}

      {/* Any unknown URL → /auth */}
      <Route path="*" element={<Navigate to="/auth" replace />} />

    </Routes>
  )
}

export default App