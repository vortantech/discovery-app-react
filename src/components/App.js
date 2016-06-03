import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.css'
import Nav from './Nav'
class App extends React.Component {
  render () {
    return (
      <div styleName='app-container'>
        <nav>
          <div styleName='nav-container'>
            <img src='./contentful.svg' width='157' height='32'/>
            <Nav query={this.props.location.query} />
          </div>
        </nav>
        <div styleName='content-container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CSSModules(App, styles)
