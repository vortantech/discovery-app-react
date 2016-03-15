import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './Field.css'
import Thumbnail from '../assets/Thumbnail'
import EntryLinkContainer from './EntryLinkContainer'
import marked from 'marked'

function Field ({definition, content}) {
  return (
    <div styleName='field'>
      <h2>{definition.name}</h2>
      {renderContent(content, definition)}
    </div>
  )
}

/**
 * Determines how to render content for the different kinds of fields
 * https://www.contentful.com/developers/docs/references/content-management-api/#/reference/content-types
 */
function renderContent (content, definition) {
  const {type, linkType} = definition
  if (typeof content === 'undefined' || content === null) {
    return <p>No content</p>
  } else if (type === 'Link' && linkType === 'Entry' && content.sys.type === 'Entry') {
    return renderEntryLink(content)
  } else if (type === 'Link' && linkType === 'Asset' && content.sys.type === 'Asset') {
    return renderAssetLink(content)
  } else if (type === 'Link' && linkType === 'Entry' && content.sys.type === 'Link') {
    return <p>Link to {content.sys.id} is missing.</p>
  } else if (type === 'Link' && linkType === 'Asset' && content.sys.type === 'Link') {
    return <Thumbnail url='missing' fileName='Missing' description={`Link to ${content.sys.id} is missing.`}/>
  } else if (type === 'Array' && Array.isArray(content)) {
    return renderList(content, definition.items)
  } else if (type === 'Location' && isLocation(content)) {
    return renderLocation(content)
  } else if (type === 'Object') {
    return renderObject(content)
  } else if (type === 'Boolean') {
    return renderBoolean(content)
  } else if (type === 'Text') {
    return <p dangerouslySetInnerHTML={renderMarkdown(content)}/>
  } else {
    return <p>{content}</p>
  }
}

function renderMarkdown (content) {
  return {
    __html: marked(content, {sanitize: true})
  }
}

function renderEntryLink (content) {
  return <EntryLinkContainer entryLink={content} />
}

function renderAssetLink (content) {
  return <Link styleName='image-link' to={`/assets/${content.sys.id}`}>
    <Thumbnail url={content.fields.file.url} fileName={content.fields.file.fileName} />
  </Link>
}

function renderList (list, definition) {
  const listStyle = determineListStyle(definition)
  const items = list.map((item, idx) => {
    return <div styleName={`${listStyle}-item`} key={idx}>
      {renderContent(item, definition)}
    </div>
  })
  return <div styleName={`${listStyle}-list`}>{items}</div>
}

function determineListStyle (definition) {
  if (definition.type === 'Link') {
    if (definition.linkType === 'Entry') {
      return 'entries'
    } else if (definition.linkType === 'Asset') {
      return 'asset'
    }
  } else if (definition.type === 'Symbol') {
    return 'symbol'
  }
}

function renderLocation (content) {
  return (
    <div>
      <p>Latitude: {content.lat}</p>
      <p>Longitude: {content.lon}</p>
    </div>
  )
}

function renderObject (content) {
  return <pre><code>{JSON.stringify(content, null, '  ')}</code></pre>
}

function renderBoolean (content) {
  return content ? 'Yes' : 'No'
}

function isLocation (obj) {
  return obj && obj.lat && obj.lon
}

export default CSSModules(Field, styles)
