import React, { useEffect, useState } from 'react'

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

const Loading = ({ text = 'Loading', speed = 300 }) => {
  const [content, setContent] = useState(text)

  useEffect(() => {
    const id = window.setInterval(() => {
      setContent((prevContent) =>
        prevContent === `${text}...` ? text : `${prevContent}.`
      )
    }, speed)

    return () => window.clearInterval(id)
  }, [text, speed])

  return <p style={styles.content}>{content}</p>
}

export default Loading
