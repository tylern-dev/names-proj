import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../hooks/AuthProvider'
const AuthWall = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const { isAuthenticated, loading } = useAuthContext()

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

export default AuthWall
