import React, { useContext, useState } from 'react'
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa'
import { ThemeContext } from '../contexts/theme'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Instructions = () => {
  const theme = useContext(ThemeContext)

  return (
    <div className={'instructionas-container'}>
      <h1 className={'center-text header-lg'}>Instructions</h1>
      <ol className={'container-sm grid center-text battle-instructions'}>
        <li>
          <h3 className={'header-sm'}>Enter two Github users</h3>
          <FaUserFriends
            className={`bg-${theme}`}
            color={'rgb(255,191,116)'}
            size={140}
          />
        </li>

        <li>
          <h3 className={'header-sm'}>Battle</h3>
          <FaFighterJet
            className={`bg-${theme}`}
            color={'#727272'}
            size={140}
          />
        </li>

        <li>
          <h3 className={'header-sm'}>See the winners</h3>
          <FaTrophy
            className={`bg-${theme}`}
            color={'rgb(255,215,0)'}
            size={140}
          />
        </li>
      </ol>
    </div>
  )
}

const PlayerInput = ({ label, onSubmit }) => {
  const theme = useContext(ThemeContext)
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(username)
  }

  const handleChange = (e) => setUsername(e.target.value)

  return (
    <form className={'column player'} onSubmit={handleSubmit}>
      <label htmlFor={'username'} className={'player-label'}>
        {label}
      </label>
      <div className={'row player-inputs'}>
        <input
          type={'text'}
          id={'username'}
          className={`input-${theme}`}
          placeholder={'github username'}
          autoComplete={'off'}
          value={username}
          onChange={handleChange}
        />
        <button
          className={classNames('btn', {
            'light-btn': theme === 'dark',
            'dark-btn': theme === 'light',
          })}
          type={'submit'}
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

const PlayerPreview = ({ username, onReset, label }) => {
  const theme = useContext(ThemeContext)
  return (
    <div className={'column player'}>
      <h3 className={'player-label'}>{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className={'player-info'}>
          <img
            className={'avatar-small'}
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a
            href={`https://github.com/${username}`}
            className={'link'}
            target={'_blank'}
            rel="noreferrer"
          >
            {username}
          </a>
        </div>
        <button className={'btn-clear flex-center'} onClick={onReset}>
          <FaTimesCircle color={'rgb(194,57,42)'} size={26} />
        </button>
      </div>
    </div>
  )
}

const Battle = () => {
  const theme = useContext(ThemeContext)
  const [playerOne, setPlayerOne] = useState(null)
  const [playerTwo, setPlayerTwo] = useState(null)

  const handleSubmit = (id, player) =>
    id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player)

  const handleClearPlayer = (id) =>
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null)

  return (
    <>
      <Instructions />

      <div className={'players-container'}>
        <h1 className={'center-text header-lg'}>Players</h1>
        <div className={'row space-around'}>
          {playerOne === null ? (
            <PlayerInput
              label={'Player One'}
              onSubmit={(player) => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label={'Player One'}
              onReset={() => handleClearPlayer('playerOne')}
            />
          )}

          {playerTwo === null ? (
            <PlayerInput
              label={'Player Two'}
              onSubmit={(player) => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label={'Player Two'}
              onReset={() => handleClearPlayer('playerTwo')}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className={classNames('btn', 'btn-space', {
              'light-btn': theme === 'dark',
              'dark-btn': theme === 'light',
            })}
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </>
  )
}

export default React.memo(Battle)
