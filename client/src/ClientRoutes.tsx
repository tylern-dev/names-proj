import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import AuthWall from './components/AuthWall/AuthWall'
import { useAuthContext } from './hooks/AuthProvider'
import PrivateRoutes from './pages/PrivateRoutes'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import { Layout } from './components/styled/Layout/Layout'

const ClientRoutes = () => {
  const { loading, isAuthenticated } = useAuthContext()
  const location = useLocation()

  if (loading) return <>Loading...</>

  // this may be a temporary redirect
  if (location.pathname === '/') return <Navigate to="/login" replace />

  return (
    <Layout>
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
    </Layout>
  )
}

export default ClientRoutes
