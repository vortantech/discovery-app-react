import React from 'react'
import scour from 'scourjs'
import CSSModules from 'react-css-modules'
import styles from './Field.css'
import Field from './Field'

function Entry ({entry}) {
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
      <Field key={displayField.id} definition={displayField} content={entry.fields[displayField.id]} styleName='field'/>
      {remainingFields}
    </div>
  )
}

export default CSSModules(Entry, styles)
