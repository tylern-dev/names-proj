import React, { useRef } from 'react'
import { loginWithEmailPassword } from '../../authentication/login-password'

const Login = () => {
  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    loginWithEmailPassword({
      email: loginEmailRef.current?.value || '',
      password: loginPasswordRef.current?.value || '',
    })
  }
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="email" ref={loginEmailRef} />
        <input type="text" placeholder="password" ref={loginPasswordRef} />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}

export default Login
