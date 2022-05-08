import React, {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '../authentication/config'

interface AuthContext {
  isAuthenticated?: boolean
  handleSetIsAuthenticated: () => void
  handleSignOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContext>({
  loading: true,
  handleSetIsAuthenticated: () => undefined,
  handleSignOut: () => undefined,
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, userLoading] = useAuthState(auth)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // this helps us control the flow of when to show the private routes

  const handleSetIsAuthenticated = () => {
    setIsAuthenticated(true)
  }

  const handleSignOut = () => {
    auth.signOut()
    setIsAuthenticated(false)
  }

  const loading = userLoading || isLoading

  useEffect(() => {
    setIsLoading(true)
    if (user?.uid && !userLoading) {
      setIsAuthenticated(true)
      setIsLoading(false)
    } else if (!user?.uid && !userLoading) {
      setIsLoading(false)
    }
  }, [user, userLoading])

  const value = {
    isAuthenticated,
    handleSetIsAuthenticated,
    handleSignOut,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuthContext }
