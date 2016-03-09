import {createClient} from 'contentful'

let client
let authorized

function initClient (space, accessToken) {
  client = createClient({
    space: space,
    accessToken: accessToken
  })
  return client.getSpace()
  .then(() => {
    authorized = true
    return authorized
  })
}

function getClient () {
  return authorized && client
}

function resetClient () {
  authorized = false
}

export {
  initClient,
  getClient,
  resetClient
}
