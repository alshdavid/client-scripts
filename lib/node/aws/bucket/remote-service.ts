import { S3Client } from '@aws-sdk/client-s3'
import * as S3 from '@aws-sdk/client-s3'
import { DeleteItemsOptions, deleteItems } from './delete-items.js'
import { GetFileListOptions, MD5Hash, getFileList } from './get-file-list.js'
import { PutFileOptions, putFile } from './put-file.js'
import { PutTextOptions, putText } from './put-text.js'
import { RemoteOptions } from './remote-options.js'

export type BucketServiceOptions = {
  Client?: S3.S3Client
  Bucket: string
  Dry?: boolean
}

export class BucketService {
  readonly #remoteOptions: RemoteOptions

  constructor({ 
    Client = new S3Client({}),
    Bucket,
    Dry
  }: BucketServiceOptions) {
    this.#remoteOptions = Object.freeze({ Client, Bucket, Dry })
  }

  deleteItems(options: DeleteItemsOptions): Promise<void> {
    return deleteItems(this.#remoteOptions, options)
  }

  putFile(options: PutFileOptions): Promise<void> {
    return putFile(this.#remoteOptions, options)
  }

  putText(options: PutTextOptions): Promise<void> {
    return putText(this.#remoteOptions, options)
  }

  getFileList(options: GetFileListOptions): Promise<Record<string, MD5Hash>> {
    return getFileList({ ...this.#remoteOptions, ...options })
  }
}
