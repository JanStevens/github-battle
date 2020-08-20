import React from 'react'
import { battle } from '../utils/api'
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaUser,
} from 'react-icons/fa'
import { Card } from './Card'

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
    </Card>
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
    const { onReset } = this.props

    if (loading === true) {
      return <p>LOADING</p>
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
        <button onClick={onReset} className={'btn dark-btn btn-space'}>
          Reset
        </button>
      </>
    )
  }
}
