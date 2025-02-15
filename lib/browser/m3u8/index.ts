// @ts-ignore
import * as m3u8 from 'm3u8-parser'

export function parse(doc: string) {
  const parser = new m3u8.Parser()

  parser.push(doc)
  parser.end()

  return parser.manifest
}
