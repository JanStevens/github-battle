import React from 'react'
import classNames from 'classnames'

import { fetchPopularRepos } from '../utils/api'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { emojify } from 'react-emojione'

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

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    )
  }
}

function ReposGrid({ repos }) {
  return (
    <ul className={'grid space-around'}>
      {repos.map(
        (
          {
            id,
            name,
            description,
            owner,
            owner: { login, avatar_url },
            html_url,
            stargazers_count,
            forks,
            open_issues,
          },
          i
        ) => {
          return (
            <li key={id} className={'repo bg-light'}>
              <h4 className={'header-lg center-text'}>#{i + 1}</h4>
              <img
                className={'avatar'}
                src={avatar_url}
                alt={`Avatar for ${login}`}
              />
              <h2 className={'text-center'}>
                <a className={'link'} href={html_url}>
                  {login}
                </a>
              </h2>
              {description && (
                <small>
                  {emojify(description, {
                    style: { height: '14', margin: '0' },
                  })}
                </small>
              )}
              <ul className={'card-list'}>
                <li>
                  <FaUser color={'rgb(255,191,116)'} size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color={'rgb(255,215,0)'} size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>

                <li>
                  <FaCodeBranch color={'rgb(129,195,245)'} size={22} />
                  {forks.toLocaleString()} forks
                </li>

                <li>
                  <FaExclamationTriangle color={'rgb(241,138,147)'} size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </li>
          )
        }
      )}
    </ul>
  )
}
