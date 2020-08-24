import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import Nav from './components/Nav'

import { ThemeProvider } from './contexts/theme'

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'light' ? 'dark' : 'light',
      }))
    },
  }

  render() {
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className={'container'}>
            <Nav />
            <Battle />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
