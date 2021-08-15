import { Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routes } from 'constants/route'

export default function Routers() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <Redirect from="/" to="/home" />
      <Switch>
        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              exact={route.exact}
              path={`/${route.path}`}
              component={lazy(() => import(`core/${route.componentPath}`))}
            />
          )
        })}
      </Switch>
    </Suspense>
  )
}
