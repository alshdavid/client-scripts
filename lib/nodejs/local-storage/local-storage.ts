import { LocalStorageAsyncNode } from './local-storage-node.js'
import { ILocalStorageAsync } from './local-storage-interface.js'

export class LocalStorageAsync implements ILocalStorageAsync {
  #localStorageAsync: ILocalStorageAsync

  constructor(storeKey?: string) {
    this.#localStorageAsync = new LocalStorageAsyncNode(storeKey)
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
