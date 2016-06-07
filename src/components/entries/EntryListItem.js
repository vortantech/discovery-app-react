import React from 'react'
import { Link } from 'react-router'

export default function EntryListItem ({item, location}) {
  const contentType = item.sys.contentType
  return (
    <li>
      <Link to={{pathname: `/entries/by-content-type/${contentType.sys.id}/${item.sys.id}`, query: location.query}}>
        {item.fields[contentType.displayField]}
      </Link>
    </li>
  )
}
