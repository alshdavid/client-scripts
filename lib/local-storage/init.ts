import { LocalStorageAsyncBrowser } from './local-storage-browser'
import { isBrowser, isNode } from '../../platform/environment'
import { ILocalStorageAsync } from './local-storage-interface'

const GLOBAL_KEY = 'localStorageAsync'

export function init(storeKey?: string): ILocalStorageAsync {
  let globalKey = GLOBAL_KEY

  if (storeKey) {
    globalKey += `_${storeKey}`
  }

  if (isBrowser()) {
    if (Reflect.has(window, globalKey)) {
      return Reflect.get(window, globalKey)
    }

    const localStorageAsync = new LocalStorageAsyncBrowser(storeKey)
    Reflect.set(window, globalKey, localStorageAsync)
    return localStorageAsync
  }

  if (isNode()) {
    if (Reflect.has(global, globalKey)) {
      return Reflect.get(global, globalKey)
    }

    const { LocalStorageAsyncNode } = require('./local-storage-node')
    const localStorageAsync = new LocalStorageAsyncNode(storeKey)
    Reflect.set(global, globalKey, localStorageAsync)
    return localStorageAsync
  }

  throw new Error('Cannot determine environment')
}
