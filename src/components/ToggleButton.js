import React, {PropTypes} from 'react'
import styles from './ToggleButton.css'
import CSSModules from 'react-css-modules'
import {changeTokenType} from '../actions/actions.js'
class ToggleButton extends React.Component {
  componentWillMount () {
    this.state = {isChecked: true}
    this.onChange = this.onChange.bind(this)
  }
  onChange (e) {
    this.setState({
      isChecked: !this.state.isChecked // flip boolean value
    })
    this.props.changeHandler(!this.state.isChecked)
    changeTokenType(!this.state.isChecked)
  }
  render () {
    return (
      <div>
        <div styleName='onoffswitch'>
          <input type='checkbox' name='onoffswitch' styleName='onoffswitch-checkbox' id='myonoffswitch' checked={this.state.isChacked} onChange={this.onChange}/>
          <label styleName='onoffswitch-label' htmlFor='myonoffswitch'></label>
        </div>
      </div>
    )
  }
}
ToggleButton.propTypes = {
  changeHandler: PropTypes.func
}
export default CSSModules(ToggleButton, styles)
