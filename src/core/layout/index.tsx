import { useSelector } from 'react-redux'
import { Router } from 'react-router-dom'
import { RootState } from 'store/reducers'
import { history } from 'utils/history'
import Container from './Container'
import Header from './Header'
import Slider from './Slider'

export const Layout = (theme) => {
  const user = useSelector((state: RootState) => state.auth.loggedInUser)
  return (
    <Router history={history}>
      <div className="main-layout relative">
        <Header />
        {user && <Slider theme={theme} user={user} />}
        <main className="container">
          <Container />
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}
