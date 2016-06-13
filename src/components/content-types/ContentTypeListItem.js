import React from 'react'
import { Link } from 'react-router'
import {current} from '../List.css'
export default function ContentTypeListItem ({item, location}) {
  function getClassIfCurrentlySelected () {
    return location.pathname.split('/').indexOf(item.sys.id) >= 0 ? current : ''
  }
  return (
    <li className={getClassIfCurrentlySelected()}>
      <Link to={{pathname: `/entries/by-content-type/${item.sys.id}`, query: location.query}}>{item.name}</Link>
    </li>
  )
}
