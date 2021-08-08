// eslint-disable-next-line simple-import-sort/imports
import React, { Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as ROUTES from 'constants/route'

const Login = React.lazy(() => import('./pages/login'))

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
