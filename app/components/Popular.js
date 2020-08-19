import React from 'react'
import classNames from 'classnames'

import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({ selected, onUpdateLanguages }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'Go']

  return (
    <ul className={'flex-center'}>
      {languages.map((language) => (
        <li key={language}>
          <button
            className={classNames('btn-clear nav-link', {
              active: selected === language,
            })}
            onClick={() => onUpdateLanguages(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage, error: null })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) =>
          this.setState(({ repos }) => ({
            repos: {
              [selectedLanguage]: data,
              ...repos,
            },
            error: null,
          }))
        )
        .catch(() => {
          console.warn('Error fetching repos: ', error)
          this.setState({
            error: `There was an error fetching the repositories.`,
          })
        })
    }
  }

  isLoading() {
    const { selectedLanguage, error, repos } = this.state
    return !repos[selectedLanguage] && error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguages={this.updateLanguage}
        />

        {this.isLoading() && <p>Loading</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
      </>
    )
  }
}
