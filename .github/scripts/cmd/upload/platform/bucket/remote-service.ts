import { DeleteItemsOptions, deleteItems } from './delete-items.ts'
import { GetFileListOptions, MD5Hash, getFileList } from './get-file-list.ts'
import { PutFileOptions, putFile } from './put-file.ts'
import { PutTextOptions, putText } from './put-text.ts'
import { RemoteOptions } from './remote-options.ts'

export class BucketService {
  readonly #remoteOptions: RemoteOptions

  constructor({ Client, Bucket, Dry }: RemoteOptions) {
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
