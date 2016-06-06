import React, {PropTypes} from 'react'
import styles from './ToggleButton.css'
import CSSModules from 'react-css-modules'
import {changeTokenType} from '../actions/actions.js'
import getID from '../utils/getID'

class ToggleButton extends React.Component {
  componentWillMount () {
    this.state = {isChecked: false}
    this.onChange = this.onChange.bind(this)
    this.toggleId = getID()
  }
  onChange (e) {
    let nextVal = !this.state.isChecked // flip boolean value
    this.setState({
      isChecked: nextVal
    })
    // we need to inverse the nextVal because checked means isPreview === false
    this.props.changeHandler(!nextVal)
    changeTokenType(!nextVal)
  }
  render () {
    return (
      <div>
        <div styleName='onoffswitch'>
          <input type='checkbox' name='onoffswitch' styleName='onoffswitch-checkbox' id={this.toggleId} checked={this.state.isChecked} onChange={this.onChange}/>
          <label styleName='onoffswitch-label' htmlFor={this.toggleId}></label>
        </div>
      </div>
    )
  }
}
ToggleButton.propTypes = {
  changeHandler: PropTypes.func
}
export default CSSModules(ToggleButton, styles)
