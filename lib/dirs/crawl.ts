import * as fsSync from 'node:fs'
import * as path from 'node:path'

export enum TargetType {
  FOLDER,
  FILE,
  LINK
}

export type CrawlDirOptions = {
  targetPath?: string
  cwd?: string
  dontCrawl?: string[]
  depth?: number | undefined
}

export function crawlDir({
  targetPath = '',
  dontCrawl = [],
  depth = undefined
}: CrawlDirOptions = {}): Map<string, TargetType> {
  const files = new Map<string, TargetType>()

  let currentDepth = 1

  function innerCrawl(currentTargetPath: string) {
    const contents = fsSync.readdirSync(currentTargetPath)

    for (const target of contents) {
      const relTargetPath = path.join(currentTargetPath, target)
      const stat = fsSync.lstatSync(relTargetPath)

      if (dontCrawl.includes(target)) {
        continue
      }

      if (stat.isSymbolicLink()) {
        files.set(relTargetPath, TargetType.LINK)
        continue
      }

      if (stat.isFile()) {
        files.set(relTargetPath, TargetType.FILE)
        continue
      }

      if (stat.isDirectory()) {
        files.set(relTargetPath, TargetType.FOLDER)
        if (
          depth !== undefined &&
          currentDepth !== undefined &&
          currentDepth >= depth
        ) {
          continue
        }
        currentDepth++
        innerCrawl(relTargetPath)
        currentDepth--
        continue
      }
    }
  }

  innerCrawl(targetPath)

  return files
}
