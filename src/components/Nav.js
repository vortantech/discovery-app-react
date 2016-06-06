import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ToggleButton from './ToggleButton'
import {getClient} from '../services/contentfulClient'
import styles from './Nav.css'
import CSSModules from 'react-css-modules'
import {changeTokenType} from '../actions/actions.js'

const PRODUCTION = 'production'
const PREVIEW = 'preview'
class Nav extends React.Component {
  constructor () {
    super()
    this.state = {currentTokenType: 'preview'}
  }
  handleChange (isProduction) {
    this.setState({currentTokenType: isProduction ? PRODUCTION : PREVIEW})
    changeTokenType(!isProduction)
  }
  getNav () {
    if (getClient()) {
      let previewStyleName = this.state.currentTokenType === PREVIEW ? 'selected' : ''
      let productionStyleName = this.state.currentTokenType === PRODUCTION ? 'selected' : ''
      return (
        <ul>
          <li styleName={previewStyleName}>Preview</li>
          <li><ToggleButton changeHandler={this.handleChange.bind(this)}/></li>
          <li styleName={productionStyleName}>Production</li>
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
