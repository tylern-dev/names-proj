import React, { useContext, createContext, useMemo, ReactElement } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../authentication/config'

interface AuthContext {
  isAuthenticated?: boolean
}

const AuthContext = createContext<AuthContext>({})

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user] = useAuthState(auth)

  const isAuthenticated = !!user
  const value = { isAuthenticated }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const { isAuthenticated } = useContext(AuthContext)
  return { isAuthenticated }
}

export { AuthProvider, useAuthContext }
