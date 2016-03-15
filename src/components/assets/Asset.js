import React from 'react'
import CSSModules from 'react-css-modules'
import prettyBytes from 'pretty-bytes'
import formatDate from '../format-date'
import styles from './Asset.css'
import Thumbnail from './Thumbnail'

function Asset ({asset}) {
  return <div styleName='asset-container'>
    <div styleName='preview'>
      <a href={`${asset.fields.file.url}`} target='_blank'>
        <Thumbnail url={asset.fields.file.url} fileName={asset.fields.file.fileName} size='320' />
      </a>
    </div>
    <div styleName='metadata'>
      <h1>{asset.fields.title}</h1>
      <h2>Description</h2>
      <p>{asset.fields.description}</p>
      <h2>Creation Date</h2>
      <p>{formatDate(asset.sys.createdAt)}</p>
      <h2>File Name</h2>
      <p>{asset.fields.file.fileName}</p>
      <h2>URL</h2>
      <p><a href={`${asset.fields.file.url}`} target='_blank'>http:{asset.fields.file.url}</a></p>
      <h2>MIME Type</h2>
      <p>{asset.fields.file.contentType}</p>
      <h2>Size</h2>
      <p>{prettyBytes(asset.fields.file.details.size)}</p>
    </div>
  </div>
}

export default CSSModules(Asset, styles)
