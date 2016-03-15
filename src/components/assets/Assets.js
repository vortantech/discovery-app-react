import React from 'react'
import {Link} from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './Assets.css'
import Thumbnail from './Thumbnail'

function Assets ({items}) {
  console.log(items)
  const assets = items.map((item) => {
    return <Link styleName='asset-item' key={item.sys.id} to={`/assets/${item.sys.id}`}>
      <Thumbnail url={item.fields.file.url} fileName={item.fields.file.fileName} size='100' />
      <p styleName='asset-label'>{item.fields.title}</p>
    </Link>
  })
  return <div styleName='asset-list'>{assets}</div>
}

export default CSSModules(Assets, styles)
