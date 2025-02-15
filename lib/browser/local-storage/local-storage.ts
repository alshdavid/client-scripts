import { Connection, DATABASE_DEFAULT_KEY } from './connection.js'

const DEFAULT_CONNECTION: { ref: Connection | undefined } = { ref: undefined }

function getConn(): Connection {
  if (!DEFAULT_CONNECTION.ref) {
    DEFAULT_CONNECTION.ref = new Connection(DATABASE_DEFAULT_KEY)
  }
  return DEFAULT_CONNECTION.ref
}

export function listItems(): Promise<string[]> {
  return getConn().listItems()
}

export function getItem<T extends string | ArrayBuffer | unknown = unknown>(
  key: string
): Promise<T | null> {
  return getConn().getItem<T>(key)
}

export function setItem(key: string, value: IDBValidKey): Promise<void> {
  return getConn().setItem(key, value)
}

export function removeItem(key: string): Promise<void> {
  return getConn().removeItem(key)
}

export function getItemJson<T = unknown>(key: string): Promise<T | null> {
  return getConn().getItemJson(key)
}

export function setItemJson(key: string, value: any): Promise<void> {
  return getConn().setItemJson(key, value)
}
