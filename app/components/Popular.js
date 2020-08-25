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
import { Card } from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

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
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null,
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = (selectedLanguage) => {
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
          console.warn('Error fetching repos: ', this.state.error)
          this.setState({
            error: `There was an error fetching the repositories.`,
          })
        })
    }
  }

  isLoading = () => {
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

        {this.isLoading() && <Loading text={'Fetcing Repos'} />}

        {error && <p className={'center-text error'}>{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    )
  }
}

function ReposGrid({ repos }) {
  return (
    <div className={'grid space-around'}>
      {repos.map(
        (
          {
            id,
            name,
            description,
            owner: { login, avatar_url },
            html_url,
            stargazers_count,
            forks,
            open_issues,
          },
          i
        ) => {
          return (
            <Card
              key={id}
              header={`#${i + 1}`}
              avatar={avatar_url}
              name={name}
              href={html_url}
            >
              {description && (
                <small>
                  {emojify(description, {
                    style: { height: '14', margin: '0' },
                  })}
                </small>
              )}
              <ul className={'card-list'}>
                <li>
                  <Tooltip text={'Github username'}>
                    <FaUser color={'rgb(255,191,116)'} size={22} />
                    <a
                      href={`https://github.com/${login}`}
                      target={'_blank'}
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  </Tooltip>
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
            </Card>
          )
        }
      )}
    </div>
  )
}
