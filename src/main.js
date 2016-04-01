import React, {createClass, PropTypes} from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory as history } from 'react-router'

const Form = createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },

  getInitialState () {
    return {
      qsparam: ''
    }
  },

  submitAction () {
    this.context.router.push({
      pathname: '/page',
      query: {
        qsparam: 'paramvalue'
      }
    })
  },

  render () {
    return <form onSubmit={this.submitAction}>
      <button type='submit'>Submit the thing</button>
    </form>
  }
})

function Page () {
  return <h1>yo!</h1>
}

function App (props) {
  return (
    <div>
      {props.children}
    </div>
  )
}

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Form} />
      <Route path='page' component={Page} onEnter={requireCredentials}/>
    </Route>
  </Router>
), document.getElementsByTagName('main')[0])

function requireCredentials (nextState, replace, next) {
  //debugger
  const query = nextState.location.query
  if (query.qsparam) {
    initializeClient(query.qsparam, next, replace)
  } else {
    next()
  }
}

function initializeClient (param, next, replace) {
  //debugger
  initClient()
  .then(() => {
    //debugger
    next()
  })
}

// mocks the actual client initialization
function initClient () {
  return Promise.resolve('client initialized')
}
