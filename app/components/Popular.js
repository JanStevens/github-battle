import React, { useEffect, useReducer, useRef, useState } from 'react'
import classNames from 'classnames'

import { fetchPopularRepos } from '../utils/api'
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from 'react-icons/fa'
import { emojify } from 'react-emojione'
import loadable from '@loadable/component'

const Card = loadable(() => import('./Card'))
const Loading = loadable(() => import('./Loading'))
const Tooltip = loadable(() => import('./Tooltip'))

const languages = [
  'All',
  'JavaScript',
  'Ruby',
  'Java',
  'CSS',
  'Python',
  'Elixir',
  'Go',
]

const LanguagesNav = ({ selected, onUpdateLanguages }) => {
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

const ReposGrid = ({ repos }) => {
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

const popularReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        [action.selectedLanguage]: action.repos,
        errors: null,
      }
    case 'error':
      return {
        ...state,
        error: action.error.message,
      }

    default:
      throw new Error('That action type isnt supported.')
  }
}

const Popular = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [state, dispatch] = useReducer(popularReducer, { error: null })

  const fetchedLanguages = useRef([])

  useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage)

      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: 'success', selectedLanguage, repos }))
        .catch((error) => dispatch({ type: 'error', error }))
    }
  }, [fetchedLanguages, selectedLanguage])

  const isLoading = () => !state[selectedLanguage] && state.error === null

  return (
    <>
      <LanguagesNav
        selected={selectedLanguage}
        onUpdateLanguages={setSelectedLanguage}
      />

      {isLoading() && <Loading text={'Fetching Repos'} />}

      {state.error && <p className={'center-text error'}>{state.error}</p>}

      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </>
  )
}

export default Popular
