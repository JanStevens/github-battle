import React, { useCallback, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'
import Results from './components/Results'

const App = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [setTheme])

  const themeProviderValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  )

  return (
    <Router>
      <ThemeProvider value={themeProviderValue}>
        <div className={theme}>
          <div className={'container'}>
            <Nav />
            <Route exact path={'/'} component={Popular} />
            <Route exact path={'/battle'} component={Battle} />
            <Route path={'/battle/results'} component={Results} />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
