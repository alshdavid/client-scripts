import * as Bucket from '../bucket/index.js'
import * as CloudFront from '../cloudfront/index.js'
import * as CacheControl from '../../cache-control/index.js'
import * as Local from '../../dirs/index.js'

export type SyncServiceOptions = {
  bucketService: Bucket.BucketService,
  cacheControl?: CacheControl.CacheControl | CacheControl.CacheControlType,
  cloudFrontService?: CloudFront.Cloudfront,
}

export class SyncService {
  #bucketService: Bucket.BucketService
  #cloudFrontService?: CloudFront.Cloudfront
  #cacheControl: CacheControl.CacheControl | CacheControl.CacheControlType
  #localFileList: Local.GetFileListResults = {}
  #remoteFileHashes: Record<string, Bucket.MD5Hash>
  #bucketPrefixes: Array<string>
  #toPutList: Array<string>
  #toUpdateList: Array<string>
  #toDeleteList: Array<string>
  #committed: boolean

  constructor({
    bucketService,
    cacheControl,
    cloudFrontService,
  }: SyncServiceOptions) {
    this.#bucketService = bucketService
    this.#cacheControl = cacheControl || CacheControl.CacheControlType.NormalCache
    this.#cloudFrontService = cloudFrontService
    this.#localFileList = {}
    this.#remoteFileHashes = {}
    this.#bucketPrefixes = []
    this.#toPutList = []
    this.#toUpdateList = []
    this.#toDeleteList = []
    this.#committed = false
  }

  async addLocalFolder(folderPath: string, prefix? :string) {
    this.#localFileList = { 
      ...this.#localFileList,
      ...Local.getFileList({ folderPath, prefix }) 
    }
  }

  async addBucketPrefix(prefix: string) {
    this.#bucketPrefixes.push(prefix)
  }

  async *commit() {
    if (this.#committed) return
    this.#committed = true

    if (!this.#bucketPrefixes.length) this.#bucketPrefixes.push('')
    for (const bucketPrefix of this.#bucketPrefixes) {
      this.#remoteFileHashes = { 
        ...this.#remoteFileHashes,
        ...await this.#bucketService.getFileList({ Prefix: bucketPrefix }),
      }
    }

    this.#calculateDiff()
    if (!this.#hasDiff()) return

    for (const keyPath of this.#toPutList) {
      const file = this.#localFileList[keyPath]
      const cacheControl = await this.#getCacheControl('/' + keyPath)
      yield { action: 'NEW', key: keyPath }
      await this.#bucketService.putFile({
        filepath: file.fullPath,
        keypath: file.keyPath,
        cacheControl,
      })
    }
  
    for (const keyPath of this.#toUpdateList) {
      const file = this.#localFileList[keyPath]
      const cacheControl = await this.#getCacheControl('/' + keyPath)
      yield { action: 'UPD', key: keyPath }
      await this.#bucketService.putFile({
        filepath: file.fullPath,
        keypath: file.keyPath,
        cacheControl,
      })
    }
  
    for (const keyPath of this.#toDeleteList) {
      yield { action: 'DEL', key: keyPath }
    }
  
    await this.#bucketService.deleteItems({
      fileList: this.#toDeleteList,
    })
  }
  
  async invalidate() {
    if (!this.#committed) return
    if (!this.#cloudFrontService) return
    if (!this.#hasDiff()) return

    await this.#cloudFrontService.invalidate({
      patterns: [
        ...this.#toPutList.map(p => `/${p}`),
        ...this.#toUpdateList.map(p => `/${p}`),
        ...this.#toDeleteList.map(p => `/${p}`),
      ]
    })
  }

  getSummary() {
    if (!this.#committed) return null
    return {
      toPut: this.#toPutList.slice(),
      toUpdate: this.#toUpdateList.slice(),
      toDelete: this.#toDeleteList.slice(),
    }
  }

  async #getCacheControl(pathname: string) {
    if (this.#cacheControl instanceof CacheControl.CacheControl) {
      return this.#cacheControl.getCacheControl(pathname)
    }
    return this.#cacheControl
  }

  #hasDiff() {
    const toPutAmount = this.#toPutList.length
    const toUpdateAmount = this.#toUpdateList.length
    const toDeleteAmount = this.#toDeleteList.length

    if (toPutAmount + toUpdateAmount + toDeleteAmount === 0) {
      return false
    }

    return true
  }

  #calculateDiff() {
    const toPut: Record<string, boolean> = {}
    const toUpdate: Record<string, boolean> = {}
    const toDelete: Record<string, boolean> = {}

    for (const [file, { hash }] of Object.entries(this.#localFileList)) {
      if (!(file in this.#remoteFileHashes)) {
        toPut[file] = true
        continue
      }

      if (this.#remoteFileHashes[file] !== hash) {
        toUpdate[file] = true
        continue
      }
    }

    for (const [file] of Object.entries(this.#remoteFileHashes)) {
      if (!(file in this.#localFileList)) {
        toDelete[file] = true
      }
    }

    this.#toPutList = Object.keys(toPut)
    this.#toUpdateList = Object.keys(toUpdate)
    this.#toDeleteList = Object.keys(toDelete)
  }
}