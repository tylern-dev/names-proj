import React from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import AuthWall from './components/AuthWall/AuthWall'
import { useAuthContext } from './hooks/AuthProvider'
import Login from './pages/Login/Login'
import Name from './pages/Name'
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
        path="/dashboard"
        element={
          <AuthWall>
            <Name />
          </AuthWall>
        }
      />
    </Routes>
  )
}

export default ClientRoutes
