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
      deliveryAccessToken: this.props.location.query.access_token || '',
      previewAccessToken: this.props.location.query.preview_access_token || '',
      selectedApi: isPreviewSetInQuery(this.props.location.query) ? 'preview' : 'delivery',
      validationError: null
    }
  },

  loadSpace (event) {
    event.preventDefault()
    if (!this.state.space) {
      return this.showError('You need to provide a Space ID')
    } else if (this.previewSelected() && !this.state.previewAccessToken) {
      return this.showError('You need to provide a Preview API Access Token if you want to use the Preview API')
    } else if (!this.previewSelected() && !this.state.deliveryAccessToken) {
      return this.showError('You need to provide a Delivery API Access Token if you want to use the Delivery API')
    }
    resetClient()
    const query = {
      access_token: this.state.deliveryAccessToken,
      preview_access_token: this.state.previewAccessToken,
      space_id: this.state.space
    }
    if (this.previewSelected()) {
      query.preview = true
    }
    this.context.router.push({
      pathname: '/entries/by-content-type',
      query: query
    })
  },

  handleChange (event) {
    switch (event.target.id) {
      case 'space':
        this.setState({ space: event.target.value })
        break
      case 'selectedAccessToken':
        this.handleAccessTokenChange(event.target.value)
        break
      case 'api':
        this.setState({ selectedApi: event.target.value, validationError: null })
        break
    }
  },

  showError (message) {
    this.setState({ validationError: message })
  },

  handleAccessTokenChange (accessToken) {
    if (this.previewSelected()) {
      this.setState({
        previewAccessToken: accessToken,
        validationError: null
      })
    } else {
      this.setState({
        deliveryAccessToken: accessToken,
        validationError: null
      })
    }
  },

  previewSelected () {
    return this.state.selectedApi === 'preview'
  },

  render () {
    return <SettingsForm
      space={this.state.space}
      selectedAccessToken={this.previewSelected() ? this.state.previewAccessToken : this.state.deliveryAccessToken}
      selectedApi={this.state.selectedApi}
      handleChange={this.handleChange}
      loadSpace={this.loadSpace}
      validationError={this.state.validationError}
      />
  }
})
