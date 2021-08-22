import DarkMode from 'core/components/common/DarkMode'
import { Layout } from 'core/layout'
import firebase from 'firebase'
import { useDarkMode } from 'hooks/useDarkMode'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { darkTheme, GlobalStyles, lightTheme } from 'styles/theme/GlobalStyles'
import axiosClient from 'core/api'
import Rest from 'core/api/List'
import { SetCurrentUserAction } from 'store/auth/action'
require('dotenv').config()
// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAI3GcyKsXtdKuA1RRJ_eR0ZFUQFVqcbz8',
  authDomain: 'tweet-social-cc0f7.firebaseapp.com',
}
firebase.initializeApp(firebaseConfig)

const App: React.FC = () => {
  console.log('======> App is on', process.env.NODE_ENV)
  const [theme, toggleTheme] = useDarkMode()
  const dispatch = useDispatch()
  const themeMode = theme === 'light' ? lightTheme : darkTheme

  useEffect(() => {
    try {
      axiosClient.get(Rest.checkCurrentUser).then((res) => {
        dispatch(SetCurrentUserAction(res.data.user))
      })
    } catch (e) {}
  }, [dispatch])

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) {
          console.log('not loggin firebase')
        }
        // setIsSignedIn(!!user);
        console.log('user firebase', user)
      })
    return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  }, [])
  return (
    <ThemeProvider theme={themeMode}>
      <DarkMode theme={theme} toggleTheme={toggleTheme} />
      <GlobalStyles />
      <Layout theme={theme}/>
    </ThemeProvider>
  )
}

export default App
