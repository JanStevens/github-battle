import React, { useContext, useEffect, useReducer } from 'react'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
  FaCode,
} from 'react-icons/fa'

import loadable from '@loadable/component'

const Card = loadable(() => import('./Card'))
const Loading = loadable(() => import('./Loading'))
const Tooltip = loadable(() => import('./Tooltip'))

import { ThemeContext } from '../contexts/theme'
import classNames from 'classnames'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

const PlayerResult = ({ header, profile, score }) => {
  return (
    <Card
      header={header}
      subheader={`Score: ${score.toLocaleString()}`}
      avatar={profile.avatar_url}
      href={profile.html_url}
      name={profile.login}
    >
      <ul className={'card-list'}>
        <li>
          <FaUser color={'rgb(239,115,115)'} size={22} />
          {profile.name}
        </li>
        {profile.location && (
          <li>
            <Tooltip text={"User's Location"}>
              <FaCompass color={'rgb(144,115,255)'} size={22} />
              {profile.location}
            </Tooltip>
          </li>
        )}
        {profile.company && (
          <li>
            <Tooltip text={"User's Company"}>
              <FaBriefcase color={'#795548'} size={22} />
              {profile.company}
            </Tooltip>
          </li>
        )}
        <li>
          <FaUsers color={'rgb(129,195,245)'} size={22} />
          {profile.followers.toLocaleString()} followers
        </li>

        <li>
          <FaUserFriends color={'rgb(64,183,95)'} size={22} />
          {profile.following.toLocaleString()} following
        </li>

        <li>
          <FaCode color={'rgb(62,76,82)'} size={22} />
          {profile.public_repos.toLocaleString()} repositories
        </li>
      </ul>
    </Card>
  )
}

const battleReducer = (state, action) => {
  switch (action.type) {
    case 'success':
      return {
        ...state,
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false,
      }
    case 'error':
      return {
        ...state,
        error: action.message,
        loading: false,
      }

    default:
      throw new Error('The action type is not supported')
  }
}

const Results = ({ location }) => {
  const theme = useContext(ThemeContext)
  const { playerOne, playerTwo } = queryString.parse(location.search)
  const [state, dispatch] = useReducer(battleReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    battle([playerOne, playerTwo])
      .then(([winner, loser]) => dispatch({ type: 'success', winner, loser }))
      .catch(({ message }) => dispatch({ type: 'error', message }))
  }, [playerOne, playerTwo])

  const { winner, loser, loading, error } = state

  if (loading === true) {
    return <Loading text={'Batteling'} />
  }

  if (error) {
    return <p className={'center-text error'}>{error}</p>
  }

  return (
    <>
      <div className={'grid space-around container-sm'}>
        <PlayerResult
          header={winner.score === loser.score ? 'Tie' : 'Winner'}
          score={winner.score}
          profile={winner.profile}
        />

        <PlayerResult
          header={winner.score === loser.score ? 'Tie' : 'Loser'}
          score={loser.score}
          profile={loser.profile}
        />
      </div>
      <Link
        to={'/battle'}
        className={classNames('btn', 'btn-space', {
          'light-btn': theme === 'dark',
          'dark-btn': theme === 'light',
        })}
      >
        Reset
      </Link>
    </>
  )
}

export default Results
