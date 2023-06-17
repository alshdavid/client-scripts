import * as fs from 'node:fs/promises'
import * as yaml from 'yaml'

export enum CacheControlType {
  Immutable = 'max-age=31536000, immutable, public',
  NoCache = 'max-age=0',
  NormalCache = 'max-age=86400, public',
}

export type CacheControlRule = {
  regex: string | RegExp,
  cacheControl: string | CacheControlType
}

export type CacheControlOptions = {
  defaultCacheControl?: string
  rules: Array<CacheControlRule>
}

export class CacheControl {
  #defaultCacheControl: string
  #rules: Array<CacheControlRule>

  constructor({
    defaultCacheControl = CacheControlType.NormalCache,
    rules
  }: CacheControlOptions) {
    this.#defaultCacheControl = defaultCacheControl
    this.#rules = rules
  }

  static async fromJsonFile(filePath: string) {
    const config = JSON.parse(await fs.readFile(filePath, 'utf8'))
    return new CacheControl(config)
  }

  static async fromYamlFile(filePath: string) {
    const content =  await fs.readFile(filePath, 'utf8')
    return yaml.parse(content)
  } 

  async getCacheControl(pathname: string): Promise<string> {
    for (const test of this.#rules) {
      const r = typeof test.regex === 'string' ? new RegExp(test.regex) : test.regex
      if (pathname.match(r)) {
        return test.cacheControl
      }
    }
    return this.#defaultCacheControl
  }
}
