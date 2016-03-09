import React from 'react'
import scour from 'scourjs'
import Field from './Field'

export default function Entry ({entry}) {
  const contentType = scour(entry.sys.contentType)
  const fields = contentType.go('fields')
  const fieldsWithoutDisplay = fields.filter((field) => {
    return field.get('id') !== contentType.get('displayField')
  })
  const displayField = fields.find({id: contentType.get('displayField')}).value
  const remainingFields = fieldsWithoutDisplay.map((field) => {
    const id = field.get('id')
    return <Field key={id} definition={field.value} content={entry.fields[id]}/>
  })
  return (
    <div>
      <Field key={displayField.id} definition={displayField} content={entry.fields[displayField.id]}/>
      {remainingFields}
    </div>
  )
}
