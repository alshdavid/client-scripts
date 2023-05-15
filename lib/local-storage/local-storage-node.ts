import * as fsSync from 'node:fs'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import { ILocalStorageAsync } from './local-storage-interface'
import { sha1 } from '../crypto'

const DATABASE_STORE_KEY = 'LocalStorageAsync.DatabaseStoreKey'

const tempDir = process.env.TEMP_DIR || path.join(process.cwd(), '.temp')
const store = path.join(tempDir, 'local-storage')

export class LocalStorageAsyncNode implements ILocalStorageAsync {
  #storeKey: string

  constructor(storeKey: string = '') {
    this.#storeKey = storeKey
  }

  listItems(): Promise<string[]> {
    return fs.readdir(store)
  }

  close(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getItem(key: string): Promise<string | null> {
    const keySlug = await sha1(key)
    const target = path.join(store, this.#storeKey, keySlug)
    if (!fsSync.existsSync(target)) {
      return null
    }
    return await fs.readFile(target, { encoding: 'utf8' })
  }

  async setItem(key: string, value: string): Promise<void> {
    const keySlug = await sha1(key)
    const target = path.join(store, this.#storeKey, keySlug)
    if (!fsSync.existsSync(store)) {
      await fs.mkdir(store, { recursive: true })
    }
    await fs.writeFile(target, value, { encoding: 'utf8' })
  }

  async removeItem(key: string): Promise<void> {
    const keySlug = await sha1(key)
    const target = path.join(store, this.#storeKey, keySlug)
    if (fsSync.existsSync(target)) {
      await fs.rm(target)
    }
  }

  async getItemJson<T = unknown>(key: string): Promise<T | null> {
    const str = await this.getItem(key)
    if (!str) return null
    return JSON.parse(str)
  }

  async setItemJson<T = any>(key: string, value: T): Promise<void> {
    const str = JSON.stringify(value, null, 2)
    await this.setItem(key, str)
  }
}
