import React from 'react'

export default function Thumbnail ({url, fileName, size = 70}) {
  if (/^\/\/images\./.test(url)) {
    return <img src={`${url}?w=${size}&h=${size}&fit=thumb`} alt={fileName} title={fileName} />
  } else if (fileName) {
    return <span>{fileName}</span>
  }
  return ''
}
