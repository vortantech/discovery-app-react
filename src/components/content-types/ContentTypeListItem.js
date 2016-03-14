import React from 'react'
import { Link } from 'react-router'

export default function ContentTypeListItem ({item}) {
  return (
    <li>
      <Link to={`/entries/by-content-type/${item.sys.id}`}>{item.name}</Link>
      <p>{item.description}</p>
    </li>
  )
}
