import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GuardedRoute from './components/guarded-route'
import { AuthProvider } from './hooks/auth-provider'

const Routes = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <h1>Hello From the Router</h1>
          </Route>
          <Route path="/login">
            <h1>Please login</h1>
          </Route>
          <GuardedRoute component={() => <h1>TEST</h1>} path="/auth" />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default Routes
