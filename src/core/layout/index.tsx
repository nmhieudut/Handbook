import { Router } from 'react-router-dom'
import { history } from 'utils/history'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
export const Layout = () => {
  return (
    <Router history={history}>
      <Header />
      <main className="container">
        <Container />
      </main>
      {/* <Footer /> */}
    </Router>
  )
}
