import React from 'react'
import {Link} from 'react-router'
import Thumbnail from './Thumbnail'

export default function Assets ({items}) {
  const assets = items.map((item) => {
    return <Link key={item.sys.id} to={`/assets/${item.sys.id}`}>
      <Thumbnail url={item.fields.file.url} fileName={item.fields.file.fileName} size='100' />
    </Link>
  })
  return <div>{assets}</div>
}
