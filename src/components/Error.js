import React from 'react'

export default function Error ({location}) {
  const error = (location.state.message)
    ? <p>An error occurred: {location.state.message}</p>
    : <p>An unexpected error occurred. Try resetting your credentials</p>

  return <div>{error}</div>
}
