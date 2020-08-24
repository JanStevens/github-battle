import React, { useCallback, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Nav from './components/Nav'

import { ThemeProvider } from './contexts/theme'

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
    <ThemeProvider value={themeProviderValue}>
      <div className={theme}>
        <div className={'container'}>
          <Nav />
          <Battle />
        </div>
      </div>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
