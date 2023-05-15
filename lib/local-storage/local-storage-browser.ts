import { ILocalStorageAsync } from "./local-storage-interface"

const DATABASE_KEY = 'LocalStorageAsync.DatabaseKey'
const DATABASE_STORE_KEY = 'LocalStorageAsync.DatabaseStoreKey'

export class LocalStorageAsyncBrowser implements ILocalStorageAsync {
  #database: Promise<IDBDatabase>

  constructor() {
    this.#database = new Promise<IDBDatabase>((resolve, reject) => {
      const oRequest = indexedDB.open(DATABASE_KEY)

      oRequest.onupgradeneeded = function () {
        const db = oRequest.result
        db.createObjectStore(DATABASE_STORE_KEY)
      }

      oRequest.onsuccess = function () {
        const db = oRequest.result
        resolve(db)
      }

      oRequest.onerror = function () {
        reject(oRequest.error)
      }
    })
  }

  async listItems(): Promise<string[]> {
    const db = await this.#database
    const tx = db.transaction(DATABASE_STORE_KEY, 'readonly')
    
    const st = tx.objectStore(DATABASE_STORE_KEY)
    const gRequest = st.getAllKeys()

    return new Promise<string[]>(async (resolve, reject) => {
      gRequest.onsuccess = () => {
        resolve(gRequest.result as string[])
      }

      gRequest.onerror = () => {
        reject(gRequest.error)
      }
    })
  } 

  async getItem(key: string): Promise<string | null> {
    const db = await this.#database
    const tx = db.transaction(DATABASE_STORE_KEY, 'readonly')
    
    const st = tx.objectStore(DATABASE_STORE_KEY)
    const gRequest = st.get(key)

    return new Promise<string | null>(async (resolve, reject) => {
      gRequest.onsuccess = () => {
        if (gRequest.result === undefined) {
          resolve(null)
        } else {
          resolve(gRequest.result)
        }
      }

      gRequest.onerror = () => {
        reject(gRequest.error)
      }
    })
  }

  async setItem(key: string, value: string): Promise<void> {
    const db = await this.#database
    const tx = db.transaction(DATABASE_STORE_KEY, 'readwrite')
    
    const st = tx.objectStore(DATABASE_STORE_KEY)
    const sRequest = st.put(value, key)
    
    return new Promise((resolve, reject) => {
      sRequest.onsuccess = function () {
        resolve()
      }

      sRequest.onerror = function () {
        reject(sRequest.error)
      }
    })
  }

  async removeItem(key: string): Promise<void> {
    const db = await this.#database
    const tx = db.transaction(DATABASE_STORE_KEY, 'readwrite')

    const st = tx.objectStore(DATABASE_STORE_KEY)
    const rRequest = st.delete(key)
    
    return new Promise((resolve, reject) => {
      rRequest.onsuccess = function () {
        resolve()
      }

      rRequest.onerror = function () {
        reject(rRequest.error)
      }
    })
  }

  async getItemJson<T = unknown>(key: string): Promise<T | null> {
    const str = await this.getItem(key)
    if (!str) return null
    return JSON.parse(str)
  }

  async setItemJson(key: string, value: any): Promise<void> {
    const str = JSON.stringify(value, null, 2)
    await this.setItem(key, str)
  }

  async close(): Promise<void> {
    const db = await this.#database
    db.close()
  }
}
