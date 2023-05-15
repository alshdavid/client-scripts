import { LocalStorageAsyncBrowser } from './local-storage-browser'
import { isBrowser, isNode } from '../../platform/environment'

const GLOBAL_KEY = 'localStorageAsync'

export function init() {
  if (isBrowser()) {
    if (Reflect.has(window, GLOBAL_KEY)) {
      return Reflect.get(window, GLOBAL_KEY)
    }

    const localStorageAsync = new LocalStorageAsyncBrowser()
    Reflect.set(window, GLOBAL_KEY, localStorageAsync)
  }

  if (isNode()) {
    if (Reflect.has(global, GLOBAL_KEY)) {
        return Reflect.get(global, GLOBAL_KEY)
    }

    const { LocalStorageAsyncNode } = require('./local-storage-node')
    const localStorageAsync = new LocalStorageAsyncNode()
    Reflect.set(global, GLOBAL_KEY, localStorageAsync)
  }
}
