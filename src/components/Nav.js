import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ToggleButton from './ToggleButton'
import {getClient} from '../services/contentfulClient'
import styles from './Nav.css'
import CSSModules from 'react-css-modules'
class Nav extends React.Component {
  constructor () {
    super()
    this.state = {currentTokenType: 'preview'}
  }
  handleChange (isPreview) {
    this.setState({currentTokenType: isPreview ? 'preview' : 'production'})
  }
  getNav () {
    if (getClient()) {
      return (
        <ul>
          <li styleName={this.state.currentTokenType === 'preview' ? 'selected' : ''}>Preview</li>
          <li><ToggleButton changeHandler={this.handleChange.bind(this)}/></li>
          <li styleName={this.state.currentTokenType === 'production' ? 'selected' : ''}>Production</li>
          <li><Link to={{pathname: '/entries', query: this.props.query}}>Entries</Link></li>
          <li><Link to={{pathname: '/assets', query: this.props.query}}>Assets</Link></li>
          <li><Link to={{pathname: '/', query: this.props.query}}>Settings</Link></li>
        </ul>
      )
    }
    return null
  }
  render () {
    return this.getNav()
  }
}
Nav.propTypes = {
  query: PropTypes.object.isRequired
}
export default CSSModules(Nav, styles)
