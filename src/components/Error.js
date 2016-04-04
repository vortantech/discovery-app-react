import React from 'react'

export default function Error ({location}) {
  const error = (location.state.message)
    ? <div><h2>An error occurred:</h2> <p>{location.state.message}</p></div>
    : <p>An unexpected error occurred. Try resetting your credentials</p>

  return <div>{error}</div>
}
