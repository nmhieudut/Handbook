import Header from './Header'
import Container from './Container'
import { Router } from 'react-router-dom'
import { history } from 'utils/history'
import Footer from './Footer'
export const Layout = () => {
  return (
    <Router history={history}>
      <Header />
      <Container />
      {/* <Footer /> */}
    </Router>
  )
}
