// eslint-disable-next-line simple-import-sort/imports
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as ROUTES from 'constants/route'
import useAuthListener from 'hooks/use-auth-listener'
import { UserContext } from 'context'

const Login = React.lazy(() => import('./pages/login'))
const Signup = React.lazy(() => import('./pages/signup'))
const Dashboard = React.lazy(() => import('./pages/dashboard'))
const NotFound = React.lazy(() => import('./pages/notfound'))

function App() {
  const { user } = useAuthListener()

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.SIGN_UP} component={Signup} exact />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App
