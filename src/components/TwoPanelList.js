import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './TwoPanelList.css'

function TwoPanelList ({items, ListView, NavView, TitleView, ContentView}) {
  const list = items.map((item) => <ListView key={item.sys.id} item={item}/>)

  return (
    <div styleName='list-container'>
      <div styleName='list'>
        <div styleName='list-nav-view'>{NavView}</div>
        {TitleView}
        <ul>{list}</ul>
      </div>
      <div styleName='list-item-contents'>{ContentView}</div>
    </div>
  )
}

TwoPanelList.propTypes = {
  items: PropTypes.array.isRequired,
  ListView: PropTypes.func.isRequired,
  TitleView: PropTypes.element,
  NavView: PropTypes.element,
  ContentView: PropTypes.element
}

export default CSSModules(TwoPanelList, styles)

export const Placeholder = CSSModules(({content}) => {
  return <div styleName='placeholder'>
    <img src='contentful_logo_120x90@2x.png' />
    <p>{content}</p>
  </div>
}, styles)
