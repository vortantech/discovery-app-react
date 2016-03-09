import React, {createClass, PropTypes} from 'react'
import {getClient} from '../../services/contentfulClient'
import {storeContentTypes} from '../../services/contentTypeStore'
import TwoPanelList from '../TwoPanelList'
import ContentTypeListItem from './ContentTypeListItem'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      contentTypes: {},
      phase: 'loading'
    }
  },

  componentDidMount () {
    getClient().getContentTypes()
    .then((contentTypes) => {
      storeContentTypes(contentTypes.items)
      this.setState({
        contentTypes: contentTypes,
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Content Types...</p>
    } else {
      return <TwoPanelList
        items={this.state.contentTypes.items}
        ListView={ContentTypeListItem}
        />
    }
  }
})
