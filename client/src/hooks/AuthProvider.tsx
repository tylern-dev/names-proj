import React, {
  useContext,
  createContext,
  ReactElement,
  useEffect,
} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../authentication/config'

interface AuthContext {
  isAuthenticated?: boolean
  loading: boolean
}

const AuthContext = createContext<AuthContext>({ loading: true })

const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const isAuthenticated = !!user

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, loading, navigate])

  const value = { isAuthenticated, loading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuthContext }
