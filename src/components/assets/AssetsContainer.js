import React, {createClass, PropTypes} from 'react'
import {getClient} from '../../services/contentfulClient'
import Assets from './Assets'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      assets: {},
      phase: 'loading'
    }
  },

  componentDidMount () {
    getClient().getAssets()
    .then((assets) => {
      this.setState({
        assets: assets.toPlainObject(),
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Assets...</p>
    } else {
      return <Assets items={this.state.assets.items}/>
    }
  }
})
