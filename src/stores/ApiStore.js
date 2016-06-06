import EventEmitter from 'events'
import Dispatcher from '../dispatchers/Dispatcher'
class ApiStore extends EventEmitter {
  constructor () {
    super()
    this.data = this.getInitialState()
  }
  getInitialState () {
    return {
      currentAccessToken: '',
      isPreview: true
    }
  }
  set (key, value) {
    this.data[key] = value
  }
  get (key) {
    return this.data[key]
  }
  addListener (type, listener) {
    this.on(type, listener)
  }
  handleActions (action) {
    this.set('isPreview', action.isPreview)
    this.emit('API_SELECTION_CHANGE')
  }
}
const apiStore = new ApiStore()
Dispatcher.register(apiStore.handleActions.bind(apiStore))
export default apiStore
