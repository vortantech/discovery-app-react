import {getClient} from './contentfulClient'

let contentTypesStorage

function loadFromStorage () {
  const stringifiedContentTypes = window.sessionStorage.getItem('contentTypes')
  contentTypesStorage = stringifiedContentTypes ? JSON.parse(stringifiedContentTypes) : null
}

function getContentTypes () {
  loadFromStorage()
  if (contentTypesStorage) {
    return Promise.resolve(contentTypesStorage)
  } else {
    return getClient().getContentTypes()
    .then((response) => {
      storeContentTypes(response.items)
      return contentTypesStorage
    })
  }
}

function findContentTypeInList (contentTypes, id) {
  return contentTypes.find((item) => item.sys.id === id)
}

function findContentType (id) {
  return getContentTypes()
  .then((contentTypes) => findContentTypeInList(contentTypes, id))
}

function storeContentTypes (contentTypes) {
  contentTypesStorage = contentTypes
  window.sessionStorage.setItem('contentTypes', JSON.stringify(contentTypes))
}

loadFromStorage()

export {
  storeContentTypes,
  getContentTypes,
  findContentTypeInList,
  findContentType
}
