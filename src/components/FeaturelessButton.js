import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './FeaturelessButton.css'

function FeaturelessButton ({label, action}) {
  return <button type='button' onClick={action} styleName='button'>{label}</button>
}

export default CSSModules(FeaturelessButton, styles)
