import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './list.css'

function TwoPanelList ({items, ListView, NavView, TitleView, ContentView}) {
  const list = items.map((item) => <ListView key={item.sys.id} item={item}/>)

  return (
    <div styleName='list-container'>
      {NavView}
      {TitleView}
      <ul styleName='list'>{list}</ul>
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
