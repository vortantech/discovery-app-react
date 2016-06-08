import Dispatcher from '../dispatchers/Dispatcher'

export function changeTokenType (isPreview) {
  Dispatcher.dispatch({
    type: 'API_SELECTION_CHANGE',
    isPreview
  })
}
