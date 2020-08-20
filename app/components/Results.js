import React from 'react'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from 'react-icons/fa'

const PlayerResult = ({ header, profile, score }) => {
  return (
    <div className={'card bg-light'}>
      <h4 className={'header-lg center-text'}>{header}</h4>
      <img
        className={'avatar'}
        src={profile.avatar_url}
        alt={`Avatar for ${profile.login}`}
      />
      <h4 className={'center-text'}>Score: {score.toLocaleString()}</h4>
      <h2 className={'center-text'}>
        <a className={'link'} href={profile.html_url} target={'blank'}>
          {profile.login}
        </a>
      </h2>

      <ul className={'card-list'}>
        <li>
          <FaUser color={'rgb(239,115,115)'} size={22} />
          {profile.name}
        </li>
        {profile.location && (
          <li>
            <FaCompass color={'rgb(144,115,255)'} size={22} />
            {profile.location}
          </li>
        )}
        {profile.company && (
          <li>
            <FaBriefcase color={'#795548'} size={22} />
            {profile.company}
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
      </ul>
    </div>
  )
}

export default class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  }

  componentDidMount() {
    const { playerOne, playerTwo } = this.props

    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        })
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        })
      })
  }

  render() {
    const { winner, loser, error, loading } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }

    if (error) {
      return <p className={'center-text error'}>{error}</p>
    }

    return (
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
    )
  }
}
