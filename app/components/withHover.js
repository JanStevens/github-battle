import React from 'react'

const withHover = (Component, propName = 'hovering') => {
  return class WithHover extends React.Component {
    state = {
      hovering: false,
    }

    mouseOver = () => {
      this.setState({
        hovering: true,
      })
    }

    mouseOut = () => {
      this.setState({
        hovering: false,
      })
    }

    render() {
      const { hovering } = this.state
      const props = {
        [propName]: hovering,
        ...this.props,
      }

      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      )
    }
  }
}

export default withHover
