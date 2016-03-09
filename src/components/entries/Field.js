import React from 'react'
import { Link } from 'react-router'

export default function Field ({definition, content}) {
  return (
    <div>
      <h3>{definition.name}</h3>
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
  if (type === 'Link' && linkType === 'Entry') {
    return renderEntryLink(content)
  } if (type === 'Link' && linkType === 'Asset') {
    return renderAssetLink(content)
  } if (type === 'Array' && Array.isArray(content)) {
    return renderList(content, definition.items)
  } if (type === 'Location' && isLocation(content)) {
    return renderLocation(content)
  } if (type === 'Object') {
    return renderObject(content)
  } if (type === 'Boolean') {
    return renderBoolean(content)
  } else {
    return <p>{content}</p>
  }
}

function renderEntryLink (content) {
  return 'show linked entries here when the bug is fixed'
  // return <Link to={`/entries/by-content-type/${content.sys.contentType.sys.id}/${content.sys.id}`}>Linked entry</Link>
}

function renderAssetLink (content) {
  return <Link to={`/assets/${content.sys.id}`}>
    {renderFile(content.fields.file.url, content.fields.file.fileName)}
  </Link>
}

function renderFile (url, fileName) {
  return /^\/\/images\./.test(url)
    ? <img src={`${url}?w=70&h=70&fit=thumb`} alt={fileName} title={fileName} />
    : fileName
}

function renderList (list, definition) {
  console.log(definition)
  const items = list.map((item, idx) => {
    return <div key={idx}>
      {renderContent(item, definition)}
    </div>
  })
  // TODO add style for type of list
  //const listStyle = determineListStyle(definition)
  return <div>{items}</div>
}

function determineListStyle (definition) {
  if (definition.type === 'Link') {
    if (definition.linkType === 'Entry') {
      return 'entries-list'
    } else if (definition.linkType === 'Asset') {
      return 'asset-list'
    }
  } else if (definition.type === 'Symbol') {
    return 'symbol-list'
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
