import React from 'react'
import classNames from 'classnames'

function LanguagesNav({ selected, onUpdateLanguages }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'Go']

  return (
    <ul className={'flex-center'}>
      {languages.map((language) => (
        <li key={language}>
          <button
            className={classNames('btn-clear nav-link', {
              active: selected === language,
            })}
            onClick={() => onUpdateLanguages(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default class Popular extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLanguage: 'All',
    }
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage })
  }

  render() {
    const { selectedLanguage } = this.state

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguages={this.updateLanguage}
        />
      </>
    )
  }
}
