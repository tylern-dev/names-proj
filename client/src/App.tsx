import React, { useRef } from 'react'
import { registerWithEmailPassword } from './authentication/register-password'
import { loginWithEmailPassword } from './authentication/login-password'
const App = () => {
  const registerEmailRef = useRef<HTMLInputElement>(null)
  const registerPasswordRef = useRef<HTMLInputElement>(null)
  const registerFirstNameRef = useRef<HTMLInputElement>(null)
  const registerLastNameRef = useRef<HTMLInputElement>(null)
  const loginEmailRef = useRef<HTMLInputElement>(null)
  const loginPasswordRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    registerWithEmailPassword({
      firstName: registerFirstNameRef.current?.value || '',
      lastName: registerLastNameRef.current?.value || '',
      email: registerEmailRef.current?.value || '',
      password: registerPasswordRef.current?.value || '',
    })
  }

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    loginWithEmailPassword({
      email: loginEmailRef.current?.value || '',
      password: loginPasswordRef.current?.value || '',
    })
  }
  return (
    <>
      <h1>Baby name app</h1>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          ref={registerFirstNameRef}
        />
        <input type="text" placeholder="Last Name" ref={registerLastNameRef} />
        <input type="text" placeholder="email" ref={registerEmailRef} />
        <input type="text" placeholder="password" ref={registerPasswordRef} />
        <input type="submit" value="submit" />
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="email" ref={loginEmailRef} />
        <input type="text" placeholder="password" ref={loginPasswordRef} />
        <input type="submit" value="submit" />
      </form>
    </>
  )
}

export default App
