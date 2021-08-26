import { useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { RootState } from 'store/reducers'
import { history } from 'utils/history'
import Container from './Container'
import Header from './Header'
import Sider from './Sider'

export const LayoutComponent = (theme) => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  return (
    <Router history={history}>
      <div className="main-layout relative">
        <Header />
        {user && <Sider theme={theme} user={user} />}
        <main className="container">
          <Container />
        </main>
      </div>
      {/* <Footer /> */}
    </Router>
  )
}
