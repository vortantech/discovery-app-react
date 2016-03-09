import React from 'react'
import { Link } from 'react-router'

export default function EntryListItem ({item}) {
  const contentType = item.sys.contentType
  return (
    <li>
      <Link to={`/entries/by-content-type/${item.sys.contentType.sys.id}/${item.sys.id}`}>
        <h3>{item.fields[contentType.displayField]}</h3>
      </Link>
    </li>
  )
}
