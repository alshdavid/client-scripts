import * as path from 'node:path'
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import { crawlDir, TargetType } from '../../../dirs/index.js'

export enum HashMethod {
  SHA1 = 'sha1',
  SHA256 = 'sha256',
  MD5 = 'md5',
}

export type GetFileListOptions = {
  folderPath: string
  prefix?: string
  hashMethod?: HashMethod
}

export type GetFileListResult = {
  keyPath: string
  fullPath: string
  hash: string
}

export type GetFileListResults = Record<string, GetFileListResult>

export function getFileList({
  folderPath,
  prefix,
  hashMethod = HashMethod.MD5,
}: GetFileListOptions): GetFileListResults {
  const fileList: GetFileListResults = {}
  const platformCwd = folderPath + path.sep
  const local = crawlDir({ targetPath: folderPath })

  for (const [absolutePath, value] of local.entries()) {
    const assetPath = absolutePath.replace(platformCwd, '')
    if (value !== TargetType.FILE) continue
    if (prefix && !assetPath.startsWith(prefix)) continue

    const fileBuffer = fs.readFileSync(absolutePath)
    const result = crypto.createHash(hashMethod).update(fileBuffer).digest('hex')
    
    fileList[assetPath] = {
      keyPath: assetPath,
      fullPath: absolutePath,
      hash: result,
    }
  }

  return fileList
}