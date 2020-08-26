import React, { useContext } from 'react'
import { ThemeContext } from '../contexts/theme'

const Card = ({ header, subheader, avatar, href, name, children }) => {
  const theme = useContext(ThemeContext)
  return (
    <div className={`card bg-${theme}`}>
      <h4 className={'header-lg center-text'}>{header}</h4>
      <img className={'avatar'} src={avatar} alt={`Avatar for ${name}`} />
      {subheader && <h4 className={'center-text'}>{subheader}</h4>}

      <h2 className={'center-text'}>
        <a className={'link'} href={href} target={'_blank'} rel="noreferrer">
          {name}
        </a>
      </h2>

      {children}
    </div>
  )
}

export default Card
