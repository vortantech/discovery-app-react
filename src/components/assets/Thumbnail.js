import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Thumbnail.css'

function Thumbnail ({url, fileName, description, size = 70}) {
  if (/^\/\/images\./.test(url)) {
    return <img src={`${url}?w=${size}&h=${size}&fit=thumb`} alt={fileName} title={fileName} width={size} height={size}/>
  } else if (fileName) {
    const style = {
      width: size + 'px',
      height: size + 'px'
    }
    return <div styleName='file-icon' title={description || fileName} style={style}>{fileName}</div>
  }
  return ''
}

export default CSSModules(Thumbnail, styles)
