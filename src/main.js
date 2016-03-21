import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, useRouterHistory } from 'react-router'
import { createHistory, useBasename } from 'history'
import localforage from 'localforage'
import { initClient, getClient } from './services/contentfulClient'

import App from './components/App'
import SettingsContainer from './components/settings/SettingsContainer'
import ContentTypesContainer from './components/content-types/ContentTypesContainer'
import EntriesContainer from './components/entries/EntriesContainer'
import Entry from './components/entries/Entry'
import AssetsContainer from './components/assets/AssetsContainer'
import AssetContainer from './components/assets/AssetContainer'
import Error from './components/Error'

localforage.setDriver(localforage.LOCALSTORAGE)

let history = useBasename(useRouterHistory(createHistory))({
  basename: process.env.NODE_ENV === 'production' ? '/discovery-app-react' : ''
})

render((
  <Router history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={SettingsContainer} />
      <Route path='entries/by-content-type' component={ContentTypesContainer} onEnter={requireCredentials}/>
      <Route path='entries/by-content-type/:contentTypeId' component={EntriesContainer} onEnter={requireCredentials}>
        <Route path=':entryId' component={Entry} onEnter={requireCredentials}/>
      </Route>
      <Redirect from='entries' to='entries/by-content-type'/>
      <Route path='assets' component={AssetsContainer} onEnter={requireCredentials}/>
      <Route path='assets/:assetId' component={AssetContainer} onEnter={requireCredentials}/>
      <Route path='error' component={Error}/>
    </Route>
  </Router>
), document.getElementsByTagName('main')[0])

/**
 * Checks if client has been initialized.
 * If not, initializes it, and in case of failure redirects to login page
 * If the client is already initialized, proceeds to the actual route
 */
function requireCredentials (nextState, replace, next) {
  if (!getClient()) {
    localforage.getItem('credentials')
    .then(
      (credentials) => {
        credentials
          ? initializeClient(credentials, next, replace)
          : goToRoot(replace, next)
      },
      () => goToRoot(replace, next)
    )
  } else {
    next()
  }
}

function goToRoot (replace, next) {
  replace('/')
  next()
}

/**
 * Initializes the client and proceeds to the actual route.
 * In case of failure redirects to error page with message
 */
function initializeClient (credentials, next, replace) {
  initClient(credentials.space, credentials.accessToken)
  .then(
    () => next(),
    (err) => {
      replace({
        pathname: '/error',
        state: {
          message: err.message
        }
      })
      next()
    }
  )
}
