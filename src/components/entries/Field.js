import React from 'react'
import scour from 'scourjs'

export default function Field ({definition, content}) {
  if (scour(content).get('sys.type')) {
    return <p>Linked content</p>
  } else {
    return (
      <div>
        <h3>{definition.name}</h3>
        <p>{content}</p>
      </div>
    )
  }
}
