import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import loadable from '@loadable/component'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'

import Nav from './components/Nav'
import { ThemeProvider } from './contexts/theme'

const Popular = loadable(() => import('./components/Popular'))
const Battle = loadable(() => import('./components/Battle'))
const Results = loadable(() => import('./components/Results'))

const App = () => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }, [setTheme])

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className={'container'}>
            <Nav toggleTheme={toggleTheme} />
            <Switch>
              <Route exact path={'/'} component={Popular} />
              <Route exact path={'/battle'} component={Battle} />
              <Route path={'/battle/results'} component={Results} />
              <Route render={() => <h1>404 Not Found</h1>} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
