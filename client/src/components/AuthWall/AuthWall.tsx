import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../authentication/config'
import { useAuthContext } from '../../hooks/AuthProvider'
const AuthWall = ({ children }: { children: JSX.Element }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default AuthWall
