import { isBrowser, isNode } from '../../platform/environment'
import { LocalStorageAsyncBrowser } from './local-storage-browser'
import { ILocalStorageAsync } from './local-storage-interface'

export class LocalStorageAsync implements ILocalStorageAsync {
  #localStorageAsync: ILocalStorageAsync

  constructor(
    storeKey?: string
  ) {
    if (isNode()) {
      const { LocalStorageAsyncNode } = require('./local-storage-node')
      this.#localStorageAsync = new LocalStorageAsyncNode(storeKey)
    } else {
      this.#localStorageAsync = new LocalStorageAsyncBrowser(storeKey)
    }
  }

  listItems(): Promise<string[]> {
    return this.#localStorageAsync.listItems()
  }

  getItem(key: string): Promise<string | null> {
    return this.#localStorageAsync.getItem(key)
  }

  setItem(key: string, value: string): Promise<void> {
    return this.#localStorageAsync.setItem(key, value)
  }

  removeItem(key: string): Promise<void> {
    return this.#localStorageAsync.removeItem(key)
  }

  getItemJson<T = unknown>(key: string): Promise<T | null> {
    return this.#localStorageAsync.getItemJson(key)
  }

  setItemJson(key: string, value: any): Promise<void> {
    return this.#localStorageAsync.setItemJson(key, value)
  }

  close(): Promise<void> {
    return this.#localStorageAsync.close()
  }
}
