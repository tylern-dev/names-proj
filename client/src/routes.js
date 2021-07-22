import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <h1>Hello From the Router</h1>
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
