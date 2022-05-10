import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <h1>dashboard</h1>
      <Outlet />
    </>
  )
}

export default Dashboard
