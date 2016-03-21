import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Settings.css'

function SettingsForm ({space, accessToken, handleChange, loadSpace, loadDemoSpace}) {
  return (
    <form onSubmit={loadSpace} styleName='settings-form'>
      <p><a href='https://contentful.com'>Contentful</a> is a content management platform for web applications, mobile apps and connected devices.</p>
      <p>It allows you to create, edit & manage content in the cloud and publish it anywhere via a powerful API.</p>
      <p>The Contentful Discover web app gives you a quick and easy way to preview your content on a web environment, and explore the contents of your Spaces</p>
      <p>You can get your Space ID and Access Token from the API section of the <a href='https://app.contentful.com'>content editing interface</a></p>
      <p>
        <label for='space'>Space ID</label>
        <input id='space' type='text' value={space} onChange={handleChange}/>
      </p>
      <p>
        <label for='accessToken'>Access Token</label>
        <input id='accessToken' type='text' value={accessToken} onChange={handleChange}/>
      </p>
      <button onClick={loadSpace}>Load Space</button>
      <p>Still don't have a Space?</p>
      <p><a href='#' onClick={loadDemoSpace}>Load a demo Space</a> or <a href='https://www.contentful.com/sign-up' target='_blank'>Create an account</a></p>
      <p>This application is Open Source. You can check out the <a href='https://github.com/contentful/contentful-discovery-react'>source code</a>, see how it was built, and suggest your own improvements.</p>
    </form>
  )
}

SettingsForm.propTypes = {
  space: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadSpace: PropTypes.func.isRequired
}

export default CSSModules(SettingsForm, styles)
