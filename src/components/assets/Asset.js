import React from 'react'
import Thumbnail from './Thumbnail'

export default function Asset ({asset}) {
  console.log(asset)
  return <div>
    <Thumbnail url={asset.fields.file.url} fileName={asset.fields.file.fileName} size='320' />
    <div>
      <h2>Title</h2>
      <p>{asset.fields.title}</p>
      <h2>Description</h2>
      <p>{asset.fields.description}</p>
      <h2>Creation Date</h2>
      <p>{asset.sys.createdAt}</p>
      <h2>File Name</h2>
      <p>{asset.fields.file.fileName}</p>
      <h2>URL</h2>
      <p>http:{asset.fields.file.url}</p>
      <h2>MIME Type</h2>
      <p>{asset.fields.file.contentType}</p>
      <h2>Size</h2>
      <p>{asset.fields.file.details.size} Bytes</p>
    </div>
  </div>
}
