import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from './Settings.css'

function SettingsForm ({space, accessToken, preview, handleChange, loadSpace, loadDemoSpace}) {
  return (
    <form onSubmit={loadSpace} styleName='settings-form'>
      <p><a href='https://contentful.com'>Contentful</a> is a content management platform for web applications, mobile apps and connected devices.</p>
      <p>It allows you to create, edit & manage content in the cloud and publish it anywhere via a powerful API.</p>
      <p>The Contentful Discover web app gives you a quick and easy way to preview your content on a web environment, and explore the contents of your Spaces</p>
      <p>You can get your Space ID and Access Token from the API section of the <a href='https://app.contentful.com'>Contentful web interface</a></p>
      <div styleName='form-container'>
        <p>
          <label for='space' styleName='label-title'>Space ID</label>
          <input id='space' type='text' value={space} onChange={handleChange}/>
        </p>
        <p>
          <label for='accessToken' styleName='label-title'>Access Token</label>
          <input id='accessToken' type='text' value={accessToken} onChange={handleChange}/>
        </p>
        <p>
          <h3 styleName='label-title'>Preview API</h3>
          <input id='preview' type='checkbox' checked={preview} styleName='checkbox' onChange={handleChange}/>
          <label for='preview'>Check this if you want to use the <a href='https://www.contentful.com/developers/docs/concepts/apis/#content-preview-api'>Preview API</a>.</label>
        </p>
        <p>If you check the box above, make sure the Access Token is valid for use with the Preview API.</p>
        <button type='submit'>Load Space</button>
      </div>
      <p>Still don't have a Space?</p>
      <p><Link to='/entries/by-content-type?space_id=cfexampleapi&access_token=b4c0n73n7fu1'>Load a demo Space</Link> or <a href='https://www.contentful.com/sign-up' target='_blank'>Create an account</a></p>
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
