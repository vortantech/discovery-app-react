import React, {createClass} from 'react'
import {Link} from 'react-router'
import {getClient} from '../../services/contentfulClient'
import {getContentTypes, findContentTypeInList} from '../../services/contentTypeStore'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import EntryListItem from './EntryListItem'
import Entry from './Entry'

export default createClass({
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
      let contentElement
      const backNavLink = <Link to='/entries/by-content-type'>&lt; Back</Link>
      const listTitle = <h3>{this.state.entries.items[0].sys.contentType.name}</h3>
      if (this.props.params.entryId) {
        const entry = this.findEntry(this.props.params.entryId)
        contentElement = <Entry entry={entry} />
      } else {
        contentElement = <Placeholder content='Please select your Entry.' />
      }
      return <TwoPanelList
        items={this.state.entries.items}
        ListView={EntryListItem}
        NavView={backNavLink}
        TitleView={listTitle}
        ContentView={contentElement}
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
