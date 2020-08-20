import React from 'react'

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: '20px',
    textAlign: 'center',
  },
}

export default class Loading extends React.Component {
  state = {
    content: this.props.text,
  }

  static defaultProps = {
    speed: 200,
    text: 'Loading',
  }

  componentDidMount() {
    const { text, speed } = this.props

    this.interval = setInterval(() => {
      this.state.content === `${text}...`
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({
            content: content + '.',
          }))
    }, speed)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>
  }
}
