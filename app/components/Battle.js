import React from 'react'
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa'
import { ThemeConsumer } from '../contexts/theme'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

const Instructions = () => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
      )}
    </ThemeConsumer>
  )
}

class PlayerInput extends React.Component {
  state = {
    username: '',
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username)
  }

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  render() {
    const { username } = this.state
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className={'column player'} onSubmit={this.handleSubmit}>
            <label htmlFor={'username'} className={'player-label'}>
              {this.props.label}
            </label>
            <div className={'row player-inputs'}>
              <input
                type={'text'}
                id={'username'}
                className={`input-${theme}`}
                placeholder={'github username'}
                autoComplete={'off'}
                value={username}
                onChange={this.handleChange}
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
        )}
      </ThemeConsumer>
    )
  }
}

const PlayerPreview = ({ username, onReset, label }) => {
  return (
    <ThemeConsumer>
      {({ theme }) => (
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
      )}
    </ThemeConsumer>
  )
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
  }

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    })
  }

  handleClearPlayer = (id) => {
    this.setState({
      [id]: null,
    })
  }

  render() {
    const { playerOne, playerTwo } = this.state

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <>
            <Instructions />

            <div className={'players-container'}>
              <h1 className={'center-text header-lg'}>Players</h1>
              <div className={'row space-around'}>
                {playerOne === null ? (
                  <PlayerInput
                    label={'Player One'}
                    onSubmit={(player) =>
                      this.handleSubmit('playerOne', player)
                    }
                  />
                ) : (
                  <PlayerPreview
                    username={playerOne}
                    label={'Player One'}
                    onReset={() => this.handleClearPlayer('playerOne')}
                  />
                )}

                {playerTwo === null ? (
                  <PlayerInput
                    label={'Player Two'}
                    onSubmit={(player) =>
                      this.handleSubmit('playerTwo', player)
                    }
                  />
                ) : (
                  <PlayerPreview
                    username={playerTwo}
                    label={'Player Two'}
                    onReset={() => this.handleClearPlayer('playerTwo')}
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
        )}
      </ThemeConsumer>
    )
  }
}
