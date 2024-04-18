export interface ILocalStorageAsync {
  listItems(): Promise<string[]>
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
  getItemJson<T = unknown>(key: string): Promise<T | null>
  setItemJson(key: string, value: any): Promise<void>
  close(): Promise<void>
}
