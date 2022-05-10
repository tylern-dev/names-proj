import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Name from './Name'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="name" element={<Name />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
