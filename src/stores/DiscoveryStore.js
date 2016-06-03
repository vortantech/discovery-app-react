import EventEmitter from 'events'
import Dispatcher from '../dispatchers/Dispatcher'
class DiscoveryStore extends EventEmitter {
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
  set (key, data) {
    this.data[key] = data
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
const discoveryStore = new DiscoveryStore()
Dispatcher.register(discoveryStore.handleActions.bind(discoveryStore))
export default discoveryStore
