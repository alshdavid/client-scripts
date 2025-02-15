import { ILocalStorageAsync } from './local-storage-interface.js'

const GLOBAL_KEY = 'localStorageAsync'

export function init(storeKey?: string): ILocalStorageAsync {
  let globalKey = GLOBAL_KEY

  if (storeKey) {
    globalKey += `_${storeKey}`
  }

  if (Reflect.has(global, globalKey)) {
    return Reflect.get(global, globalKey)
  }

  const { LocalStorageAsyncNode } = require('./local-storage-node')
  const localStorageAsync = new LocalStorageAsyncNode(storeKey)
  Reflect.set(global, globalKey, localStorageAsync)
  return localStorageAsync
}
