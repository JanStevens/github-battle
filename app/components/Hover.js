import React, { useState } from 'react'

const Hover = ({ children }) => {
  const [hovering, setHovering] = useState(false)

  const onMouseOver = () => {
    setHovering(true)
  }
  const onMouseOut = () => {
    setHovering(false)
  }

  return (
    <div onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {children(hovering)}
    </div>
  )
}

export default Hover
