import React, {createClass} from 'react'
import {Link} from 'react-router'
import concat from 'unique-concat'
import {getClient} from '../../services/contentfulClient'
import {getContentTypes, findContentTypeInList} from '../../services/contentTypeStore'
import TwoPanelList, {Placeholder} from '../TwoPanelList'
import EntryListItem from './EntryListItem'
import Entry from './Entry'
import FeaturelessButton from '../FeaturelessButton'

export default createClass({
  getInitialState () {
    return {
      entries: [],
      skip: 0,
      total: undefined,
      phase: 'loading'
    }
  },

  componentDidMount () {
    this.loadEntries()
  },

  findEntry (id) {
    return this.state.entries.find((item) => item.sys.id === id)
  },

  loadEntries () {
    Promise.all([
      getClient().getEntries({
        content_type: this.props.params.contentTypeId,
        skip: this.state.skip,
        limit: 100,
        order: 'sys.createdAt'
      }),
      getContentTypes()
    ]).then(([entriesResponse, contentTypes]) => {
      entriesResponse = entriesResponse.toPlainObject()
      entriesResponse.items = addContentTypesToEntries(entriesResponse.items, contentTypes)
      this.setState({
        entries: concat(this.state.entries, entriesResponse.items, (entry) => entry.sys.id),
        skip: this.state.skip + entriesResponse.limit,
        total: entriesResponse.total,
        phase: 'loaded'
      })
    })
  },

  render () {
    if (this.state.phase === 'loading') {
      return <p>Loading your Entries...</p>
    } else {
      let contentElement, loadMoreElement
      const backNavLink = <Link to='/entries/by-content-type'>&lt; Back</Link>
      const listTitle = <h3>{this.state.entries[0].sys.contentType.name}</h3>
      if (this.props.params.entryId) {
        const entry = this.findEntry(this.props.params.entryId)
        contentElement = <Entry entry={entry} />
      } else {
        contentElement = <Placeholder content='Please select your Entry.' />
      }

      if (this.state.entries.length < this.state.total) {
        loadMoreElement = <FeaturelessButton label='Load more' action={this.loadEntries}/>
      }

      return <TwoPanelList
        items={this.state.entries}
        ListView={EntryListItem}
        NavView={backNavLink}
        TitleView={listTitle}
        ContentView={contentElement}
        ListActionView={loadMoreElement}
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
