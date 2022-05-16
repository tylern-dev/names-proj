import React, { useRef } from 'react'
import { useAuthContext } from '../../hooks/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginWithEmailPassword } from '../../authentication/login-password'

// TODO: add nprogress.js for the loading bar at the top

const Login = () => {
  const { isAuthenticated, handleSetIsAuthenticated } = useAuthContext()
  const navigate = useNavigate()
  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    loginWithEmailPassword({
      email: loginEmailRef.current?.value || '',
      password: loginPasswordRef.current?.value || '',
    }).then((response) => {
      if (response?.status === 200) {
        handleSetIsAuthenticated()
        navigate('/dashboard')
      }
    })
  }
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          name="email"
          ref={loginEmailRef}
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          ref={loginPasswordRef}
        />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}

export default Login
