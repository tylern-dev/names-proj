import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AuthWall from './components/AuthWall/AuthWall'
import Login from './pages/Login/Login'
import Name from './pages/Name'
const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <AuthWall>
            <Name />
          </AuthWall>
        }
      />
    </Routes>
  )
}

export default ClientRoutes
