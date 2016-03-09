import React, {PropTypes} from 'react'

function SettingsForm ({space, accessToken, handleChange, loadSpace}) {
  return (
    <form onSubmit={loadSpace}>
      <input id='space' type='text' value={space} onChange={handleChange}/>
      <input id='accessToken' type='text' value={accessToken} onChange={handleChange}/>
      <button onClick={loadSpace}>Load Space</button>
    </form>
  )
}

SettingsForm.propTypes = {
  space: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  loadSpace: PropTypes.func.isRequired
}

export default SettingsForm
