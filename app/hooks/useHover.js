import { useState } from 'react'

const useHover = () => {
  const [hovering, setHovering] = useState(false)

  const onMouseOver = () => setHovering(true)
  const onMouseOut = () => setHovering(false)

  return [hovering, { onMouseOver: onMouseOver, onMouseOut: onMouseOut }]
}

export default useHover
