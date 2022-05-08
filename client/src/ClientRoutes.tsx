import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AuthWall from './components/AuthWall/AuthWall'
import { useAuthContext } from './hooks/AuthProvider'
import PrivateRoutes from './pages/PrivateRoutes'
import Login from './pages/Login/Login'

const ClientRoutes = () => {
  const { loading } = useAuthContext()
  const location = useLocation()

  if (loading) return <>Loading...</>

  // this may be a temporary redirect
  if (location.pathname === '/') return <Navigate to="/login" replace />

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={
          <AuthWall>
            <PrivateRoutes />
          </AuthWall>
        }
      />
    </Routes>
  )
}

export default ClientRoutes
