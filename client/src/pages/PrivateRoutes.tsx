import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthProvider'
import Dashboard from './Dashboard/Dashboard'
import Name from './Name'
import Navbar from '../components/Navbar/Navbar'

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuthContext()
  return (
    <Navbar isAuthenticated={isAuthenticated}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="name" element={<Name />} />
        </Route>
      </Routes>
    </Navbar>
  )
}

export default PrivateRoutes
