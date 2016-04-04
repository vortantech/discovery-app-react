import React, {createClass, PropTypes} from 'react'
import SettingsForm from './SettingsForm'
import {resetClient} from '../../services/contentfulClient'
import isPreviewSetInQuery from '../../utils/is-preview-set-in-query'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      space: this.props.location.query.space_id || '',
      accessToken: this.props.location.query.access_token || '',
      preview: isPreviewSetInQuery(this.props.location.query) || false
    }
  },

  loadSpace (event) {
    event.preventDefault()
    resetClient()
    this.context.router.push({
      pathname: '/entries/by-content-type',
      query: {
        access_token: this.state.accessToken,
        space_id: this.state.space,
        preview: this.state.preview
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
      preview={this.state.preview}
      handleChange={this.handleChange}
      loadSpace={this.loadSpace}
      />
  }
})
