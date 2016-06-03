import React from 'react'
import {Link} from 'react-router'
import {getClient} from '../services/contentfulClient'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import ToggleButton from './ToggleButton'
function nav (query) {
  if (getClient()) {
    return (
      <ul>
        <li><Link to={{pathname: '/entries', query: query}}>Entries</Link></li>
        <li><Link to={{pathname: '/assets', query: query}}>Assets</Link></li>
        <li><Link to={{pathname: '/', query: query}}>Settings</Link></li>
      </ul>
    )
  } else {
    return ''
  }
}
function getToggle () {
  if (getClient()) {
    return <ToggleButton />
  }
  return ''
}
class App extends React.Component {
  render () {
    return (
      <div styleName='app-container'>
        <nav>
          <div styleName='nav-container'>
            <img src='./contentful.svg' width='157' height='32'/>
            {getToggle()}
            {nav(this.props.location.query)}
          </div>
        </nav>
        <div styleName='content-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
