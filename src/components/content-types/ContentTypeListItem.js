import React from 'react'
import { Link } from 'react-router'

export default function ContentTypeListItem ({item}) {
  return (
    <li>
      <Link to={`/entries/by-content-type/${item.sys.id}`}><h3>{item.name}</h3></Link>
      <p>{item.description}</p>
    </li>
  )
}
