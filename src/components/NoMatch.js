import React from 'react'
import {Link} from 'react-router'

export default function NoMatch ({location}) {
  return <p>Oops! You're looking for something that isn't here. You probably want to go back to the <Link to={{pathname: '/', query: location.query}}>main page</Link>.</p>
}
