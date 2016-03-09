import React, {createClass, PropTypes} from 'react'
import {Link} from 'react-router'
import {getClient} from '../../services/contentfulClient'
import {getContentTypes, findContentTypeInList} from '../../services/contentTypeStore'
import TwoPanelList from '../TwoPanelList'
import EntryListItem from './EntryListItem'
import Entry from './Entry'

export default createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      entries: {},
      phase: 'loading'
    }
  },

  componentDidMount () {
    Promise.all([
      getClient().getEntries({
        content_type: this.props.params.contentTypeId
      }),
      getContentTypes()
    ]).then(([entries, contentTypes]) => {
      entries = entries.toPlainObject()
      entries.items = addContentTypesToEntries(entries.items, contentTypes)
      this.setState({
        entries: entries,
        phase: 'loaded'
      })
    })
  },

  findEntry (id) {
    return this.state.entries.items.find((item) => item.sys.id === id)
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Entries...</p>
    } else {
      let entryElement
      let backNavLink = <Link to='/entries/by-content-type'>Back</Link>
      let listTitle = <h3>{this.state.entries.items[0].sys.contentType.name}</h3>
      if (this.props.params.entryId) {
        const entry = this.findEntry(this.props.params.entryId)
        entryElement = <Entry entry={entry} />
      }
      return <TwoPanelList
        items={this.state.entries.items}
        ListView={EntryListItem}
        NavView={backNavLink}
        TitleView={listTitle}
        ContentView={entryElement}
        />
    }
  }
})

function addContentTypesToEntries (entries, contentTypes) {
  return entries.map((entry) => {
    const contentTypeId = entry.sys.contentType.sys.id
    entry.sys.contentType = findContentTypeInList(contentTypes, contentTypeId)
    return entry
  })
}
