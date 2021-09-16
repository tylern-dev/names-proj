import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../hooks/auth-provider'

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { isAuthorized } = useAuth()
  console.log({ isAuthorized })
  return <Route {...rest} render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to="/login" />)} />
}

export default GuardedRoute
