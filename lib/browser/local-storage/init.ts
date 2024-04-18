import { LocalStorageAsyncBrowser } from './local-storage-browser.js'
import { ILocalStorageAsync } from './local-storage-interface.js'

const GLOBAL_KEY = 'localStorageAsync'

export function init(storeKey?: string): ILocalStorageAsync {
  let globalKey = GLOBAL_KEY

  if (storeKey) {
    globalKey += `_${storeKey}`
  }

  if (Reflect.has(window, globalKey)) {
    return Reflect.get(window, globalKey)
  }

  const localStorageAsync = new LocalStorageAsyncBrowser(storeKey)
  Reflect.set(window, globalKey, localStorageAsync)
  return localStorageAsync
}
