// eslint-disable-next-line simple-import-sort/imports
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as ROUTES from 'constants/route'

const Login = React.lazy(() => import('./pages/login'))
const Signup = React.lazy(() => import('./pages/signup'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={Signup} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
