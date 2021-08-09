import store from 'store'
import { Provider } from 'react-redux'
import { Layout } from 'core/layout'
import { useDarkMode } from 'hooks/useDarkMode'
import {
  GlobalStyles,
  lightTheme,
  darkTheme,
} from 'styles/theme/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import DarkMode from 'core/components/common/DarkMode'
require('dotenv').config()

const App: React.FC = () => {
  console.log('======> App is on', process.env.NODE_ENV)
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? lightTheme : darkTheme
  return (
    <ThemeProvider theme={themeMode}>
        <Provider store={store}>
          <DarkMode theme={theme} toggleTheme={toggleTheme} />
          <GlobalStyles />
          <Layout />
        </Provider>
    </ThemeProvider>
  )
}

export default (App)
