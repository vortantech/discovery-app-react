import React from 'react'
import scour from 'scourjs'

export default function Asset ({asset}) {
  console.log(asset)
  /*
  const contentType = scour(asset.sys.contentType)
  const fields = contentType.go('fields')
  const fieldsWithoutDisplay = fields.filter((field) => {
    return field.get('id') !== contentType.get('displayField')
  })
  const displayField = fields.find({id: contentType.get('displayField')}).value
  const remainingFields = fieldsWithoutDisplay.map((field) => {
    const id = field.get('id')
    return <Field key={id} definition={field.value} content={asset.fields[id]}/>
  })
  return (
    <div>
      <Field key={displayField.id} definition={displayField} content={asset.fields[displayField.id]}/>
      {remainingFields}
    </div>
  )
  */
  return <div>
    {asset.sys.id}
  </div>
}
