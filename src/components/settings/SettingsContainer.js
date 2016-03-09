import React, {createClass, PropTypes} from 'react'
import localforage from 'localforage'
import SettingsForm from './SettingsForm'
import {resetClient} from '../../services/contentfulClient'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      space: '',
      accessToken: ''
    }
  },

  loadSpace () {
    resetClient()
    localforage.setItem('credentials', {
      space: this.state.space,
      accessToken: this.state.accessToken
    })
    .then(() => this.context.router.replace('/entries'))
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
