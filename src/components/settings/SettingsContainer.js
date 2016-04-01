import React, {createClass, PropTypes} from 'react'
import SettingsForm from './SettingsForm'
import {resetClient} from '../../services/contentfulClient'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      space: this.props.location.query.space_id || '',
      accessToken: this.props.location.query.access_token || ''
    }
  },

  loadSpace (event) {
    event.preventDefault()
    resetClient()
    this.context.router.push({
      pathname: '/entries/by-content-type',
      query: {
        access_token: this.state.accessToken,
        space_id: this.state.space
      }
    })
  },

  handleChange (event) {
    const newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState)
  },

  render () {
    return <SettingsForm
      space={this.state.space}
      accessToken={this.state.accessToken}
      handleChange={this.handleChange}
      loadSpace={this.loadSpace}
      />
  }
})
