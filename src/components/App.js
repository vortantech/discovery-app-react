import React from 'react'
import {Link} from 'react-router'
import {getClient} from '../services/contentfulClient'
import CSSModules from 'react-css-modules'
import styles from './App.css'

function nav () {
  if (getClient()) {
    return (
      <ul>
        <li><Link to='/entries'>Entries</Link></li>
        <li><Link to='/assets'>Assets</Link></li>
        <li><Link to='/'>Settings</Link></li>
      </ul>
    )
  } else {
    return ''
  }
}

function App (props) {
  return (
    <div styleName='app-container'>
      <nav>
        <div styleName='nav-container'>
          <img src='./contentful.svg' width='157' height='32'/>
          {nav()}
        </div>
      </nav>
      <div styleName='content-container'>
        {props.children}
      </div>
    </div>
  )
}

export default CSSModules(App, styles)
