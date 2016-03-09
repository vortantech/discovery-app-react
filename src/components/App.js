import React from 'react'
import {Link} from 'react-router'
import {getClient} from '../services/contentfulClient'

function nav () {
  if (getClient()) {
    return (
      <ul>
        <li><Link to='/entries'>Entries</Link></li>
        <li><Link to='/assets'>Assets</Link></li>
      </ul>
    )
  } else {
    return ''
  }
}

export default function App (props) {
  return (
    <div>
      <h1><Link to='/'>Discovery app</Link></h1>
      {nav()}
      {props.children}
    </div>
  )
}
